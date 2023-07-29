const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// MySQL database configuration
const db = mysql.createPool({
  host: 'b8iiguavgjhpx4qmhmpy-mysql.services.clever-cloud.com',
  user: 'u9kbpvm8vjdqng40',
  password: 'JxpgglzamF4NJ0ohQiOd',
  database: 'b8iiguavgjhpx4qmhmpy',
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint to fetch all blogs
app.get('/api/blogs', (req, res) => {
  const sqlQuery = 'SELECT * FROM blogs';
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching blogs from database' });
    } else {
      res.status(200).json(result);
    }
  });
});

// API endpoint to create a new blog
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;
  const sqlQuery = 'INSERT INTO blogs (title, content) VALUES (?, ?)';
  db.query(sqlQuery, [title, content], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error creating new blog' });
    } else {
      res.status(201).json({ message: 'Blog created successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
