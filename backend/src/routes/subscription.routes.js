const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  uploadSubscriptions
} = require('../controllers/subscriptions.controller.');

router.post('/', auth, addSubscription);
router.post('/upload', upload.single('file'), uploadSubscriptions);
router.get('/', auth, getSubscriptions);
router.delete('/:id', auth, deleteSubscription);
module.exports = router;