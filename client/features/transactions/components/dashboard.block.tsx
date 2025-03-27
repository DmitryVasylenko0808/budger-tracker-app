import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type DashboardBlockProps = ComponentProps<'div'>;

export const DashboardBlock = ({ children, className }: Readonly<DashboardBlockProps>) => {
  return (
    <div className={cn('rounded-lg border-2 border-gray-50 px-5 py-4', className)}>{children}</div>
  );
};
