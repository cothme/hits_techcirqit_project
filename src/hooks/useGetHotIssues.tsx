import { useState, useEffect } from "react";
import type HotIssue from "../interfaces/hotIssue";

function normalizeKeys(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Convert spaces → camelCase
      let normalizedKey = key
        .replace(/\s+(\w)/g, (_, c) => c.toUpperCase()) // e.g. "Issue ID" → "IssueID"
        .replace(/^\w/, (c) => c.toLowerCase()); // lowercase first letter

      // Special case: handle ID consistently as "Id"
      normalizedKey = normalizedKey.replace(/ID$/, "Id");

      newObj[normalizedKey] = obj[key];
    }
  }
  return newObj;
}

export const useGetHotIssues = () => {
  const [hotIssues, setHotIssues] = useState<HotIssue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getHotIssues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        import.meta.env.VITE_WEB_HOOK_LIST_HOT_ISSUE_PROD,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hot issues");
      }

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error("Empty response from server");
      }

      let data: HotIssue[];
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Response text:", responseText);
        throw new Error("Invalid JSON response from server");
      }

      // Normalize keys for each issue and map into HotIssue
      const transformedData: HotIssue[] = data.map((issue) => {
        const normalized = normalizeKeys(issue);
        // console.log("Normalized issue keys:", Object.keys(normalized)); // 👀 check keys

        return {
          title: normalized.title || "",
          issueId: normalized.issueId || "", // maps from "Issue ID"
          caseOwners: normalized.caseOwners || "",
          product: normalized.product || "",
          totalCaseCounts: normalized.totalCaseCounts || 0,
          lastCaseReported: normalized.lastCaseReported || "N/A", // maps from "Last Case Reported"
          status: normalized.status || "",
          rootCause: normalized.rootCause || "",
          latestUpdate: normalized.latestUpdate || "",
          dateReported: normalized.dateReported || "",
          Link: normalized.link || normalized.Link || "",
        };
      });

      setHotIssues(transformedData);
    } catch (err) {
      console.error("Hot issues fetch error:", err);
      setError("Failed to load hot issues data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHotIssues();
  }, []);

  return { hotIssues, getHotIssues, isLoading, error };
};
