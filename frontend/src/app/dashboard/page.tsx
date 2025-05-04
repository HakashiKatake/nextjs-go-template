import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchUserProfileServer } from '@/lib/data';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import type { SerializedUser } from '@/types/user';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  // Create a serialized version of the user with only the data we need
  const serializedUser: SerializedUser = {
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    username: user.username,
  };
  
  // Use the server-specific function
  const profile = await fetchUserProfileServer(user.id);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - pass serialized user */}
      <DashboardSidebar user={serializedUser} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <div className="relative">
                <img 
                  src={serializedUser.imageUrl} 
                  alt={serializedUser.firstName || 'User'} 
                  className="h-10 w-10 rounded-full border-2 border-blue-500"
                />
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <DashboardStats />
          
          {/* Profile Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
                <div className="flex items-center">
                  <img 
                    src={serializedUser.imageUrl} 
                    alt={`${serializedUser.firstName}'s profile`}
                    className="h-20 w-20 rounded-full border-4 border-white shadow"
                  />
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {serializedUser.firstName} {serializedUser.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {serializedUser.email}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active Account
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Verified Email
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-5">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  MongoDB Profile Data:
                </h4>
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <pre className="text-sm text-gray-700 overflow-auto max-h-60">
                    {profile ? JSON.stringify(profile, null, 2) : 'Loading profile data...'}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Activity {item}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(Date.now() - item * 86400000).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-center">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all activity
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}