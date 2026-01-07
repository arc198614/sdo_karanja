import { getStats } from '@/lib/google/sheets';
import {
    Users,
    ClipboardList,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ArrowUpRight,
    HelpCircle,
    PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const stats = await getStats();

    const statCards = [
        { label: 'एकूण प्रश्न', value: stats.totalQuestions, icon: HelpCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'प्रलंबित तपासण्या', value: stats.pending, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'पूर्ण तपासण्या', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'सहभागी अधिकारी', value: '३२', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">नमस्कार, प्रशासक 👋</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium italic">दप्तर तपासणी अहवाल आणि ट्रॅकिंग सिस्टीममध्ये आपले स्वागत आहे.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/inspection/new" className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                        <PlusCircle size={20} />
                        नवीन तपासणी सुरू करा
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="premium-card group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-4 rounded-2xl", stat.bg)}>
                                <stat.icon className={stat.color} size={28} />
                            </div>
                            <div className="bg-slate-100 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight size={16} className="text-slate-500" />
                            </div>
                        </div>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 premium-card !p-10 min-h-[400px]">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <TrendingUp className="text-indigo-600" />
                            अलीकडील तपासणी नोंदी
                        </h2>
                        <Link href="/inspection/log" className="text-sm font-bold text-indigo-600 hover:underline">सर्व पहा</Link>
                    </div>

                    <div className="space-y-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-6 group cursor-pointer">
                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    ०{i}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-slate-800">सजा {i === 1 ? 'करंज' : i === 2 ? 'साठवणे' : 'रहीमपूर'} - तपासणी पूर्ण</h4>
                                    <p className="text-slate-500 text-sm">तपासणी अधिकारी: श्री. पाटील | २ तास पूर्वी</p>
                                </div>
                                <div className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest">
                                    Success
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="gradient-bg rounded-[40px] p-10 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl shadow-indigo-300">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black leading-tight">त्वरित अहवाल आणि विश्लेषण</h2>
                        <p className="text-white/70 mt-4 font-medium italic">सर्व प्रलंबित कामांची यादी सोशल मीडिया किंवा ईमेलवर पाठवण्यासाठी तयार करा.</p>
                    </div>
                    <div className="relative z-10 mt-10">
                        <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all active:scale-[0.98]">
                            PDF डाउनलोड करा
                        </button>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -ml-5 -mb-5" />
                </div>
            </div>
        </div>
    );
}
