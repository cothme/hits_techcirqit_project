import { useSearchCase } from "../hooks/useSearchCase";
import { useGetHotIssues } from "../hooks/useGetHotIssues";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import HotIssuesTable from "../components/HotIssuesTable";

const Dashboard = () => {
  const { searchCase, isLoading, aiResponse, hasSearched } = useSearchCase();
  const { hotIssues, isLoading: hotIssuesLoading, error } = useGetHotIssues();

  const handleSearch = (query: string) => {
    searchCase({ query });
  };

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        <SearchResults
          isLoading={isLoading}
          results={aiResponse}
          hasSearched={hasSearched}
        />

        <HotIssuesTable
          hotIssues={hotIssues}
          isLoading={hotIssuesLoading}
          error={error}
        />
      </div>
    </>
  );
};

export default Dashboard;
