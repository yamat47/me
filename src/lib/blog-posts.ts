// The blog's posts, as the writing list needs them: read from the blog's Atom feed when the site
// is built, and kept in a file in the repository so that a build never depends on the feed.
import { readFile, writeFile } from "node:fs/promises";
import { z } from "astro/zod";

export type BlogPost = {
  // The day the post is dated, as YYYY-MM-DD.
  readonly date: string;
  readonly href: string;
  readonly title: string;
};

const ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

// The text an XML text node or attribute stands for.
function unescapeXml(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, name: string) => {
    if (name.startsWith("#x")) return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
    if (name.startsWith("#")) return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
    return ENTITIES[name.toLowerCase()] ?? whole;
  });
}

// The day an instant falls on in a time zone, as YYYY-MM-DD.
function dayIn(timeZone: string, instant: Date): string {
  // en-CA writes a date as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

// The posts an Atom feed carries. An entry without a title, an address under `site` or a date is
// left out: the feed is another site's text, and only what is whole reaches a page.
export function parseFeed(
  xml: string,
  { site, timeZone }: { site: string; timeZone: string },
): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const [, entry = ""] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const title = /<title[^>]*>([\s\S]*?)<\/title>/.exec(entry)?.[1];
    const href = /<link[^>]*\bhref="([^"]*)"/.exec(entry)?.[1];
    const published = /<published>([\s\S]*?)<\/published>/.exec(entry)?.[1];
    if (title === undefined || href === undefined || published === undefined) continue;

    const instant = new Date(published.trim());
    const address = unescapeXml(href);
    if (Number.isNaN(instant.getTime()) || !address.startsWith(site)) continue;

    posts.push({
      date: dayIn(timeZone, instant),
      href: address,
      title: unescapeXml(title).trim(),
    });
  }
  return posts;
}

// The posts known so far with what the feed carries now, newest first. A post is known by its
// address; the feed's word on it wins. A post the feed no longer carries stays: the feed holds
// only the blog's newest posts.
export function mergePosts(known: readonly BlogPost[], fetched: readonly BlogPost[]): BlogPost[] {
  const byAddress = new Map<string, BlogPost>();
  for (const post of [...known, ...fetched]) byAddress.set(post.href, post);
  return [...byAddress.values()].toSorted(
    (a, b) => b.date.localeCompare(a.date) || a.href.localeCompare(b.href),
  );
}

type Source = {
  readonly feed: string;
  // The address every post's own address starts with.
  readonly site: string;
  readonly timeZone: string;
  // The file that keeps the posts between builds.
  readonly file: string;
  readonly warn: (message: string) => void;
  readonly fetch?: typeof globalThis.fetch;
};

// The file is edited by hand at times, so it is read as carefully as the feed is.
const knownPosts = z.array(z.object({ date: z.string(), href: z.string(), title: z.string() }));

async function readKnown(file: string): Promise<BlogPost[]> {
  let text: string;
  try {
    text = await readFile(file, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const read = knownPosts.safeParse(JSON.parse(text));
  if (!read.success) throw new Error(`${file} is not a list of posts: ${read.error.message}`);
  return read.data;
}

// The blog's posts, newest first: the ones in the file, with whatever the feed adds or changes.
// When the feed cannot be read, or carries no post, the file's posts are the answer and the
// build goes on. When the feed changes the list, the file is written again, to be committed.
export async function loadBlogPosts(source: Source): Promise<BlogPost[]> {
  const known = await readKnown(source.file);

  let fetched: BlogPost[];
  try {
    const fetchFeed = source.fetch ?? globalThis.fetch;
    const response = await fetchFeed(source.feed, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`the feed answered ${response.status}`);
    fetched = parseFeed(await response.text(), source);
    if (fetched.length === 0) throw new Error("the feed carried no post");
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    source.warn(`Could not read ${source.feed} (${reason}); using the posts in ${source.file}.`);
    return known;
  }

  const posts = mergePosts(known, fetched);
  const written = `${JSON.stringify(posts, null, 2)}\n`;
  if (written !== `${JSON.stringify(known, null, 2)}\n`) await writeFile(source.file, written);
  return posts;
}
