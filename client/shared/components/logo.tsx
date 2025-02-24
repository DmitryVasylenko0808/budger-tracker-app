import { CircleDollarSign } from "lucide-react";

type LogoProps = {
  size?: "sm" | "lg";
};

export const Logo = ({ size = "sm" }: LogoProps) => {
  const sizes = { sm: 30, lg: 60 };

  return (
    <span className="text-primary-100">
      <CircleDollarSign size={sizes[size]} className="text-primary-100" />
    </span>
  );
};
