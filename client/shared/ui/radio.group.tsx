import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type RadioGroupProps = Readonly<{
  name: string;
  items: { value: ComponentProps<'input'>['value']; label: string }[];
  value: ComponentProps<'input'>['value'];
  onChange: ComponentProps<'input'>['onChange'];
  label?: string;
  className?: string;
}>;

export const RadioGroup = ({ name, items, value, label, className, onChange }: RadioGroupProps) => {
  return (
    <div className={cn('mb-6', className)}>
      {label && <label className="mb-2 block text-sm font-semibold">{label}</label>}
      <ul className="flex space-x-6">
        {items.map((item, index) => (
          <li className="flex items-center" key={index}>
            <input
              id="default-radio-1"
              type="radio"
              value={item.value}
              checked={item.value === value}
              name={name}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
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
