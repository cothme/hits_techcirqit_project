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

      if (!response.ok) {
        setIsLoading(false);
        setError("Failed to get response from server");
        return;
      }

      const data = await response.json();
      console.log("Raw n8n response:", data);

      // Ensure data is in array format
      const processedData = Array.isArray(data) ? data : [data];
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
