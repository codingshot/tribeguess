---
name: tribe-dance-data-validator
description: Validate, clean, and enrich African tribal dance and music data for TribeGuess. Use when editing src/data/dances.ts, adding YouTube dance/music videos, or checking embeds and tribe slug links.
---

# TribeGuess Dance & Music Data Validator

## When to use

- Adding or editing entries in `src/data/dances.ts`
- Linking dances to tribes on `/learn/:slug` or `/african-dances`
- Fixing broken YouTube embeds for dance or music videos
- Distinguishing **dance** vs **music** and **traditional** vs **modern**

## Data model (`CulturalPerformance`)

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | kebab-case, unique (e.g. `kamba-kilumi-dance`) |
| `name` | yes | Display title |
| `contentType` | yes | `dance` or `music` |
| `tribeSlug` | yes | Must exist in `tribes.json` / `getAllTribes()` |
| `style` | yes | `traditional` \| `modern` \| `ceremonial` \| `folk` \| `social` |
| `musicEra` | for music | `traditional` or `modern` |
| `youtubeVideoId` | yes | 11-char ID only (no full URL) |
| `description` | yes | 20+ chars, factual |
| `culturalSignificance` | yes | Why it matters culturally |

## Validation commands

```bash
npm test -- src/data/dances.test.ts
```

Programmatic check:

```ts
import { validateAllPerformances } from '@/lib/danceValidation';
const r = validateAllPerformances();
console.log(r);
```

## YouTube embed check

```bash
curl -s "https://noembed.com/embed?url=https://www.youtube.com/watch?v=VIDEO_ID" | head -c 300
```

If `error` is returned, try another video. Some documentaries return 401 on noembed but still embed — test in browser.

## Rules

1. **Dance vs music**: Use `contentType: 'dance'` for movement performances; `music` for drumming, song, or genre focus even if video shows dancers.
2. **Tribe slugs**: Use canonical slug from tribe page (`kamba`, `wodaabe`, `bakongo`, not display names).
3. **Occasions**: Set `occasion` for ceremonial/special events (Gerewol, Irreecha, weddings).
4. **Related forms**: Align with `traditionalDance` string on tribe when present.
5. **No duplicate IDs**; reuse same `youtubeVideoId` across dance+music only when intentionally linking related entries.
6. After edits, video gallery picks up entries via `src/lib/videoAggregation.ts` (`category: dance` | `music`).

## Files to update together

- `src/data/dances.ts` — source data
- `src/lib/videoAggregation.ts` — gallery (if aggregation logic changes)
- `src/lib/sitemapUtils.ts` + `scripts/generateSitemap.ts` — SEO URLs
- `src/data/dances.test.ts` — regression tests

## Amhara documentary

Tribe culture video uses `youtubeVideoId` on the **first** `amhara` block in `tribes.json` (merge keeps first row). Documentary ID: `zQUEteiIzJU` — "We're Still Breathing: Amhara Genocide in Ethiopia | FULL DOCUMENTARY".
