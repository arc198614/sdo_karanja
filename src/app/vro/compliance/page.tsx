'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, Send, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const pendingTasks = [
    { id: 'Q1', text: 'सजा डायरी अद्ययावत आहे का?', dept: 'महसूल', mandatory: true },
    { id: 'Q2', text: 'सातबारा संगणकीकरण पूर्ण झाले आहे का?', dept: 'महसूल', mandatory: true },
];

export default function VROCompliance() {
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [complianceText, setComplianceText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submission logic will go here
        alert('पूर्तता यशस्वीरित्या सादर केली!');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">पूर्तता आणि अहवाल (Compliance & Status)</h1>
                <p className="text-gray-500 mt-1 text-lg">त्रुटींचे स्पष्टीकरण आणि आवश्यक कागदपत्रे येथे अपलोड करा.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <AlertCircle className="text-amber-500" size={24} />
                        अनुपालन आवश्यक ({pendingTasks.length})
                    </h2>
                    {pendingTasks.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => setSelectedTask(task.id)}
                            className={cn(
                                "premium-card p-4 cursor-pointer border-2 transition-all",
                                selectedTask === task.id ? "border-indigo-600 bg-indigo-50/30" : "border-transparent"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-bold text-slate-600">{task.dept}</span>
                                {task.mandatory && (
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">कागदपत्र अनिवार्य</span>
                                )}
                            </div>
                            <p className="font-medium text-gray-900">{task.text}</p>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-2">
                    {selectedTask ? (
                        <form onSubmit={handleSubmit} className="premium-card p-8 space-y-6">
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">आपले स्पष्टीकरण / पूर्तता</label>
                                <textarea
                                    className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
                                    placeholder="येथे माहिती लिहा..."
                                    value={complianceText}
                                    onChange={(e) => setComplianceText(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">कागदपत्र अपलोड करा (PDF/Image)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer group">
                                    <Upload className="text-gray-400 group-hover:text-indigo-600 transition-colors mb-4" size={48} />
                                    <p className="text-gray-600 font-medium">फाईल निवडण्यासाठी येथे क्लिक करा</p>
                                    <p className="text-gray-400 text-sm mt-1">किंवा फाईल येथे ओढून सोडा (Drag & Drop)</p>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                    {file && (
                                        <div className="mt-4 p-3 bg-indigo-100 rounded-xl flex items-center gap-3 text-indigo-700 font-bold">
                                            <FileText size={20} />
                                            {file.name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">ड्राइव्ह लिंक (पर्यायी)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="url"
                                        placeholder="https://drive.google.com/..."
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
                                >
                                    <Send size={24} />
                                    पूर्तता सादर करा
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="premium-card p-12 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                <FileText size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">काम निवडलेले नाही</h3>
                            <p className="text-gray-500 max-w-xs">डाव्या बाजूला असलेल्या कामांपैकी एक निवडा ज्याची पूर्तता आपल्याला सादर करायची आहे.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
