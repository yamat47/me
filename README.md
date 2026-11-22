# me

The source of [me.yamat47.me](https://me.yamat47.me/), my portfolio site: who I am, the projects I build outside my
job, my talks, everything I have written, and my career, in English and in Japanese.

It is a static site built with [Astro](https://astro.build/). It shares its design system with
[blog.yamat47.me](https://blog.yamat47.me/): every page is put together from the components of
[pylon](https://github.com/yamat47/pylon), and the site has no stylesheet of its own.

## Development

Node and pnpm are not needed on the host: the toolchain runs in a Docker container, and `make` is the entry point.

```sh
make setup    # first time: build the image and install dependencies
make up       # dev server at http://localhost:4331
make check    # typecheck, lint, test and build, as CI does
make preview  # the built site at http://localhost:4332
make help     # every target
```

English is at `/` and Japanese at `/ja/`. What the pages say is in `src/content/`, in both languages; the blog's
posts in the writing list are read from the blog's feed when the site is built, and kept in
`data/blog-posts.json`. The layout of the repository and its rules are in [CLAUDE.md](CLAUDE.md).

## Skills

The skills under `.claude/skills/` are not written here. They are installed from
[yamat47/github-toolkit](https://github.com/yamat47/github-toolkit) and committed, so do not edit them in place:
change them upstream and wait for the release.

```sh
gh skill install yamat47/github-toolkit <skill-name> --agent claude-code --scope project
```

| Skill | Used for |
| --- | --- |
| `create-pr` | from uncommitted changes to a draft pull request |
| `review-pr` | local review of a diff before it is pushed |
| `writing-conventions` | house style for comments, commits, pull requests and docs |
| `github-actions-workflows` | rules for editing `.github/workflows/` |
| `review-dependency-bump` | reviewing Dependabot's dependency bumps |
| `review-skill-update` | reviewing the pull requests `update-skills` opens |
| `typescript-idioms` | language-level TypeScript |
| `react-patterns` | React components |

`update-skills.yml` runs `gh skill update --all` monthly and opens a pull request with `github.token`, which the
`me` entry in yamat47/infra-github allows (`actions_can_create_pull_requests`). A pull request opened with that
token starts no workflow, so once checks are required here its checks never run: it is merged with the admin
bypass, as in the other repositories. A skill update changes no code.
