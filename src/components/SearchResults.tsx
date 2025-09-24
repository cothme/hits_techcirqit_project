import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

interface SearchResultsProps {
  isLoading: boolean;
  results: any[];
  hasSearched: boolean;
}

const SearchResults = ({ isLoading, results, hasSearched }: SearchResultsProps) => {
  if (!hasSearched) return null;

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {isLoading ? (
            <LoadingSpinner message="Searching for similar cases..." />
          ) : results.length > 0 ? (
            <>
              <h3 className="card-title text-2xl text-content mb-6">
                🔍 Search Results
                <div className="badge badge-secondary badge-lg">
                  {results.length}{" "}
                  {results.length === 1 ? "similar case" : "similar cases"}
                </div>
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra table-lg">
                  <thead>
                    <tr className="bg-primary text-primary-content">
                      {Object.keys(results[0] || {}).map((key) => (
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
                    {results.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-base-200 transition-colors duration-200"
                      >
                        {Object.values(item).map((value: any, i: number) => (
                          <td key={i} className="py-3">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {String(value)}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <EmptyState
              title="No Similar Cases Found"
              message="We couldn't find any cases similar to your search query."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;