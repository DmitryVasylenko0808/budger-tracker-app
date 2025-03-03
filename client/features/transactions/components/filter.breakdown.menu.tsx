"use client";

import { useToggleMenu } from "@/hooks";
import { Button, Menu, TextField } from "@/shared/ui";
import { ListFilter } from "lucide-react";
import { DateInterval } from "./breakdown.chart";

type FilterBreakdownMenuProps = {
  filter: DateInterval | null;
  isFiltering: boolean;
  onClear: () => void;
  onFilter: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterBreakdownMenu = ({
  filter,
  isFiltering,
  onClear,
  onFilter,
  onChange,
}: FilterBreakdownMenuProps) => {
  const { open, ref, onToggle } = useToggleMenu();

  return (
    <Menu
      trigger={
        <Button
          variant="text"
          className="relative bg-gray-75 text-gray-200"
          onClick={onToggle}
        >
          <ListFilter size={20} />
          {isFiltering && (
            <span className="absolute top-0 right-0 z-10 w-2 h-2 bg-primary-100 rounded-full" />
          )}
        </Button>
      }
      content={
        <div className="p-2">
          <div className="mb-8 flex gap-5">
            <TextField
              type="date"
              label="From"
              name="from"
              onChange={onChange}
              value={filter?.from || ""}
            />
            <TextField
              type="date"
              label="To"
              name="to"
              onChange={onChange}
              value={filter?.to || ""}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onClear}>
              Clear
            </Button>
            <Button variant="primary" className="flex-1" onClick={onFilter}>
              Filter
            </Button>
          </div>
        </div>
      }
      open={open}
      ref={ref}
    />
  );
};
