import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & {
  label?: string;
  options?: ComponentProps<"option">[];
  error?: string;
};

export const Select = ({
  label,
  options,
  error,
  className,
  ...selectProps
}: SelectProps) => {
  return (
    <label className={cn("block", className)}>
      {label && (
        <label className="block mb-2 text-sm font-semibold">{label}</label>
      )}
      <select
        className="block w-full mb-1 px-3 py-2 bg-gray-100/20 border-2 border-gray-100/5 rounded-lg duration-100 hover:border-gray-100/20 text-sm focus:outline-0"
        {...selectProps}
      >
        {options?.map((opt) => (
          <option key={opt.id} value={opt.value}>
            {opt.title}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-error font-normal">{error}</span>}
    </label>
  );
};
