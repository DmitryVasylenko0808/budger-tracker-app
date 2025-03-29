import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type BlockProps = ComponentProps<'div'> & { title?: string };

export const Block = ({ children, className, title, ...divProps }: Readonly<BlockProps>) => {
  return (
    <div className={cn('rounded-lg border-2 border-gray-50 px-5 py-4', className)} {...divProps}>
      {title && <h3 className="mb-7 text-xl font-semibold">{title}</h3>}
      {children}
    </div>
  );
};
