# AGENTS.md — Stories at the Edge of Things

This document describes the project structure for developers and AI agents working on this codebase.

## Project Overview

A short story collection published as a navigable book. Seven original short stories, each with its own reader page, linked via prev/next navigation. The visual aesthetic is literary — warm parchment tones, serif typography, and book-like layout conventions.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Typography | Google Fonts (Playfair Display, EB Garamond, Cormorant Garamond) |
| Content | Content Collections (type-safe markdown) |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
content/stories/              # Markdown story files (named NN-kebab-title.md)
src/routes/
  __root.tsx                  # Root layout: HTML shell, head meta, Google Fonts links
  index.tsx                   # Table of Contents page
  stories.$slug.tsx           # Story reader with prev/next navigation
src/components/ui/
  card.tsx                    # Generic card component (unused but kept)
src/lib/
  utils.ts                    # cn() helper for Tailwind class merging
src/styles.css                # CSS variables, typography, animations, prose-story class
content-collections.ts        # Story schema (title, summary, genre, order) + slug transform
```

## Key Concepts

### Content Collections

Story markdown files in `content/stories/` are processed at build time. The schema in `content-collections.ts` validates frontmatter and transforms each document into a typed object, adding a `slug` derived from the `title`.

Imported as: `import { allStories } from 'content-collections'`

Each story has: `title`, `summary`, `genre`, `order`, `slug`, `content` (raw markdown).

### Routing

- `/` — Table of Contents (lists all stories sorted by `order`)
- `/stories/:slug` — Story reader (loads story by slug, computes `prev`/`next`)

The `stories.$slug.tsx` loader sorts all stories by `order` field, finds the index of the current slug, and returns adjacent stories for navigation. Both routes are SSR-rendered.

### Design System

CSS custom properties in `src/styles.css` define the full color palette:
- `--parchment`, `--parchment-dark`, `--parchment-mid` — background tones
- `--ink`, `--ink-light`, `--ink-faded` — text hierarchy
- `--accent`, `--accent-light` — terracotta red, used for chapter numerals and hover states
- `--gold`, `--gold-light` — decorative diamond ornaments
- `--rule`, `--rule-light` — horizontal rule / border tones

The `prose-story` class in `styles.css` handles drop caps (first letter of first paragraph), justified text, line height, and hyphens for the story body.

Route components use inline styles rather than Tailwind classes for precise typographic control. Tailwind utilities are used for layout helpers only.

## Conventions

- Story files: `NN-kebab-title.md` where NN is the two-digit order (01, 02...) — keeps directory listing in reading order.
- `order` frontmatter field is the single source of truth for sequence; do not rely on filename ordering in code.
- To add a story: create a new `.md` file with `title`, `summary`, `genre`, and a unique `order` integer. The slug is auto-generated from the title.
- No database — all content is static markdown. No API endpoints needed.

## Development Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
```
