import React, { useContext } from 'react';
import { useState } from 'react';
import UserContext from '../UserContext';
import { Card, Button,Modal } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Pendingtaskcard = ({ tasks, fetchData }) => {
    const navigate = useNavigate();
    console.log(tasks);
   // const { userId, setUserId } = useContext(UserContext);
   const [openModal, setOpenModal] = useState(false);




    console.log(tasks.task_name, tasks.task_description, tasks.tools_used, tasks.deadline);
  

  //   const handleDeadline = () => {
  //     setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //     setShowModal(false);
  // };
  const handleCompletedTaskClick = async() => {
    const response = await axios.post(`https://student-tracker-application.onrender.com/api/update-task`, {taskId: tasks.id});

    fetchData();
      
  }
  
    return (
      <div>
        <div className="mt-2 mb-2 ml-10 mr-10">
          <Card className="relative flex h-full flex-row gap-4 p-6">
            <div className="flex flex-row justify-center gap-4">
              
              <div className="flex flex-col justify-between">
                <div>
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Name: {tasks.task_name}
                  </h5>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                  <span className="font-bold">Task Description:</span> {tasks.task_description}<br />
                                    <span className="font-bold">Task Tools To Be Used:</span> {tasks.tools_used}<br />
                                    <span className="font-bold">Deadline:</span> {tasks.deadline}<br />

                  </p>
                </div>
              </div>
            </div>
  
            <div className="absolute right-4 top-4">
                <Button color="warning" onClick={() => setOpenModal(true)} >Deadline</Button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Deadline</Modal.Header>
                  <Modal.Body>
                  <div className="space-y-6">
                      
                     <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Task Deadline is sheduled as: {tasks.deadline}</h5>
                   </div>
                 </Modal.Body>
              <Modal.Footer>
             <Button onClick={() => setOpenModal(false)}>Okay..!</Button>
             </Modal.Footer>
           </Modal>
            
            </div>
  
            <div className="absolute right-4 bottom-4">
              <Button className="w-md" onClick={handleCompletedTaskClick} color='success' pill>
                Completed Task <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
       
      </div>
    )
  }
  
export default Pendingtaskcard