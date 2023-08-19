 

// import multer from 'multer';
// import path from 'path';
// import { mongooseConnect } from '/lib/mongoose';

// export default async function handle(req, res) {
//   await mongooseConnect();

//   const storage = multer.diskStorage({
//     destination: './public/uploads/', // Specify your destination folder path
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });

//   const upload = multer({ storage }).single('file');

//   upload(req, res, function (err) {
//     if (err) {
//       return res.status(500).json({ error: 'Error uploading file' });
//     }

//     const uploadedFile = req.file;
//     if (!uploadedFile) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const fileLink = uploadedFile.path; // The path to the uploaded file on your server

//     return res.json({ link: fileLink });
//   });
// }

// export const config = {
//   api: { bodyParser: false },
// };

// import { useState } from 'react';
// import axios from 'axios';

// export default function ImageUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedLink, setUploadedLink] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post('/api/upload', formData);
//       setUploadedLink(response.data.link);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }

//     setUploading(false);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={uploading}>
//         Upload
//       </button>
//       {uploading && <p>Uploading...</p>}
//       {uploadedLink && <img src={uploadedLink} alt="Uploaded" />}
//     </div>
//   );
// }

import multer from 'multer';
import path from 'path';
import { mongooseConnect } from '/lib/mongoose';

export default async function handle(req, res) {
  await mongooseConnect();

  const storage = multer.diskStorage({
    destination: './public/uploads/', // Set your destination folder path
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage }).single('file');

  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileLink = `/uploads/${uploadedFile.filename}`; // The path to the uploaded file on your server

    return res.json({ link: fileLink });
  });
}

export const config = {
  api: { bodyParser: false },
};
