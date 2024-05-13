
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Admin from './Components/Admin';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Tasklist from './Components/Tasklist';
import Admincompletedtasks from './Components/Admincompletedtasks';
import Pendingtasks from './Components/Pendingtasks';
import Completedtasks from './Components/Completedtasks';
import Addtask from './Components/Addtask';
import Adminuserpt from './Components/Adminuserpt';
import Adminuserct from './Components/Adminuserct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/taskslist" element={<Tasklist />} />
        <Route path="/admincompletedtasks" element={<Admincompletedtasks />} />
        <Route path="/pendingtasks" element={<Pendingtasks />} />
        <Route path="/adminuserpt/:userId" element={<Adminuserpt />} />
        <Route path="/completedtasks" element={<Completedtasks />} />
        <Route path="/adminuserct/:userId" element={<Adminuserct />} />
        <Route path="/addtasks" element={<Addtask />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
