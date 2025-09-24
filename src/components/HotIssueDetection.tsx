import { useState, useEffect } from "react";

interface DetectedIssue {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  detectedAt: string;
  category: string;
  affectedUsers: number;
  description: string;
}

const HotIssueDetection = () => {
  const [detectedIssues, setDetectedIssues] = useState<DetectedIssue[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);

  const mockDetectedIssues: DetectedIssue[] = [
    {
      id: "DET-001",
      title: "Auto Renewal Configuration Error",
      severity: "critical",
      detectedAt: "2024-01-15 14:30:00",
      category: "Auto Renewal",
      affectedUsers: 1250,
      description: "Multiple users reporting auto renewal configuration failures causing billing issues"
    },
    {
      id: "DET-002",
      title: "Online Purchase Gateway Timeout",
      severity: "high",
      detectedAt: "2024-01-15 14:15:00",
      category: "Online Purchase",
      affectedUsers: 890,
      description: "Payment gateway experiencing timeouts during checkout process"
    },
    {
      id: "DET-003",
      title: "Marketing Promo Code Malfunction",
      severity: "medium",
      detectedAt: "2024-01-15 13:45:00",
      category: "Marketing Promo",
      affectedUsers: 340,
      description: "Promo codes not applying correctly during retail purchases"
    }
  ];

  useEffect(() => {
    const simulateDetection = () => {
      setIsDetecting(true);
      setTimeout(() => {
        setDetectedIssues(mockDetectedIssues);
        setIsDetecting(false);
      }, 2000);
    };

    simulateDetection();
    const interval = setInterval(simulateDetection, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "badge-error";
      case "high":
        return "badge-warning";
      case "medium":
        return "badge-info";
      default:
        return "badge-neutral";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return "🚨";
      case "high":
        return "⚠️";
      case "medium":
        return "📊";
      default:
        return "ℹ️";
    }
  };

  if (detectedIssues.length === 0 && !isDetecting) {
    return (
      <div className="p-6">
        <div className="card bg-base-100 shadow-xl border border-success">
          <div className="card-body text-center">
            <h2 className="card-title text-2xl text-success justify-center">
              ✅ No Hot Issues Detected
            </h2>
            <p className="text-base-content/70">
              All systems are running normally. Monitoring continues...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-xl border border-error">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h2 className="card-title text-3xl text-error">
              🔥 Hot Issues Detected
              <div className="badge badge-error badge-lg">
                {detectedIssues.length} active
              </div>
            </h2>
            {isDetecting && (
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <span className="loading loading-spinner loading-sm"></span>
                Scanning...
              </div>
            )}
          </div>

          <div className="space-y-4">
            {detectedIssues.map((issue) => (
              <div
                key={issue.id}
                className="alert border border-base-300 hover:border-error transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {getSeverityIcon(issue.severity)}
                      </span>
                      <div>
                        <h3 className="font-bold text-lg">{issue.title}</h3>
                        <p className="text-sm text-base-content/70">
                          ID: {issue.id} • Category: {issue.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`badge ${getSeverityBadge(
                          issue.severity
                        )} badge-lg font-bold uppercase`}
                      >
                        {issue.severity}
                      </div>
                      <p className="text-xs text-base-content/70 mt-1">
                        {issue.detectedAt}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{issue.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="stat-desc">
                        👥 {issue.affectedUsers.toLocaleString()} users affected
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-primary">
                        Investigate
                      </button>
                      <button className="btn btn-sm btn-outline">
                        Create Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="loading loading-pulse loading-sm text-error"></span>
                <span className="text-sm font-medium">Live Detection Active</span>
              </div>
              <button className="btn btn-sm btn-ghost">
                View Detection Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotIssueDetection;