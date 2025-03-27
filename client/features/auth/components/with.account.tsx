import Link from 'next/link';

export const WithAccount = () => {
  return (
    <p className="text-center font-normal text-gray-200">
      Already have an account?{' '}
      <span>
        <Link href="/sign-in" className="font-semibold text-primary-100">
          Sign In
        </Link>
      </span>
    </p>
  );
};
