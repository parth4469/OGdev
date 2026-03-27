const multer = require('multer');
const path = require('path');

// Configure multer to store files in memory for fast parsing
const storage = multer.memoryStorage();

// Accept only CSV and JSON files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ext === '.csv' || 
    ext === '.json' || 
    file.mimetype === 'text/csv' || 
    file.mimetype === 'application/json'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV and JSON files are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
