import Link from "next/link";

export const WithoutAccount = () => {
  return (
    <p className="text-center text-gray-200 font-normal">
      Don't have an account?{" "}
      <span>
        <Link href="/sign-up" className="text-primary-100 font-semibold">
          Sign Up
        </Link>
      </span>
    </p>
  );
};
