import React from 'react';
import { getQuestions } from '@/lib/google/sheets';
import { Plus, Search, Filter, Edit2, Trash2, FileCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function QuestionMaster() {
    const questions = await getQuestions();

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">प्रश्न मास्टर (Question Master)</h1>
                    <p className="text-gray-500 mt-1 text-lg">गुगल शीटमधून प्राप्त झालेले प्रश्न.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-bold">
                    <Plus size={20} />
                    नवीन प्रश्न (Sheet मध्ये जोडा)
                </button>
            </div>

            <div className="premium-card p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="प्रश्न किंवा विभाग शोधा..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold">
                        <Filter size={20} />
                        फिल्टर
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">विभागाचे नाव</th>
                                <th className="px-6 py-4 w-1/2">प्रश्न मजकूर</th>
                                <th className="px-6 py-4">कागदपत्र सक्ती</th>
                                <th className="px-6 py-4">गुण</th>
                                <th className="px-6 py-4">कृती</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {questions.length > 0 ? questions.map((q) => (
                                <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{q.id}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
                                            {q.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 font-medium text-lg">{q.questionText}</td>
                                    <td className="px-6 py-4">
                                        {q.isDocumentMandatory ? (
                                            <span className="flex items-center gap-1 text-green-600 font-bold">
                                                <FileCheck size={18} /> होय
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">नाही</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-bold">{q.marks}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all">
                                                <Edit2 size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        कोणतेही प्रश्न आढळले नाहीत. कृपया गुगल शीट तपासा.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
