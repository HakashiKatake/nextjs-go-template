'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SerializedUser } from '@/types/user';
import SignOutButton from '@/components/auth/SignOutButton';
import { 
  HomeIcon, 
  UserIcon, 
  CogIcon, 
  ChartBarIcon, 
  FolderIcon,
  BellIcon,
  LogoutIcon
} from '@/components/icons/HeroIcons';

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderIcon },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

export default function DashboardSidebar({ user }: { user: SerializedUser }) {
  const pathname = usePathname();
  
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="px-4 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt={user.firstName || ''}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 flex-shrink-0 h-6 w-6
                        ${isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'}
                      `}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="px-2 py-4 mt-auto">
            <SignOutButton 
              className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-red-300 hover:bg-gray-700 hover:text-red-200"
            >
              <LogoutIcon 
                className="mr-3 flex-shrink-0 h-6 w-6 text-red-400 group-hover:text-red-300"
                aria-hidden="true"
              />
              Sign Out
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}