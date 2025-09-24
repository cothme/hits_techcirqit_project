import { useState } from "react";

interface SearchQuery {
  query: string;
}

export const useSearchCase = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any[]>([]);
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

      if (!response.ok) {
        setIsLoading(false);
        setError(data.error || "Something went wrong");
        return;
      }

      console.log("Case searched!", data[0].matches);
      setAiResponse(data[0].matches);
      setIsLoading(false);
    } catch {
      setError("Network error or server unavailable.");
      setIsLoading(false);
    }
  };

  return { searchCase, isLoading, error, aiResponse, hasSearched };
};
