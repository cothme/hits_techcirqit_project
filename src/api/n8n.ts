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
