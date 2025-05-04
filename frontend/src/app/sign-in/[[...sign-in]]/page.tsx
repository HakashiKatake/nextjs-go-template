import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SignIn appearance={{ variables: { colorPrimary: '#0F172A' } }} />
    </div>
  );
}