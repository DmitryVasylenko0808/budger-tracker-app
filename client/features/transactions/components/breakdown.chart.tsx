"use client";

import dynamic from "next/dynamic";
import { Cell, Legend, Pie, Tooltip } from "recharts";
import { FilterBreakdownMenu } from "./filter.breakdown.menu";
import { BreakdownItemSkeleton } from "./breakdown.item.skeleton";
import { DashboardBlock } from "./dashboard.block";
import { PieChartLoading } from "./pie.chart.loading";
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBreakdown } from "../api";
import { cn } from "@/utils/cn";

const PieChart = dynamic(
  () => import("recharts").then((recharts) => recharts.PieChart),
  {
    ssr: false,
    loading: () => <PieChartLoading />,
  }
);
type BreakdownChartProps = {
  type: TransactionType;
};

export type DateInterval = {
  from?: string;
  to?: string;
};

export const BreakdownChart = ({ type }: Readonly<BreakdownChartProps>) => {
  const [fromTo, setFromTo] = useState<DateInterval | null>(null);
  const { data, isLoading, isFetching } = useQuery<BreakdownStats>({
    queryKey: ["breakdown-chart", fromTo, type],
    queryFn: () => getBreakdown({ type, ...fromTo }),
    placeholderData: keepPreviousData,
  });

  const handleClickClear = () => setFromTo(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromTo({ ...fromTo, [e.target.name]: e.target.value });
  };

  const isNoData = !data || !data.length;
  const title = (type === "INCOME" ? "Income" : "Expenses") + " Breakdown";

  if (isLoading) {
    return <BreakdownItemSkeleton />;
  }

  return (
    <DashboardBlock className="flex-1">
      <h2 className="mb-7 text-2xl font-semibold">{title}</h2>
      <div>
        <div className="flex justify-end">
          <FilterBreakdownMenu
            filter={fromTo}
            isFiltering={!!fromTo}
            onClear={handleClickClear}
            onChange={handleChange}
          />
        </div>
        {isNoData ? (
          <div className="w-full h-[480px] flex justify-center items-center">
            <p className="text-center text-gray-200 text-lg">No Data</p>
          </div>
        ) : (
          <div
            className={cn("w-full flex justify-center", {
              "opacity-50": isFetching,
            })}
          >
            <PieChart width={350} height={350}>
              <Tooltip
                contentStyle={{ borderRadius: 8 }}
                labelStyle={{ fontSize: 12, fontWeight: 600 }}
                itemStyle={{ fontSize: 12, fontWeight: 500 }}
              />
              <Legend
                formatter={(value: string) => (
                  <span className="text-gray-100 text-xs font-normal">
                    {value}
                  </span>
                )}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="categoryName"
                outerRadius={115}
                innerRadius={55}
                isAnimationActive={false}
              >
                {data?.map((item) => (
                  <Cell key={item.categoryId} fill={item.categoryColor} />
                ))}
              </Pie>
            </PieChart>
          </div>
        )}
      </div>
    </DashboardBlock>
  );
};
