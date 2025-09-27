import React from "react";
import type Case from "../interfaces/case";

interface CaseCardProps {
  case: Case;
  index?: number;
  showHotIssueAnalysis?: boolean;
}

const CaseCard: React.FC<CaseCardProps> = ({
  case: caseData,
  index,
  showHotIssueAnalysis = false
}) => {
  const getConfidenceColor = (score?: number) => {
    if (!score) return "bg-gray-300";
    if (score >= 0.8) return "bg-green-500";
    if (score >= 0.6) return "bg-yellow-500";
    if (score >= 0.4) return "bg-orange-500";
    return "bg-red-500";
  };

  const getConfidenceText = (score?: number) => {
    if (!score) return "Unknown";
    if (score >= 0.8) return "High Confidence";
    if (score >= 0.6) return "Medium Confidence";
    if (score >= 0.4) return "Low Confidence";
    return "Very Low Confidence";
  };

  const getCategoryBadgeColor = (category?: string) => {
    if (!category) return "badge-neutral";
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes("install")) return "badge-primary";
    if (lowerCategory.includes("using")) return "badge-secondary";
    if (lowerCategory.includes("sales")) return "badge-accent";
    return "badge-info";
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
      <div className="card-body p-6">
        {/* Header with Case ID and Index */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="badge badge-outline badge-lg font-mono">
              {caseData.caseId}
            </div>
            {index !== undefined && (
              <div className="badge badge-neutral">#{index + 1}</div>
            )}
          </div>

          {caseData.product && (
            <div className="badge badge-primary">
              📦 {caseData.product}
            </div>
          )}
        </div>

        {/* Case Title */}
        <h3 className="card-title text-lg mb-3 line-clamp-2">
          {caseData.caseTitle}
        </h3>

        {/* Activity Owner and Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caseData.activityOwner && (
            <div className="badge badge-ghost">
              👤 {caseData.activityOwner}
            </div>
          )}
          {caseData.problemCategory && (
            <div className={`badge ${getCategoryBadgeColor(caseData.problemCategory)}`}>
              🏷️ {caseData.problemCategory}
            </div>
          )}
        </div>

        {/* Problem Description */}
        <div className="mb-4">
          <div className="text-sm font-medium text-base-content/60 mb-2">
            Problem Description
          </div>
          <div className="bg-base-200 p-3 rounded-lg">
            <p className="text-sm line-clamp-3">{caseData.problemDescription}</p>
          </div>
        </div>

        {/* Root Cause and Solution (if available) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {caseData.rootCause && (
            <div>
              <div className="text-sm font-medium text-base-content/60 mb-1">
                Root Cause
              </div>
              <div className="text-sm bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
                {caseData.rootCause}
              </div>
            </div>
          )}

          {caseData.solutionThatWorked && (
            <div>
              <div className="text-sm font-medium text-base-content/60 mb-1">
                Solution That Worked
              </div>
              <div className="text-sm bg-green-100 dark:bg-green-900/30 p-2 rounded">
                {caseData.solutionThatWorked}
              </div>
            </div>
          )}
        </div>

        {/* Hot Issue Analysis Section */}
        {showHotIssueAnalysis && (caseData.likelyRelatedHotIssue || caseData.confidenceScore !== undefined) && (
          <div className="bg-base-200 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              🔥 Hot Issue Analysis
            </h4>

            {/* Related Hot Issue */}
            <div className="mb-3">
              <div className="text-xs font-medium text-base-content/60 mb-1">
                Related Hot Issue
              </div>
              <div className={`text-sm p-2 rounded ${
                caseData.likelyRelatedHotIssue && caseData.likelyRelatedHotIssue !== "NO"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                {caseData.likelyRelatedHotIssue === "NO" || !caseData.likelyRelatedHotIssue
                  ? "No related hot issue found"
                  : caseData.likelyRelatedHotIssue
                }
              </div>
            </div>

            {/* Confidence Score */}
            {caseData.confidenceScore !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-base-content/60">
                    Confidence Score
                  </span>
                  <span className="text-xs font-bold">
                    {(caseData.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-base-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getConfidenceColor(caseData.confidenceScore)}`}
                      style={{ width: `${(caseData.confidenceScore || 0) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">
                    {getConfidenceText(caseData.confidenceScore)}
                  </span>
                </div>
              </div>
            )}

            {/* Reasoning */}
            {caseData.reasoning && (
              <div>
                <div className="text-xs font-medium text-base-content/60 mb-1">
                  Analysis Reasoning
                </div>
                <div className="text-xs bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  {caseData.reasoning}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-sm">
            📋 View Full Case
          </button>
          {caseData.likelyRelatedHotIssue && caseData.likelyRelatedHotIssue !== "NO" && (
            <button className="btn btn-primary btn-sm">
              🔥 View Hot Issue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;