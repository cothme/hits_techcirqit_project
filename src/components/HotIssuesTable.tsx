import LoadingSpinner from "./LoadingSpinner";
import type HotIssue from "../interfaces/hotIssue";

interface HotIssuesTableProps {
  hotIssues: HotIssue[];
  isLoading: boolean;
  error: string | null;
}

const HotIssuesTable = ({
  hotIssues,
  isLoading,
  error,
}: HotIssuesTableProps) => {
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
    <div className="flex-1 p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {error && (
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
          )}

          {isLoading ? (
            <LoadingSpinner message="Loading hot issues..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra table-lg">
                <thead>
                  <tr className="bg-base-300 text-secondary-content">
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Issue ID
                    </th>
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Title
                    </th>
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Product
                    </th>
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Case Owners
                    </th>
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Total Cases
                    </th>
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Last Reported
                    </th>
                    <th className="text-sm font-bold uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hotIssues.map((issue, index) => (
                    <tr
                      key={`${issue.issueId}-${index}`}
                      className="hover:bg-base-200 transition-colors duration-200"
                    >
                      <td className="py-4">
                        <div className="font-mono text-sm bg-base-300 px-2 py-1 rounded">
                          {issue.issueId}
                        </div>
                      </td>
                      <td className="max-w-xs py-4">
                        <div className="tooltip" data-tip={issue.title}>
                          <p className="font-medium text-sm break-words line-clamp-2">
                            {issue.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="badge font-medium">{issue.product}</div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm font-medium">
                          {issue.caseOwners}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-white">
                          {issue.totalCaseCounts}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-base-content/70">
                          {issue.lastCaseReported}
                        </span>
                      </td>
                      <td className="py-4">
                        <div
                          className={`text-sm font-medium ${getStatusBadgeClass(
                            issue.status
                          )}`}
                        >
                          {issue.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotIssuesTable;
