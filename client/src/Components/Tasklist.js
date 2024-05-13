import React from 'react'
import UserContext from '../UserContext';
import { Button } from 'flowbite-react';
import { useEffect, useState, useContext } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Taskcard from './Taskcard';
import axios from 'axios';
import Navigation from './Navbar';

const Tasklist = () => {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [alltasks, setAllTasks] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://student-tracker-application.onrender.com/api/all-tasks`);
            setAllTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        

        fetchData();
    }, []);

    const handleAddTasks = () => {
        navigate('/addtasks');
    }

    return (
        <div>
            <Navigation />
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                STUDENT TRACKER APPLICATION
            </h5>
            <div className="justify-start mr-4 mt-4"> {/* Increased margin to mr-8 */}
                {userId === 0 && (
                    <Button color="blue" onClick={handleAddTasks}>
                        Add Tasks +<HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                )}
            </div>

            {alltasks.length > 0 ? (
                alltasks.map((t, ind) => {
                    console.log(t); // Add this line for debugging
                    return <Taskcard tasks={t} key={ind} fetchData={fetchData}/>;
                })
            ) : (
                <p className="text-center text-gray-700 dark:text-gray-300">
                    No results found.
                </p>
            )}

        </div>
    )
}

export default Tasklist;
