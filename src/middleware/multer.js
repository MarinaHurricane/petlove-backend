import multer from "multer";

export const upload= multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    console.log(file.mimetype);
    if(!file.mimetype || !file.mimetype.startsWith('image/')) {
      return callback(new Error ('Invalid file type!'));
    }
    console.log(file.mimetype);
    callback(null, true);
  }
});
