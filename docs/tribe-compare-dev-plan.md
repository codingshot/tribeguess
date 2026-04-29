# Tribe compare — development plan

## Goals

- Make **compare** easy to discover, configure, share, and read on mobile and desktop.
- Keep URLs **canonical, stable, and deep-linkable** (query + `/vs/` path).
- Meet **accessibility** expectations for keyboard and screen readers.

## Phase 1 — Foundation (shipped)

- URL helpers: `parseCompareTribeSlugs`, `serializeCompareTribes`, `buildCompareVsPath`, `canonicalizeCompareSegments` (aliases → canonical slug).
- Page: up to 4 slots, quick lookup, suggestions (curated + related + same-country), copy link, swap / reverse, clear all, resume last comparison (`localStorage`).
- Footer + nav entry points; tests for URL helpers and suggestions.

## Phase 2 — UX, a11y, content depth (shipped)

1. **Keyboard**: tribe lookup behaves as a listbox — Arrow Up/Down, Enter to add, Escape to dismiss highlight; `aria-activedescendant` + option ids; mouse hover syncs highlight.
2. **Table semantics**: first column uses `<th scope="row">`; tribe columns `scope="col"`; comparison wrapped in `<section aria-label="Comparison table">`.
3. **Share previews**: `og:*` and `twitter:*` meta when ≥2 tribes are selected (uses canonical `?tribes=` URL on client).
4. **More compare rows**: **National / regional share** (`populationPercent`); **Signature dishes** from `traditionalFood` (description or staples).
5. **Duplicate guard**: adding a tribe resolves alias slug against `compareSlugAliases` before checking `selectedSlugs`.

## Phase 3 — Future backlog

- **Print / export**: print stylesheet or “Copy comparison as text”.
- **Anchors**: links from compare row to tribe page sections (e.g. names, food) when those anchors exist.
- **Diff mode**: highlight same vs different language family or primary country (optional).
- **Analytics**: track suggestion clicks vs manual lookup (if product agrees).

## Success criteria

- Lighthouse / axe: no critical contrast or missing-name issues on `/compare`.
- Two-tribe share links show sensible title/description in iMessage / Slack / X previews.
- Lookup usable without a mouse for power users.
