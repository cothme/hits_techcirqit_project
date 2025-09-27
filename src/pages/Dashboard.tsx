import { useState } from "react";
import { useSearchCase } from "../hooks/useSearchCase";
import { useGetHotIssues } from "../hooks/useGetHotIssues";
import SearchForm from "../components/SearchForm";
import HotIssuesGrid from "../components/HotIssuesGrid";
import HotIssuesTable from "../components/HotIssuesTable";
import SimilarCasesGrid from "../components/SimilarCasesGrid";
import HotIssueDetection from "../components/HotIssueDetection";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { searchCase, isLoading, aiResponse, hasSearched } = useSearchCase();
  const { hotIssues, isLoading: hotIssuesLoading, error } = useGetHotIssues();
  const [hotIssuesViewMode, setHotIssuesViewMode] = useState<"grid" | "table">("grid");

  const handleSearch = (query: string) => {
    searchCase({ query });
  };

  const handleViewModeChange = (mode: "grid" | "table") => {
    setHotIssuesViewMode(mode);
  };

  return (
    <>
      <div className="min-h-screen bg-base-200">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Search Results */}
        {hasSearched && (
          <div className="p-6 space-y-6">
            {isLoading ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <LoadingSpinner message="Analyzing cases and searching for hot issues..." />
                </div>
              </div>
            ) : (
              <>
                {/* Similar Cases Grid */}
                <SimilarCasesGrid data={aiResponse || []} />

                {/* Hot Issue Detection */}
                <HotIssueDetection />
              </>
            )}
          </div>
        )}

        {/* Hot Issues Display */}
        {hotIssuesViewMode === "grid" ? (
          <HotIssuesGrid
            hotIssues={hotIssues}
            isLoading={hotIssuesLoading}
            error={error}
            viewMode={hotIssuesViewMode}
            onViewModeChange={handleViewModeChange}
          />
        ) : (
          <div className="flex-1 p-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="card-title text-3xl text-content">
                      🔥 Current Hot Issues
                    </h2>
                    <div className="badge badge-accent badge-lg text-content">
                      {hotIssues.length} active
                    </div>
                  </div>
                  <div className="btn-group">
                    <button
                      className={`btn btn-sm ${hotIssuesViewMode === "grid" ? "btn-active" : ""}`}
                      onClick={() => handleViewModeChange("grid")}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Grid
                    </button>
                    <button
                      className={`btn btn-sm ${hotIssuesViewMode === "table" ? "btn-active" : ""}`}
                      onClick={() => handleViewModeChange("table")}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                      </svg>
                      Table
                    </button>
                  </div>
                </div>
                <HotIssuesTable
                  hotIssues={hotIssues}
                  isLoading={hotIssuesLoading}
                  error={error}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
