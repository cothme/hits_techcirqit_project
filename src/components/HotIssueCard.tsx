import React from "react";
import type HotIssue from "../interfaces/hotIssue";

interface HotIssueCardProps {
  hotIssue: HotIssue;
  index?: number;
}

const HotIssueCard: React.FC<HotIssueCardProps> = ({ hotIssue, index }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "badge-error";
      case "closed":
        return "badge-success";
      case "in progress":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div
      className={`card bg-base-200 shadow-lg shadow-black transition-all duration-500 text-white border-l-8 border-red-700`}
    >
      <div className="card-body p-6">
        {/* Header with Issue ID and Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="badge badge-outline badge-lg">
              {hotIssue.issueId}
            </div>
            {/* {index !== undefined && (
              <div className="badge badge-neutral">#{index + 1}</div>
            )} */}
          </div>
          <div
            className={`badge ${getStatusBadgeClass(hotIssue.status)} badge-lg`}
          >
            {hotIssue.status}
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title text-xl mb-3 line-clamp-2">
          {hotIssue.title}
        </h3>

        {/* Product and Case Count */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="badge bg-red-700 badge-lg">📦 {hotIssue.product}</div>
          <div className="badge bg-base-300 badge-lg">
            📊 {hotIssue.totalCaseCounts} cases
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-base-300 p-4">
          <div>
            <div className="text-sm font-medium text-base-content/60 mb-1">
              Case Owners
            </div>
            <div className="text-sm font-semibold">
              {hotIssue.caseOwners || "Unassigned"}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-base-content/60 mb-1">
              Last Reported
            </div>
            <div className="text-sm font-semibold">
              {hotIssue.lastCaseReported}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-base-content/60 mb-1">
              Date Reported
            </div>
            <div className="text-sm font-semibold">
              {hotIssue.dateReported || "N/A"}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-base-content/60 mb-1">
              Latest Update
            </div>
            <div className="text-sm font-semibold">
              {hotIssue.latestUpdate || "No updates"}
            </div>
          </div>
        </div>

        {/* Root Cause */}
        {hotIssue.rootCause && (
          <div className="mb-4">
            <div className="text-sm font-medium text-base-content/60 mb-2">
              Root Cause
            </div>
            <div className="bg-base-300 p-3 rounded-lg">
              <p className="text-sm">{hotIssue.rootCause}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        {hotIssue.Link && (
          <div className="card-actions justify-end mt-6">
            <a
              href={hotIssue.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default HotIssueCard;
