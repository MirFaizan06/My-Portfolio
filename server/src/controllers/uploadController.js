import { bucket } from '../../firebase/firebaseAdmin.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket().file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({ success: false, error: 'Failed to upload file' });
    });

    stream.on('finish', async () => {
      // Make file public
      await fileUpload.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket().name}/${fileName}`;

      res.json({
        success: true,
        data: {
          fileName,
          url: publicUrl,
        },
      });
    });

    stream.end(file.buffer);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({ success: false, error: 'Filename is required' });
    }

    await bucket().file(filename).delete();

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
