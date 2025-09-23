import { useState } from "react";
import { useSearchCase } from "../hooks/useSearchCase";
import { useGetHotIssues } from "../hooks/useGetHotIssues";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const { searchCase, isLoading, aiResponse } = useSearchCase();
  const { hotIssues, isLoading: hotIssuesLoading, error } = useGetHotIssues();

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-xl">Hot Issue ba to?</legend>
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input focus:outline-none focus:ring-0"
              placeholder="Enter Case ID e.g, TM-1234567"
            />
            <button
              onClick={() => searchCase({ query: query })}
              disabled={isLoading}
              className="btn btn-neutral join-item"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </fieldset>

        {aiResponse && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Search Results</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    {Object.keys(aiResponse[0] || {}).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aiResponse.map((item: any, index: number) => (
                    <tr key={index}>
                      {Object.values(item).map((value: any, i: number) => (
                        <td key={i}>{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="flex-1 p-6">
          <div className="text-2xl font-semibold mb-4">Current Hot Issues</div>
          {/* <button onClick={handleSubmit} className="btn btn-success">
            Test
          </button> */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {hotIssuesLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra table-md w-full">
                <thead>
                  <tr>
                    <th>Issue ID</th>
                    <th>Title</th>
                    <th>Product</th>
                    <th>Case Owners</th>
                    <th>Total Cases</th>
                    <th>Last Reported</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hotIssues.map((issue, index) => (
                    <tr key={`${issue.issueId}-${index}`}>
                      <td>{issue.issueId}</td>
                      <td className="max-w-xs break-words" title={issue.title}>
                        {issue.title}
                      </td>
                      <td>{issue.product}</td>
                      <td>{issue.caseOwners}</td>
                      <td>{issue.totalCaseCounts}</td>
                      <td>{issue.lastCaseReported}</td>
                      <td>
                        <div className="badge badge-neutral">
                          {issue.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
