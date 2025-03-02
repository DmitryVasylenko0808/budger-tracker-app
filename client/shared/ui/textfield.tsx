import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  error?: string;
};

export const TextField = ({
  label,
  leftAddon,
  rightAddon,
  error,
  className,
  ...inputProps
}: TextFieldProps) => {
  return (
    <label className={cn("block", className)}>
      {label && (
        <label className="block mb-2 text-sm font-semibold">{label}</label>
      )}
      <div className="mb-1 px-3 py-2 flex items-center bg-gray-100/20 border-2 border-gray-100/5 rounded-lg duration-100 hover:border-gray-100/20">
        {leftAddon && <div className="mr-2">{leftAddon}</div>}
        <input
          className="block w-full bg-transparent text-sm focus:outline-0"
          {...inputProps}
        />
        {rightAddon && <div className="ml-2">{rightAddon}</div>}
      </div>
      {error && <span className="text-xs text-error font-normal">{error}</span>}
    </label>
  );
};
