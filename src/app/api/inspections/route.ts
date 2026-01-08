import { NextResponse } from 'next/server';
import { appendSheetData } from '@/lib/google/sheets';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { saja, vroName, officer, date, responses } = body;
        const inspectionId = `INS-${Date.now()}`;

        // 1. Save to Inspection_Log (A: ID, B: Date, C: Saja, D: VRO, E: Officer, F: Status)
        await appendSheetData('Inspection_Log!A2', [[
            inspectionId,
            date,
            saja,
            vroName,
            officer,
            'COMPLETED'
        ]]);

        // 2. Save detailed responses to Responses_Log (A: InspectionID, B: QuestionID, C: Marks, D: Remarks, E: Files)
        const responseRows = Object.entries(responses).map(([qId, res]: [string, any]) => [
            inspectionId,
            qId,
            res.marks,
            res.remarks || '',
            (res.files || []).join(', ')
        ]);

        if (responseRows.length > 0) {
            await appendSheetData('Responses_Log!A2', responseRows);
        }

        return NextResponse.json({ success: true, id: inspectionId });
    } catch (error: any) {
        console.error('Submission Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
