// Components/admin/ProfessionalSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
Users, ShoppingBag, ClipboardList, 
LayoutDashboard, Menu, X,
ChevronLeft, ChevronRight, Settings, LogOut,
Building2, MessageSquare, TrendingUp, Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
navItems: { name: string; href: string }[];
}

export function ProfessionalSidebar({ navItems }: SidebarProps) {
const pathname = usePathname();
const { user, logout } = useAuth();
const [isMobileOpen, setIsMobileOpen] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(false);
const [isMobile, setIsMobile] = useState(false);

// Check screen size and set appropriate states
useEffect(() => {
    const checkScreenSize = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    
    if (mobile) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
    } else {
        // Auto-collapse on smaller desktop screens
        setIsCollapsed(window.innerWidth < 1280);
    }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
}, []);

// Close mobile sidebar when route changes
useEffect(() => {
    if (isMobile) {
    setIsMobileOpen(false);
    }
}, [pathname, isMobile]);

const getIcon = (name: string, isActive: boolean = false) => {
    const baseClass = "h-5 w-5 flex-shrink-0 transition-colors";
    const activeClass = isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600";
    
    switch (name) {
    case 'Dashboard': return <LayoutDashboard className={`${baseClass} ${activeClass}`} />;
    case 'User Management': return <Users className={`${baseClass} ${activeClass}`} />;
    case 'Product Management': return <ShoppingBag className={`${baseClass} ${activeClass}`} />;
    case 'Inquiries': return <MessageSquare className={`${baseClass} ${activeClass}`} />;
    case 'Order Tracking': return <ClipboardList className={`${baseClass} ${activeClass}`} />;
    case 'Analytics': return <TrendingUp className={`${baseClass} ${activeClass}`} />;
    default: return <LayoutDashboard className={`${baseClass} ${activeClass}`} />;
    }
};

// Get user display name - safely handle user properties
const getUserDisplayName = () => {
    if (!user) return 'Admin User';
    
    // Use only properties that exist on AuthUser type
    return user.email?.split('@')[0] || 'Admin User';
};

// Get user initial for avatar
const getUserInitial = () => {
    if (!user) return 'A';
    
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
};

// Get user role display
const getUserRole = () => {
    if (!user || !user.roles || user.roles.length === 0) return 'Administrator';
    
    // Handle both array and single role formats
    const roles = Array.isArray(user.roles) ? user.roles : [user.roles];
    const primaryRole = roles[0];
    
    return primaryRole.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Enhanced mobile toggle with better styling
const MobileToggle = () => (
    <button
    onClick={() => setIsMobileOpen(!isMobileOpen)}
    className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group"
    aria-label="Toggle sidebar"
    >
    <div className="relative">
        {isMobileOpen ? (
        <X className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
        ) : (
        <Menu className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
        )}
    </div>
    </button>
);

// Professional desktop toggle
const DesktopToggle = () => (
    <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="hidden lg:flex absolute -right-3 top-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 z-20 border-2 border-white"
    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
    {isCollapsed ? (
        <ChevronRight className="h-3 w-3 transform group-hover:scale-110" />
    ) : (
        <ChevronLeft className="h-3 w-3 transform group-hover:scale-110" />
    )}
    </button>
);

// Enhanced mobile overlay with blur effect
const MobileOverlay = () => (
    <div 
    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
    onClick={() => setIsMobileOpen(false)}
    />
);

// Professional sidebar header
const SidebarHeader = () => (
    <div className={`flex items-center transition-all duration-300 mb-8 ${
    isCollapsed ? 'px-3 justify-center' : 'px-6 justify-between'
    }`}>
    <Link 
        href="/admin/dashboard" 
        className={`flex items-center gap-3 transition-all duration-300 group ${
        isCollapsed ? 'justify-center' : ''
        }`}
    >
        <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Building2 className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        )}
        </div>
        <div className={`flex flex-col transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
        }`}>
        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
            Admin Suite
        </span>
        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
            Business Portal
        </span>
        </div>
    </Link>
    <DesktopToggle />
    </div>
);

// Professional navigation items
const NavigationItems = () => (
    <nav className="flex-1 space-y-1 px-3">
    {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
        <Link
            key={item.href}
            href={item.href}
            className={`
            group flex items-center rounded-xl transition-all duration-200 relative
            hover:bg-blue-50 hover:shadow-sm
            ${isActive ? 
                'bg-blue-50 text-blue-600 font-semibold shadow-sm border-l-4 border-blue-600' : 
                'text-gray-600 hover:text-blue-600'
            }
            ${isCollapsed ? 'justify-center px-3 py-4' : 'px-4 py-3'}
            `}
            title={isCollapsed ? item.name : ''}
        >
            {/* Active indicator */}
            {isActive && !isCollapsed && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
            )}
            
            {/* Icon with enhanced styling */}
            <div className={`relative transition-transform duration-200 ${
            isActive ? 'transform scale-110' : 'group-hover:scale-105'
            }`}>
            {getIcon(item.name, isActive)}
            </div>
            
            {/* Text with smooth animation */}
            <span className={`
            transition-all duration-300 whitespace-nowrap font-medium
            ${isCollapsed ? 
                'opacity-0 absolute left-full ml-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold invisible group-hover:visible z-50 shadow-xl' : 
                'opacity-100 ml-3 text-sm'
            }
            ${isActive ? 'text-blue-600' : 'text-gray-600'}
            `}>
            {item.name}
            </span>

            {/* Badge for notifications (example) */}
            {item.name === 'Inquiries' && (
            <span className={`
                absolute bg-red-500 text-white rounded-full text-xs font-bold transition-all duration-300
                ${isCollapsed ? 
                'top-1 right-1 w-2 h-2' : 
                'top-2 right-3 px-1.5 py-0.5 min-w-[20px] text-center'
                }
            `}>
                {!isCollapsed && "3"}
            </span>
            )}
        </Link>
        );
    })}
    </nav>
);

