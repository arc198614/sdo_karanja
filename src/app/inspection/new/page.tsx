'use client';

import React, { useState, useEffect } from 'react';
import { Save, ChevronRight, ChevronLeft, CheckCircle, AlertCircle, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    id: string;
    department: string;
    questionText: string;
    isDocumentMandatory: boolean;
    marks: number;
}

export default function NewInspection() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); // 1: Header Info, 2: Questions, 3: Summary
    const [formData, setFormData] = useState({
        officerName: '',
        date: new Date().toISOString().split('T')[0],
        sajaName: '',
        vroName: '',
        responses: {} as Record<string, { feedback: string; marks: number }>
    });

    useEffect(() => {
        fetch('/api/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                setLoading(false);
            });
    }, []);

    const handleResponseChange = (qId: string, feedback: string, marks: number) => {
        setFormData(prev => ({
            ...prev,
            responses: {
                ...prev.responses,
                [qId]: { feedback, marks }
            }
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/inspection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('तपासणी यशस्वीरित्या जतन केली!');
                window.location.href = '/inspection/log';
            }
        } catch (error) {
            console.error(error);
            alert('काहीतरी चूक झाली आहे.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && step === 2) return <div className="p-8 text-center text-xl font-bold">लोड होत आहे...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">नवीन दप्तर तपासणी</h1>
                    <p className="text-gray-500 mt-1">तपासणीचा तपशील आणि अभिप्राय भरा.</p>
                </div>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={cn(
                            "w-10 h-2 rounded-full",
                            step >= i ? "bg-indigo-600" : "bg-gray-200"
                        )} />
                    ))}
                </div>
            </div>

            {step === 1 && (
                <div className="premium-card p-10 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <User className="text-indigo-600" />
                        तपासणीचे प्राथमिक तपशील
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">तपासणी अधिकाऱ्याचे नाव व हुद्दा</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.officerName}
                                onChange={e => setFormData({ ...formData, officerName: e.target.value })}
                                placeholder="उदा. श्री. पाटील (तहसीलदार)"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">तपासणीची तारीख</label>
                            <input
                                type="date"
                                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">सजाचे नाव</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.sajaName}
                                onChange={e => setFormData({ ...formData, sajaName: e.target.value })}
                                placeholder="उदा. करंज"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ग्रा.म.अधिकारी यांचे नाव</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.vroName}
                                onChange={e => setFormData({ ...formData, vroName: e.target.value })}
                                placeholder="उदा. श्री. देशमुख"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setStep(2)}
                        disabled={!formData.officerName || !formData.sajaName}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        पुढील पायरी: प्रश्नोत्तरे
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="premium-card p-8 space-y-4 border-l-8 border-indigo-600">
                            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{q.department}</span>
                                    <p className="text-xl font-bold text-gray-900">{idx + 1}. {q.questionText}</p>
                                </div>
                                <div className="bg-indigo-50 px-3 py-1 rounded-lg">
                                    <span className="text-sm font-bold text-indigo-700">गुण: {q.marks}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                <div className="md:col-span-3 space-y-2">
                                    <label className="text-sm font-bold text-gray-600">तपासणी अहवाल / अभिप्राय</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                                        placeholder="येथे आपला अभिप्राय लिहा..."
                                        onChange={e => handleResponseChange(q.id, e.target.value, formData.responses[q.id]?.marks || 0)}
                                        value={formData.responses[q.id]?.feedback || ''}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600">मिळालेले गुण</label>
                                    <input
                                        type="number"
                                        max={q.marks}
                                        min={0}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={e => handleResponseChange(q.id, formData.responses[q.id]?.feedback || '', parseInt(e.target.value))}
                                        value={formData.responses[q.id]?.marks || 0}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-4">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                        >
                            <ChevronLeft size={20} />
                            मागे जा
                        </button>
                        <button
                            onClick={() => setStep(3)}
                            className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                            तपासणी पूर्ण करा
                            <CheckCircle size={20} />
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="premium-card p-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">तपासणी अहवाल तयार आहे!</h2>
                    <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-3">
                        <p className="flex justify-between font-medium"><span>अधिकारी:</span> <span className="font-bold">{formData.officerName}</span></p>
                        <p className="flex justify-between font-medium"><span>सजा:</span> <span className="font-bold">{formData.sajaName}</span></p>
                        <p className="flex justify-between font-medium"><span>एकूण प्रश्न:</span> <span className="font-bold">{questions.length}</span></p>
                        <p className="flex justify-between font-medium"><span>दिलेले गुण:</span> <span className="font-bold text-indigo-700">{Object.values(formData.responses).reduce((acc, curr) => acc + curr.marks, 0)}</span></p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setStep(2)}
                            className="flex-1 py-4 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
                        >
                            दुरुस्ती करा
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-[2] py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? 'जतन होत आहे...' : 'अंतिम सबमिट करा'}
                            <Save size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
