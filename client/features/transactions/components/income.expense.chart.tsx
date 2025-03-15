"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type IncomeExpenseChartProps = {
  data: any[];
};

export const IncomeExpenseChart = ({
  data,
}: Readonly<IncomeExpenseChartProps>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} width={500} height={500}>
        <XAxis
          dataKey="name"
          interval="equidistantPreserveStart"
          tick={{
            stroke: "#808080",
            strokeWidth: 0.1,
            fontSize: 11,
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            stroke: "#808080",
            strokeWidth: 0.1,
            fontSize: 11,
          }}
        />
        <CartesianGrid vertical={false} horizontal />
        <Legend
          iconType="circle"
          align="left"
          verticalAlign="top"
          formatter={(value: string) => (
            <span className="text-gray-100 text-xs font-normal">{value}</span>
          )}
          height={50}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8 }}
          labelStyle={{ fontSize: 12, fontWeight: 600 }}
          itemStyle={{ fontSize: 12, fontWeight: 500 }}
        />
        <Bar dataKey="incomes" fill="#007aff" isAnimationActive={false} />
        <Bar dataKey="expenses" fill="#808080" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
