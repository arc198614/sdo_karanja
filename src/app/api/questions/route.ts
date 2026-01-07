import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/google/sheets';

export async function GET() {
    try {
        const questions = await getQuestions();
        return NextResponse.json(questions);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
    }
}
