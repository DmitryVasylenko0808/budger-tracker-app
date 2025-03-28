import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type ButtonProps = Readonly<
  ComponentProps<'button'> & {
    variant: 'primary' | 'secondary' | 'text' | 'menu' | 'filled';
    size?: 'sm' | 'lg';
    fullWidth?: boolean;
  }
>;

export const Button = ({
  children,
  className,
  variant,
  size = 'sm',
  fullWidth = false,
  ...btnProps
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold duration-100',
        {
          'h-9 min-w-20 px-2': size === 'sm',
          'h-10 min-w-24 px-4': size === 'lg',
          'bg-primary-100 text-white hover:bg-primary-200 disabled:opacity-50 disabled:hover:bg-primary-100':
            variant === 'primary',
          'border-2 border-gray-100/30 text-black disabled:opacity-50': variant === 'secondary',
          'min-w-fit text-black disabled:opacity-50': variant === 'text',
          'min-w-fit bg-gray-75 text-gray-200 hover:bg-gray-100/20': variant === 'filled',
          'w-full justify-start font-normal text-black hover:bg-gray-200/5': variant === 'menu',
          'w-full': fullWidth === true,
        },
        className
      )}
      {...btnProps}
    >
      {children}
    </button>
  );
};
