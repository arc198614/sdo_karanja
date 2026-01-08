'use client';

import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Plus,
    Trash2,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function SajaSettings() {
    const [sajas, setSajas] = useState<string[]>([]);
    const [newSaja, setNewSaja] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetch('/api/sajas')
            .then(res => res.json())
            .then(data => {
                setSajas(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const addSaja = () => {
        if (!newSaja.trim()) return;
        if (sajas.includes(newSaja.trim())) {
            setMessage({ type: 'error', text: 'हे गाव आधीच यादीत आहे!' });
            return;
        }
        setSajas([...sajas, newSaja.trim()]);
        setNewSaja('');
        setMessage(null);
    };

    const removeSaja = (name: string) => {
        setSajas(sajas.filter(s => s !== name));
    };

    const saveToSheet = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/sajas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sajas })
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'गावांची यादी यशस्वीरित्या जतन केली!' });
            } else {
                const data = await res.json();
                throw new Error(data.error || 'Unknown error');
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'जतन करताना चूक झाली. कृपया "Saja_Master" टॅब तपास' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-10 space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-black text-slate-900">गाव / सजा व्यवस्थापन</h1>
                <p className="text-slate-500 mt-2 text-lg font-medium italic">येथून तुम्ही तपासणीसाठी लागणाऱ्या गावांची यादी मॅनेज करू शकता.</p>
            </header>

            <div className="premium-card !p-8 space-y-6">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="नवीन गावाचे नाव टाका..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold uppercase"
                            value={newSaja}
                            onChange={(e) => setNewSaja(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSaja()}
                        />
                    </div>
                    <button
                        onClick={addSaja}
                        className="px-8 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> जोडा
                    </button>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "p-4 rounded-xl flex items-center gap-3 font-bold",
                                message.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                            )}
                        >
                            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">सध्याची यादी ({sajas.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sajas.map((saja) => (
                            <motion.div
                                layout
                                key={saja}
                                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 transition-all group"
                            >
                                <span className="font-bold text-slate-700 uppercase">{saja}</span>
                                <button
                                    onClick={() => removeSaja(saja)}
                                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={saveToSheet}
                        disabled={saving}
                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center gap-3 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        यादी जतन करा (Save)
                    </button>
                </div>
            </div>
        </div>
    );
}
