const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv');

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.mongodb_uri, // Ensure this is defined in your .env
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    console.log(file)
    return {
      filename: `vehicle_${Date.now()}`,  // Custom filename
      bucketName: 'uploads',
      metadata: { contentType: file.mimetype }, // ✅ Set content type!
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
