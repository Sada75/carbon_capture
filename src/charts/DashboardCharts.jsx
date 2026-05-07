import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { captureGrowth, marketShare, radarData, regionalAdoption } from '../data/chartData';
import { technologies } from '../data/technologies';

const tooltipStyle = {
  background: '#07111f',
  border: '1px solid rgba(255,255,255,.14)',
  borderRadius: 8,
  color: '#fff',
};

export function CostBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 40 }}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} interval={0} angle={-24} textAnchor="end" height={70} tick={{ fontSize: 11 }} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${value}/t`, 'Cost']} />
        <Bar dataKey="cost" radius={[8, 8, 0, 0]} animationDuration={1200}>
          {data.map((entry) => (
            <Cell key={entry.id} fill={technologies.find((tech) => tech.id === entry.id)?.color ?? '#34d5ff'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EfficiencyCostScatter({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 14, right: 18, left: -10, bottom: 12 }}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" />
        <XAxis type="number" dataKey="cost" name="Cost" unit="/t" stroke="#94a3b8" tickLine={false} axisLine={false} />
        <YAxis type="number" dataKey="efficiency" name="Efficiency" unit="%" stroke="#94a3b8" tickLine={false} axisLine={false} />
        <ZAxis type="number" dataKey="capacity" range={[100, 580]} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#5dffc7">
          {data.map((entry) => (
            <Cell key={entry.id} fill={technologies.find((tech) => tech.id === entry.id)?.color ?? '#5dffc7'} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function MultiMetricRadar() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={radarData}>
        <PolarGrid stroke="rgba(255,255,255,.12)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Efficiency" dataKey="efficiency" stroke="#34d5ff" fill="#34d5ff" fillOpacity={0.16} />
        <Radar name="Capacity" dataKey="capacity" stroke="#5dffc7" fill="#5dffc7" fillOpacity={0.12} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function CaptureGrowthLine() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={captureGrowth} margin={{ top: 14, right: 18, left: -18, bottom: 4 }}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="Post-Combustion Capture" stroke="#34d5ff" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="Direct Air Capture (DAC)" stroke="#5dffc7" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="BECCS" stroke="#47d16c" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="Mineralization" stroke="#d5ff6a" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AdoptionPie() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={marketShare} dataKey="value" nameKey="name" innerRadius="48%" outerRadius="78%" paddingAngle={3}>
          {marketShare.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, 'Adoption index']} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MiniMetricChart({ tech }) {
  const data = [
    { metric: 'Efficiency', value: tech.efficiency },
    { metric: 'Capacity', value: tech.capacity },
    { metric: 'Adoption', value: tech.adoption },
    { metric: 'Affordability', value: Math.max(0, Math.round(100 - tech.cost / 3)) },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 6 }}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="metric" stroke="#94a3b8" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill={tech.color} radius={[8, 8, 0, 0]} />
        <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function Heatmap() {
  const keys = [
    ['post', 'Post'],
    ['pre', 'Pre'],
    ['dac', 'DAC'],
    ['beccs', 'BECCS'],
    ['ocean', 'Ocean'],
    ['mineral', 'Mineral'],
  ];

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="grid grid-cols-[120px_repeat(6,minmax(54px,1fr))] gap-2 text-xs text-slate-400">
        <span />
        {keys.map(([, label]) => (
          <span key={label} className="text-center">{label}</span>
        ))}
      </div>
      <div className="grid gap-2">
        {regionalAdoption.map((row) => (
          <div key={row.region} className="grid grid-cols-[120px_repeat(6,minmax(54px,1fr))] gap-2">
            <span className="flex items-center text-xs text-slate-300">{row.region}</span>
            {keys.map(([key]) => (
              <div
                key={key}
                className="grid min-h-9 place-items-center rounded-[8px] text-xs font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, rgba(52,213,255,${row[key] / 120}), rgba(93,255,199,${row[key] / 130}))`,
                  border: '1px solid rgba(255,255,255,.1)',
                }}
              >
                {row[key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
