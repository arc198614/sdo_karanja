const { getSheetsClient } = require('./auth');
const questions = require('./questions.json');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

async function initSheet() {
    const sheets = getSheetsClient();

    // 1. Create Tabs if they don't exist
    // Note: This requires specific logic to check and add sheets.
    // For simplicity, we assume the user has created the tabs or we provide a guide.

    // 2. Seed Question_Master
    const values = [
        ['Q_ID', 'विभागाचे_नाव', 'प्रश्न_मजकूर', 'कागदपत्र_सक्ती', 'गुण'],
        ...questions.map(q => [q.id, q.dept, q.text, q.mandatory.toString().toUpperCase(), q.marks.toString()])
    ];

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Question_Master!A1',
            valueInputOption: 'RAW',
            requestBody: { values },
        });
        console.log('Question_Master seeded successfully!');
    } catch (error) {
        console.error('Error seeding Question_Master:', error.message);
    }
}

// Export for use in a transition or manual run
module.exports = { initSheet };
