import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SignUp appearance={{ variables: { colorPrimary: '#0F172A' } }} />
    </div>
  );
}