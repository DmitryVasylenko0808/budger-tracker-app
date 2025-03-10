import { Loader } from "@/shared/ui";

export default function LoadingTransactionsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
