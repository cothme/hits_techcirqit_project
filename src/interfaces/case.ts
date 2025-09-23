export default interface Case {
  caseId: string;
  caseTitle: string;
  personType: string;
  problemDescription: string;
  errorMessage: string;
  rootCause: string;
  troubleshootingSteps: string[];
  solutionThatWorked: string;
}
