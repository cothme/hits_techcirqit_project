import { useState } from "react";
import type { UniversalResponse } from "../interfaces/case";

interface SearchQuery {
  query: string;
}

export const useSearchCase = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<UniversalResponse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchCase = async (input: SearchQuery) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_WEB_HOOK_SEARCH_CASE_TEST,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      const data = await response.json();
      console.log("Raw n8n response:", data);

      if (!response.ok) {
        setIsLoading(false);
        setError(data.error || "Something went wrong");
        return;
      }

      // Handle the universal response format
      let processedData: UniversalResponse[] = [];

      if (Array.isArray(data)) {
        // Data is already in the expected array format
        processedData = data.map(item => ({
          caseId: item.caseId || "",
          caseTitle: item.caseTitle || input.query,
          likelyRelatedHotIssue: item.likelyRelatedHotIssue || "NO",
          reasoning: item.reasoning || "No reasoning provided",
          confidenceScore: item.confidenceScore || 0,
          matchCount: item.matchCount || 0,
          cases: item.cases || []
        }));
      } else if (data) {
        // Single object response - wrap in array
        processedData = [{
          caseId: data.caseId || "",
          caseTitle: data.caseTitle || input.query,
          likelyRelatedHotIssue: data.likelyRelatedHotIssue || "NO",
          reasoning: data.reasoning || "No reasoning provided",
          confidenceScore: data.confidenceScore || 0,
          matchCount: data.matchCount || 0,
          cases: data.cases || []
        }];
      }

      console.log("Processed universal response:", processedData);
      setAiResponse(processedData);
      setIsLoading(false);
    } catch (err) {
      console.error("Search error:", err);
      setError("Network error or server unavailable.");
      setIsLoading(false);
    }
  };

  return { searchCase, isLoading, error, aiResponse, hasSearched };
};
