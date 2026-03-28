const express = require('express');
const router = express.Router();
const authController = require('../controllers/autth.controller');

// Register a new user
router.post('/register', authController.register);

// Alias signup to register for backward compatibility
router.post('/signup', authController.register);

// Login a user
router.post('/login', authController.login);

module.exports = router;
