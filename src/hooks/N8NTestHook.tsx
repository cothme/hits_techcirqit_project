import { triggerWorkflow } from "../api/n8n";

const handleSubmit = async () => {
  try {
    const result = await triggerWorkflow({
      name: "What is OpenAI, explain in short sentence",
      email: "john@example.com",
    });
    console.log("AI says:", result.result.aiMessage);
    console.log("Workflow triggered successfully:", result);
  } catch (err) {
    console.error("Failed to trigger workflow:", err);
  }
};

export default handleSubmit;
