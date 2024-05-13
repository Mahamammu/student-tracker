import { useState, useContext } from 'react';
import { Button, Card, Label, TextInput, Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Login() {

  const {userId, setUserId} = useContext(UserContext);
  const {emailId,setEmailId}=useContext(UserContext);
  console.log(userId);  
  console.log(emailId)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLoginClick = async () => {
    try {
      const { email, password } = formData;
      
      const response = await fetch(`https://student-tracker-application.onrender.com/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("logged in user data:",data);
        
        // Update the context with the logged-in user's email
        setEmailId(data.email);
        setUserId(data.userId);
        navigate('/home');
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Student Tracker Application
      </h5>
      <div className="flex items-center justify-center min-h-screen">
        <form className="flex max-w-md flex-col gap-4">
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full md:max-w-2xl p-8 m-4">
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">LOGIN </h5>
              <div className="mb-4">
                <Label htmlFor="email1" value="Your email" />
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password1" value="Your password" />
                <TextInput
                  id="password1"
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" className="px-4" onClick={handleLoginClick} color="dark" pill>
                  Login
                </Button>
                <Button type="button" className="px-4" onClick={handleAdminClick} color="dark" pill>
                  Admin User
                </Button>
                <Button type="button" className="px-4" onClick={handleSignupClick} color="dark" pill>
                  Sign Up
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
