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

  const getPriorityColor = (totalCases: string | number) => {
    const count = typeof totalCases === 'string' ? parseInt(totalCases) : totalCases;
    if (count >= 10) return "border-l-red-500 bg-red-50";
    if (count >= 5) return "border-l-yellow-500 bg-yellow-50";
    return "border-l-green-500 bg-green-50";
  };

  return (
    <div className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${getPriorityColor(hotIssue.totalCaseCounts)}`}>
      <div className="card-body p-6">
        {/* Header with Issue ID and Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="badge badge-outline badge-lg font-mono">
              {hotIssue.issueId}
            </div>
            {index !== undefined && (
              <div className="badge badge-neutral">#{index + 1}</div>
            )}
          </div>
          <div className={`badge ${getStatusBadgeClass(hotIssue.status)} badge-lg`}>
            {hotIssue.status}
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title text-lg mb-3 line-clamp-2">
          {hotIssue.title}
        </h3>

        {/* Product and Case Count */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="badge badge-primary badge-lg">
            📦 {hotIssue.product}
          </div>
          <div className="badge badge-secondary badge-lg">
            📊 {hotIssue.totalCaseCounts} cases
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <div className="bg-base-200 p-3 rounded-lg">
              <p className="text-sm">{hotIssue.rootCause}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-sm">
            📋 View Details
          </button>
          <button className="btn btn-primary btn-sm">
            🔍 Related Cases
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotIssueCard;