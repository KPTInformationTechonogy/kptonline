'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package2, LayoutDashboard, History, User, ShoppingCart, Home } from 'lucide-react';

interface SidebarProps {
navItems: { name: string; href: string }[];
}

export function Sidebar({ navItems }: SidebarProps) {
const pathname = usePathname();

// Helper function to dynamically select icons based on item name
const getIcon = (name: string) => {
    switch (name) {
    case 'My Dashboard': return <LayoutDashboard className="h-5 w-5" />;
    case 'Order History': return <History className="h-5 w-5" />;
    case 'My Profile': return <User className="h-5 w-5" />;
    case 'Shop Products': return <ShoppingCart className="h-5 w-5" />;
    default: return null;
    }
};

return (
    <aside className="w-64 bg-gray-100 p-4 border-r border-gray-200 sticky top-0 h-full flex flex-col">
    <div className="mb-8 flex items-center justify-center">
        <Link href="/customer/dashboard" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-7 w-7 text-blue-600" />
        <span className="text-xl text-blue-600">My Account</span>
        </Link>
    </div>
    <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
        <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600 hover:bg-gray-200 ${
            pathname === item.href ? "bg-gray-200 text-blue-600 font-semibold" : ""
            }`}
        >
            {getIcon(item.name)}
            {item.name}
        </Link>
        ))}
        {/* Add a direct link to the main product browsing page */}
        <Link
        href="/products"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600 hover:bg-gray-200 ${
            pathname === '/products' ? "bg-gray-200 text-blue-600 font-semibold" : ""
        }`}
        >
        <Home className="h-5 w-5" />
        Shop Products
        </Link>
    </nav>
    </aside>
);
}