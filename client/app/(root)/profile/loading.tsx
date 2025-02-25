import { LoaderCircle } from "lucide-react";

const LoadingProfilePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <LoaderCircle size={48} className="text-primary-100 animate-spin" />
    </div>
  );
};

export default LoadingProfilePage;
