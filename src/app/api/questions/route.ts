import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/google/sheets';

export async function GET() {
    try {
        const questions = await getQuestions();
        return NextResponse.json(questions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
