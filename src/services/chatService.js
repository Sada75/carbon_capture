import dataset from '../data/realCarbonCaptureDataset.json';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const isPlaceholderKey = !OPENAI_API_KEY || OPENAI_API_KEY === 'PASTE_YOUR_OPENAI_API_KEY_HERE';

function list(items, formatter) {
  return items.map(formatter).join('; ');
}

const compressedDatasetContext = `
You are the Carbon Intelligence Assistant for a carbon capture analytics dashboard.
Use this compressed dataset context as the primary source for dashboard-specific answers.

Sources loaded: ${dataset.sources.join(', ')}.
Dataset scale: ${dataset.summary.iea2026Projects} IEA 2026 projects, ${dataset.summary.iea2024Projects} IEA 2024 projects, ${dataset.summary.mapProjects} CCS map projects, ${dataset.summary.sequestrationFacilities} CO2 sequestration facilities, ${dataset.summary.estimatedCapacityMtPerYear} Mt CO2/year estimated capacity.

Project types from IEA 2026:
${list(dataset.technologyMetrics, (item) => `${item.name}: ${item.projectCount} projects, ${item.capacity} Mt CO2/year, ${item.adoption}% capacity share, ${item.operationalShare}% operational share`)}.

Reported CO2 sequestered by facilities:
${list(dataset.sequesteredTrend, (item) => `${item.year}: ${item.mt} Mt`)}.

Project status counts:
${list(dataset.statusCounts, (item) => `${item.name}: ${item.value}`)}.

Largest sector capacity groups:
${list(dataset.sectorCapacity, (item) => `${item.name}: ${item.capacity} Mt CO2/year`)}.

Answer conversationally and cite numbers from this context when relevant. If a question asks for something not covered by the dataset, say what is missing and offer a careful general explanation.
`.trim();

const fallbackResponse = `I am ready to use the OpenAI API, but the API key is not available to the Vite frontend.

Add \`VITE_OPENAI_API_KEY=...\` to your local \`.env\` file, then restart the dev server. Once that is set, I will answer using the imported CCUS dataset context and the conversation history.`;

function toApiMessages(messages) {
  const recentMessages = messages.slice(-10).map((message) => ({
    role: message.role === 'assistant' ? 'assistant' : 'user',
    content: message.content,
  }));

  return [
    {
      role: 'system',
      content: compressedDatasetContext,
    },
    ...recentMessages,
  ];
}

export async function sendChatMessage(messages) {
  if (isPlaceholderKey) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: fallbackResponse,
      createdAt: new Date().toISOString(),
    };
  }

  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: toApiMessages(messages),
      temperature: 0.35,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `OpenAI API request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content?.trim();

  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: content || 'I did not receive a usable response from the OpenAI API.',
    createdAt: new Date().toISOString(),
  };
}

export const chatConfig = {
  model: OPENAI_MODEL,
  hasApiKey: !isPlaceholderKey,
};
