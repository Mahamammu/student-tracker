import React, { useContext, useEffect, useState } from "react";
import { Card, Avatar } from 'flowbite-react';
import profile from '../images/profile-picture.jpg';
import axios from "axios"; 
import UserContext from "../UserContext";
import Navigation from "./Navbar";


export default function User() {




    const [userData,setUserData] = useState();
    const {userId} = useContext(UserContext);
    //console.log(userId);
    useEffect(() => {
        axios.get(`https://student-tracker-application.onrender.com/api/getUser/${userId}`)
        .then((res) => {
            console.log("user data frontend", res.data);
            setUserData(res.data.user);
            console.log("var", userData);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, [userId]); // Include userId in the dependency array
    

    return (
        <div>
        <Navigation />
        <div className="flex justify-between items-center p-6">
            
            <Card className="w-full">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold justify-center text-center text-gray-900 dark:text-white mb-4">
                            Profile:
                        </h2>
                        <p className="text-lg font-semibold mb-2">
                            <span className="block">Name:       {userData?.name}</span>
                            <br />
                            <span className="block">Username:   {userData?.username}</span>
                            <br />
                            <span className="block">Email:      {userData?.email}</span>
                            <br />
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <Avatar alt="Profile" img={profile} size="xl" rounded />
                    </div>
                </div>
            </Card>
        </div>
        </div>
    );
}
