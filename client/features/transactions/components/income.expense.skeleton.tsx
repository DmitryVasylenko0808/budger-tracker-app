import { Container } from '@/shared/ui';

export const IncomeExpenseSkeleton = () => {
  return (
    <Container>
      <div className="mb-8 h-[480px] w-full animate-pulse rounded-lg bg-gray-100/15" />
    </Container>
  );
};
