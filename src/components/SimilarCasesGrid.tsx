import React from "react";
import EmptyState from "./EmptyState";
import CaseCard from "./CaseCard";
import type Case from "../interfaces/case";

interface SimilarCasesGridProps {
  data: any[];
}

const SimilarCasesGrid: React.FC<SimilarCasesGridProps> = ({ data }) => {
  // Process and extract cases from the n8n workflow response
  const extractCases = (responseData: any[]): Case[] => {
    const cases: Case[] = [];

    responseData.forEach((item) => {
      if (item && item.matches && Array.isArray(item.matches)) {
        // Process matches array
        item.matches.forEach((match: any) => {
          if (match.caseId) {
            cases.push({
              caseId: match.caseId,
              caseTitle: match.caseTitle || "Untitled Case",
              activityOwner: match.activityOwner,
              product: match.product,
              problemDescription: match.problemDescription || "No description available",
              problemCategory: match.problemCategory,
              rootCause: match.rootCause,
              solutionThatWorked: match.solutionThatWorked,
              likelyRelatedHotIssue: match.likelyRelatedHotIssue,
              reasoning: match.reasoning,
              confidenceScore: match.confidenceScore
            });
          }
        });
      } else if (item && item.caseId) {
        // Direct case object
        cases.push({
          caseId: item.caseId,
          caseTitle: item.caseTitle || "Untitled Case",
          activityOwner: item.activityOwner,
          product: item.product,
          problemDescription: item.problemDescription || "No description available",
          problemCategory: item.problemCategory,
          rootCause: item.rootCause,
          solutionThatWorked: item.solutionThatWorked,
          likelyRelatedHotIssue: item.likelyRelatedHotIssue,
          reasoning: item.reasoning,
          confidenceScore: item.confidenceScore
        });
      }
    });

    return cases;
  };

  const cases = extractCases(data);
  const matchCount = data.find(item => item.matchCount !== undefined)?.matchCount || cases.length;

  if (cases.length === 0) {
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

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h3 className="card-title text-2xl text-content">
              📋 Similar Cases
            </h3>
            <div className="badge badge-secondary badge-lg">
              {matchCount} {matchCount === 1 ? "match" : "matches"}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex gap-2">
            <div className="badge badge-outline">
              {cases.filter(c => c.likelyRelatedHotIssue && c.likelyRelatedHotIssue !== "NO").length} related to hot issues
            </div>
            <div className="badge badge-outline">
              {cases.filter(c => c.solutionThatWorked).length} with solutions
            </div>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cases.map((caseData, index) => (
            <CaseCard
              key={`${caseData.caseId}-${index}`}
              case={caseData}
              index={index}
              showHotIssueAnalysis={true}
            />
          ))}
        </div>

        {/* Additional Analysis Section */}
        {cases.length > 0 && (
          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <h4 className="font-medium mb-3">📊 Analysis Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg text-primary">
                  {cases.filter(c => c.confidenceScore && c.confidenceScore >= 0.7).length}
                </div>
                <div className="text-base-content/60">High Confidence Matches</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-warning">
                  {cases.filter(c => c.likelyRelatedHotIssue && c.likelyRelatedHotIssue !== "NO").length}
                </div>
                <div className="text-base-content/60">Related to Hot Issues</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-success">
                  {cases.filter(c => c.solutionThatWorked && c.solutionThatWorked.trim()).length}
                </div>
                <div className="text-base-content/60">Have Known Solutions</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarCasesGrid;