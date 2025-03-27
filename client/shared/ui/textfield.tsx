import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type TextFieldProps = Readonly<
  ComponentProps<'input'> & {
    label?: string;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
    error?: string;
  }
>;

export const TextField = ({
  label,
  leftAddon,
  rightAddon,
  error,
  className,
  ...inputProps
}: TextFieldProps) => {
  return (
    <label className={cn('block', className)}>
      {label && <label className="mb-2 block text-sm font-semibold">{label}</label>}
      <div className="mb-1 flex items-center rounded-lg border-2 border-gray-100/5 bg-gray-100/20 px-3 py-2 duration-100 focus-within:border-primary-200 hover:border-gray-100/20 focus-within:hover:border-primary-200">
        {leftAddon && <div className="mr-2">{leftAddon}</div>}
        <input className="block w-full bg-transparent text-sm focus:outline-0" {...inputProps} />
        {rightAddon && <div className="ml-2">{rightAddon}</div>}
      </div>
      {error && <span className="text-xs font-normal text-error">{error}</span>}
    </label>
  );
};
