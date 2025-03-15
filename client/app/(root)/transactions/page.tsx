import type { Metadata } from "next";
import { Transactions } from "@/features/transactions/components";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function TransactionsPage() {
  return (
    <div>
      <section className="pt-10 pb-8">
        <Container>
          <h1 className="mb-4 text-3xl font-semibold">Transactions</h1>
          <div className="w-full h-0.5 bg-gray-50" />
        </Container>
      </section>

      <Transactions />
    </div>
  );
}
