import { Loader } from '@/shared/ui';

export default function LoadingTransactionsPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
