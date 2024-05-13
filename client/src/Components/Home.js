import Navigation from './Navbar';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from "../UserContext";
import { useNavigate } from 'react-router-dom';
import Carousell from './Carousell';

const Home = () => {
    const [students, setStudents] = useState([]);
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://student-tracker-application.onrender.com/api/getStudents')
            .then(res => {
                setStudents(res.data.students);
            })
            .catch(err => console.log(err));
    }, []);


    const handlePendingView = (id) => {
        navigate(`/adminuserpt/${id}`);
    }

    const handleCompletedView = (id) => {
        navigate(`/adminuserct/${id}`);
    }

    return (
        <div>
            <Navigation />
            {userId === 0 ? (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Students List</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Task</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Task</th>
                                {/* Add more columns if needed */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handlePendingView(student.id)}>View</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => handleCompletedView(student.id)}>View</button>
                                    </td>
                                    {/* Add more columns if needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (<>
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Student Tracker Application
      </h5>
            <Carousell />
            </>)}
        </div>
    );
}

export default Home;
