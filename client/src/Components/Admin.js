import React from 'react';
import { Button, Card, Label, TextInput} from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext } from 'react';

const Admin = () => {
  const navigate = useNavigate();
  let {userId,setUserId} = useContext(UserContext);
  const {emailId,setEmailId}=useContext(UserContext);
  
  const handleAdminClick = () => {
    // Perform login logic
    const enteredEmail = document.getElementById('email1').value;
    const enteredPassword = document.getElementById('password1').value;
    setUserId(0);
    console.log(userId);
    // Check if email and password are valid (replace this with your actual logic)
    if (enteredEmail === 'admin@gmail.com' && enteredPassword === 'admin@123') {
      // Redirect to the mainindex page
      setEmailId("admin@gmail.com");
      console.log(emailId);
      navigate('/home');
    } else {
      // Display alert for invalid credentials
      alert('Invalid admin user');
    }
  };

  return (
    <div>
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Student Tracker Application </h5>
      <div className="flex items-center justify-center min-h-screen">
        <form className="flex max-w-md flex-col gap-4">
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-half md:max-w-2xl p-8 m-4">
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">ADMIN LOGIN </h5>
              <div className="mb-4">
                <Label htmlFor="email1" value="Your email" />
                <TextInput id="email1" type="email" placeholder="Email" required />
              </div>
              <div className="mb-4">
                <Label htmlFor="password1" value="Your password" />
                <TextInput id="password1" type="password" placeholder="Password" required />
              </div>
              
              <Button type="button" className="px-4" onClick={handleAdminClick}>
                Login
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
