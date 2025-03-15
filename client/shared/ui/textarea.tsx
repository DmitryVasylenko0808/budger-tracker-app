import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type TextAreaProps = Readonly<
  ComponentProps<"textarea"> & {
    label?: string;
    error?: string;
  }
>;

export const TextArea = ({
  label,
  error,
  rows = 5,
  className,
  ...inputProps
}: TextAreaProps) => {
  return (
    <label className={cn("block", className)}>
      {label && (
        <label className="block mb-2 text-sm font-semibold">{label}</label>
      )}
      <textarea
        className="mb-1 px-3 py-2 block w-full resize-none bg-gray-100/20 border-2 border-gray-100/5 rounded-lg duration-100 
        hover:border-gray-100/20 text-sm focus:outline-0 focus-within:border-primary-200 focus-within:hover:border-primary-200"
        rows={rows}
        {...inputProps}
      />
      {error && <span className="text-xs text-error font-normal">{error}</span>}
    </label>
  );
};