// Professional user section
const UserSection = () => (
    <div className={`border-t border-gray-200 pt-4 pb-6 transition-all duration-300 ${
    isCollapsed ? 'px-3' : 'px-6'
    }`}>
    {/* User info */}
    <div className={`flex items-center gap-3 transition-all duration-300 ${
        isCollapsed ? 'justify-center' : ''
    }`}>
        <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold text-sm">
            {getUserInitial()}
            </span>
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        <div className={`flex flex-col transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
        }`}>
        <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {getUserDisplayName()}
        </span>
        <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
            <Shield className="h-3 w-3 text-green-500" />
            {getUserRole()}
        </span>
        </div>
    </div>

    {/* Action buttons */}
    <div className={`flex gap-2 mt-4 transition-all duration-300 ${
        isCollapsed ? 'justify-center' : ''
    }`}>
        <button
        className={`
            flex items-center justify-center transition-all duration-200 rounded-lg
            hover:bg-gray-100 text-gray-500 hover:text-gray-700
            ${isCollapsed ? 'w-10 h-10' : 'flex-1 py-2 px-3'}
        `}
        title="Settings"
        >
        <Settings className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2 text-sm font-medium">Settings</span>}
        </button>
        
        <button
        onClick={logout}
        className={`
            flex items-center justify-center transition-all duration-200 rounded-lg
            hover:bg-red-50 text-gray-500 hover:text-red-600
            ${isCollapsed ? 'w-10 h-10' : 'flex-1 py-2 px-3'}
        `}
        title="Logout"
        >
        <LogOut className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2 text-sm font-medium">Logout</span>}
        </button>
    </div>
    </div>
);

return (
    <>
    {/* Mobile Toggle Button */}
    <MobileToggle />

    {/* Mobile Overlay */}
    {isMobileOpen && <MobileOverlay />}

    {/* Professional Sidebar */}
    <aside className={`
        bg-white border-r border-gray-200/60 flex flex-col z-40
        transform transition-all duration-300 ease-out
        shadow-xl lg:shadow-sm
        fixed lg:sticky top-0 left-0
        h-screen
        overflow-y-auto overflow-x-hidden
        backdrop-blur-sm bg-white/95
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        lg:translate-x-0
        ${isCollapsed ? 'w-20' : 'w-80'}
        ${isMobile ? 'w-80' : ''}
        
        /* Custom scrollbar */
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        hover:scrollbar-thumb-gray-400
    `}>
        <div className="p-4 flex-1 relative">
        <SidebarHeader />
        <NavigationItems />
        </div>
        
        <UserSection />
    </aside>
    </>
);
}

// Professional Simple Sidebar (Alternative)
export function MinimalProfessionalSidebar({ navItems }: SidebarProps) {
const pathname = usePathname();
const { user } = useAuth();
const [isMobileOpen, setIsMobileOpen] = useState(false);

const getIcon = (name: string, isActive: boolean = false) => {
    const baseClass = "h-5 w-5 transition-colors";
    const activeClass = isActive ? "text-blue-600" : "text-gray-400";
    
    switch (name) {
    case 'Dashboard': return <LayoutDashboard className={`${baseClass} ${activeClass}`} />;
    case 'User Management': return <Users className={`${baseClass} ${activeClass}`} />;
    case 'Product Management': return <ShoppingBag className={`${baseClass} ${activeClass}`} />;
    case 'Inquiries': return <MessageSquare className={`${baseClass} ${activeClass}`} />;
    case 'Order Tracking': return <ClipboardList className={`${baseClass} ${activeClass}`} />;
    case 'Analytics': return <TrendingUp className={`${baseClass} ${activeClass}`} />;
    default: return <LayoutDashboard className={`${baseClass} ${activeClass}`} />;
    }
};

// Get user display name - safely handle user properties
const getUserDisplayName = () => {
    if (!user) return 'Admin User';
    
    return user.email?.split('@')[0] || 'Admin User';
};

return (
    <>
    {/* Minimal Mobile Toggle */}
    <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white text-gray-600 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
        aria-label="Toggle sidebar"
    >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>

    {/* Mobile Overlay */}
    {isMobileOpen && (
        <div 
        className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        onClick={() => setIsMobileOpen(false)}
        />
    )}

    {/* Minimal Professional Sidebar */}
    <aside className={`
        bg-white border-r border-gray-200 flex flex-col z-40
        transform transition-transform duration-300 ease-out
        fixed lg:sticky top-0 left-0
        h-screen w-64
        overflow-y-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
    `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
            <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">Admin Suite</span>
            <span className="text-xs text-gray-500 font-medium">v2.1.0</span>
            </div>
        </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
            <Link
                key={item.href}
                href={item.href}
                className={`
                flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 group
                hover:bg-gray-50 hover:pl-4
                ${isActive ? 
                    'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 pl-2' : 
                    'text-gray-600'
                }
                `}
            >
                <div className={`transition-transform duration-200 ${
                isActive ? 'transform scale-110' : 'group-hover:scale-105'
                }`}>
                {getIcon(item.name, isActive)}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
                
                {/* Active indicator dot */}
                {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
            </Link>
            );
        })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
                {getUserDisplayName().charAt(0).toUpperCase()}
            </span>
            </div>
            <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
                {getUserDisplayName()}
            </div>
            <div className="text-xs text-gray-500 truncate">
                {user?.email || 'admin@example.com'}
            </div>
            </div>
        </div>
        <div className="text-xs text-gray-500 text-center">
            © 2024 Business Suite
        </div>
        </div>
    </aside>
    </>
);
}

export default ProfessionalSidebar;