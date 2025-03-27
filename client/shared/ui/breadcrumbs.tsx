import { ChevronRight } from 'lucide-react';

import { ComponentProps } from 'react';

import Link from 'next/link';

import { cn } from '@/utils/cn';

type BreadCrumbsItem = {
  href: string;
  title: string;
  active?: boolean;
};

type BreadCrumbsProps = Readonly<
  ComponentProps<'ul'> & {
    items: BreadCrumbsItem[];
  }
>;

export const BreadCrumbs = ({ items, className }: BreadCrumbsProps) => {
  const content = items.map((item, index) =>
    index < items.length - 1 ? (
      <>
        <li
          className={cn('hover:underline', {
            'text-black': item.active === true,
          })}
          key={`${index} number`}
        >
          <Link href={item.href} className="inline">
            {item.title}
          </Link>
        </li>
        <li className="" key={`${index} chevron`}>
          <ChevronRight />
        </li>
      </>
    ) : (
      <li
        className={cn('hover:underline', {
          'text-black': item.active === true,
        })}
        key={index}
      >
        <Link href={item.href} className="inline">
          {item.title}
        </Link>
      </li>
    )
  );

  return (
    <ul className={cn('flex items-center space-x-1 font-medium text-gray-200', className)}>
      {content}
    </ul>
  );
};
