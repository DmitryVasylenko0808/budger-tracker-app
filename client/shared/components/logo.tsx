import { CircleDollarSign } from 'lucide-react';

type LogoProps = Readonly<{
  size?: 'sm' | 'lg';
}>;

export const Logo = ({ size = 'sm' }: LogoProps) => {
  const sizes = { sm: 30, lg: 60 };

  return <CircleDollarSign size={sizes[size]} className="text-primary-100" />;
};
