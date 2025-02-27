import { ComponentProps } from "react";

type FileSelectProps = ComponentProps<"input"> & {
  label?: string;
  leftAddon?: string;
  rightAddon?: string;
  error?: string;
};

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
      {label && (
        <label className="block mb-2 text-sm font-semibold">{label}</label>
      )}
      <div className="mb-1 px-3 py-2 flex items-center bg-gray-100/20 border-2 border-gray-100/5 rounded-lg duration-100 hover:border-gray-100/20">
        {leftAddon && <div className="mr-2">{leftAddon}</div>}
        <input
          type="file"
          className="block w-full bg-transparent text-sm focus:outline-0 file:hidden"
          {...inputProps}
        />
        {rightAddon && <div className="ml-2">{rightAddon}</div>}
      </div>
      {error && <span className="text-xs text-error font-normal">{error}</span>}
    </div>
  );
};
