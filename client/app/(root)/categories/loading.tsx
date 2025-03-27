import { Container } from '@/shared/ui';

const LoadingCategoriesPage = () => {
  return (
    <Container className="py-10">
      <div className="flex gap-8">
        <div className="h-80 flex-1 animate-pulse rounded-lg bg-gray-100/15" />
        <div className="h-80 flex-1 animate-pulse rounded-lg bg-gray-100/15" />
      </div>
    </Container>
  );
};

export default LoadingCategoriesPage;
