import { LoaderCircle } from 'lucide-react';

import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type LoaderProps = Readonly<
  ComponentProps<'div'> & {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'lg';
  }
>;

export const Loader = ({ variant = 'primary', size = 'sm', className }: LoaderProps) => {
  const sizes = { sm: 20, lg: 48 };

  return (
    <LoaderCircle
      size={sizes[size]}
      className={cn(
        'animate-spin',
        {
          'text-primary-100': variant === 'primary',
          'text-white': variant === 'secondary',
          'text-gray-100': variant === 'tertiary',
        },
        className
      )}
    />
  );
};
