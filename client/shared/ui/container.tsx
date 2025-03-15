"use client";

import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type ContainerProps = Readonly<ComponentProps<"div">>;

export const Container = ({
  children,
  className,
  ...otherProps
}: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto h-full max-w-container px-8", className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};
