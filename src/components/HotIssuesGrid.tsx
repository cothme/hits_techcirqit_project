import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import HotIssueCard from "./HotIssueCard";
import type HotIssue from "../interfaces/hotIssue";

interface HotIssuesGridProps {
  hotIssues: HotIssue[];
  isLoading: boolean;
  error: string | null;
  viewMode?: "grid" | "table";
  onViewModeChange?: (mode: "grid" | "table") => void;
}

const HotIssuesGrid: React.FC<HotIssuesGridProps> = ({
  hotIssues,
  isLoading,
  error,
  viewMode = "grid",
  onViewModeChange
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <LoadingSpinner message="Loading hot issues..." />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl text-content mb-6">
              🔥 Current Hot Issues
            </h2>
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header with title, count, and view mode toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <h2 className="card-title text-3xl text-content">
                🔥 Current Hot Issues
              </h2>
              <div className="badge badge-accent badge-lg text-content">
                {hotIssues.length} active
              </div>
            </div>

            {/* View Mode Toggle */}
            {onViewModeChange && (
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${viewMode === "grid" ? "btn-active" : ""}`}
                  onClick={() => onViewModeChange("grid")}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Grid
                </button>
                <button
                  className={`btn btn-sm ${viewMode === "table" ? "btn-active" : ""}`}
                  onClick={() => onViewModeChange("table")}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                  </svg>
                  Table
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {hotIssues.length === 0 ? (
            <EmptyState
              title="No Hot Issues Found"
              message="Great news! There are currently no active hot issues."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotIssues.map((issue, index) => (
                <HotIssueCard
                  key={`${issue.issueId}-${index}`}
                  hotIssue={issue}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotIssuesGrid;