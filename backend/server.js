const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/policy', require('./routes/policy'));
app.use('/api/claim', require('./routes/claim'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/wallet', require('./routes/wallet'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend running' });
});

// Parametric trigger engine - runs every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  const { triggerParametricClaims } = require('./services/claimService');
  try {
    await triggerParametricClaims();
  } catch (err) {
    console.error('Parametric trigger error:', err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
