import { Loader } from '@/shared/ui';

const LoadingProfilePage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};

export default LoadingProfilePage;
