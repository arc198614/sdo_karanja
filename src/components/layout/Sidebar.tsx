'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    HelpCircle,
    ClipboardList,
    CheckCircle2,
    FileBarChart,
    Settings,
    LogOut,
    PlusCircle,
    MapPin,
    BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { name: 'डॅशबोर्ड', icon: LayoutDashboard, path: '/' },
    { name: 'प्रश्न मास्टर', icon: HelpCircle, path: '/admin/questions' },
    { name: 'नवीन तपासणी', icon: PlusCircle, path: '/inspection/new' },
    { name: 'तपासणी नोंदणी', icon: ClipboardList, path: '/inspection/log' },
    { name: 'प्रलंबित कामे', path: '/vro/compliance', icon: CheckCircle2 },
    { name: 'गाव व्यवस्थापन', path: '/admin/sajas', icon: MapPin },
    { name: 'अहवाल', path: '/admin/reports', icon: BarChart3 },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 h-screen fixed left-0 top-0 bg-white/50 backdrop-blur-2xl border-r border-slate-200 flex flex-col z-50">
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <ClipboardList size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black gradient-text tracking-tighter">VRO-SYSTEM</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Office of SDM</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 translate-x-1"
                                    : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                            )}
                        >
                            <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400")} />
                            <span className="font-bold text-sm tracking-wide">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-6 border-t border-slate-100">
                <button className="flex items-center gap-3 w-full px-6 py-4 text-rose-600 hover:bg-rose-50 rounded-2xl transition-all font-bold">
                    <LogOut size={20} />
                    <span>बाहेर पडा</span>
                </button>
            </div>
        </aside>
    );
}
