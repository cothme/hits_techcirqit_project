import EmptyState from "./EmptyState";

interface HotIssueAnalysisProps {
  data: any[];
}

const HotIssueAnalysis = ({ data }: HotIssueAnalysisProps) => {
  const caseAnalysisData = data.filter(
    (item) => item && item.caseId && item.caseTitle
  );

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
                  <p className="text-sm text-base-content/70">
                    {item.likelyRelatedHotIssue || "No related hot issue found"}
                  </p>
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
