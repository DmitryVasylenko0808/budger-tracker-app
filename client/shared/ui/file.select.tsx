import { ComponentProps } from 'react';

type FileSelectProps = Readonly<
  ComponentProps<'input'> & {
    label?: string;
    leftAddon?: string;
    rightAddon?: string;
    error?: string;
  }
>;

export const FileSelect = ({
  label,
  leftAddon,
  rightAddon,
  error,
  className,
  ...inputProps
}: FileSelectProps) => {
  return (
    <div className={className}>
      {label && <label className="mb-2 block text-sm font-semibold">{label}</label>}
      <div className="mb-1 flex items-center rounded-lg border-2 border-gray-100/5 bg-gray-100/20 px-3 py-2 duration-100 hover:border-gray-100/20">
        {leftAddon && <div className="mr-2">{leftAddon}</div>}
        <input
          type="file"
          className="block w-full bg-transparent text-sm file:hidden focus:outline-0"
          {...inputProps}
        />
        {rightAddon && <div className="ml-2">{rightAddon}</div>}
      </div>
      {error && <span className="text-xs font-normal text-error">{error}</span>}
    </div>
  );
};
