// API functions for n8n workflow integration

export const getHotIssues = async () => {
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

  const data = await response.json();
  return data;
};

export const searchSimilarCases = async (query: string) => {
  const response = await fetch(
    import.meta.env.VITE_WEB_HOOK_SEARCH_CASE_TEST,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search similar cases");
  }

  const data = await response.json();
  return data;
};

export const triggerWorkflow = async (formData: {
  name: string;
  email: string;
}) => {
  const response = await fetch(
    "http://localhost:5678/webhook-test/7d76f27e-c585-4671-8970-589262901496",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();
  return data;
};
