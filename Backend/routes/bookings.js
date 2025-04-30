import express from 'express';
import db from '../config/db.js'; 
import authenticateToken from '../middlewares/auth.js'; 

const router = express.Router();

// add booking
router.post('/bookings', authenticateToken, (req, res) => {
  const { customer_name, address, date_time, service_type,userId } = req.body;
 
  if (!customer_name || !address || !date_time || !service_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = `
    INSERT INTO bookings (customer_name, address, date_time, service_id, user_id)
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


// get booking specific user
router.get('/bookings/:userId', authenticateToken, (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT b.*, u.username, s.name AS name
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN services s ON b.service_id = s.id
    WHERE b.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
});

// gett all bookings data
router.get('/bookings', (req, res) => {
  

  const sql = `
    SELECT b.*, u.username, s.name AS name
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN services s ON b.service_id = s.id
    
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
});

// delete booking
router.delete("/bookings/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM bookings WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting bookings" });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "bookings not found" });
    }
    return res.status(200).json({ message: "booking cancel successfully" });
  });
});


// update bookings
router.put("/bookings/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { customer_name, address, date_time, service_type } = req.body;

  if (!customer_name || !address || !date_time || !service_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    UPDATE bookings 
    SET customer_name = ?, address = ?, date_time = ?, service_id = ?
    WHERE id = ?
  `;

  db.query(sql, [customer_name, address, date_time, service_type, id], (err, result) => {
    if (err) {
      console.error('Error updating booking:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated successfully" });
  });
});



export default router;
