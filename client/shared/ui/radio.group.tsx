import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type RadioGroupProps = {
  name: string;
  items: { value: ComponentProps<"input">["value"]; label: string }[];
  value: ComponentProps<"input">["value"];
  onChange: ComponentProps<"input">["onChange"];
  label?: string;
  className?: string;
};

export const RadioGroup = ({
  name,
  items,
  value,
  label,
  className,
  onChange,
}: RadioGroupProps) => {
  return (
    <div className={cn("mb-6", className)}>
      {label && (
        <label className="block mb-2 text-sm font-semibold">{label}</label>
      )}
      <ul className="flex space-x-6">
        {items.map((item, index) => (
          <li className="flex items-center" key={index}>
            <input
              id="default-radio-1"
              type="radio"
              value={item.value}
              checked={item.value === value}
              name={name}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={onChange}
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
