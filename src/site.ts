// Where the site is published, and what it reads from the blog when it is built.
export const SITE = {
  url: "https://me.yamat47.me",
  blog: "https://blog.yamat47.me/",
  // The blog's Atom feed: its newest posts, each with its title, address and date.
  blogFeed: "https://blog.yamat47.me/feed.xml",
  // A post is dated by the day it had in Japan, wherever the build runs.
  timeZone: "Asia/Tokyo",
} as const;
