import React from "react";
import EmptyState from "./EmptyState";
import CaseCard from "./CaseCard";
import { useGetHotIssues } from "../hooks/useGetHotIssues";
import type { UniversalResponse } from "../interfaces/case";

interface UniversalSearchResultsProps {
  data: UniversalResponse[];
  isLoading: boolean;
  hasSearched: boolean;
}

const UniversalSearchResults: React.FC<UniversalSearchResultsProps> = ({
  data,
  isLoading,
  hasSearched,
}) => {
  const { hotIssues } = useGetHotIssues();

  const getHotIssueLink = (response: UniversalResponse): string | null => {
    // First, check if hotIssueDetails is available in the response
    if (response.hotIssueDetails && response.hotIssueDetails.length > 0) {
      const hotIssueDetail = response.hotIssueDetails[0];
      return hotIssueDetail.link || null;
    }

    // Fallback to parsing from likelyRelatedHotIssue text
    const relatedHotIssue = response.likelyRelatedHotIssue;
    if (
      !relatedHotIssue ||
      relatedHotIssue.toLowerCase() === "no" ||
      relatedHotIssue.toLowerCase() === "no related hot issue found"
    ) {
      return null;
    }

    // Parse the issue ID from the format "ISSUE-ID — Hot issue title"
    const issueIdMatch = relatedHotIssue.match(/^([A-Z]+-\d+|[A-Z]+\d+)/i);

    if (issueIdMatch) {
      const issueId = issueIdMatch[1];

      // Find the hot issue by ID
      const matchedIssue = hotIssues.find(
        (issue) => issue.issueId?.toLowerCase() === issueId.toLowerCase()
      );

      if (matchedIssue?.Link) {
        return matchedIssue.Link;
      }
    }

    return null;
  };
  if (!hasSearched) return null;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
              <span className="ml-4">
                Analyzing cases and searching for hot issues...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <EmptyState
              title="No Results Found"
              message="No analysis results were returned for your search query."
            />
          </div>
        </div>
      </div>
    );
  }

  const response = data[0]; // Get the first (and typically only) response
  const hasHotIssueRelation = response.likelyRelatedHotIssue !== "NO";
  const hasCases = response.cases && response.cases.length > 0;

  return (
    <div className="p-6 space-y-6">
      {/* Analysis Summary Card */}
      <div className="bg-base-200 border-1 border-gray-500 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-start mb-6">
            <h3 className="card-title text-2xl text-content">
              🔍 Search Analysis
            </h3>
            <div className="flex gap-2">
              <div className="badge badge-error badge-lg">
                {response.matchCount} matches
              </div>
              <div
                className={`badge badge-lg ${
                  hasHotIssueRelation ? "badge-error" : "badge-success"
                }`}
              >
                {hasHotIssueRelation ? "Hot Issue Related" : "No Hot Issue"}
              </div>
            </div>
          </div>

          {/* Query Analysis */}
          <div className="p-8 rounded-lg mb-4 bg-base-300">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-lg">
                Query: "{response.caseTitle}"
              </h4>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Confidence:</span>
                <div className="flex-1 bg-white rounded-full h-2 w-32">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      response.confidenceScore >= 0.7
                        ? "bg-green-500"
                        : response.confidenceScore >= 0.4
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${response.confidenceScore * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold">
                  {(response.confidenceScore * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Hot Issue Relation */}
            <div className="mb-3">
              <div className="text-sm font-medium text-base-content/60 mb-1">
                Related Hot Issue
              </div>
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`text-sm p-2 rounded flex-1 ${
                    hasHotIssueRelation
                      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                      : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                  }`}
                >
                  {hasHotIssueRelation
                    ? response.likelyRelatedHotIssue
                    : "No related hot issue found"}
                </div>
                {hasHotIssueRelation &&
                  response.likelyRelatedHotIssue.toLowerCase() !== "no" &&
                  getHotIssueLink(response) && (
                    <a
                      href={getHotIssueLink(response)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View Issue
                    </a>
                  )}
              </div>
            </div>

            {/* Reasoning */}
            <div>
              <div className="text-sm font-medium text-base-content/60 mb-1">
                Analysis Reasoning
              </div>
              <div className="text-sm text-content bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
                {response.reasoning}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-base-200 rounded-lg bg-base-300">
              <div className="font-bold text-lg text-primary">
                {response.matchCount}
              </div>
              <div className="text-sm text-base-content/60">Total Matches</div>
            </div>
            <div className="text-center p-3 bg-base-300 rounded-lg">
              <div className="font-bold text-lg text-secondary">
                {hasCases ? response.cases.length : 0}
              </div>
              <div className="text-sm text-base-content/60">Similar Cases</div>
            </div>
            <div className="text-center p-3 bg-base-300 rounded-lg">
              <div
                className={`font-bold text-lg ${
                  response.confidenceScore >= 0.7
                    ? "text-success"
                    : response.confidenceScore >= 0.4
                    ? "text-warning"
                    : "text-error"
                }`}
              >
                {response.confidenceScore >= 0.7
                  ? "High"
                  : response.confidenceScore >= 0.4
                  ? "Medium"
                  : "Low"}
              </div>
              <div className="text-sm text-base-content/60">Confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Cases Section */}
      {hasCases && (
        <div className="bg-base-200 shadow-xl border-1 border-gray-400">
          <div className="card-body">
            <div className="flex justify-between items-start mb-6">
              <h3 className="card-title text-xl text-content">
                📋 Similar Cases
              </h3>
              <div className="badge badge-secondary badge-lg">
                {response.cases.length}{" "}
                {response.cases.length === 1 ? "case" : "cases"}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {response.cases.map((caseData, index) => (
                <CaseCard
                  key={`${caseData.caseId}-${index}`}
                  case={caseData}
                  index={index}
                  showHotIssueAnalysis={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Cases Found */}
      {!hasCases && response.matchCount === 0 && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <EmptyState
              title="No Similar Cases Found"
              message="No similar cases were found for your search query, but the analysis above provides insights about potential hot issue relations."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalSearchResults;
