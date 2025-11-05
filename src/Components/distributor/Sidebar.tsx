'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package2, Users, ShoppingCart, ClipboardList, BarChart2, LayoutDashboard, MessageSquare } from 'lucide-react';

interface SidebarProps {
navItems: { name: string; href: string }[];
}

export function SalesSidebar({ navItems }: SidebarProps) {
const pathname = usePathname();

const getIcon = (name: string) => {
    switch (name) {
    case 'Dashboard': return <LayoutDashboard className="h-5 w-5" />;
    case 'Customer Management': return <Users className="h-5 w-5" />;
    case 'Sales Pipeline': return <ShoppingCart className="h-5 w-5" />;
    case 'Order Tracking': return <ClipboardList className="h-5 w-5" />;
    case 'Sales Reports': return <BarChart2 className="h-5 w-5" />;
    case 'Customer Messages': return <MessageSquare className="h-5 w-5" />;
    default: return null;
    }
};

return (
    <aside className="w-64 bg-gray-100 p-4 border-r border-gray-200 sticky top-0 h-screen flex flex-col">
    <div className="mb-8 flex items-center justify-center">
        <Link 
        href="/sales/dashboard" 
        className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
        >
        <Package2 className="h-7 w-7 text-blue-600" />
        <span className="text-xl text-blue-600">Sales Dashboard</span>
        </Link>
    </div>
    <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
            <Link
            key={item.href}
            href={item.href}
            className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 
                transition-all duration-200
                hover:text-blue-600 hover:bg-gray-200
                ${isActive ? 'bg-gray-200 text-blue-600 font-semibold' : ''}
            `}
            >
            {getIcon(item.name)}
            <span>{item.name}</span>
            </Link>
        );
        })}
    </nav>
    {/* Optional logout button */}
    <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-200 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span>Logout</span>
        </button>
    </div>
    </aside>
);
}
export default SalesSidebar