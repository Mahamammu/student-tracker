CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 username VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 password VARCHAR(255) NOT NULL
);



CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    tools_used VARCHAR(255),
    deadline DATE,
    assigned_to_id INT,
    FOREIGN KEY (assigned_to_id) REFERENCES users(id)
);


INSERT INTO tasks (task_name, task_description, tools_used, deadline, assigned_to_id)
VALUES 
    ('Task 1', 'Complete front-end design', 'HTML, CSS, JavaScript', '2024-03-15', 1),
    ('Task 2', 'Develop backend API', 'Node.js, Express.js', '2024-03-20', 2),
    ('Task 3', 'Write documentation', 'MS Word', '2024-03-25', 3);
