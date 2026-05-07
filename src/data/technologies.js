import {
  Anchor,
  Atom,
  Factory,
  Flame,
  Leaf,
  Mountain,
  Wind,
  Zap,
} from 'lucide-react';

export const technologies = [
  {
    id: 'post-combustion',
    name: 'Post-Combustion Capture',
    icon: Factory,
    short:
      'Captures CO2 from flue gas after fossil fuels are burned, making it adaptable to existing power and industrial facilities.',
    efficiency: 88,
    cost: 68,
    scalability: 'High',
    energyUsage: 'Medium-high',
    capacity: 72,
    adoption: 38,
    color: '#34d5ff',
    gradient: 'from-cyan-400/25 via-blue-500/15 to-transparent',
    howItWorks:
      'Flue gas passes through solvent or sorbent systems that selectively bind CO2. The captured CO2 is then regenerated, compressed, transported, and stored underground or used in industrial processes.',
    advantages: [
      'Can retrofit many existing point-source emitters',
      'Mature solvent chemistry and operational experience',
      'Strong fit for cement, steel, refining, and power plants',
    ],
    challenges: [
      'Energy penalty from solvent regeneration',
      'Requires compression, transport, and storage infrastructure',
      'Lower value for dispersed or low-concentration emissions',
    ],
    applications: ['Coal and gas power plants', 'Cement kilns', 'Refineries', 'Waste-to-energy plants'],
    adoptionText:
      'Post-combustion capture remains one of the most bankable near-term routes because it can be added to existing industrial sites.',
    future:
      'Advanced solvents, solid sorbents, modular capture units, and heat integration could reduce costs and make retrofits easier.',
  },
  {
    id: 'pre-combustion',
    name: 'Pre-Combustion Capture',
    icon: Flame,
    short:
      'Converts fuel into synthesis gas, separates CO2 before combustion, and burns hydrogen-rich fuel for lower direct emissions.',
    efficiency: 91,
    cost: 76,
    scalability: 'Medium',
    energyUsage: 'Medium',
    capacity: 66,
    adoption: 24,
    color: '#4f7dff',
    gradient: 'from-blue-400/25 via-indigo-500/15 to-transparent',
    howItWorks:
      'Fuel is gasified or reformed into hydrogen and carbon monoxide. A water-gas shift reaction converts carbon monoxide into CO2, which is separated before the hydrogen-rich stream is combusted.',
    advantages: [
      'High CO2 concentration improves separation performance',
      'Pairs naturally with hydrogen production',
      'Useful for integrated gasification and industrial hubs',
    ],
    challenges: [
      'Best suited to new-build or major retrofit assets',
      'High capital cost and plant complexity',
      'Requires careful hydrogen handling and infrastructure',
    ],
    applications: ['Hydrogen plants', 'Gasification facilities', 'Chemical production', 'Power generation'],
    adoptionText:
      'Adoption is strongest where hydrogen, chemicals, and high-purity CO2 streams already exist.',
    future:
      'Low-carbon hydrogen demand could make pre-combustion systems more strategic in regional industrial clusters.',
  },
  {
    id: 'direct-air-capture',
    name: 'Direct Air Capture (DAC)',
    icon: Wind,
    short:
      'Pulls CO2 directly from ambient air using engineered contactors, enabling removal independent of emission source location.',
    efficiency: 74,
    cost: 285,
    scalability: 'Emerging',
    energyUsage: 'High',
    capacity: 46,
    adoption: 14,
    color: '#5dffc7',
    gradient: 'from-emerald-300/25 via-cyan-400/15 to-transparent',
    howItWorks:
      'Large fans move air across chemical sorbents or solvents. Once saturated, the material is heated or pressure-cycled to release concentrated CO2 for storage or utilization.',
    advantages: [
      'Can remove legacy atmospheric CO2',
      'Flexible siting near clean power and storage resources',
      'Clear accounting pathway for durable carbon removal',
    ],
    challenges: [
      'Low atmospheric CO2 concentration drives high energy demand',
      'Costs remain high compared with point-source capture',
      'Needs abundant clean energy and durable storage',
    ],
    applications: ['Carbon removal credits', 'Synthetic fuels', 'Geologic storage', 'Remote clean-energy hubs'],
    adoptionText:
      'DAC is early but accelerating through large procurement contracts, demonstration plants, and government incentives.',
    future:
      'Scale manufacturing, better sorbents, heat recovery, and cheaper renewable energy are the main levers for cost decline.',
  },
  {
    id: 'beccs',
    name: 'BECCS',
    icon: Leaf,
    short:
      'Combines bioenergy with carbon capture so biomass absorbs CO2 while growing and emissions are captured during conversion.',
    efficiency: 82,
    cost: 118,
    scalability: 'Medium',
    energyUsage: 'Medium',
    capacity: 78,
    adoption: 18,
    color: '#47d16c',
    gradient: 'from-green-400/25 via-lime-300/10 to-transparent',
    howItWorks:
      'Biomass absorbs CO2 through photosynthesis. When converted into power, heat, fuels, or products, the resulting CO2 stream is captured and stored.',
    advantages: [
      'Can generate energy while delivering net-negative emissions',
      'Uses familiar biomass conversion infrastructure',
      'Potentially strong fit for pulp, paper, ethanol, and waste biomass',
    ],
    challenges: [
      'Land, water, biodiversity, and feedstock sustainability constraints',
      'Supply-chain emissions can erode climate benefit',
      'Requires robust monitoring and durable storage',
    ],
    applications: ['Bioenergy plants', 'Ethanol facilities', 'District heat', 'Biomass gasification'],
    adoptionText:
      'BECCS is most plausible where sustainable biomass residues and concentrated CO2 streams are already available.',
    future:
      'Its role will depend on strict sustainability rules and careful deployment in regions with genuine residue resources.',
  },
  {
    id: 'ocean-removal',
    name: 'Ocean-based Carbon Removal',
    icon: Anchor,
    short:
      'Enhances the ocean carbon cycle through alkalinity, biomass, electrochemistry, or managed marine ecosystems.',
    efficiency: 69,
    cost: 160,
    scalability: 'Experimental',
    energyUsage: 'Variable',
    capacity: 84,
    adoption: 8,
    color: '#29b6f6',
    gradient: 'from-sky-400/25 via-teal-400/12 to-transparent',
    howItWorks:
      'Approaches include increasing ocean alkalinity, capturing CO2 from seawater, cultivating biomass, or restoring blue-carbon ecosystems that store carbon in sediments.',
    advantages: [
      'Oceans hold enormous theoretical carbon storage potential',
      'Some methods can counter ocean acidification locally',
      'May pair with coastal industry and renewable energy',
    ],
    challenges: [
      'Measurement, verification, and ecological risks remain unresolved',
      'Governance for marine interventions is complex',
      'Many pathways are still pre-commercial',
    ],
    applications: ['Coastal removal projects', 'Alkalinity enhancement', 'Seawater electrochemistry', 'Blue carbon'],
    adoptionText:
      'Most ocean removal is still in pilot or research phases with careful attention to monitoring and ecological safeguards.',
    future:
      'Better sensing, environmental models, and governance will determine whether ocean removal can scale responsibly.',
  },
  {
    id: 'mineralization',
    name: 'Mineralization / Carbon Mineral Storage',
    icon: Mountain,
    short:
      'Turns CO2 into stable carbonate minerals through reactions with rocks, mine tailings, concrete, or alkaline industrial waste.',
    efficiency: 86,
    cost: 92,
    scalability: 'High potential',
    energyUsage: 'Low-medium',
    capacity: 88,
    adoption: 21,
    color: '#d5ff6a',
    gradient: 'from-lime-300/25 via-emerald-300/12 to-transparent',
    howItWorks:
      'CO2 reacts with calcium- or magnesium-rich materials to form solid carbonates. This can occur underground in basalt formations or above ground in construction materials and waste streams.',
    advantages: [
      'Highly durable storage with low reversal risk',
      'Can use mine tailings and industrial residues',
      'Potential to improve concrete and construction material footprints',
    ],
    challenges: [
      'Reaction rates and material handling can limit throughput',
      'Site-specific geology and feedstock access matter',
      'Monitoring and logistics must be designed carefully',
    ],
    applications: ['Basalt storage', 'Concrete curing', 'Mine tailings', 'Industrial waste treatment'],
    adoptionText:
      'Mineralization is gaining attention because storage permanence is intuitive and geologically durable.',
    future:
      'Automation, better reactors, and integration with mining and cement could unlock large-scale deployment.',
  },
];

export const emissionSources = [
  { name: 'Power Plants', value: 31, icon: Zap, copy: 'Grid power remains a major point-source opportunity.' },
  { name: 'Transportation', value: 22, icon: Wind, copy: 'Dispersed emissions increase the need for low-carbon fuels.' },
  { name: 'Industry', value: 27, icon: Factory, copy: 'Cement, steel, and chemicals are difficult to electrify fully.' },
  { name: 'Deforestation', value: 11, icon: Leaf, copy: 'Land-use change weakens natural carbon sinks.' },
];

export const technologyById = Object.fromEntries(technologies.map((tech) => [tech.id, tech]));
