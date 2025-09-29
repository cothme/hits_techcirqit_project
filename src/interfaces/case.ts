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

// Hot issue detail from AI agents (universal schema)
export interface HotIssueDetail {
  issueId: string;
  title: string;
  product?: string;
  status?: string;
  totalCaseCounts?: string;
  lastCaseReported?: string;
  rootCause?: string;
  latestUpdate?: string;
  dateReported?: string;
  link: string; // Required in universal schema
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
  hotIssueDetails?: HotIssueDetail[];
}
