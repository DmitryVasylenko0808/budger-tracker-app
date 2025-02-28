import { Categories } from "@/features/transactions/components";
import { Container } from "@/shared/ui";

export default function CategoriesPage() {
  return (
    <section className="py-10">
      <Container>
        <h1 className="mb-4 text-3xl font-semibold">Categories</h1>
        <div className="mb-5 w-full h-0.5 bg-gray-50" />
        <Categories />
      </Container>
    </section>
  );
}
