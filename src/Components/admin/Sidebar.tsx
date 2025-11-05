'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Package2,
  Users,
  ShoppingBag,
  ClipboardList,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react';

interface SidebarProps {
  navItems: { name: string; href: string }[];
}

export function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Dashboard': return <LayoutDashboard className="h-5 w-5" />;
      case 'User Management': return <Users className="h-5 w-5" />;
      case 'Product Management': return <ShoppingBag className="h-5 w-5" />;
      case 'Order Tracking': return <ClipboardList className="h-5 w-5" />;
      case 'Analytics': return <BarChart3 className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Mobile top bar with toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold text-blue-600">
          <Package2 className="h-6 w-6" />
          <span className="text-lg">Admin Panel</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for larger screens or toggled mobile */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block fixed md:relative top-0 left-0 z-50 w-64 bg-gray-100 p-4 border-r border-gray-200 h-screen transition-all`}
      >
        <div className="mb-8 hidden md:flex items-center justify-center">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold text-blue-600"
          >
            <Package2 className="h-7 w-7" />
            <span className="text-xl">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 hover:text-blue-600 hover:bg-gray-200 ${
                  isActive ? 'bg-gray-200 text-blue-600 font-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)} // auto-close on mobile
              >
                {getIcon(item.name)}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-200 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
