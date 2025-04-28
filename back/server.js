const express = require('express');
const multer = require('multer');
const app = express();
const port = 5000;
const db = require('./db.js');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

app.get("/api/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
});

app.get("/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.render("index", { users });
});

app.get("/users/new", (req, res) => {
    res.render("new");
});

app.post("/users", upload.single('payment'), (req, res) => {
    const { first_name, last_name, middle_name, suffix, contact, gender, birthdate, nationality, country, address, school_name, academic_strand, academic_track, yr_graduated, program_choice_1, program_choice_2, program_choice_3, exam_date } = req.body;
    const filePath = req.file ? '/uploads/' + req.file.filename : null;

    db.prepare("INSERT INTO users (first_name, last_name, middle_name, suffix, contact, gender, birthdate, nationality, country, address, school_name, academic_strand, academic_track, yr_graduated, program_choice_1, program_choice_2, program_choice_3, exam_date, payment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
        first_name, last_name, middle_name, suffix, contact, gender, birthdate, nationality, country, address, school_name, academic_strand, academic_track, yr_graduated, program_choice_1, program_choice_2, program_choice_3, exam_date, filePath
    );
    res.redirect("/users");
});

app.get("/users/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

app.get("/users/:id/edit", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    res.render("edit", { user });
});

app.post("/users/:id", (req, res) => {
    const { name, email } = req.body;
    db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?").run(name, email, req.params.id);
    res.redirect("/users");
});

app.post("/users/:id/delete", (req, res) => {
    db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
    res.redirect('/users');
});

app.get("/debug", (req, res) => {
    const user = db.prepare("SELECT * FROM users").all();
    res.json(user);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
