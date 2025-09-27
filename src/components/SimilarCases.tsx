import EmptyState from "./EmptyState";

interface SimilarCasesProps {
  data: any[];
}

const SimilarCases = ({ data }: SimilarCasesProps) => {
  const matchResultsData = data.filter(
    (item) => item && (item.matchCount !== undefined || item.matches)
  );

  const genericData = data.filter(
    (item) =>
      item &&
      !item.caseId &&
      !item.caseTitle &&
      item.matchCount === undefined &&
      !item.matches
  );

  const hasMatchData = matchResultsData.length > 0;
  const hasGenericData = genericData.length > 0;

  if (!hasMatchData && !hasGenericData) {
    return (
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="card-title text-2xl text-content mb-4">
            📋 Similar Cases
          </h3>
          <EmptyState
            title="No Similar Cases Found"
            message="We couldn't find any cases similar to your search query."
          />
        </div>
      </div>
    );
  }

  const renderMatchResults = (item: any, index: number) => (
    <div key={index} className="card bg-base-200 mb-4">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h4 className="card-title text-lg">Match Results</h4>
          <div className="badge badge-primary">{item.matchCount} matches</div>
        </div>

        {item.matches && item.matches.length > 0 && (
          <div className="space-y-2">
            {item.matches.map((match: any, matchIndex: number) => (
              <div key={matchIndex} className="bg-base-100 p-3 rounded-lg">
                {typeof match === "object" ? (
                  <div className="space-y-1">
                    {Object.entries(match).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <span className="font-medium text-sm min-w-fit">
                          {key}:
                        </span>
                        <span className="text-sm text-base-content/70">
                          {JSON.stringify(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm">{match}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderGenericTable = (data: any[]) => (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-lg">
        <thead>
          <tr className="bg-primary text-primary-content">
            {Object.keys(data[0] || {}).map((key) => (
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
          {data.map((item: any, index: number) => (
            <tr
              key={index}
              className="hover:bg-base-200 transition-colors duration-200"
            >
              {Object.values(item).map((value: any, i: number) => (
                <td key={i} className="py-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{String(value)}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title text-2xl text-content mb-6">
          📋 Similar Cases
          <div className="badge badge-secondary badge-lg">
            {matchResultsData.length + genericData.length}{" "}
            {matchResultsData.length + genericData.length === 1
              ? "result"
              : "results"}
          </div>
        </h3>

        <div className="space-y-4">
          {matchResultsData.map((item, index) =>
            renderMatchResults(item, index)
          )}
          {hasGenericData && renderGenericTable(genericData)}
        </div>
      </div>
    </div>
  );
};

export default SimilarCases;