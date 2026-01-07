import { getSheetsClient } from './auth';

// Hardcoded for production stability
const SPREADSHEET_ID = "11NCa_DbttL6x4Fq_oHRFooweNfNPNPq6nIlPl7OUQVU";

export async function getSheetData(range: string) {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range,
    });
    return response.data.values;
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

export async function updateSheetData(range: string, values: any[][]) {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range,
        valueInputOption: 'RAW',
        requestBody: { values },
    });
}

// Question_Master operations
export async function getQuestions() {
    const data = await getSheetData('Question_Master!A2:E');
    return data?.map(row => ({
        id: row[0],
        department: row[1],
        questionText: row[2],
        isDocumentMandatory: row[3] === 'TRUE',
        marks: parseInt(row[4], 10),
    })) || [];
}

// Inspection_Log operations
export async function getInspectionLogs() {
    const data = await getSheetData('Inspection_Log!A2:F');
    return data?.map(row => ({
        inspectionId: row[0],
        date: row[1],
        sajaName: row[2],
        vroName: row[3],
        inspectionOfficer: row[4],
        status: row[5],
    })) || [];
}

// Responses_Compliance operations
export async function getResponses(logId?: string) {
    const data = await getSheetData('Responses_Compliance!A2:G');
    const filtered = logId ? data?.filter(row => row[0] === logId) : data;
    return filtered?.map(row => ({
        logId: row[0],
        questionId: row[1],
        officerFeedback: row[2],
        seniorOfficerOpinion: row[3],
        vroCompliance: row[4],
        driveLink: row[5],
        finalRemark: row[6],
    })) || [];
}
