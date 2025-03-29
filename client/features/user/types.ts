type User = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  verified: boolean;
  twoFa: boolean;
  provider?: string;
  providerId?: string;
};
