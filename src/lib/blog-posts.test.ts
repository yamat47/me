import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { type BlogPost, loadBlogPosts, mergePosts, parseFeed } from "./blog-posts.ts";

const site = "https://blog.example/";
const timeZone = "Asia/Tokyo";

const entry = (title: string, href: string, published: string) => `
  <entry>
    <title>${title}</title>
    <link href="${href}"/>
    <published>${published}</published>
    <content type="html">&lt;p&gt;text&lt;/p&gt;</content>
  </entry>`;

const feedOf = (...entries: string[]) =>
  `<?xml version="1.0" encoding="utf-8"?><feed><title>The blog</title>${entries.join("")}</feed>`;

test("a post is dated by the day it had in the site's time zone", () => {
  // 15:30 UTC on the 31st is already the 1st in Japan.
  const xml = feedOf(entry("年の瀬", `${site}entry/a`, "2025-12-31T15:30:00.000Z"));

  assert.deepEqual(parseFeed(xml, { site, timeZone }), [
    { date: "2026-01-01", href: `${site}entry/a`, title: "年の瀬" },
  ]);
});

test("a title is read as the text it stands for, not as its XML", () => {
  const xml = feedOf(
    entry("A &amp; B &lt;C&gt; &#x3042;", `${site}entry/a`, "2025-01-01T00:00:00Z"),
  );

  assert.equal(parseFeed(xml, { site, timeZone })[0]?.title, "A & B <C> あ");
});

test("the feed's own title is not taken for a post", () => {
  assert.deepEqual(parseFeed(feedOf(), { site, timeZone }), []);
});

test("an entry that links outside the blog, or has no date to read, is left out", () => {
  const xml = feedOf(
    entry("Elsewhere", "https://other.example/entry/a", "2025-01-01T00:00:00Z"),
    entry("Undated", `${site}entry/b`, "someday"),
    entry("Kept", `${site}entry/c`, "2025-01-02T00:00:00Z"),
  );

  assert.deepEqual(
    parseFeed(xml, { site, timeZone }).map((post) => post.title),
    ["Kept"],
  );
});

const older: BlogPost = { date: "2024-05-01", href: `${site}entry/older`, title: "Older" };
const newer: BlogPost = { date: "2025-05-01", href: `${site}entry/newer`, title: "Newer" };

test("a post the feed no longer carries stays in the list", () => {
  assert.deepEqual(mergePosts([older], [newer]), [newer, older]);
});

test("the feed's word on a known post replaces what was kept", () => {
  const retitled = { ...older, title: "Older, retitled" };

  assert.deepEqual(mergePosts([older, newer], [retitled]), [newer, retitled]);
});

async function fileWith(posts: readonly BlogPost[]): Promise<string> {
  const file = join(await mkdtemp(join(tmpdir(), "blog-posts-")), "posts.json");
  await writeFile(file, `${JSON.stringify(posts, null, 2)}\n`);
  return file;
}

const answering = (body: string, status = 200) =>
  (async () => new Response(body, { status })) as typeof globalThis.fetch;

test("a new post in the feed is added to the file", async () => {
  const file = await fileWith([older]);
  const xml = feedOf(entry("Newer", newer.href, "2025-05-01T03:00:00Z"));

  const posts = await loadBlogPosts({
    feed: `${site}feed.xml`,
    site,
    timeZone,
    file,
    warn: () => assert.fail("nothing to warn about"),
    fetch: answering(xml),
  });

  assert.deepEqual(posts, [newer, older]);
  assert.deepEqual(JSON.parse(await readFile(file, "utf8")), [newer, older]);
});

test("when the feed cannot be read, the file's posts are used and a warning says so", async () => {
  const file = await fileWith([older]);
  const warnings: string[] = [];

  const posts = await loadBlogPosts({
    feed: `${site}feed.xml`,
    site,
    timeZone,
    file,
    warn: (message) => warnings.push(message),
    fetch: answering("Service Unavailable", 503),
  });

  assert.deepEqual(posts, [older]);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0] ?? "", /503/);
});

test("a feed without a post does not empty the list", async () => {
  const file = await fileWith([older]);

  const posts = await loadBlogPosts({
    feed: `${site}feed.xml`,
    site,
    timeZone,
    file,
    warn: () => {},
    fetch: answering(feedOf()),
  });

  assert.deepEqual(posts, [older]);
});
