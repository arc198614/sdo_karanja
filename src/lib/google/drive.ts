import { getDriveClient } from './auth';
import { Readable } from 'stream';

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

export async function createSajaFolder(sajaName: string) {
    const drive = getDriveClient();

    // Check if folder already exists
    const response = await drive.files.list({
        q: `name = '${sajaName}' and '${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
    });

    if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id;
    }

    // Create new folder
    const fileMetadata = {
        name: sajaName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [ROOT_FOLDER_ID!],
    };

    const folder = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
    });

    return folder.data.id;
}

export async function uploadToDrive(fileName: string, mimeType: string, content: Buffer, sajaName: string) {
    const drive = getDriveClient();
    const folderId = await createSajaFolder(sajaName);

    const fileMetadata = {
        name: fileName,
        parents: [folderId!],
    };

    const media = {
        mimeType: mimeType,
        body: Readable.from(content),
    };

    const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
    });

    return file.data;
}
