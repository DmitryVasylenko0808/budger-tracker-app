import Link from 'next/link';

export const WithoutAccount = () => {
  return (
    <p className="text-center font-normal text-gray-200">
      Don't have an account?{' '}
      <span>
        <Link href="/sign-up" className="font-semibold text-primary-100">
          Sign Up
        </Link>
      </span>
    </p>
  );
};
