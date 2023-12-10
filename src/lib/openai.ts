import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });
    const result = await response.json();
    const embeddings = result.data[0].embedding;
    if (!embeddings) throw new Error("Embeddings not generated");
    return embeddings as number[];
  } catch (error) {
    console.log("Error calling OPENAI");
    throw error;
  }
};

export default openai;
