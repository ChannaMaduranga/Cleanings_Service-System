import express from "express";
import cors from "cors";
import db from "./config/db.js";
import jwt from "jsonwebtoken";
import bookingsRoute from "./routes/bookings.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/", (req, res) => {
  return res.json("from backend side");
});

// Routes
app.use("/api", bookingsRoute);

//  Signup 
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const checkQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkQuery, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    
    if (results.length > 0) {
      return res.status(400).json({ error: "Username already exists" });  
    }

    // Hash  password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      // Insert user
      const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(insertQuery, [username, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Insert failed" });
        }
        return res.status(200).json({ message: "User registered successfully" });
      });
    });
  });
});


//  Login 
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Admin 
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ id: 1, role: "admin" }, "secretkey", {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Admin login successful", token });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const user = results[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign({ id: user.id }, "secretkey", {
        expiresIn: "1h",
      });

      res
        .cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "success",
          user: {
            id: user.id,
            username: user.username
          }
        });
    });
  });
});

// Add service
app.post("/services", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO services (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Service already exists or DB error" });
    }
    return res.status(200).json({ message: "Service added successfully" });
  });
});

// Get services list
app.get("/services", (req, res) => {
  const sql = "SELECT * FROM services";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Delete service
app.delete("/services/:id", (req, res) => {
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

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
