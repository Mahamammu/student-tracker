import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'flowbite-react';
import { HiOutlineArrowRight, HiCheckCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';

const Taskcard = ({ tasks,fetchData }) => {
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);

    const handleCompletedTaskClick = () => {
        // Add logic for completing the task
    }

    const handleDeleteTaskClick = async () => {
        try {
            //console.log(tasks);
            const response = await axios.post(`https://student-tracker-application.onrender.com/api/delete-tasks/${tasks.id}`);


            if (response.status === 200) {
                fetchData();
            } else {
                // Task deletion failed
                console.error('Failed to delete task');
            }
        } catch (error) {
            // Handle error
            console.error('Error deleting task:', error);
        }
    };

    // Conditionally apply green background color for completed tasks
    const cardClassName = tasks.stats === 'Completed' ? "bg-green-100" : "";

    return (
        <div>
            <div className="mt-2 mb-2 ml-10 mr-10">
                <Card className={`relative flex flex-col gap-4 p-6 ${cardClassName}`}>
                    <div className="flex justify-end absolute top-0 right-0 mr-4 mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-end">
                                <Button color="dark" onClick={() => setOpenModal(true)}>Deadline</Button>
                                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                                    <Modal.Header>Deadline</Modal.Header>
                                    <Modal.Body>
                                        <div className="space-y-6">
                                            <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Task Deadline is scheduled as: {tasks.deadline}</h5>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => setOpenModal(false)}>Okay..!</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div>
                                <Button color="failure" onClick={handleDeleteTaskClick}>Delete Task</Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center gap-4">
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Name: {tasks.task_name}
                                </h5>
                                <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
                                    <span className="font-bold">Task Description:</span> {tasks.task_description}<br />
                                    <span className="font-bold">Task Tools To Be Used:</span> {tasks.tools_used}<br />
                                    <span className="font-bold">Deadline:</span> {tasks.deadline}<br />
                                    <span className="font-bold">Student Name:</span> {tasks.assigned_to_name} <br />
                                    <span className="font-bold">Student Id:</span> {tasks.assigned_to_id} <br />
                                </p>
                            </div>
                        </div>
                    </div>

                    {tasks.stats === 'Completed' && (
                        <div className="absolute right-4 bottom-4 text-green-500">
                            <HiCheckCircle className="h-6 w-6" />
                        </div>
                    )}

                    {userId !== 0 && (
                        <div className="flex justify-end">
                            <Button className="w-md" onClick={handleCompletedTaskClick}>
                                Completed Task <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Taskcard;
