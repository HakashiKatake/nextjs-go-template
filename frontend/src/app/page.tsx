import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId } = await auth();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Next.js + Go + MongoDB + Clerk Template</h1>
      
      <div className="flex flex-col items-center gap-4">
        {userId ? (
          <>
            <p className="text-xl">Welcome back!</p>
            <div className="flex gap-4">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/api/auth/signout" 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl">Get started by signing in</p>
            <div className="flex gap-4">
              <Link 
                href="/sign-in" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}