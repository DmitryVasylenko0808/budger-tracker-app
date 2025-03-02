import { Loader } from "@/shared/ui";

const LoadingProfilePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};

export default LoadingProfilePage;
