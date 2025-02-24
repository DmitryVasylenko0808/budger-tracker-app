import Link from "next/link";

export const WithAccount = () => {
  return (
    <p className="text-center text-gray-200 font-normal">
      Already have an account?{" "}
      <span>
        <Link href="/sign-in" className="text-primary-100 font-semibold">
          Sign In
        </Link>
      </span>
    </p>
  );
};
