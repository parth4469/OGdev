const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


app.use(express.json());



const authRoutes = require('../src/routes/auth.routes');
const aiRoutes = require('../src/routes/ai.routes');
const subscriptionRoutes = require('../src/routes/subscription.routes');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
module.exports = app;