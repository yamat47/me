# me

The source of [me.yamat47.me](https://me.yamat47.me/), my portfolio site: who I am, the projects I build outside my
job, my talks, everything I have written, and my career, in English and in Japanese.

Nothing is built yet. What is decided so far is in [CLAUDE.md](CLAUDE.md).

The site will share its design system with [blog.yamat47.me](https://blog.yamat47.me/): the components of
[pylon](https://github.com/yamat47/pylon).

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
