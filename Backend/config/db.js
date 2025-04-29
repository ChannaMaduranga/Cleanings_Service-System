import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cleaning_service_db",
  });
  
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("connected to MySQL");
    }
  });
  export default db;