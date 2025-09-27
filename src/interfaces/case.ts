export default interface Case {
  caseId: string;
  caseTitle: string;
  activityOwner?: string;
  product?: string;
  problemDescription: string;
  problemCategory?: string;
  rootCause?: string;
  solutionThatWorked?: string;
  likelyRelatedHotIssue?: string;
  reasoning?: string;
  confidenceScore?: number;
}
