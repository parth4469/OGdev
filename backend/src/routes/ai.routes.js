const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { getInsights, analyzeTransactions } = require('../controllers/ai.controller');

router.get('/insights', auth, getInsights);
router.post('/analyze-transactions', upload.single('file'), analyzeTransactions);

module.exports = router;