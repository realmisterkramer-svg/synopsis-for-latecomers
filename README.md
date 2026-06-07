# Stories at the Edge of Things

A short story collection built as a navigable book, published on Netlify.

## What it is

Seven original short stories spanning literary fiction, thriller, fantasy, romance, science fiction, and magical realism. The site is designed to feel like reading a printed anthology — warm parchment tones, serif typography, and seamless chapter-to-chapter navigation.

## Key Technologies

- **TanStack Start** — file-based routing with SSR
- **Content Collections** — markdown stories with typed frontmatter schema
- **Tailwind CSS v4** — utility-first styling
- **Google Fonts** — Playfair Display, EB Garamond, Cormorant Garamond
- **Netlify** — deployment and hosting

## Running Locally

```bash
npm run dev
```

The dev server starts on port 3000. Stories live in `content/stories/` as markdown files.

## Adding a Story

Create a new `.md` file in `content/stories/` with the following frontmatter:

```yaml
---
title: "Story Title"
summary: "One-sentence description shown in the table of contents."
genre: "Literary Fiction"
order: 8
---

Story text here...
```

The `order` field determines reading sequence and prev/next navigation.
