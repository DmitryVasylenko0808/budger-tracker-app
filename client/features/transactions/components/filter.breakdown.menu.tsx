'use client';

import { ListFilter } from 'lucide-react';

import { useToggleMenu } from '@/hooks';

import { Button, Menu, TextField } from '@/shared/ui';

import { DateInterval } from './breakdown.chart';

type FilterBreakdownMenuProps = {
  filter: DateInterval | null;
  isFiltering: boolean;
  onClear: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterBreakdownMenu = ({
  filter,
  isFiltering,
  onClear,
  onChange,
}: Readonly<FilterBreakdownMenuProps>) => {
  const { open, ref, onToggle } = useToggleMenu();

  return (
    <Menu
      trigger={
        <Button variant="filled" className="relative" onClick={onToggle}>
          <ListFilter size={20} />
          {isFiltering && (
            <span className="absolute right-0 top-0 z-10 h-2 w-2 rounded-full bg-primary-100" />
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
              value={filter?.from || ''}
            />
            <TextField
              type="date"
              label="To"
              name="to"
              onChange={onChange}
              value={filter?.to || ''}
            />
          </div>
          <Button variant="secondary" className="flex-1" onClick={onClear} fullWidth>
            Clear
          </Button>
        </div>
      }
      open={open}
      ref={ref}
    />
  );
};
