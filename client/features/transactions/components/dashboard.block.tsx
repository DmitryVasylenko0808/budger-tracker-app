import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type DashboardBlockProps = ComponentProps<"div">;

export const DashboardBlock = ({
  children,
  className,
}: Readonly<DashboardBlockProps>) => {
  return (
    <div
      className={cn("py-4 px-5 border-2 rounded-lg border-gray-50", className)}
    >
      {children}
    </div>
  );
};
