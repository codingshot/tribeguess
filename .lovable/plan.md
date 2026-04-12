

## Plan: Integrate MuslimName Mapping Database into TribeGuess Detection

### What This Achieves

When a user searches a Western name like "David", "Maria", or "Christopher" in TribeGuess, the app currently shows a generic "Global Name Origins" card. After this change, it will:

1. **Identify the name's cultural origin** (Biblical, Western, French, Italian, etc.) with meaning and connection details
2. **Show religious context** — both the Christian/Western origin AND the Muslim equivalent (e.g., "David" → "Dawud", a prophet in Islam)
3. **Link to African tribes** where that religious tradition is strong (e.g., Christian names → Kikuyu, Igbo; Muslim names → Hausa, Somali)
4. **Suggest similar names** from the same category and related tribal names
5. **Handle nicknames and variants** (e.g., "Mike" → "Michael" → "Mikail")

### Technical Steps

#### 1. Copy Data Files from MuslimName Project
- `src/data/nameMappingData/mappingRecord.ts` (3,300 lines — 1,500+ name mappings)
- `src/data/nameMappingData/variants.ts` (138 lines — nickname/variant resolver)
- `src/data/nameMappingData/types.ts` (109 lines — TypeScript types)
- `src/data/nameMappingData/index.ts` (barrel export)
- Skip `chinesePinyin.ts` (not needed for TribeGuess)

#### 2. Create Integration Layer: `src/lib/westernNameDetection.ts`
- Import the mapping data and variant resolver
- Build a `detectWesternName(name)` function that:
  - Resolves nicknames/variants first (Mike → Michael)
  - Looks up the canonical name in `christianToMuslimNameMapping`
  - Returns: origin category, meaning, Muslim equivalent(s), connection text, cultural note, and religious context
  - Maps the category to likely African tribes (biblical → Christian tribes, islamic patterns → Muslim tribes)
  - Returns related African tribes from both religious traditions

#### 3. Integrate into Detection Pipeline (`src/lib/tribeDetection.ts`)
- Before the existing global origin detection, check against the Western name mapping
- If found, enrich the `GlobalOriginInfo` result with:
  - `westernMapping` field containing the full mapping data
  - Enhanced religious context (both Christian origin + Muslim equivalent)
  - Suggested African tribes from both faith traditions

#### 4. Integrate into `globalOrigins.ts`
- Enhance `detectGlobalOrigin()` to consult the Western name mapping first for exact matches (higher confidence than pattern matching)
- Add the Muslim equivalent info to the detection result

#### 5. Update `GlobalOriginCard.tsx` to Display Enhanced Data
- Show "This name in Islam" section with Muslim equivalent(s) and connection
- Show meaning and cultural notes from the mapping
- Show "Christian tribes that use this name" and "Muslim tribes with the equivalent"
- Add links to relevant tribe pages

#### 6. Update `ResultQuickActions.tsx`
- Add "Try the Muslim equivalent" quick action (e.g., search "Dawud" after searching "David")
- Add "Try related names" from same category

#### 7. Build & Test
- Verify TypeScript compilation
- Test: "David" → shows Dawud connection + Kikuyu/Igbo (Christian) + Hausa/Somali (Muslim)
- Test: "Mike" → resolves to Michael → Mikail
- Test: "Fatima" → already Muslim, show Christian connections
- Test: "Wanjiku" → should still work as before (no regression)

### Files Changed
- **New**: `src/data/nameMappingData/` (4 files copied from MuslimName)
- **New**: `src/lib/westernNameDetection.ts`
- **Modified**: `src/lib/tribeDetection.ts` — add western name detection to pipeline
- **Modified**: `src/lib/globalOrigins.ts` — enhance detection with mapping data
- **Modified**: `src/components/GlobalOriginCard.tsx` — render Muslim equivalents and cross-faith tribal links
- **Modified**: `src/components/ResultQuickActions.tsx` — add "Try Muslim equivalent" action
- **Modified**: `src/pages/Index.tsx` — pass new data through to components

