'use client';

import React from 'react';
import { Calendar, User, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const logs = [
    { id: 'INS001', date: '०५/०१/२०२६', saja: 'करंज', vro: 'श्री. एम. एम. देशमुख', officer: 'तहसीलदार साहेब', status: 'पूर्ण' },
    { id: 'INS002', date: '०७/०१/२०२६', saja: 'साठवणे', vro: 'श्री. ए. बी. पाटील', officer: 'नायब तहसीलदार', status: 'प्रलंबित' },
    { id: 'INS003', date: '०८/०१/२०२६', saja: 'रहीमपूर', vro: 'श्रीमती. एस. के. कुलकर्णी', officer: 'तहसीलदार साहेब', status: 'प्रलंबित' },
];

export default function InspectionLog() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">तपासणी नोंदणी (Inspection Log)</h1>
                <p className="text-gray-500 mt-1 text-lg">येथे सर्व झालेल्या आणि होणाऱ्या तपासणींची माहिती मिळेल.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {logs.map((log) => (
                    <div key={log.id} className="premium-card p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-100 rounded-2xl w-24 h-24">
                                <Calendar size={20} className="text-slate-500 mb-1" />
                                <span className="text-sm font-bold text-slate-900">{log.date}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
                                    <MapPin size={20} />
                                    <span>सजा: {log.saja}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 font-medium">
                                    <div className="flex items-center gap-1">
                                        <User size={16} />
                                        <span>ग्रा.म.अधिकारी: {log.vro}</span>
                                    </div>
                                    <div className="flex items-center gap-1 border-l pl-4 border-gray-200">
                                        <Clock size={16} />
                                        <span>तपासणी अधिकारी: {log.officer}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <span className={cn(
                                "px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2",
                                log.status === 'पूर्ण' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                            )}>
                                <div className={cn("w-2 h-2 rounded-full", log.status === 'पूर्ण' ? "bg-green-500" : "bg-amber-500")} />
                                {log.status}
                            </span>

                            <button className="flex items-center gap-2 text-indigo-600 font-bold hover:translate-x-1 transition-transform">
                                तपशील पहा
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
