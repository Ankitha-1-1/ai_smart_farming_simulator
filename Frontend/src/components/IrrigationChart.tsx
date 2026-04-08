import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Mon", waterNeeded: 4, notNeeded: 2 },
  { name: "Tue", waterNeeded: 3, notNeeded: 3 },
  { name: "Wed", waterNeeded: 5, notNeeded: 1 },
  { name: "Thu", waterNeeded: 2, notNeeded: 4 },
  { name: "Fri", waterNeeded: 6, notNeeded: 1 },
  { name: "Sat", waterNeeded: 1, notNeeded: 5 },
  { name: "Sun", waterNeeded: 3, notNeeded: 3 },
];

const IrrigationChart = () => {
  return (
    <div className="farm-card">
      <h3 className="font-display text-base font-semibold text-foreground mb-4">
        Weekly Irrigation Overview
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,20%,88%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(150,10%,45%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(150,10%,45%)" />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              border: "1px solid hsl(140,20%,88%)",
              fontSize: "0.8rem",
            }}
          />
          <Bar dataKey="waterNeeded" name="Water Needed" radius={[4, 4, 0, 0]} fill="hsl(152,55%,35%)" />
          <Bar dataKey="notNeeded" name="Not Needed" radius={[4, 4, 0, 0]} fill="hsl(80,60%,45%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IrrigationChart;
