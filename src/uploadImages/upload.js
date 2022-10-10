const {google} = require('googleapis');
const fs = require('fs');
const driveId = "1XFhXVJtzv3MHDU1svOY5hoQVcgyr3Ovy";

async function UploadImage(image){
    try {
        const auth = new google.Auth.GoogleAuth({
            keyFile: './googledrive.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })
        const driveService = google.drive({
            version: 'v3',
            auth
        })
        const fileName = {
            'name': image.name,
            'parents': [driveId]
        }
        const media = {
            mimeType: [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ],
            body: fs.createReadStream('./tmp/uploads')
        }
        const response = await driveService.files.create({
            resource: fileName,
            media: media,
            fields: 'id'
        })
        return response.data.id;
    } catch (error) {
        return error;
    }

}
module.exports = UploadImage;