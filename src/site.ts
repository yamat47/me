// Where the site is published, and what it reads from the blog when it is built.
export const SITE = {
  url: "https://me.yamat47.me",
  blog: "https://blog.yamat47.me/",
  // The blog's Atom feed: its newest posts, each with its title, address and date.
  blogFeed: "https://blog.yamat47.me/feed.xml",
  // The Google tag that reports visits to Google Analytics. Which Analytics property it reports
  // to is set in the tag's settings at Google, not here.
  googleTagId: "GTM-NVQJ2CQX",
  // A post is dated by the day it had in Japan, wherever the build runs.
  timeZone: "Asia/Tokyo",
} as const;
