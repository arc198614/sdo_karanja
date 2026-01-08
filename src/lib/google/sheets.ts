import { getSheetsClient } from './auth';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getSheetData(range: string) {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range,
    });
    return response.data.values;
}

export async function getSajas(): Promise<string[]> {
    const values = await getSheetData('Saja_Master!A2:A');
    return values?.map((row: any[]) => row[0]).filter(Boolean) || [];
}

export async function appendSheetData(range: string, values: any[][]) {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range,
        valueInputOption: 'RAW',
        requestBody: { values },
    });
}

interface Question {
    id: string;
    department: string;
    text: string;
    mandatory: boolean;
    marks: number;
}

interface InspectionLog {
    id: string;
    date: string;
    saja: string;
    vro: string;
    officer: string;
    status: string;
}

// Custom Fetchers
export async function getQuestions(): Promise<Question[]> {
    const values = await getSheetData('Question_Master!A2:E');
    return values?.map((row: any[]) => ({
        id: row[0],
        department: row[1],
        text: row[2],
        mandatory: row[3] === 'TRUE',
        marks: parseInt(row[4]) || 0,
    })) || [];
}

export async function getInspectionLogs(): Promise<InspectionLog[]> {
    const values = await getSheetData('Inspection_Log!A2:F');
    return values?.map((row: any[]) => ({
        id: row[0],
        date: row[1],
        saja: row[2],
        vro: row[3],
        officer: row[4],
        status: row[5],
    })) || [];
}

export async function getStats() {
    const questions = await getQuestions();
    const logs = await getInspectionLogs();

    const pending = logs.filter(l => l.status === 'PENDING' || l.status === 'प्रलंबित').length;
    const completed = logs.filter(l => l.status === 'COMPLETED' || l.status === 'पूर्ण').length;

    return { totalQuestions: questions.length, pending, completed, totalLogs: logs.length };
}
