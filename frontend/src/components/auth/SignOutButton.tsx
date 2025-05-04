'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type SignOutButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SignOutButton({ children, className = '' }: SignOutButtonProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <button 
      onClick={handleSignOut}
      className={className}
    >
      {children}
    </button>
  );
}