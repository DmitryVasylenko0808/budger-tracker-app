import { Container } from "@/shared/ui";

export const SummarySkeleton = () => {
  return (
    <Container>
      <div className="mb-8 flex gap-3">
        <div className="flex-1 h-24 bg-gray-100/15 rounded-lg animate-pulse" />
        <div className="flex-1 h-24 bg-gray-100/15 rounded-lg animate-pulse" />
        <div className="flex-1 h-24 bg-gray-100/15 rounded-lg animate-pulse" />
      </div>
    </Container>
  );
};
