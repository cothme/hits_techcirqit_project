import LoadingSpinner from "./LoadingSpinner";
import HotIssueAnalysis from "./HotIssueAnalysis";
import SimilarCases from "./SimilarCases";

interface SearchResultsProps {
  isLoading: boolean;
  results: any[];
  hasSearched: boolean;
}

const SearchResults = ({
  isLoading,
  results,
  hasSearched,
}: SearchResultsProps) => {
  if (!hasSearched) return null;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <LoadingSpinner message="Analyzing cases and searching for hot issues..." />
          </div>
        </div>
      </div>
    );
  }

  const safeResults = results || [];

  return (
    <div className="p-6 space-y-6">
      <HotIssueAnalysis data={safeResults} />
      <SimilarCases data={safeResults} />
    </div>
  );
};

export default SearchResults;
