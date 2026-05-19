import { describe, it, expect } from 'vitest';
import { detectRouteSection, getRouteRecoveryContent } from './routeContext';

describe('routeContext', () => {
  it('detects recipes section', () => {
    expect(detectRouteSection('/recipes')).toBe('recipes');
    expect(detectRouteSection('/recipe/ugali')).toBe('recipes');
    expect(detectRouteSection('/ingredient/cassava')).toBe('recipes');
  });

  it('detects dances section', () => {
    expect(detectRouteSection('/dances')).toBe('dances');
    expect(detectRouteSection('/dance/maasai-adumu')).toBe('dances');
  });

  it('returns recipe-focused 404 CTAs', () => {
    const content = getRouteRecoveryContent('/recipe/missing', 'not-found');
    expect(content.headline).toMatch(/recipe/i);
    expect(content.primaryCta.href).toBe('/recipes');
    expect(content.secondaryCtas.some(c => c.href === '/learn')).toBe(true);
  });

  it('returns reload as primary CTA for errors', () => {
    const content = getRouteRecoveryContent('/recipes', 'error');
    expect(content.headline).toMatch(/wrong/i);
    expect(content.primaryCta.label).toMatch(/reload/i);
  });
});
