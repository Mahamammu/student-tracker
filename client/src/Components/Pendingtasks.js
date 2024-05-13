import React from 'react'
import UserContext from '../UserContext';
import { Button } from 'flowbite-react';
import { useEffect, useState, useContext } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pendingtaskcard from './Pendingtaskcard';
import Navigation from './Navbar';
const Pendingtasks = () => {
    const { userId } = useContext(UserContext);
const navigate=useNavigate();
const [alltasks, setAllTasks] = useState([]);

const fetchData = async () => {
  try {
    const response = await axios.get(`https://student-tracker-application.onrender.com/api/pending-tasks/${userId}`);
    setAllTasks(response.data.tasks);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
useEffect(() => {

  fetchData();
}, []);




  return (
    <div>
      <Navigation/>
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        STUDENT TRACKER APPLICATION
      </h5>


      {alltasks.length > 0 ? (
          alltasks.map((t, ind) => {
          console.log(t); // Add this line for debugging
            return <Pendingtaskcard tasks={t} key={ind} fetchData={fetchData}/>;
          })
        ) : (
  <p className="text-center text-gray-700 dark:text-gray-300">
    No Tasks are assigned.
  </p>
)}

    </div>
  )
}

export default Pendingtasks