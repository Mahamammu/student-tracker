import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Label, TextInput, Textarea, Card, Button, Select, Spinner } from 'flowbite-react';

const AddTask = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [toolsUsed, setToolsUsed] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedToName, setAssignedToName] = useState('');
    const [userNames, setUserNames] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Updated tool options
    const toolOptions = ["React", "Angular", "Vue", "Svelte", "Django", "Flask", "Express", "Spring", "Ruby on Rails", "Laravel"];

    useEffect(() => {
        const fetchUserNames = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://student-tracker-1.onrender.com/api/user-names');
                setUserNames(response.data.result);
            } catch (error) {
                console.error('Error fetching user names:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserNames();
    }, []);

    const validateTaskName = (name) => {
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(name);
    };

    const validateTaskDescription = (description) => {
        const words = description.trim().split(/\s+/);
        const regex = /^[a-zA-Z0-9 .,?!]+$/;
        return words.length <= 300 && regex.test(description);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateTaskName(taskName)) {
            setErrorMessage('Task Name should only contain alphabetic characters and spaces.');
            return;
        }
        if (!validateTaskDescription(taskDescription)) {
            setErrorMessage('Task Description should not exceed 300 words and should not contain special characters.');
            return;
        }
        if (new Date(deadline) < new Date().setHours(0, 0, 0, 0)) {
            setErrorMessage('Deadline must be today or a future date.');
            return;
        }
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await axios.post('https://student-tracker-1.onrender.com/api/add-task', {
                taskName,
                taskDescription,
                toolsUsed,
                deadline,
                assignedToName
            });
            setSuccessMessage('Task added successfully!');
            setTaskName('');
            setTaskDescription('');
            setToolsUsed('');
            setDeadline('');
            setAssignedToName('');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/taskslist');
            }, 2000);
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-full md:max-w-2xl p-8 m-4">
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Add Task Details
                </h5>
                {isLoading ? (
                    <div className="flex justify-center">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <>
                        {errorMessage && (
                            <div className="mb-4 text-red-500">
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className="mb-4 text-green-500">
                                {successMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="taskName" value="Task Name" />
                                <TextInput 
                                    type="text" 
                                    placeholder="Task Name" 
                                    name="taskName" 
                                    value={taskName} 
                                    onChange={(e) => setTaskName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="taskDescription" value="Task Description" />
                                <Textarea 
                                    type="text" 
                                    placeholder="Task Description" 
                                    name="taskDescription" 
                                    value={taskDescription} 
                                    onChange={(e) => setTaskDescription(e.target.value)} 
                                    required 
                                />
                                <div className="text-right text-sm text-gray-500">
                                    {taskDescription.trim().split(/\s+/).length}/300 words
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="toolsUsed" value="Tools Used" />
                                <Select 
                                    name="toolsUsed" 
                                    value={toolsUsed} 
                                    onChange={(e) => setToolsUsed(e.target.value)} 
                                    required 
                                >
                                    <option value="">Select Tool</option>
                                    {toolOptions.map((tool, index) => (
                                        <option key={index} value={tool}>{tool}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="deadline" value="Deadline" />
                                <TextInput 
                                    type="date" 
                                    name="deadline" 
                                    value={deadline} 
                                    onChange={(e) => setDeadline(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="assignedToName" value="Assign to Student Name" />
                                <Select 
                                    name="assignedToName" 
                                    value={assignedToName} 
                                    onChange={(e) => setAssignedToName(e.target.value)} 
                                    required 
                                >
                                    <option value="">Select Student Name</option>
                                    {userNames.map((std, index) => (
                                        <option key={index} value={std.id}>{std.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <Button type="submit" className="px-4" disabled={isSubmitting}>
                                {isSubmitting ? <Spinner size="sm" /> : 'Add Task'}
                            </Button>
                        </form>
                    </>
                )}
            </Card>
        </div>
    );
};

export default AddTask;

