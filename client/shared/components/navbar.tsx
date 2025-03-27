'use client';

import { BookOpen, ChartPie, Grid2x2 } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

type NavItem = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { href: '/dashboard', title: 'Dashboard', icon: <ChartPie size={20} /> },
  {
    href: '/transactions',
    title: 'Transactions',
    icon: <BookOpen size={20} />,
  },
  { href: '/categories', title: 'Categories', icon: <Grid2x2 size={20} /> },
];

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-3">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'inline-flex gap-2 rounded-lg px-2.5 py-2 font-medium text-gray-200 duration-100 hover:bg-gray-200/5',
                {
                  'bg-gray-200/5 text-black': pathname.startsWith(item.href),
                }
              )}
            >
              {item.icon} {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
