const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const { getInsights } = require('../controllers/ai.controller');

router.get('/insights', auth, getInsights);

module.exports = router;