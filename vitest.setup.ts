/**
 * Trim noisy dev-only warnings from dependencies during Vitest runs.
 */
const suppressedSubstrings = [
  'React Router Future Flag Warning',
  'Relative route resolution within Splat routes',
];

const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const first = String(args[0] ?? '');
  if (suppressedSubstrings.some((s) => first.includes(s))) return;
  originalWarn.apply(console, args as Parameters<typeof console.warn>);
};
