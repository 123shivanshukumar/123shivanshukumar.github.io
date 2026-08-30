# How this site works

Static site built with [Zola](https://www.getzola.org/) (v0.20). **No theme** —
all templates live in `templates/`, all styles in `sass/`, so nothing about the
structure is locked down.

```
config.toml          site + language config
content/             all the markdown (this is the only thing you edit day to day)
templates/           Tera templates — the entire HTML structure
sass/main.scss       the entire stylesheet (compiles to /main.css)
static/              files copied verbatim to the site root
public/              build output — generated, don't edit
```

## Run it locally

```sh
zola serve            # http://127.0.0.1:1111, live-reloads on save
zola build            # one-off build into public/
zola check            # validate links
```

## Writing a post

Create `content/posts/my-post.md`:

```
+++
title = "My post"
date = "2026-08-30"
description = "Optional one-liner shown in listings."

[taxonomies]
tags = ["math", "thoughts"]
+++

Body in plain markdown.
```

Images: drop them in `content/posts/` and reference `../my-image.png`.

## Math

KaTeX renders in the browser. Use `$…$` inline and `$$…$$` for display; `\(…\)`
and `\[…\]` also work. Macros `\norm`, `\abs`, `\R`, `\E` are predefined in
`templates/partials/math.html` — add your own there.

Two markdown gotchas (markdown is parsed before KaTeX sees the text):

- Inside `$$ … $$`, a LaTeX line break `\\` must be written `\\\\`, otherwise
  markdown eats one backslash. This matters for `align`/`cases` environments.
- Avoid a bare `*` inside math on the same line as another one (`$a * b$` … `$c * d$`)
  — use `\cdot` or `\times`.

Set `[extra] math = false` in a post's front matter to skip loading KaTeX there.

## Translations

Each language is a suffix on the filename. English (default) is unsuffixed:

```
content/posts/life-is-an-optimisation.md      → /posts/life-is-an-optimisation/
content/posts/life-is-an-optimisation.ta.md   → /ta/posts/life-is-an-optimisation/
```

The line *"View this blog in Tamil, Hindi"* under the title is generated
automatically from whichever translations exist — nothing to maintain by hand.
It appears in both directions (the Tamil page links back to English) and the
sentence itself is localised.

### Adding a new language

Say French (`fr`). Two required steps, one optional:

1. **Required** — declare it in `config.toml`. A bare block is enough:

   ```toml
   [languages.fr]
   generate_feeds = true
   taxonomies = [{ name = "tags", feed = false }]
   ```

   Without this the build fails: *"has a language code of fr which isn't
   present in the config.toml `languages`"*.

2. **Required** — add the section stub `content/posts/_index.fr.md`
   (copy `_index.ta.md`). This is what `/fr/posts/` is built from; without it
   the homepage template fails with *"Section `posts/_index.fr.md` not found"*.
   You do **not** need `content/_index.fr.md` — Zola generates the language
   homepage on its own.

3. **Optional** — the polish, in `config.toml`:

   ```toml
   fr = "French"          # under [extra.language_names]

   [extra.ui.fr]          # the localised UI strings
   view_in = "Lire ce blog en"
   recent = "Écrits récents"
   all_writing = "Tous les écrits"
   ```

   Skip these and nothing breaks: the language shows up as the raw code `fr`
   in the translations line, and the UI strings fall back to English. Fill
   them in whenever.

After that, every translation is just a file: `content/posts/whatever.fr.md`.
The templates never name a language — they read whatever translations a page
happens to have, so the list is genuinely open-ended.

`ta`, `hi`, `de` and `bn` are already wired up, with `content/posts/test.md`
translated into all four as a working example.

## Design

All colours, fonts and spacing are CSS custom properties at the top of
`sass/main.scss` (`:root`, plus the dark-mode blocks). Retheme by editing those
values only. Body font is Newsreader, mono is IBM Plex Mono, both from Google
Fonts (swap the `<link>` in `templates/base.html`).

Dark mode follows the OS by default; the header toggle overrides and persists it.

## Deploying

`.github/workflows/main.yml` builds with `shalzz/zola-deploy-action` on push.
The old Apollo theme submodule is no longer used — `themes/` and `configs/`
can be deleted whenever you're ready.
