# me

The source of https://me.yamat47.me/, my portfolio site: who I am, the projects I build outside my job, my talks,
everything I have written, and my career, in English and in Japanese. It is a static site built with Astro from
the components of my design system, pylon.

The site is built and not published yet: "Deploying" below says what is still to come.

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

## Layout

| Path | Contents |
|---|---|
| `src/content/` | What the pages say, in both languages: the site's own words (`text.ts`), and the projects, talks, career, about page and the articles published outside the blog, each a list kept by hand |
| `src/views/` | The pages, put together from pylon's components: one file a page, and `Frame.tsx` for the profile column and the footer every page has |
| `src/pages/` | The routes: `[...path].astro` builds every page in both languages, `404.astro` the page for an address that leads nowhere |
| `src/layouts/Base.astro` | The document around a page: its title, its description, and the links to the same page in each language |
| `src/routes.ts`, `src/site.ts` | The pages' names and paths, and the site's address and what it reads from the blog |
| `src/lib/blog-posts.ts`, `src/blog.ts` | Reading the blog's feed for the writing list, and keeping what it read |
| `data/blog-posts.json` | The blog's posts as the last build that reached the feed saw them. Written by the build, committed |
| `public/images/` | The pictures: my photo in the profile column, a screenshot of each project, and the first slide of the newest talk |
| `public/favicon.ico`, `public/apple-touch-icon.png` | The site's icon: my face cropped from the photo in the profile column |
| `docker/` | Development image and compose |
| `Makefile` | Entry point for development commands |

## Always run commands through make

Node and pnpm are not installed on the host. The toolchain exists only inside the Docker container, and the `Makefile`
invokes it with `docker compose -f docker/compose.yaml run`.
**Do not run `pnpm` `npm` `npx` `node` `tsc` `biome` `astro` directly on the host** (`permissions.deny` in `.claude/settings.json` rejects them).

| Goal | Command |
|---|---|
| Typecheck, lint, test and build in one go | `make check` (CI runs the same, plus zizmor on the workflows) |
| Type check / lint / auto-fix / test | `make typecheck` / `make lint` / `make fix` / `make test` |
| Build the site | `make build` (`dist/`) |
| Dev server | `make up` (http://localhost:4331) / `make logs` / `make down` |
| The built site | `make preview` (http://localhost:4332) / `make down` |
| Add or update dependencies | `make pnpm ARGS="add -D <pkg>"` (the lockfile is also updated on the host) |
| First run, or after changing the Dockerfile | `make setup` |

## Rules that are easy to break

- **No stylesheet, no `style`, no class name.** The look is pylon's (`@yamat47/pylon`), and its stylesheet is the
  only one the site loads (`src/layouts/Base.astro`). A page that would need a class is missing a component, which
  is added in pylon, released, and raised here. Nothing uses a `client:` directive: the components are rendered
  when the site is built, and no page ships React
- **Every text exists in both languages.** A page is the same view in English and in Japanese, so a text added in
  one language is added in the other, in the same file, and a page is looked at in both. A title stays in the
  language its author wrote it in, and the page is told so (`lang` on the item)
- **A link inside the site ends with a slash and comes from `pathOf`** (`src/routes.ts`). The pages are served as
  directories (`/about/`), and a link without the slash would go through a redirect
- **A talk is dated by the day of its event.** Speaker Deck shows the day the slides were uploaded, which is often
  later: take the date from the event's page (`src/content/talks.ts`)
- **What is fetched at build time is cached in the repository and fails soft.** The blog's feed is the one such
  thing: a build still succeeds, with the posts in `data/blog-posts.json`, when the feed cannot be read. The feed
  carries only the blog's newest posts, so a post it no longer carries stays in the file. When a build changes the
  file, commit it; CI does not fail on the difference, because a new post on the blog must not break this
  repository's checks
- **Text from another site is never written as HTML.** A title from the feed reaches a page as text, through a
  component
- **A picture is a file under `public/images/`, in the shape pylon gives it:** 16:10 for a project's screenshot
  (taken at 1280x800), 16:9 for a talk's first slide, square for my photo in the profile column. Every picture has
  an `alt` in both languages, except one whose text beside it says the same, which has an empty `alt` (my photo,
  next to my name)
- **Keep dependencies few.** Everything added here is upkeep. Prefer a small module written in this repository to a
  third-party integration
- TypeScript stays on 6 while `@astrojs/check` does not accept 7 (`.github/dependabot.yml` says when to lift that)
- Tests run on Node's own test runner (`node --test`, files named `*.test.ts` beside what they test), so a module a
  test loads imports its neighbours with the `.ts` extension. The pages themselves have no tests: they are verified
  by `make check` and a look at the page in both languages and both themes (`make up`)

## Not there yet

- The photographs of the about page. Their place is marked `TODO` in `src/views/AboutPage.tsx`
- The day one talk was given (`TODO` in `src/content/talks.ts`)
- A card for shared links, and a sitemap

## Deploying

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages. For now it runs by hand only: the
Pages site and its domain are declared in yamat47/infra-github and the DNS record in yamat47/infra-yamat47, and
neither exists yet. Once they do, a push to `main` publishes, and so does a daily schedule, which is how a new
post on the blog reaches the writing list.

## Where the conventions live

- Follow the `writing-conventions` skill for comments, commits, and pull requests, the `typescript-idioms` skill for
  TypeScript, and the `react-patterns` skill for React
- Open pull requests with the `create-pr` skill
- Check Dependabot pull requests with the `review-dependency-bump` skill, and skill update pull requests with the
  `review-skill-update` skill
- The skills in `.claude/skills/` are installed from yamat47/github-toolkit. Do not edit them here. Rules specific to
  this repository live in this file; when they conflict with a skill, this file wins

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
