
import express from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./worlddrive.db");

db.run(`CREATE TABLE IF NOT EXISTS journal (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT,
  text TEXT,
  km INTEGER,
  reply TEXT
)`);

app.post("/api/journal", (req, res) => {
  const { user, text, km } = req.body;
  db.run("INSERT INTO journal(user,text,km) VALUES(?,?,?)",
    [user, text, km],
    () => res.json({ success: true })
  );
});

app.get("/api/community", (req, res) => {
  db.all("SELECT * FROM journal ORDER BY id DESC", [], (e, rows) =>
    res.json(rows)
  );
});

app.listen(3000, () => console.log("World Drive Simulator running"));
