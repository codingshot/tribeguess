/**
 * Data validation and sanitization utilities for production safety.
 * Every data entry/exit point should use these helpers.
 */

// ============= INPUT SANITIZATION =============

/** Sanitize a search/name string: trim, limit length, strip control chars */
export function sanitizeTextInput(input: unknown, maxLength = 100): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    // Remove control characters but keep Unicode letters, spaces, hyphens, apostrophes
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/\s+/g, ' ');
}

/** Validate a name input for the guess form */
export function validateNameInput(name: string): { valid: boolean; sanitized: string; error?: string } {
  const sanitized = sanitizeTextInput(name, 50);
  
  if (!sanitized) {
    return { valid: false, sanitized, error: 'Name is required' };
  }
  
  if (sanitized.length < 2) {
    return { valid: false, sanitized, error: 'Name must be at least 2 characters' };
  }
  
  // Allow Unicode letters, spaces, hyphens, apostrophes
  const namePattern = /^[a-zA-ZÀ-ÿ\u0100-\u024F\u0300-\u036F\s\-']+$/;
  if (!namePattern.test(sanitized)) {
    return { valid: false, sanitized, error: 'Name contains invalid characters' };
  }
  
  return { valid: true, sanitized };
}

/** Sanitize a search query */
export function sanitizeSearchQuery(query: unknown, maxLength = 100): string {
  return sanitizeTextInput(query, maxLength);
}

// ============= TYPE GUARDS =============

export function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

export function isValidNumber(val: unknown, min = -Infinity, max = Infinity): val is number {
  return typeof val === 'number' && !isNaN(val) && isFinite(val) && val >= min && val <= max;
}

export function isNonEmptyArray<T>(val: unknown): val is T[] {
  return Array.isArray(val) && val.length > 0;
}

/** Safe access to nested array - returns empty array if missing/invalid */
export function safeArray<T>(val: unknown): T[] {
  return Array.isArray(val) ? val : [];
}

/** Safe access to nested string - returns fallback if missing/invalid */
export function safeString(val: unknown, fallback = ''): string {
  return typeof val === 'string' ? val : fallback;
}

/** Safe access to nested number - returns fallback if missing/invalid */
export function safeNumber(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && !isNaN(val) && isFinite(val)) return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && isFinite(parsed)) return parsed;
  }
  return fallback;
}

// ============= LOCALSTORAGE SAFETY =============

const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

/** Safely read and parse from localStorage with shape validation */
export function safeReadStorage<T>(key: string, validator: (data: unknown) => T | null, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    
    // Reject suspiciously large payloads
    if (raw.length > MAX_STORAGE_SIZE) {
      console.warn(`[Storage] "${key}" exceeds size limit (${raw.length} bytes), clearing`);
      localStorage.removeItem(key);
      return fallback;
    }
    
    const parsed = JSON.parse(raw);
    const validated = validator(parsed);
    if (validated === null) {
      console.warn(`[Storage] "${key}" failed validation, using fallback`);
      return fallback;
    }
    return validated;
  } catch (e) {
    console.warn(`[Storage] Failed to read "${key}":`, e);
    try { localStorage.removeItem(key); } catch { }
    return fallback;
  }
}

/** Safely write to localStorage with size check */
export function safeWriteStorage(key: string, data: unknown): boolean {
  try {
    const serialized = JSON.stringify(data);
    if (serialized.length > MAX_STORAGE_SIZE) {
      console.warn(`[Storage] "${key}" data too large (${serialized.length} bytes), not saving`);
      return false;
    }
    localStorage.setItem(key, serialized);
    return true;
  } catch (e) {
    console.warn(`[Storage] Failed to write "${key}":`, e);
    return false;
  }
}

// ============= DATA VALIDATORS =============

/** Validate favorites array from localStorage */
export function validateFavorites(data: unknown): { name: string; addedAt: number; region?: string; tribe?: string }[] | null {
  if (!Array.isArray(data)) return null;
  
  const validated = data
    .filter((item): item is Record<string, unknown> => 
      item !== null && typeof item === 'object' &&
      typeof (item as any).name === 'string' &&
      typeof (item as any).addedAt === 'number'
    )
    .map(item => ({
      name: sanitizeTextInput(item.name, 100),
      addedAt: safeNumber(item.addedAt, Date.now()),
      ...(typeof item.region === 'string' ? { region: item.region } : {}),
      ...(typeof item.tribe === 'string' ? { tribe: item.tribe } : {}),
    }))
    .filter(item => item.name.length > 0)
    // Deduplicate by name
    .filter((item, i, arr) => arr.findIndex(x => x.name.toLowerCase() === item.name.toLowerCase()) === i)
    // Cap at 500 favorites
    .slice(0, 500);
  
  return validated;
}

/** Validate quiz stats from localStorage */
export function validateQuizStats(data: unknown): Record<string, unknown> | null {
  if (data === null || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  
  // Ensure required numeric fields exist and are valid
  if (typeof d.totalQuizzesTaken !== 'number' || d.totalQuizzesTaken < 0) return null;
  if (typeof d.totalQuestionsAnswered !== 'number' || d.totalQuestionsAnswered < 0) return null;
  
  return d;
}

/** Validate quiz results from localStorage */  
export function validateQuizResults(data: unknown): unknown[] | null {
  if (!Array.isArray(data)) return null;
  
  return data
    .filter((item): item is Record<string, unknown> =>
      item !== null && typeof item === 'object' &&
      typeof (item as any).quizId === 'string' &&
      typeof (item as any).score === 'number' &&
      typeof (item as any).totalQuestions === 'number'
    )
    // Cap stored results at 200
    .slice(-200);
}

// ============= ENUM VALIDATION =============

export function isValidCountryCode(code: unknown): boolean {
  if (typeof code !== 'string') return false;
  return /^[A-Z]{2}$/.test(code) || code === 'ALL';
}

export function isValidCategory(cat: unknown, allowedValues: string[]): boolean {
  return typeof cat === 'string' && allowedValues.includes(cat);
}

// ============= URL PARAM SAFETY =============

/** Safely extract and validate URL search params */
export function safeParam(searchParams: URLSearchParams, key: string, maxLength = 100): string {
  const raw = searchParams.get(key);
  if (raw === null) return '';
  return sanitizeTextInput(raw, maxLength);
}

export function safeEnumParam<T extends string>(searchParams: URLSearchParams, key: string, allowed: T[], fallback: T): T {
  const raw = searchParams.get(key);
  if (raw !== null && allowed.includes(raw as T)) return raw as T;
  return fallback;
}

export function safeIntParam(searchParams: URLSearchParams, key: string, min: number, max: number, fallback: number): number {
  const raw = searchParams.get(key);
  if (raw === null) return fallback;
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed) || parsed < min || parsed > max) return fallback;
  return parsed;
}
