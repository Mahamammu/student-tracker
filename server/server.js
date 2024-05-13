const express=require('express');
const mysql=require('mysql');
const cors=require('cors');


const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'bv6bfe2uwequl22lx28i-mysql.services.clever-cloud.com',
    user:'uupqltgarczdkgaz',
    password:'co61pSPHUOnesSdCJbwk',
    database:'bv6bfe2uwequl22lx28i'
});



db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


//signup
app.post('/api/signup', async (req, res) => {
    try {
      const { name, username, email, password} = req.body;
  
      // Log received data
      console.log('Received data:', req.body);

    const sql = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
    const values = [name, username, email, password];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
    res.status(201).json({ success: true, message: 'User registered successfully' });
} catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'SELECT * FROM users WHERE email = ?';
  
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.length === 0) {
                    res.status(401).json({ error: 'Enter Valid Email and Password' });
                } else {
                    const passwordMatch = password === result[0].password;
                    if (!passwordMatch) {
                        res.status(401).json({ error: 'Incorrect email or password' });
                    } else {
                        res.status(200).json({ success: true, email: result[0].email, userId: result[0].id, message: 'Login successfully done' });
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });


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
                    //console.log("userdata:", result[0]);
                    res.status(200).json({ success: true, user: result[0] });
                }
            }
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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



app.get('/api/all-tasks', async (req, res) => {
    try {
      // Define the SQL query to fetch all books from the database
      const sql = "SELECT t.id,t.task_name, t.task_description, t.tools_used,t.assigned_to_id, t.stats,DATE_FORMAT(t.deadline, '%d-%m-%Y') AS deadline, u.name AS assigned_to_name FROM tasks t JOIN users u ON t.assigned_to_id = u.id order by t.id";
  
      // Execute the query
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).json({ error: 'Error: mysql' });
        } else {
          // Respond with the fetched books
          console.log(result)
          res.status(200).json({ success: true, tasks: result });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/api/admin-completed-tasks', async (req, res) => {
    try {
      // Define the SQL query to fetch all books from the database
      const sql = "SELECT t.task_name, t.task_description, t.tools_used,t.assigned_to_id, t.stats,DATE_FORMAT(t.deadline, '%d-%m-%Y') AS deadline, u.name AS assigned_to_name FROM tasks t JOIN users u ON t.assigned_to_id = u.id WHERE t.stats = 'Completed' ORDER BY t.id ";
  
      // Execute the query
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).json({ error: 'Error: mysql' });
        } else {
          // Respond with the fetched books
          res.status(200).json({ success: true, tasks: result });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  app.get('/api/user-names', async (req, res) => {
    try {
        const sql = 'SELECT id, name FROM users';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // const userNames = result.map(row => row.name);
                res.status(200).json({ result });
            }
        });
    } catch (error) {
        console.error('Error getting user IDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/add-task', async (req, res) => {
  try {
      const { taskName, taskDescription, toolsUsed, deadline, assignedToName } = req.body;

      // Validate the incoming data (e.g., check for required fields)
      // console.log("add tasks");
      // Insert the task details into the database
      const sql = 'INSERT INTO tasks (task_name, task_description, tools_used, deadline, assigned_to_id, stats) VALUES (?, ?, ?, ?, ?, "Pending")';
      db.query(sql, [taskName, taskDescription, toolsUsed, deadline, assignedToName], (err, result) => {
          if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Internal Server Error' });
          } else {
              // console.log('Task added successfully');
              res.status(200).json({ success: true });
          }
      });
  } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/pending-tasks/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      // Define the SQL query to fetch tasks assigned to the specified user ID
      const sql = "SELECT id, task_name, task_description, tools_used, DATE_FORMAT(deadline, '%d-%m-%Y') AS deadline, assigned_to_id FROM tasks WHERE assigned_to_id = ? AND stats = 'Pending'";
       console.log(userId);
      // Execute the query with the user ID as a parameter
      db.query(sql, [userId], (err, result) => {
          if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Error: mysql' });

          } else {
              // Respond with the fetched tasks
              console.log(result);
              res.status(200).json({ success: true, tasks: result });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/update-task', async (req, res) => {
  try {
      const { taskId } = req.body;
      const sql = "UPDATE tasks SET stats = 'Completed' WHERE id = ?";
      db.query(sql, [taskId], (err, result) => {
          if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Error: mysql' });
          }
          else{
            res.status(200).json({ success: true });
          }
      })
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }});



app.get('/api/completed-tasks/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      // Define the SQL query to fetch tasks assigned to the specified user ID
      const sql = "SELECT id, task_name, task_description, tools_used, DATE_FORMAT(deadline, '%d-%m-%Y') AS deadline, assigned_to_id FROM tasks WHERE assigned_to_id = ? AND stats = 'Completed'";
      //console.log(userId);
      // Execute the query with the user ID as a parameter
      db.query(sql, [userId], (err, result) => {
          if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Error: mysql' });

          } else {
              // Respond with the fetched tasks
              // console.log(result);
              res.status(200).json({ success: true, tasks: result });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/delete-tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  console.log(taskId);

  try {
      const sql = 'DELETE FROM tasks WHERE id = ?';
      db.query(sql, [taskId], (err, result) => {
          if (err) {
              console.error('Error deleting task:', err);
              res.status(500).json({ error: 'Internal Server Error' });
          } else {
              res.status(200).json({ message: 'Task deleted successfully' });
          }
      });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.listen(8081, () => {
    console.log(`Server is running on port 8081`);
  });