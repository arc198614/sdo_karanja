import { NextResponse } from 'next/server';
import { getSajas } from '@/lib/google/sheets';

export async function GET() {
    try {
        const sajas = await getSajas();
        return NextResponse.json(sajas);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
