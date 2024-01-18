// pages/api/upload.js
import multer from 'multer';
import { storage as firebaseStorage } from '../../firebase'; // Rename the imported variable
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const storage = getStorage();
const upload = multer();

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

export default async function handler(req, res) {
  try {
    // Use multer middleware to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      // Log the received file information
      console.log('Received file:', req.file);

      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;

      console.log('File buffer length:', fileBuffer.length);
      console.log('File name:', fileName);

      const metadata = {
        contentType: 'image/jpg',
      };

      const storageRef = ref(firebaseStorage, 'imagestwo/' + fileName); // Use renamed variable here
      const uploadTask = uploadBytesResumable(storageRef, fileBuffer, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle errors during upload
          console.error('Error during upload:', error);
          res.status(500).json({ error: 'Failed to upload file' });
        },
        async () => {
          try {
            // File uploaded successfully, now get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            res.status(200).json({ success: true, downloadURL });
          } catch (error) {
            console.error('Error getting download URL:', error);
            res.status(500).json({ error: 'Failed to get download URL' });
          }
        }
      );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}
