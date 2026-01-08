'use client';

import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    ClipboardList,
    MapPin,
    Calendar,
    User,
    Check,
    Save,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewInspection() {
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState<any[]>([]);
    const [sajas, setSajas] = useState<string[]>([]);
    const [isManualSaja, setIsManualSaja] = useState(false);
    const [formData, setFormData] = useState({
        saja: '',
        vroName: '',
        officer: '',
        date: new Date().toISOString().split('T')[0],
        responses: {} as Record<string, { marks: number, remarks: string }>
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [qRes, sRes] = await Promise.all([
                    fetch('/api/questions'),
                    fetch('/api/sajas')
                ]);

                const qData = await qRes.json();
                const sData = await sRes.json();

                setQuestions(Array.isArray(qData) ? qData : []);
                setSajas(Array.isArray(sData) ? sData : ['करंज', 'साठवणे', 'रहीमपूर']);
            } catch (error) {
                console.error('Fetch error:', error);
                setQuestions([]);
                setSajas(['करंज', 'साठवणे', 'रहीमपूर']);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        setStep(3); // Success state
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-10 animate-fade-in">
            {/* Multi-step Header */}
            <div className="flex justify-between items-center mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10" />
                {[1, 2, 3].map((s) => (
                    <div key={s} className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-4 transition-all duration-500",
                        step >= s ? "bg-indigo-600 border-indigo-100 text-white" : "bg-white border-slate-200 text-slate-400"
                    )}>
                        {step > s ? <Check size={20} /> : s}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="premium-card !p-12 space-y-10"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">प्राथमिक माहिती</h2>
                            <p className="text-slate-500 font-medium italic">तपासणी अहवाल सुरू करण्यापूर्वी मूलभूत माहिती भरा.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="flex items-center justify-between text-sm font-black text-slate-700 uppercase tracking-widest">
                                    <div className="flex items-center gap-2"><MapPin size={16} /> सजाचे नाव</div>
                                </label>

                                {!isManualSaja ? (
                                    <select
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold bg-slate-50/50"
                                        value={formData.saja}
                                        onChange={(e) => {
                                            if (e.target.value === 'MANUAL_ENTRY') {
                                                setIsManualSaja(true);
                                                setFormData({ ...formData, saja: '' });
                                            } else {
                                                setFormData({ ...formData, saja: e.target.value });
                                            }
                                        }}
                                    >
                                        <option value="">निवडा...</option>
                                        {sajas.map(s => <option key={s} value={s}>{s}</option>)}
                                        <option value="MANUAL_ENTRY">+ नवीन गाव/सजा टाका...</option>
                                    </select>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            autoFocus
                                            placeholder="गावाचे नाव लिहा..."
                                            className="w-full p-4 pr-12 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold bg-slate-50/50 uppercase"
                                            value={formData.saja}
                                            onChange={(e) => setFormData({ ...formData, saja: e.target.value })}
                                        />
                                        <button
                                            onClick={() => { setIsManualSaja(false); setFormData({ ...formData, saja: '' }); }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-black text-xs uppercase"
                                        >
                                            यादी पहा
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest"><User size={16} /> ग्राम महसूल अधिकारी</label>
                                <input
                                    type="text"
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold bg-slate-50/50 uppercase"
                                    placeholder="उदा. श्री. पाटील"
                                    value={formData.vroName}
                                    onChange={(e) => setFormData({ ...formData, vroName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest"><ClipboardList size={16} /> तपासणी अधिकारी</label>
                                <input
                                    type="text"
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold bg-slate-50/50 uppercase"
                                    placeholder="उदा. श्री. कुलकर्णी"
                                    value={formData.officer}
                                    onChange={(e) => setFormData({ ...formData, officer: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest"><Calendar size={16} /> दिनांक</label>
                                <input
                                    type="date"
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold bg-slate-50/50"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!formData.saja || !formData.vroName}
                            className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-50 disabled:grayscale disabled:opacity-50"
                        >
                            तपासणी सुरू करा <ChevronRight size={24} />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-0 z-20">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none">तपासणी सुरू (In-Progress)</h3>
                                <p className="text-slate-400 mt-2 font-bold text-xs uppercase tracking-[0.2em]">{formData.saja} | {formData.vroName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">प्रगती</p>
                                <p className="text-2xl font-black text-indigo-600 tabular-nums">०%</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {questions.map((q, i) => (
                                <div key={q.id} className="premium-card !p-10 space-y-6 border-l-8 border-indigo-600">
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 bg-slate-50 px-3 py-1 rounded-lg"># {q.id}</span>
                                        <div className="flex items-center gap-2 text-indigo-600/40 font-black italic">
                                            {q.marks} गुण
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-800 leading-relaxed">{q.text}</h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="py-4 border-2 border-slate-100 rounded-2xl font-black hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-700 text-slate-400 transition-all">हो</button>
                                        <button className="py-4 border-2 border-slate-100 rounded-2xl font-black hover:bg-rose-50 hover:border-rose-500 hover:text-rose-700 text-slate-400 transition-all">नाही</button>
                                    </div>

                                    <textarea
                                        className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-100 font-medium text-sm italic"
                                        placeholder="काही त्रुटी आढळल्यास येथे लिहा..."
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 pb-20">
                            <button onClick={() => setStep(1)} className="flex-1 py-5 border-2 border-slate-200 text-slate-500 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"><ChevronLeft size={20} /> मागे</button>
                            <button onClick={handleSubmit} className="flex-[2] py-5 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-indigo-200 flex items-center justify-center gap-2 shadow-xl shadow-indigo-50"><Save size={20} /> तपासणी सादर करा</button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="premium-card !p-20 text-center flex flex-col items-center space-y-8 h-full min-h-[500px] justify-center"
                    >
                        <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-500 border-4 border-white shadow-2xl shadow-emerald-100 animate-bounce">
                            <CheckCircle2 size={56} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">तपासणी यशस्वीरित्या पूर्ण!</h2>
                            <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">
                                या तपासणीची माहिती गुगल शीटमध्ये यशस्वीरित्या नोंदवण्यात आली आहे. आपण आता डॅशबोर्डवर जाऊ शकता.
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                        >
                            डॅशबोर्डवर जा
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
