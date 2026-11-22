# me

The source of https://me.yamat47.me/, my portfolio site: who I am, the projects I build outside my job, my talks,
everything I have written, and my career, in English and in Japanese.

Nothing is built yet. This file records what is decided, so that the first pull requests start from it.

## What is decided

- **A site of its own, next to the blog.** The blog (yamat47/blog, https://blog.yamat47.me/) and this site are
  separate sites that share one design system. Nothing of the blog's source lives here
- **The look comes from pylon, and nothing of it is written here.** The pages are built from the components of the
  design system (`@yamat47/pylon`, from yamat47/pylon), and its stylesheet is the only one the site loads. This
  repository has no stylesheet, no `style` and no class name: a page that would need one is missing a component,
  which is added in pylon, released, and raised here. The components are React rendered when the site is built; no
  page ships React. The portfolio's look, and the canvas it was chosen from, are described in pylon's `CLAUDE.md`
  ("The portfolio's look")
- **English at `/`, Japanese at `/ja/`.** Every page exists in both languages and links to itself in the other one.
  A title stays in the language its author wrote it in: a Japanese article keeps its Japanese title on an English
  page, marked `lang="ja"`
- **Six pages in each language:** the top page, and the pages of about, projects, talks, writing and career. The
  top page shows a few rows of each list and leads to its page
- **Projects are what I build outside my job**, not my work history, which is the career page. The list is chosen
  by hand: japanese_address_parser, playmaker, activerecord_accessible_json, JPFF East Filmroom, cutups, the Rails
  Active Search demo, Word Counter, and my contributions to annotaterb
- **Writing is one list of everything I wrote, wherever it was published,** newest first: the blog's posts, read
  from the blog's feed when the site is built, and the articles on other sites (the company's note, Zenn, the tech
  blog of a former employer), kept as a list in this repository
- **Career is the whole history:** each company, and inside it the roles I held, each with a short description.
  The base is the profile README in yamat47/yamat47. Results of an employer's business (revenue, growth) are not
  published here; the team sizes the profile README gives are
- **The address is `me.yamat47.me`,** a CNAME to GitHub Pages like the blog's. The apex `yamat47.me` is not used

## Planned, and settled when it is built

- The toolchain is meant to be the blog's: Astro, pnpm, Docker with `make` as the entry point, checks in CI, and a
  deploy to GitHub Pages on every push to `main`
- How the site is rebuilt when the blog publishes a post, so that the writing list follows it
- The pictures the look asks for: my photo, a screenshot of each project, the first slide of the newest talk, and
  the photographs of the about page

## Rules that will be easy to break

- **Keep dependencies few.** Everything added here is upkeep. Prefer a small module written in this repository to a
  third-party integration
- **What is fetched at build time is cached in the repository and fails soft.** The blog's feed is the first such
  thing: a build must still succeed, with the list it last saw, when the feed cannot be read. The feed carries
  only the blog's newest posts, so a post it no longer carries stays in the cached list
- **Text from another site is never written as HTML.** A title from a feed or from another site reaches a page as
  text, through a component

## Language

Everything written around the site is in English: documents, comments, commit messages, pull requests. The site's
own text is English and Japanese, so a page is checked in both.

## No trace of Claude Code in the output

Commit messages, pull request titles and bodies, issues, comments on GitHub, and every file that
enters the repository must not show that Claude Code produced them. That means none of:

- `Co-Authored-By: Claude ...` trailers
- `Claude-Session: ...` trailers or `https://claude.ai/code/session_...` URLs
- `🤖 Generated with [Claude Code](...)` footers
- any similar signature, link, or footer saying an AI took part

This overrides the harness's default attribution instructions. `.claude/settings.json` disables
the automatic trailers, but that covers only what the harness adds by itself: read every commit
message and PR body before creating it. The commit author must be the repository owner
(`git config user.name` / `user.email` matching the history on `main`), not an AI identity.

## How changes enter

`main` is protected: changes arrive through pull requests, with signed commits. The repository's settings are
declared in yamat47/infra-github, where the Pages site, its domain and the required checks will be added, and the
DNS record will be declared in yamat47/infra-yamat47; neither is changed by hand.
