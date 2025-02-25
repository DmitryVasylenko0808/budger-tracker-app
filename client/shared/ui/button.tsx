import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary" | "text" | "menu";
  size?: "sm" | "lg";
  fullWidth?: boolean;
};

export const Button = ({
  children,
  className,
  variant,
  size = "sm",
  fullWidth = false,
  ...btnProps
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex justify-center items-center font-semibold rounded-lg duration-100",
        {
          "min-w-20 h-9 px-2": size === "sm",
          "min-w-24 h-10 px-4": size === "lg",
          "bg-primary-100 text-white hover:bg-primary-200 disabled:opacity-50 disabled:hover:bg-primary-100":
            variant === "primary",
          "border-2 border-gray-100/30 text-black disabled:opacity-50":
            variant === "secondary",
          "min-w-fit text-black disabled:opacity-50": variant === "text",
          "w-full justify-start font-normal text-black hover:bg-gray-200/5":
            variant === "menu",
          "w-full": fullWidth === true,
        },
        className
      )}
      {...btnProps}
    >
      {children}
    </button>
  );
};
