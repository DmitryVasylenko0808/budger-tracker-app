import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type TextAreaProps = Readonly<
  ComponentProps<'textarea'> & {
    label?: string;
    error?: string;
  }
>;

export const TextArea = ({ label, error, rows = 5, className, ...inputProps }: TextAreaProps) => {
  return (
    <label className={cn('block', className)}>
      {label && <label className="mb-2 block text-sm font-semibold">{label}</label>}
      <textarea
        className="mb-1 block w-full resize-none rounded-lg border-2 border-gray-100/5 bg-gray-100/20 px-3 py-2 text-sm duration-100 focus-within:border-primary-200 hover:border-gray-100/20 focus-within:hover:border-primary-200 focus:outline-0"
        rows={rows}
        {...inputProps}
      />
      {error && <span className="text-xs font-normal text-error">{error}</span>}
    </label>
  );
};
