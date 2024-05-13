import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Label, TextInput, Textarea, Card, Button } from 'flowbite-react';

const AddTask = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [toolsUsed, setToolsUsed] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedToName, setAssignedToName] = useState('');
    const [userNames, setUserNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const response = await axios.get('https://student-tracker-application.onrender.com/api/user-names');
                setUserNames(response.data.result);
            } catch (error) {
                console.error('Error fetching user names:', error);
            }
        };

        fetchUserNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://student-tracker-application.onrender.com/api/add-task', {
                taskName,
                taskDescription,
                toolsUsed,
                deadline,
                assignedToName
            });
            navigate('/taskslist');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-full md:max-w-2xl p-8 m-4">
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Add Task Details
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name" value="Task Name" />
                        <TextInput type="text" placeholder="Task Name" name="task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description" value="Task Description" />
                        <Textarea type="text" placeholder="Task Description" name="task description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="toolsUsed" value="Tools Used" />
                        <TextInput type="text" placeholder="Tools Used" name="tools used" value={toolsUsed} onChange={(e) => setToolsUsed(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="deadline" value="Deadline" />
                        <TextInput type="date" placeholder="Deadline" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="assignedToName" value="Assign to Student Name" />
                        <select value={assignedToName} onChange={(e) => setAssignedToName(e.target.value)} required className="w-full px-3 py-2 border rounded-md mt-1">
                            <option value="">Select Student Name</option>
                            {userNames.map((std, index) => (
                                <option key={index} value={std.id}>{std.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="px-4">
                        Add Task
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddTask;
