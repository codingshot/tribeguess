# Pre-Change Verification Checklist

**Use this checklist before and after making changes to prevent regressions.**

---

## 🔴 BEFORE Making Changes

### 1. Identify Impact Zone

- [ ] Which files will I modify?
- [ ] Which features could be affected?
- [ ] Are there dependent components?

### 2. Document Current State

For detection engine changes (`src/lib/tribeDetection.ts`):
```
□ Note current pattern count
□ Test 3 names that should still work after change
□ Record expected outputs
```

For data changes (`src/data/tribes.json` or `blogPosts.ts`):
```
□ Note current tribe/post count
□ Verify slugs that shouldn't change
□ Check cross-references
```

For routing changes (`src/App.tsx`):
```
□ List all current routes
□ Identify routes that must remain unchanged
□ Check navigation components
```

---

## 🟡 DURING Changes

### Change Scope Limits

| Change Type | Allowed | Forbidden |
|-------------|---------|-----------|
| Add new tribe | ✅ | Modify existing tribe IDs |
| Add detection pattern | ✅ | Remove patterns without approval |
| Add blog post | ✅ | Change existing slugs |
| Refactor component | ✅ | Change public API/props |
| Add route | ✅ | Remove or rename existing routes |

### Data Modification Rules

When editing `tribes.json`:
- ✅ Add new tribes
- ✅ Add new fields to existing tribes
- ✅ Update population with newer data (cite source)
- ✅ Add sources/references
- ⚠️ Modify descriptions (fact-check required)
- ❌ Change `id` or `slug` values
- ❌ Remove tribes without explicit request

When editing `tribeDetection.ts`:
- ✅ Add new name patterns
- ✅ Add new prefix/suffix patterns
- ✅ Improve confidence scoring
- ⚠️ Modify existing patterns (test thoroughly)
- ❌ Remove patterns without approval
- ❌ Lower confidence thresholds globally

---

## 🟢 AFTER Changes

### Quick Verification (2 min)

Run in browser console:
```javascript
// Load test utilities
import('@/src/__tests__/testUtils').then(t => t.printTestReport());

// Or if already loaded:
window.regressionTests.printTestReport();
```

### Manual Spot Checks

#### Detection Still Works
```
Test: "Wanjiku" → Should return Kikuyu
Test: "Otieno" → Should return Luo
Test: "Kofi" → Should return Akan
```

#### Routes Still Work
```
Visit: /learn/kikuyu → Should show Kikuyu page
Visit: /learn/hutu → Should redirect to Banyarwanda
Visit: /blog → Should list all posts
```

#### Search Still Works
```
Search: "Kenya" → Should show Kenya tribes
Search: "naming" → Should show blog posts
```

---

## 🚨 Red Flags - Stop and Review

If you notice any of these, STOP and verify:

1. **Console errors** after changes
2. **404 pages** where content existed before
3. **Empty search results** for previously working queries
4. **Missing tribes** on the Learn page
5. **Broken images** or missing data
6. **Type errors** in TypeScript

---

## Recovery Steps

If regression is detected:

1. **Identify** which change caused it
2. **Revert** to last working state using History
3. **Isolate** the problematic change
4. **Fix** with minimal modification
5. **Re-test** using this checklist

---

## Quick Reference: Critical Files

| File | Risk Level | Changes Require Testing |
|------|-----------|------------------------|
| `src/App.tsx` | 🔴 High | All routes |
| `src/lib/tribeDetection.ts` | 🔴 High | Detection, patterns |
| `src/data/tribes.json` | 🔴 High | All tribe data |
| `src/data/blogPosts.ts` | 🟡 Medium | Blog display, links |
| `src/hooks/useGlobalSearch.ts` | 🟡 Medium | Search functionality |
| `src/pages/*.tsx` | 🟡 Medium | Page rendering |
| `src/components/*.tsx` | 🟢 Low | Component display |
