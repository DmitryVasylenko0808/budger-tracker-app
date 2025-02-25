"use client";

import Link from "next/link";
import { BookOpen, ChartPie, Grid2x2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li>
          <Link
            href="/"
            className={cn(
              "py-2 px-2.5 inline-flex gap-2 font-medium rounded-lg text-gray-200",
              {
                "text-black bg-gray-200/5": pathname === "/",
              }
            )}
          >
            <ChartPie size={20} /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/transactions"
            className={cn(
              "py-2 px-2.5 inline-flex gap-2 font-medium rounded-lg text-gray-200",
              {
                "text-black bg-gray-200/5": pathname === "/transactions",
              }
            )}
          >
            <BookOpen size={20} /> Transactions
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            className={cn(
              "py-2 px-2.5 inline-flex gap-2 font-medium rounded-lg text-gray-200",
              {
                "text-black bg-gray-200/5": pathname === "/categories",
              }
            )}
          >
            <Grid2x2 size={20} /> Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
};
