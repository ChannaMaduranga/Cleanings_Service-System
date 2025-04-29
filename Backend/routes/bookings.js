import express from 'express';
import db from '../config/db.js'; // Make sure this file uses ES module syntax
import authenticateToken from '../middlewares/auth.js'; // Also must be ES module

const router = express.Router();

router.post('/bookings', authenticateToken, (req, res) => {
  const { customer_name, address, date_time, service_type } = req.body;
  const userId = req.user.id; // from token middleware

  if (!customer_name || !address || !date_time || !service_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO bookings (customer_name, address, datetime, service_type, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [customer_name, address, date_time, service_type, userId], (err, result) => {
    if (err) {
      console.error('Error saving booking:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    res.status(201).json({ message: 'Booking successful' });
  });
});

export default router;
