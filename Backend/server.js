import express from "express";
import cors from "cors";
import db from './config/db.js'
import jwt from 'jsonwebtoken';
import bookingsRoute from './routes/bookings.js'



const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (re, res) => {
  return res.json("from backend side");
});

// controllers
app.use('/api', bookingsRoute); 
// signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "User already exists or DB error" });
    }
    return res.status(200).json({ message: "User registered successfully" });
  });
});

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ id: 1, role: "admin" }, "secretkey", {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Admin login successful", token });
  }

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const token = jwt.sign({ id: results[0].id }, "secretkey", {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token });
  });
});


// bookings


app.post("/services", (req, res) => {
  const { name } = req.body;

  const query = "INSERT INTO services (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "service already exists or DB error" });
    }
    return res.status(200).json({ message: "service add successful" });
  });
});

// get servises list
app.get("/services", (req, res) => {
  const sql = "SELECT * FROM services";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// add service


app.post('/services', (req, res) => {
    const { service_type } = req.body;
    const sql = "INSERT INTO services (service_type) VALUES (?)";
    db.query(sql, [service_type], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Service added successfully", id: result.insertId });
    });
});

// Dlete service
app.delete('/services/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM services WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error deleting service" });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json({ message: "Service deleted successfully" });
    });
  });

//   booking

  
  

app.listen(8081, () => {
  console.log("Listening");
});
