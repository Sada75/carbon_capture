import dataset from './realCarbonCaptureDataset.json';

export const sources = dataset.sources;
export const summary = dataset.summary;
export const co2Trend = dataset.sequesteredTrend;
export const captureGrowth = dataset.captureGrowth;
export const regionalAdoption = dataset.regionalAdoption;
export const regionalKeys = dataset.regionalKeys;
export const technologyMetrics = dataset.technologyMetrics;
export const statusCounts = dataset.statusCounts;
export const sectorCapacity = dataset.sectorCapacity;

const palette = ['#34d5ff', '#5dffc7', '#47d16c', '#d5ff6a', '#4f7dff', '#29b6f6', '#a78bfa'];

export const marketShare = dataset.marketShare.map((item, index) => ({
  ...item,
  color: palette[index % palette.length],
}));

export const radarData = technologyMetrics.map((item) => ({
  subject: item.name,
  capacityShare: item.adoption,
  operationalShare: item.operationalShare,
  projectShare: Math.round((item.projectCount / summary.iea2026Projects) * 100),
}));
