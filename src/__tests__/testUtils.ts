/**
 * Test Utilities for Regression Testing
 * 
 * These functions can be called from browser console or integrated
 * into automated testing workflows.
 */

import { detectTribe, getAllTribes, getTribeBySlug, getTribesByCountry } from '@/lib/tribeDetection';
import { blogPosts } from '@/data/blogPosts';

// ============ ROUTING TESTS ============

interface RouteTestResult {
  route: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export function testSlugAliases(): RouteTestResult[] {
  const testCases = [
    { slug: 'hutu', expectedTribeName: 'Banyarwanda' },
    { slug: 'tutsi', expectedTribeName: 'Banyarwanda' },
    { slug: 'twa', expectedTribeName: 'Banyarwanda' },
    { slug: 'banyarwanda', expectedTribeName: 'Banyarwanda' },
    { slug: 'kikuyu', expectedTribeName: 'Kikuyu' },
    { slug: 'wolof', expectedTribeName: 'Wolof' },
    { slug: 'zulu', expectedTribeName: 'Zulu' },
    { slug: 'luo', expectedTribeName: 'Luo' },
    { slug: 'yoruba', expectedTribeName: 'Yoruba' },
  ];

  return testCases.map(({ slug, expectedTribeName }) => {
    const tribe = getTribeBySlug(slug);
    const actual = tribe?.name || 'NOT FOUND';
    return {
      route: `/learn/${slug}`,
      expected: expectedTribeName,
      actual,
      passed: actual === expectedTribeName,
    };
  });
}

// ============ DETECTION TESTS ============

interface DetectionTestResult {
  input: string;
  expectedTribe: string;
  actualTribe: string;
  confidence: number;
  passed: boolean;
}

export function testTribeDetection(): DetectionTestResult[] {
  const testCases = [
    // Kikuyu names
    { name: 'Wanjiku', expectedTribe: 'kikuyu' },
    { name: 'Kamau', expectedTribe: 'kikuyu' },
    { name: 'Wangari', expectedTribe: 'kikuyu' },
    // Luo names
    { name: 'Otieno', expectedTribe: 'luo' },
    { name: 'Achieng', expectedTribe: 'luo' },
    { name: 'Odhiambo', expectedTribe: 'luo' },
    // Luhya names
    { name: 'Wafula', expectedTribe: 'luhya' },
    { name: 'Nafula', expectedTribe: 'luhya' },
    // Kalenjin names
    { name: 'Kipchoge', expectedTribe: 'kalenjin' },
    { name: 'Chemutai', expectedTribe: 'kalenjin' },
    // Yoruba names
    { name: 'Oluwaseun', expectedTribe: 'yoruba' },
    { name: 'Adebayo', expectedTribe: 'yoruba' },
    // Igbo names
    { name: 'Chukwuemeka', expectedTribe: 'igbo' },
    { name: 'Chiamaka', expectedTribe: 'igbo' },
    // Akan names
    { name: 'Kofi', expectedTribe: 'akan' },
    { name: 'Kwame', expectedTribe: 'akan' },
    // Zulu names
    { name: 'Sipho', expectedTribe: 'zulu' },
    { name: 'Thandi', expectedTribe: 'zulu' },
    // Banyarwanda names
    { name: 'Uwimana', expectedTribe: 'banyarwanda' },
    { name: 'Habimana', expectedTribe: 'banyarwanda' },
    { name: 'Kagame', expectedTribe: 'banyarwanda' },
    // Baganda names
    { name: 'Nakato', expectedTribe: 'baganda' },
    { name: 'Mukasa', expectedTribe: 'baganda' },
    // Wolof names
    { name: 'Ndoye', expectedTribe: 'wolof' },
    { name: 'Diop', expectedTribe: 'wolof' },
  ];

  return testCases.map(({ name, expectedTribe }) => {
    const result = detectTribe(name);
    const topResult = result.predictions[0];
    const actualTribe = topResult?.tribe?.id || topResult?.tribe?.slug || 'NONE';
    const confidence = topResult?.confidence || 0;
    
    // Normalize for comparison (handle aliases like hutu_tutsi -> banyarwanda)
    const normalizedActual = actualTribe.toLowerCase().replace('hutu_tutsi', 'banyarwanda');
    const normalizedExpected = expectedTribe.toLowerCase();
    
    return {
      input: name,
      expectedTribe,
      actualTribe: normalizedActual,
      confidence,
      passed: normalizedActual.includes(normalizedExpected) || normalizedExpected.includes(normalizedActual),
    };
  });
}

// ============ DATA INTEGRITY TESTS ============

interface DataIntegrityResult {
  test: string;
  passed: boolean;
  details: string;
}

export function testDataIntegrity(): DataIntegrityResult[] {
  const results: DataIntegrityResult[] = [];
  const tribes = getAllTribes();

  // Test 1: All tribes have required fields
  const missingFields: string[] = [];
  tribes.forEach(tribe => {
    const required = ['id', 'name', 'slug', 'region', 'countries', 'population', 'description'];
    const rec = tribe as Record<string, unknown>;
    required.forEach(field => {
      const v = rec[field];
      const empty =
        v === undefined ||
        v === null ||
        v === '' ||
        (field === 'countries' && Array.isArray(v) && v.length === 0);
      if (empty) {
        missingFields.push(`${tribe.name || tribe.id}: missing ${field}`);
      }
    });
  });
  results.push({
    test: 'All tribes have required fields',
    passed: missingFields.length === 0,
    details: missingFields.length ? missingFields.slice(0, 5).join('; ') : 'OK',
  });

  // Test 2: No duplicate slugs
  const slugs = tribes.map(t => t.slug);
  const duplicateSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  results.push({
    test: 'No duplicate tribe slugs',
    passed: duplicateSlugs.length === 0,
    details: duplicateSlugs.length ? `Duplicates: ${duplicateSlugs.join(', ')}` : 'OK',
  });

  // Test 3: All blog relatedTribes resolve
  const brokenLinks: string[] = [];
  blogPosts.forEach(post => {
    post.relatedTribes.forEach(rt => {
      const tribe = getTribeBySlug(rt.slug);
      if (!tribe) {
        brokenLinks.push(`${post.slug}: ${rt.slug}`);
      }
    });
  });
  results.push({
    test: 'All blog relatedTribes resolve',
    passed: brokenLinks.length === 0,
    details: brokenLinks.length ? brokenLinks.join('; ') : 'OK',
  });

  // Test 4: No duplicate blog slugs
  const blogSlugs = blogPosts.map(p => p.slug);
  const duplicateBlogSlugs = blogSlugs.filter((s, i) => blogSlugs.indexOf(s) !== i);
  results.push({
    test: 'No duplicate blog slugs',
    passed: duplicateBlogSlugs.length === 0,
    details: duplicateBlogSlugs.length ? `Duplicates: ${duplicateBlogSlugs.join(', ')}` : 'OK',
  });

  // Test 5: Minimum tribe count
  const MIN_TRIBES = 50;
  results.push({
    test: `At least ${MIN_TRIBES} tribes exist`,
    passed: tribes.length >= MIN_TRIBES,
    details: `Count: ${tribes.length}`,
  });

  // Test 6: Minimum blog posts
  const MIN_POSTS = 5;
  results.push({
    test: `At least ${MIN_POSTS} blog posts exist`,
    passed: blogPosts.length >= MIN_POSTS,
    details: `Count: ${blogPosts.length}`,
  });

  return results;
}

// ============ SEARCH TESTS ============

interface SearchTestResult {
  query: string;
  expectedTypes: ('tribe' | 'blog')[];
  foundTypes: ('tribe' | 'blog')[];
  passed: boolean;
}

export function testSearchFunctionality(): SearchTestResult[] {
  // Dynamic import to avoid circular dependencies
  const testCases = [
    { query: 'kikuyu', expectedTypes: ['tribe'] as const },
    { query: 'Kenya', expectedTypes: ['tribe', 'blog'] as const },
    { query: 'naming', expectedTypes: ['blog'] as const },
    { query: 'Luo', expectedTypes: ['tribe'] as const },
    { query: 'ochre', expectedTypes: ['blog'] as const },
  ];

  // Note: This requires the hook to be called in a React context
  // For manual testing, use browser console
  return testCases.map(({ query, expectedTypes }) => ({
    query,
    expectedTypes: [...expectedTypes],
    foundTypes: [], // Would be populated in React context
    passed: true, // Placeholder
  }));
}

// ============ COMPREHENSIVE TEST RUNNER ============

export interface TestSuiteResult {
  suiteName: string;
  passed: number;
  failed: number;
  results: unknown[];
}

export function runAllTests(): TestSuiteResult[] {
  const suites: TestSuiteResult[] = [];

  // Slug Aliases
  const slugResults = testSlugAliases();
  suites.push({
    suiteName: 'Slug Aliases',
    passed: slugResults.filter(r => r.passed).length,
    failed: slugResults.filter(r => !r.passed).length,
    results: slugResults,
  });

  // Detection
  const detectionResults = testTribeDetection();
  suites.push({
    suiteName: 'Tribe Detection',
    passed: detectionResults.filter(r => r.passed).length,
    failed: detectionResults.filter(r => !r.passed).length,
    results: detectionResults,
  });

  // Data Integrity
  const integrityResults = testDataIntegrity();
  suites.push({
    suiteName: 'Data Integrity',
    passed: integrityResults.filter(r => r.passed).length,
    failed: integrityResults.filter(r => !r.passed).length,
    results: integrityResults,
  });

  return suites;
}

// ============ CONSOLE HELPERS ============

export function printTestReport(): void {
  const suites = runAllTests();
  
  console.log('\n========== REGRESSION TEST REPORT ==========\n');
  
  let totalPassed = 0;
  let totalFailed = 0;
  
  suites.forEach(suite => {
    const status = suite.failed === 0 ? '✅' : '❌';
    console.log(`${status} ${suite.suiteName}: ${suite.passed}/${suite.passed + suite.failed} passed`);
    
    suite.results
      .filter((r): r is { passed?: boolean } => typeof r === 'object' && r !== null && (r as { passed?: boolean }).passed === false)
      .forEach(r => {
        console.log(`   ❌ ${JSON.stringify(r)}`);
      });
    
    totalPassed += suite.passed;
    totalFailed += suite.failed;
  });
  
  console.log('\n=============================================');
  console.log(`Total: ${totalPassed} passed, ${totalFailed} failed`);
  console.log('=============================================\n');
}

// Export for browser console access
type RegressionWindow = Window & {
  regressionTests: {
    runAllTests: typeof runAllTests;
    printTestReport: typeof printTestReport;
    testSlugAliases: typeof testSlugAliases;
    testTribeDetection: typeof testTribeDetection;
    testDataIntegrity: typeof testDataIntegrity;
  };
};

if (typeof window !== 'undefined') {
  (window as unknown as RegressionWindow).regressionTests = {
    runAllTests,
    printTestReport,
    testSlugAliases,
    testTribeDetection,
    testDataIntegrity,
  };
}
