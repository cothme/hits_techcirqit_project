import { useState } from "react";
import { useSearchCase } from "../hooks/useSearchCase";
import { useGetHotIssues } from "../hooks/useGetHotIssues";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const { searchCase, isLoading, aiResponse, hasSearched } = useSearchCase();
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

        {hasSearched && (
          <div className="p-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                      <span className="loading loading-spinner loading-lg text-error"></span>
                      <p className="mt-4 text-base-content/70">
                        Searching for similar cases...
                      </p>
                    </div>
                  </div>
                ) : aiResponse.length > 0 ? (
                  <>
                    <h3 className="card-title text-2xl text-content mb-6">
                      🔍 Search Results
                      <div className="badge badge-secondary badge-lg">
                        {aiResponse.length}{" "}
                        {aiResponse.length === 1
                          ? "similar case"
                          : "similar cases"}
                      </div>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra table-lg">
                        <thead>
                          <tr className="bg-primary text-primary-content">
                            {Object.keys(aiResponse[0] || {}).map((key) => (
                              <th
                                key={key}
                                className="text-sm font-bold uppercase tracking-wide"
                              >
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {aiResponse.map((item: any, index: number) => (
                            <tr
                              key={index}
                              className="hover:bg-base-200 transition-colors duration-200"
                            >
                              {Object.values(item).map(
                                (value: any, i: number) => (
                                  <td key={i} className="py-3">
                                    <div className="flex items-center">
                                      <span className="text-sm font-medium">
                                        {String(value)}
                                      </span>
                                    </div>
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      <svg
                        className="mx-auto h-16 w-16 text-base-content/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.063M6.343 6.343A8 8 0 0112 4c4.411 0 8 3.589 8 8a7.951 7.951 0 01-2.343 5.657M6.343 6.343L19.657 19.657"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-base-content mb-2">
                      No Similar Cases Found
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      We couldn't find any cases similar to your search query.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 p-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl text-content mb-6">
                🔥 Current Hot Issues
                {!hotIssuesLoading && (
                  <div className="badge badge-error badge-lg text-content">
                    {hotIssues.length} active
                  </div>
                )}
              </h2>

              {error && (
                <div className="alert alert-error mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {hotIssuesLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <span className="loading loading-spinner text-error"></span>
                    <p className="mt-4 text-base-content/70">
                      Loading hot issues...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra table-lg">
                    <thead>
                      <tr className="bg-secondary text-secondary-content">
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Issue ID
                        </th>
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Title
                        </th>
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Product
                        </th>
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Case Owners
                        </th>
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Total Cases
                        </th>
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Last Reported
                        </th>
                        <th className="text-sm font-bold uppercase tracking-wide">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotIssues.map((issue, index) => (
                        <tr
                          key={`${issue.issueId}-${index}`}
                          className="hover:bg-base-200 transition-colors duration-200"
                        >
                          <td className="py-4">
                            <div className="font-mono text-sm bg-base-300 px-2 py-1 rounded">
                              {issue.issueId}
                            </div>
                          </td>
                          <td className="max-w-xs py-4">
                            <div className="tooltip" data-tip={issue.title}>
                              <p className="font-medium text-sm break-words line-clamp-2">
                                {issue.title}
                              </p>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="badge font-medium">
                              {issue.product}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-sm font-medium">
                              {issue.caseOwners}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className=" text-lg text-white">
                              {issue.totalCaseCounts}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-sm text-base-content/70">
                              {issue.lastCaseReported}
                            </span>
                          </td>
                          <td className="py-4">
                            <div
                              className={`text-sm font-medium ${
                                issue.status.toLowerCase() === "open"
                                  ? "badge-error"
                                  : issue.status.toLowerCase() === "closed"
                                  ? "badge-success"
                                  : issue.status.toLowerCase() === "in progress"
                                  ? "badge-warning"
                                  : "badge-neutral"
                              }`}
                            >
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
