import { technologies } from './technologies';
import dataset from './carbonCaptureDataset.json';

export const co2Trend = dataset.co2Trend;
export const captureGrowth = dataset.captureGrowth;
export const regionalAdoption = dataset.regionalAdoption;

export const marketShare = technologies.map((tech) => ({
  name: tech.name,
  value: tech.adoption,
  color: tech.color,
}));

export const technologyMetrics = technologies.map((tech) => ({
  id: tech.id,
  name: tech.name,
  efficiency: tech.efficiency,
  cost: tech.cost,
  scalability: tech.scalability,
  capacity: tech.capacity,
  adoption: tech.adoption,
  energyUsage: tech.energyUsage,
  score: Math.round(0.4 * tech.efficiency - 0.3 * tech.cost + 0.3 * tech.capacity),
}));

export const radarData = technologies.map((tech) => ({
  subject: tech.name.replace(' Capture', '').replace(' / Carbon Mineral Storage', ''),
  efficiency: tech.efficiency,
  affordability: Math.max(0, 100 - tech.cost / 3),
  capacity: tech.capacity,
  adoption: tech.adoption,
  scalability: tech.scalability === 'High' || tech.scalability === 'High potential' ? 86 : tech.scalability === 'Medium' ? 64 : 42,
}));
