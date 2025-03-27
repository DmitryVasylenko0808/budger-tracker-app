import { Container } from '@/shared/ui';

export const SummarySkeleton = () => {
  return (
    <Container>
      <div className="mb-8 flex gap-3">
        <div className="h-24 flex-1 animate-pulse rounded-lg bg-gray-100/15" />
        <div className="h-24 flex-1 animate-pulse rounded-lg bg-gray-100/15" />
        <div className="h-24 flex-1 animate-pulse rounded-lg bg-gray-100/15" />
      </div>
    </Container>
  );
};
