import { NextResponse } from 'next/server';
import { getSajas, updateSajas } from '@/lib/google/sheets';

export async function GET() {
    try {
        const sajas = await getSajas();
        return NextResponse.json(sajas);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { sajas } = await req.json();
        await updateSajas(sajas);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
