import { google } from 'googleapis';
import { CREDENTIALS } from './credentials_production';

export const getGoogleAuth = () => {
    const email = CREDENTIALS.client_email;
    const privateKey = CREDENTIALS.private_key.replace(/\\n/g, '\n');

    if (!email || !privateKey) {
        throw new Error('Google Service Account credentials are missing');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: email,
            private_key: privateKey,
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
        ],
    });

    return auth;
};

export const getSheetsClient = () => {
    const auth = getGoogleAuth();
    return google.sheets({ version: 'v4', auth });
};

export const getDriveClient = () => {
    const auth = getGoogleAuth();
    return google.drive({ version: 'v3', auth });
};
