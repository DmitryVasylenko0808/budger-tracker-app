import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type SelectProps = Readonly<
  ComponentProps<'select'> & {
    label?: string;
    options?: ComponentProps<'option'>[];
    error?: string;
  }
>;

export const Select = ({ label, options, error, className, ...selectProps }: SelectProps) => {
  return (
    <label className={cn('block', className)}>
      {label && <label className="mb-2 block text-sm font-semibold">{label}</label>}
      <select
        className="mb-1 block w-full rounded-lg border-2 border-gray-100/5 bg-gray-100/20 px-3 py-2 text-sm duration-100 focus-within:border-primary-200 hover:border-gray-100/20 focus-within:hover:border-primary-200 focus:outline-0"
        {...selectProps}
      >
        {options?.map((opt) => (
          <option key={opt.id} value={opt.value}>
            {opt.title}
          </option>
        ))}
      </select>
      {error && <span className="text-xs font-normal text-error">{error}</span>}
    </label>
  );
};
