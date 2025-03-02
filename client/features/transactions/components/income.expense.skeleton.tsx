import { Container } from "@/shared/ui";

export const IncomeExpenseSkeleton = () => {
  return (
    <Container>
      <div className="mb-8 w-full h-[480px] bg-gray-100/15 rounded-lg animate-pulse" />
    </Container>
  );
};
