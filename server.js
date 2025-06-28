const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve HTML, CSS from public folder

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/reservationsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  datetime: String,
  guests: String,
  requests: String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// POST route to save reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({ message: 'Reservation saved!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving reservation', error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
