const knowledgeBase = [
  {
    keywords: ['direct air capture', 'dac'],
    response:
      '**Direct Air Capture (DAC)** removes CO2 from ambient air using chemical sorbents or solvents. It is powerful because it can address legacy emissions, but expensive because air contains only about 0.04% CO2, so systems must move and process huge air volumes.',
  },
  {
    keywords: ['cost effective', 'lowest cost', 'cheap', 'affordable'],
    response:
      'For near-term deployment, **post-combustion capture** and **mineralization** often look more cost-effective than DAC because they work with concentrated streams or stable mineral reactions. The dashboard scores affordability, efficiency, and capacity together so you can compare tradeoffs.',
  },
  {
    keywords: ['future', 'potential', '2030', 'scale'],
    response:
      'The future is likely a portfolio: point-source capture for heavy industry, DAC for durable removals, BECCS where biomass is sustainable, and mineralization for long-lived storage. The winners will be technologies that combine low-carbon energy, credible measurement, and permanent storage.',
  },
  {
    keywords: ['why', 'expensive', 'dac'],
    response:
      'DAC is expensive because atmospheric CO2 is dilute, fans and contactors consume energy, sorbents need regeneration, and projects still lack manufacturing scale. Costs can fall with better materials, cheaper clean heat, modular production, and larger deployment.',
  },
  {
    keywords: ['beccs', 'bioenergy'],
    response:
      '**BECCS** means bioenergy with carbon capture and storage. Biomass absorbs CO2 while growing, then capture systems store the CO2 released during energy or fuel production. Its climate value depends heavily on sustainable feedstocks and land-use safeguards.',
  },
];

const fallback =
  'Carbon capture is a family of technologies, not a single machine. Ask me about DAC, BECCS, mineralization, costs, efficiency, adoption, or which pathway fits a specific industry.';

export async function sendChatMessage(message) {
  await new Promise((resolve) => setTimeout(resolve, 850));
  const normalized = message.toLowerCase();
  const match = knowledgeBase.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));

  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: match?.response ?? fallback,
    createdAt: new Date().toISOString(),
  };
}
