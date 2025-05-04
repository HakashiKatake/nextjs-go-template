'use client';

import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

export default function UserSync() {
  const { isLoaded, userId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    // Only run if user is authenticated
    if (!isLoaded || !userId || !user) return;

    const syncUserToDatabase = async () => {
      try {
        // Get the Clerk token
        const token = await getToken();
        
        // Send user data to your backend
        const response = await fetch('/api/user/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            clerkId: userId,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl
          })
        });

        if (!response.ok) {
          throw new Error('Failed to sync user');
        }

        const data = await response.json();
        console.log('User sync complete:', data.message);
      } catch (error) {
        console.error('Error syncing user data:', error);
      }
    };

    syncUserToDatabase();
  }, [isLoaded, userId, user, getToken]);

  // This component doesn't render anything
  return null;
}