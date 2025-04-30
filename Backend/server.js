import express from "express";
import cors from "cors";
import db from "./config/db.js";
import jwt from "jsonwebtoken";
import bookingsRoute from "./routes/bookings.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Credentials', true);
  next();
})



app.get("/", (re, res) => {
  return res.json("from backend side");
});

// controllers
app.use("/api", bookingsRoute);
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
    
    // console.log(results[0].id)
    
    const token = jwt.sign({ id: results[0].id }, "secretkey", {
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
          id: results[0].id,
          username: results[0].username
        }
      });
  });
});

// add service

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



// Dlete service
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
  console.log("Listening");
});
