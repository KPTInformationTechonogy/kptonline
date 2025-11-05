'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package2, LayoutDashboard, Users, BarChart2, DollarSign, PlusCircle } from 'lucide-react';

interface SidebarProps {
navItems: { name: string; href: string }[];
}

export function Sidebar({ navItems }: SidebarProps) {
const pathname = usePathname();

const getIcon = (name: string) => {
    switch (name) {
    case 'Dashboard': return <LayoutDashboard className="h-5 w-5" />;
    case 'Assigned Customers': return <Users className="h-5 w-5" />;
    case 'Sales Reports': return <BarChart2 className="h-5 w-5" />;
    case 'Submit Leads/Orders': return <DollarSign className="h-5 w-5" />;
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
        <span className="text-xl text-blue-600">Sales Panel</span>
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
    {/* New Lead Button */}
    <div className="mt-auto pt-4 border-t border-gray-200">
        <Link href="/sales/leads/new">
        <button className="w-full flex items-center justify-start px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-all">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Lead
        </button>
        </Link>
    </div>
    </aside>
);
}