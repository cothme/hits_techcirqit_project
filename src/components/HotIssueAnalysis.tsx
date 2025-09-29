import EmptyState from "./EmptyState";
import { useGetHotIssues } from "../hooks/useGetHotIssues";

interface HotIssueAnalysisProps {
  data: any[];
}

const HotIssueAnalysis = ({ data }: HotIssueAnalysisProps) => {
  const { hotIssues } = useGetHotIssues();

  const caseAnalysisData = data.filter(
    (item) => item && item.caseId && item.caseTitle
  );

  const getHotIssueLink = (item: any): string | null => {
    // First, check if hotIssueDetails is available in the response
    if (item.hotIssueDetails && item.hotIssueDetails.length > 0) {
      const hotIssueDetail = item.hotIssueDetails[0];
      return hotIssueDetail.link || null;
    }

    // Fallback to parsing from likelyRelatedHotIssue text
    const relatedHotIssue = item.likelyRelatedHotIssue;
    if (
      !relatedHotIssue ||
      relatedHotIssue.toLowerCase() === "no" ||
      relatedHotIssue.toLowerCase() === "no related hot issue found"
    ) {
      return null;
    }

    // Parse the issue ID from the format "ISSUE-ID — Hot issue title"
    const issueIdMatch = relatedHotIssue.match(/^([A-Z]+-\d+|[A-Z]+\d+)/i);

    if (issueIdMatch) {
      const issueId = issueIdMatch[1];

      // Find the hot issue by ID
      const matchedIssue = hotIssues.find(
        (issue) => issue.issueId?.toLowerCase() === issueId.toLowerCase()
      );

      if (matchedIssue?.Link) {
        return matchedIssue.Link;
      }
    }

    return null;
  };

  if (caseAnalysisData.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="card-title text-2xl text-content mb-4">
            🔥 Hot Issue Analysis
          </h3>
          <EmptyState
            title="No Hot Issue Analysis Available"
            message="No hot issue analysis was found for your search query."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title text-2xl text-content mb-6">
          🔥 Hot Issue Analysis
          <div className="badge badge-accent badge-lg">
            {caseAnalysisData.length}{" "}
            {caseAnalysisData.length === 1 ? "analysis" : "analyses"}
          </div>
        </h3>

        <div className="space-y-4">
          {caseAnalysisData.map((item: any, index: number) => (
            <div key={index} className="card bg-base-200">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="card-title text-lg">{item.caseTitle}</h4>
                  <div className="badge badge-outline">ID: {item.caseId}</div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">
                      Confidence Score:
                    </span>
                    <div className="flex-1 bg-base-300 rounded-full h-2 max-w-xs">
                      <div
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(item.confidenceScore || 0) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold">
                      {((item.confidenceScore || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-sm mb-2">
                    Related Hot Issues:
                  </h5>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-base-content/70">
                      {item.likelyRelatedHotIssue ||
                        "No related hot issue found"}
                    </p>
                    {item.likelyRelatedHotIssue &&
                      item.likelyRelatedHotIssue.toLowerCase() !== "no" &&
                      getHotIssueLink(item) && (
                        <a
                          href={getHotIssueLink(item)!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
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
                      )}
                  </div>
                </div>

                {item.reasoning && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">
                      Analysis Reasoning:
                    </h5>
                    <p className="text-sm text-base-content/70">
                      {item.reasoning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotIssueAnalysis;
