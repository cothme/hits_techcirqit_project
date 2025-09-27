import React, { useState } from 'react';
import { runAllTests, testHotIssuesEndpoint, testSearchCasesEndpoint } from '../utils/testN8nIntegration';

const TestIntegration: React.FC = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testQuery, setTestQuery] = useState('installation problem');

  const runTests = async () => {
    setIsRunning(true);
    try {
      const results = await runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const testHotIssues = async () => {
    setIsRunning(true);
    try {
      const result = await testHotIssuesEndpoint();
      setTestResults({ hotIssues: result });
    } catch (error) {
      console.error('Hot issues test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const testSearchCases = async () => {
    setIsRunning(true);
    try {
      const result = await testSearchCasesEndpoint(testQuery);
      setTestResults({ searchCases: result });
    } catch (error) {
      console.error('Search cases test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl m-6">
      <div className="card-body">
        <h2 className="card-title text-2xl">🧪 n8n Integration Testing</h2>

        <div className="space-y-4">
          {/* Test Controls */}
          <div className="flex flex-wrap gap-4">
            <button
              className={`btn btn-primary ${isRunning ? 'loading' : ''}`}
              onClick={runTests}
              disabled={isRunning}
            >
              Run All Tests
            </button>

            <button
              className={`btn btn-secondary ${isRunning ? 'loading' : ''}`}
              onClick={testHotIssues}
              disabled={isRunning}
            >
              Test Hot Issues
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered input-sm"
                placeholder="Search query..."
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
              />
              <button
                className={`btn btn-accent btn-sm ${isRunning ? 'loading' : ''}`}
                onClick={testSearchCases}
                disabled={isRunning}
              >
                Test Search
              </button>
            </div>
          </div>

          {/* Environment Info */}
          <div className="alert alert-info">
            <div>
              <h3 className="font-bold">Environment Information</h3>
              <div className="text-sm mt-2">
                <p>🔥 Hot Issues URL: {import.meta.env.VITE_WEB_HOOK_LIST_HOT_ISSUE_PROD}</p>
                <p>📋 Search Cases URL: {import.meta.env.VITE_WEB_HOOK_SEARCH_CASE_TEST}</p>
              </div>
            </div>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Test Results:</h3>

              {testResults.hotIssues && (
                <div className={`alert ${testResults.hotIssues.success ? 'alert-success' : 'alert-error'}`}>
                  <div>
                    <h4 className="font-bold">🔥 Hot Issues Test</h4>
                    <p>{testResults.hotIssues.success ? '✅ Success' : '❌ Failed'}</p>
                    {testResults.hotIssues.error && (
                      <p className="text-sm">Error: {testResults.hotIssues.error}</p>
                    )}
                    {testResults.hotIssues.data && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm">View Response Data</summary>
                        <pre className="text-xs mt-2 bg-base-200 p-2 rounded overflow-auto max-h-40">
                          {JSON.stringify(testResults.hotIssues.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {testResults.searchCases && (
                <div className={`alert ${testResults.searchCases.success ? 'alert-success' : 'alert-error'}`}>
                  <div>
                    <h4 className="font-bold">📋 Search Cases Test</h4>
                    <p>{testResults.searchCases.success ? '✅ Success' : '❌ Failed'}</p>
                    {testResults.searchCases.error && (
                      <p className="text-sm">Error: {testResults.searchCases.error}</p>
                    )}
                    {testResults.searchCases.data && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm">View Response Data</summary>
                        <pre className="text-xs mt-2 bg-base-200 p-2 rounded overflow-auto max-h-40">
                          {JSON.stringify(testResults.searchCases.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {testResults.allPassed !== undefined && (
                <div className={`alert ${testResults.allPassed ? 'alert-success' : 'alert-warning'}`}>
                  <div>
                    <h4 className="font-bold">📊 Overall Status</h4>
                    <p>{testResults.allPassed ? '🎉 All tests passed!' : '⚠️ Some tests failed'}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestIntegration;