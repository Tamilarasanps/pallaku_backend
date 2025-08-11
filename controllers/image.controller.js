// controllers/imageController.js
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

const getImageById = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    // Get file metadata to read content type
    const files = await db.collection("uploads.files").find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set content type from file metadata
    res.set("Content-Type", files[0].contentType || "image/jpeg");

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on("error", () => {
      res.status(404).json({ message: "Image not found" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getImageById };
