import { Avatar, Dropdown, Navbar } from 'flowbite-react';
//import logo from '../images/VCB.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../UserContext";

export default function Navigation() {
    const {userId} = useContext(UserContext);
  const {emailId} = useContext(UserContext);
  //console.log(emailId);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    // Perform login logic if needed
    // ...

    // Redirect to the mainindex page
    navigate('/');
  };
  const handleuserPofile=()=>{
    navigate('/profile');
  };
 
  const handleTasksClick = () => {
    navigate('/taskslist');
  }

  const handleComletedTasksClick = () => {
    navigate('/completedtasks');
  }

  const handlePendingTasksClick = () => {
    navigate('/pendingtasks');
  }

  const handleAdminComletedTasksClick = () => {
    navigate('/admincompletedtasks');
  }


  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        {/* <img src={logo} className="mr-3 h-12 sm:h-16" alt="Flowbite React Logo" /> */}
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Vaccination Center</span> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">User</span>
            <span className="block truncate text-sm font-medium">{emailId}</span>
          </Dropdown.Header>
          {userId===0 ? (
            <>
            <Dropdown.Item onClick={handleLogoutClick}>Log out</Dropdown.Item>
            </>
          ):(
            <>

          <Dropdown.Item onClick={handleuserPofile}>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogoutClick}>Log out</Dropdown.Item>
          </>
          )}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
    <Navbar.Link href="/home" active>Home</Navbar.Link>
    {userId === 0 ? (
        <>
            <Navbar.Link onClick={handleTasksClick}>Task List</Navbar.Link>
            <Navbar.Link onClick={handleAdminComletedTasksClick}>Completed List</Navbar.Link>
        </>
    ) : (
        <>
            <Navbar.Link onClick={handlePendingTasksClick}>Pending Task</Navbar.Link>
            <Navbar.Link onClick={handleComletedTasksClick}>Completed Tasks</Navbar.Link>
        </>
    )}
</Navbar.Collapse>

    </Navbar>
  );
}
