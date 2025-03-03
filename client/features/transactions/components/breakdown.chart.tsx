"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { FilterBreakdownMenu } from "./filter.breakdown.menu";
import { cn } from "@/utils/cn";
import { getBreakdown } from "../api";

type BreakdownChartProps = {
  type: TransactionType;
  data: any[];
};

export type DateInterval = {
  from?: string;
  to?: string;
};

export const BreakdownChart = ({ type, data }: BreakdownChartProps) => {
  const [fromTo, setFromTo] = useState<DateInterval | null>(null);
  const {
    data: breakDownData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["breakdown-chart", fromTo, type],
    queryFn: () => getBreakdown({ type, ...fromTo }),
    initialData: data,
    enabled: false,
  });

  const handleClickClear = () => setFromTo(null);
  const handleClickFilter = () => refetch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromTo({ ...fromTo, [e.target.name]: e.target.value });
  };

  const isNoData = !data || !data.length;

  return (
    <div>
      <div className="flex justify-end">
        <FilterBreakdownMenu
          filter={fromTo}
          isFiltering={!!fromTo}
          onFilter={handleClickFilter}
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
              data={breakDownData}
              dataKey="value"
              nameKey="categoryName"
              outerRadius={115}
              innerRadius={55}
            >
              {breakDownData.map((item) => (
                <Cell key={item.id} fill={item.categoryColor} />
              ))}
            </Pie>
          </PieChart>
        </div>
      )}
    </div>
  );
};
