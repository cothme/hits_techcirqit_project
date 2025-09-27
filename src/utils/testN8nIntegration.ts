// Test utilities for n8n integration
import { getHotIssues, searchSimilarCases } from '../api/n8n';

export const testHotIssuesEndpoint = async () => {
  try {
    console.log('🔥 Testing Hot Issues endpoint...');
    const hotIssues = await getHotIssues();
    console.log('✅ Hot Issues Response:', hotIssues);
    return { success: true, data: hotIssues };
  } catch (error) {
    console.error('❌ Hot Issues Error:', error);
    return { success: false, error: error.message };
  }
};

export const testSearchCasesEndpoint = async (testQuery: string = "installation problem") => {
  try {
    console.log('📋 Testing Search Cases endpoint with query:', testQuery);
    const searchResults = await searchSimilarCases(testQuery);
    console.log('✅ Search Cases Response:', searchResults);
    return { success: true, data: searchResults };
  } catch (error) {
    console.error('❌ Search Cases Error:', error);
    return { success: false, error: error.message };
  }
};

export const runAllTests = async () => {
  console.log('🚀 Starting n8n Integration Tests...');

  const hotIssuesTest = await testHotIssuesEndpoint();
  const searchCasesTest = await testSearchCasesEndpoint();

  console.log('\n📊 Test Results Summary:');
  console.log('Hot Issues:', hotIssuesTest.success ? '✅ PASS' : '❌ FAIL');
  console.log('Search Cases:', searchCasesTest.success ? '✅ PASS' : '❌ FAIL');

  return {
    hotIssues: hotIssuesTest,
    searchCases: searchCasesTest,
    allPassed: hotIssuesTest.success && searchCasesTest.success
  };
};

// Helper function to validate data structure from n8n
export const validateHotIssueStructure = (hotIssue: any) => {
  const requiredFields = ['title', 'issueId', 'product', 'status'];
  const missingFields = requiredFields.filter(field => !hotIssue[field]);

  if (missingFields.length > 0) {
    console.warn('⚠️ Hot Issue missing fields:', missingFields, hotIssue);
  }

  return missingFields.length === 0;
};

export const validateCaseStructure = (caseData: any) => {
  const requiredFields = ['caseId', 'caseTitle', 'problemDescription'];
  const missingFields = requiredFields.filter(field => !caseData[field]);

  if (missingFields.length > 0) {
    console.warn('⚠️ Case missing required fields:', missingFields, caseData);
  }

  return missingFields.length === 0;
};