'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    HelpCircle,
    ClipboardCheck,
    CheckCircle2,
    Settings,
    LogOut,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    {
        name: 'डॅशबोर्ड',
        icon: LayoutDashboard,
        path: '/'
    },
    {
        name: 'प्रश्न मास्टर',
        icon: HelpCircle,
        path: '/admin/questions'
    },
    {
        name: 'तपासणी नोंद',
        icon: ClipboardCheck,
        path: '/inspection/log'
    },
    {
        name: 'नवीन तपासणी',
        icon: Plus,
        path: '/inspection/new'
    },
    {
        name: 'पूर्तता आणि अहवाल',
        icon: CheckCircle2,
        path: '/vro/compliance'
    },
    {
        name: 'सेटिंग्ज',
        icon: Settings,
        path: '/settings'
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen glass border-r border-gray-200 flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-xl font-bold gradient-text">ग्रा.म.अधिकारी प्रणाली</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium text-lg">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <LogOut size={20} />
                    <span className="font-medium text-lg">बाहेर पडा</span>
                </button>
            </div>
        </div>
    );
}
