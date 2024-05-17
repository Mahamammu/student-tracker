const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'bv6bfe2uwequl22lx28i-mysql.services.clever-cloud.com',
    user: 'uupqltgarczdkgaz',
    password: 'co61pSPHUOnesSdCJbwk',
    database: 'bv6bfe2uwequl22lx28i'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Signup
app.post('/api/signup', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const sql = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
        const values = [name, username, email, password];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ success: true, message: 'User registered successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ?';

        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.length === 0 || password !== result[0].password) {
                    res.status(401).json({ error: 'Incorrect email or password' });
                } else {
                    res.status(200).json({ success: true, email: result[0].email, userId: result[0].id, message: 'Login successfully done' });
                }
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get User by ID
app.get('/api/getUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM users WHERE id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ error: 'User not found' });
                } else {
                    res.status(200).json({ success: true, user: result[0] });
                }
            }
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Users
app.get('/api/getStudents', async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, students: result });
            }
        });
    } catch (error) {
        console.error('Error getting students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Tasks
app.get('/api/all-tasks', async (req, res) => {
    try {
        const sql = "SELECT t.id, t.task_name, t.task_description, t.tools_used, t.assigned_to_id, t.stats, DATE_FORMAT(t.deadline, '%d-%m-%Y') AS deadline, u.name AS assigned_to_name FROM tasks t JOIN users u ON t.assigned_to_id = u.id ORDER BY t.id";
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, tasks: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Admin Completed Tasks
app.get('/api/admin-completed-tasks', async (req, res) => {
    try {
        const sql = "SELECT t.task_name, t.task_description, t.tools_used, t.assigned_to_id, t.stats, DATE_FORMAT(t.deadline, '%d-%m-%Y') AS deadline, u.name AS assigned_to_name, t.completion_link, DATE_FORMAT(t.completed_at, '%d-%m-%Y %H:%i:%s') AS completed_at FROM tasks t JOIN users u ON t.assigned_to_id = u.id WHERE t.stats = 'Completed' ORDER BY t.id";
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, tasks: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get User Names
app.get('/api/user-names', async (req, res) => {
    try {
        const sql = 'SELECT id, name FROM users';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ result });
            }
        });
    } catch (error) {
        console.error('Error getting user IDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add Task
app.post('/api/add-task', async (req, res) => {
    try {
        const { taskName, taskDescription, toolsUsed, deadline, assignedToName } = req.body;
        const sql = 'INSERT INTO tasks (task_name, task_description, tools_used, deadline, assigned_to_id, stats) VALUES (?, ?, ?, ?, ?, "Pending")';
        db.query(sql, [taskName, taskDescription, toolsUsed, deadline, assignedToName], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true });
            }
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Pending Tasks for a User
app.get('/api/pending-tasks/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const sql = "SELECT id, task_name, task_description, tools_used, DATE_FORMAT(deadline, '%d-%m-%Y') AS deadline, assigned_to_id FROM tasks WHERE assigned_to_id = ? AND stats = 'Pending'";
        db.query(sql, [userId], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Error: mysql' });
            } else {
                res.status(200).json({ success: true, tasks: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Task (Mark as Completed)
app.post('/api/update-task', async (req, res) => {
    try {
        const { taskId, completionLink } = req.body;
        const sql = "UPDATE tasks SET stats = 'Completed', completion_link = ?, completed_at = NOW() WHERE id = ?";
        db.query(sql, [completionLink, taskId], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true });
            }
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Completed Tasks for a User
app.get('/api/completed-tasks/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const sql = "SELECT id, task_name, task_description, tools_used, DATE_FORMAT(deadline, '%d-%m-%Y') AS deadline, assigned_to_id, completion_link, DATE_FORMAT(completed_at, '%d-%m-%Y %H:%i:%s') AS completed_at FROM tasks WHERE assigned_to_id = ? AND stats = 'Completed'";
        db.query(sql, [userId], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Error: mysql' });
            } else {
                res.status(200).json({ success: true, tasks: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
