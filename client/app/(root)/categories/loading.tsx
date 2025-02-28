import { Container } from "@/shared/ui";

const LoadingCategoriesPage = () => {
  return (
    <Container className="py-10">
      <div className="flex gap-8">
        <div className="flex-1 h-80 bg-gray-100/15 rounded-lg animate-pulse" />
        <div className="flex-1 h-80 bg-gray-100/15 rounded-lg animate-pulse" />
      </div>
    </Container>
  );
};

export default LoadingCategoriesPage;
