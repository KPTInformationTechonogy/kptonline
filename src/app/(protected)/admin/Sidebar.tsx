'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package2, Users, ShoppingBag, ClipboardList, BarChart3, LayoutDashboard, Inbox, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
navItems: { name: string; href: string }[];
}

export function Sidebar({ navItems }: SidebarProps) {
const pathname = usePathname();
const [isMobileOpen, setIsMobileOpen] = useState(false);
const [isMobile, setIsMobile] = useState(false);

// Check if mobile on mount and resize
useEffect(() => {
    const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
    window.removeEventListener('resize', checkIfMobile);
    };
}, []);

// Close mobile sidebar when route changes
useEffect(() => {
    setIsMobileOpen(false);
}, [pathname]);

const getIcon = (name: string) => {
    switch (name) {
    case 'Dashboard': return <LayoutDashboard className="h-5 w-5" />;
    case 'User Management': return <Users className="h-5 w-5" />;
    case 'Product Management': return <ShoppingBag className="h-5 w-5" />;
    case 'Inquiries': return <Inbox className="h-5 w-5" />;
    case 'Order Tracking': return <ClipboardList className="h-5 w-5" />;
    case 'Analytics': return <BarChart3 className="h-5 w-5" />;
    default: return null;
    }
};

// Mobile toggle button
const MobileToggle = () => (
    <button
    onClick={() => setIsMobileOpen(!isMobileOpen)}
    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
    aria-label="Toggle sidebar"
    >
    {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
);

// Sidebar content
const SidebarContent = () => (
    <>
    <div className="mb-8 flex items-center justify-center">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-7 w-7 text-blue-600" />
        <span className="text-xl text-blue-600">Admin Panel</span>
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
                flex items-center gap-3 rounded-lg px-3 py-3 text-gray-600 transition-all
                hover:text-blue-600 hover:bg-gray-200
                ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-r-2 border-blue-600' : ''}
            `}
            >
            {getIcon(item.name)}
            <span className="text-sm md:text-base">{item.name}</span>
            </Link>
        );
        })}
    </nav>
    </>
);

// Mobile overlay
const MobileOverlay = () => (
    <div 
    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    onClick={() => setIsMobileOpen(false)}
    />
);

return (
    <>
    {/* Mobile Toggle Button */}
    <MobileToggle />

    {/* Mobile Overlay */}
    {isMobileOpen && <MobileOverlay />}

    {/* Sidebar */}
    <aside className={`
        bg-gray-50 border-r border-gray-200 sticky top-0 h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
        w-64 fixed lg:relative
        overflow-y-auto
    `}>
        <div className="p-4 flex-1">
        <SidebarContent />
        </div>
    </aside>
    </>
);
}

// Alternative version with collapsible sidebar on desktop
export function ResponsiveSidebar({ navItems }: SidebarProps) {
const pathname = usePathname();
const [isMobileOpen, setIsMobileOpen] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(false);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const checkIfMobile = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) {
        setIsCollapsed(false);
    }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
    window.removeEventListener('resize', checkIfMobile);
    };
}, []);

useEffect(() => {
    setIsMobileOpen(false);
}, [pathname]);

const getIcon = (name: string) => {
    switch (name) {
    case 'Dashboard': return <LayoutDashboard className="h-5 w-5" />;
    case 'User Management': return <Users className="h-5 w-5" />;
    case 'Product Management': return <ShoppingBag className="h-5 w-5" />;
    case 'Inquiries': return <Inbox className="h-5 w-5" />;
    case 'Order Tracking': return <ClipboardList className="h-5 w-5" />;
    case 'Analytics': return <BarChart3 className="h-5 w-5" />;
    default: return null;
    }
};

const MobileToggle = () => (
    <button
    onClick={() => setIsMobileOpen(!isMobileOpen)}
    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
    >
    {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
);

const DesktopToggle = () => (
    <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="hidden lg:block absolute -right-3 top-8 bg-blue-600 text-white p-1 rounded-full shadow-lg z-10"
    >
    <Menu className="h-4 w-4" />
    </button>
);

const MobileOverlay = () => (
    <div 
    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    onClick={() => setIsMobileOpen(false)}
    />
);

const SidebarContent = () => (
    <>
    <div className={`mb-8 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-7 w-7 text-blue-600 flex-shrink-0" />
        <span className={`text-xl text-blue-600 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Admin Panel
        </span>
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
                flex items-center gap-3 rounded-lg px-3 py-3 text-gray-600 transition-all
                hover:text-blue-600 hover:bg-gray-200 group relative
                ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-r-2 border-blue-600' : ''}
                ${isCollapsed ? 'justify-center px-2' : ''}
            `}
            title={isCollapsed ? item.name : ''}
            >
            {getIcon(item.name)}
            <span className={`
                text-sm md:text-base transition-all duration-300
                ${isCollapsed ? 'opacity-0 absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap invisible group-hover:visible' : 'opacity-100'}
            `}>
                {item.name}
            </span>
            </Link>
        );
        })}
    </nav>
    </>
);

return (
    <>
    <MobileToggle />
    {isMobileOpen && <MobileOverlay />}

    <aside className={`
        bg-gray-50 border-r border-gray-200 sticky top-0 h-screen flex flex-col
        transform transition-all duration-300 ease-in-out z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
        ${isCollapsed ? 'w-16' : 'w-64'}
        fixed lg:relative
        overflow-y-auto
    `}>
        <div className="p-4 flex-1 relative">
        <DesktopToggle />
        <SidebarContent />
        </div>
    </aside>
    </>
);
}