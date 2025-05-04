import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import UserSync from '@/components/auth/UserSync';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js + Go + MongoDB + Clerk Template',
  description: 'A full-stack web application template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <UserSync />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}