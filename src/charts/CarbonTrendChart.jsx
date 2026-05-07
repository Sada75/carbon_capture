import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { co2Trend } from '../data/chartData';

export default function CarbonTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={co2Trend} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="co2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5dffc7" stopOpacity={0.65} />
            <stop offset="100%" stopColor="#34d5ff" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: '#07111f', border: '1px solid rgba(255,255,255,.14)', borderRadius: 8 }}
          labelStyle={{ color: '#fff' }}
        />
        <Area type="monotone" dataKey="ppm" stroke="#5dffc7" strokeWidth={3} fill="url(#co2)" animationDuration={1300} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
