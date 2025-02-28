import { getCategories } from "@/features/transactions/api";
import { Categories } from "@/features/transactions/components";
import { Container } from "@/shared/ui";

export default async function CategoriesPage() {
  const incomeCategories = await getCategories({ type: "INCOME" });
  const expenseCategories = await getCategories({ type: "EXPENSE" });

  return (
    <section className="py-10">
      <Container>
        <h1 className="mb-4 text-3xl font-semibold">Categories</h1>
        <div className="mb-5 w-full h-0.5 bg-gray-50" />
        <div className="flex gap-8">
          <Categories type="INCOME" categories={incomeCategories} />
          <Categories type="EXPENSE" categories={expenseCategories} />
        </div>
      </Container>
    </section>
  );
}
