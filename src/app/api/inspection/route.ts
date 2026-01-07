import { NextResponse } from 'next/server';
import { appendSheetData } from '@/lib/google/sheets';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { officerName, date, sajaName, vroName, responses } = data;
        const inspectionId = `INS-${Date.now()}`;

        // 1. Save to Inspection_Log
        // Row: Inspection_ID, तारीख, सजा_नाव, ग्रा_म_अधिकारी_नाव, तपासणी_अधिकारी, स्थिती
        const logEntry = [
            inspectionId,
            date,
            sajaName,
            vroName,
            officerName,
            'PENDING' // Default status for VRO to take action
        ];
        await appendSheetData('Inspection_Log!A1', [logEntry]);

        // 2. Save to Responses_Compliance
        // Row: Log_ID, Q_ID, अधिकारी_अभिप्राय, वरिष्ठ_अधिकारी_मत, ग्रा_म_अधिकारी_पूर्तता, Drive_Link, निकाल_शेरा
        const complianceEntries = Object.entries(responses).map(([qId, res]: [string, any]) => [
            inspectionId,
            qId,
            res.feedback,
            '', // Senior Officer Opinion (Empty initially)
            '', // VRO Compliance (Empty initially)
            '', // Drive Link (Empty initially)
            ''  // Final Remark (Empty initially)
        ]);

        if (complianceEntries.length > 0) {
            await appendSheetData('Responses_Compliance!A1', complianceEntries);
        }

        return NextResponse.json({ success: true, inspectionId });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save inspection' }, { status: 500 });
    }
}
