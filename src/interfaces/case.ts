export default interface Case {
  caseId: string;
  caseTitle: string;
  activityOwner?: string;
  product?: string;
  problemDescription?: string;
  problemCategory?: string;
  rootCause?: string;
  solutionThatWorked?: string;
  likelyRelatedHotIssue?: string;
  reasoning?: string;
  confidenceScore?: number;
}

// Universal response format from n8n workflow
export interface UniversalResponse {
  caseId: string;
  caseTitle: string;
  likelyRelatedHotIssue: string;
  reasoning: string;
  confidenceScore: number;
  matchCount: number;
  cases: Case[];
}
