// The blog's posts for this build: read once, however many pages ask.
import { resolve } from "node:path";
import { type BlogPost, loadBlogPosts } from "./lib/blog-posts.ts";
import { SITE } from "./site.ts";

let posts: Promise<BlogPost[]> | undefined;

export function blogPosts(): Promise<BlogPost[]> {
  posts ??= loadBlogPosts({
    feed: SITE.blogFeed,
    site: SITE.blog,
    timeZone: SITE.timeZone,
    // Relative to where the build runs, which is the repository's root: a built page's own
    // address is inside dist/, not beside the file.
    file: resolve("data/blog-posts.json"),
    warn: (message) => console.warn(message),
  });
  return posts;
}
