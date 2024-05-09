import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Player from './Player';
import { useDrop } from 'react-dnd';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskUser() {
  const [todos, setTodos] = useState([]);
  const [incompleted, setIncompleted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [refresh, setRefresh] = useState(false); 
  const getUserId = (tokens) => {
   
    try {
      const tokenParts = tokens.split(".");
      const decodedPayload = atob(tokenParts[1]);
      const payloadObj = JSON.parse(decodedPayload);
      const userId = payloadObj.id;
      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchUserData = async () => {
    const token = sessionStorage.getItem("token");
      const userId = getUserId(token);
      sessionStorage.setItem("user_id", userId);

    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `http://localhost:5000/task/all-task`;

      const response = await axios.get(url, config);
      const res = response.data;
     
     // Filter tasks based on user_id
     const userTasks = res.filter((task) => 
     
     task.user_id?._id === userId);
     

     const complete = userTasks.filter((task) => task.status === "Completed");
     setCompleted(complete);

     const Incomplete = userTasks.filter(
       (task) => task.status === "Incompleted"
     );
     setIncompleted(Incomplete);

     const pend = userTasks.filter((task) => task.status === "Pending");
     setTodos(pend);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refresh]);
 
const [{ isOver: isTodoOver }, addToTodoRef] = useDrop({
  accept: "task",
  drop: (item) => moveTaskTo(item.task, "Pending"), 
  collect: (monitor) => ({ isOver: !!monitor.isOver() }),
}); 

// For the Incompleted container
const [{ isOver: isIncompletedOver }, addToIncompletedRef] = useDrop({
  accept: "task",
  drop: (item) => moveTaskTo(item.task, "Incompleted"),
  collect: (monitor) => ({ isOver: !!monitor.isOver() }),
});

// For the Completed container
const [{ isOver: isCompletedOver }, addToCompletedRef] = useDrop({
  accept: "task",
  drop: (item) => moveTaskTo(item.task, "Completed"),
  collect: (monitor) => ({ isOver: !!monitor.isOver() }),
});


const moveTaskTo = async (task, destination) => {
  try {
    // Update the status of the task
    task.status = destination;


    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.put(`${process.env.REACT_APP_SECRET_KEY}/task/update-task/${task._id}`, { status: task.status }, config);

    // Update the corresponding state based on the destination
    if (destination === 'Pending') {
      setTodos([...todos, task]); // Add task to TODO container
    } else if (destination === 'Incompleted') {
      setIncompleted([...incompleted, task]); // Add task to Progress container
    } else if (destination === 'Completed') {
      setCompleted([...completed, task]); // Add task to Completed container
    }

    // Trigger fetchUserData by changing 'refresh' state
    setRefresh(!refresh);

  } catch (error) {
    console.error("Error moving task:", error);
    // Handle error here (e.g., display error message)
    toast.error(`Error moving task: ${error.message}. Please try again later.`);
  }
};

  
  
  
  
  



  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-200 md:pl-60">
          {/* Your main content goes here */}
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
           
            <div className="md:w-11/12 w-full md:relative absolute md:left-16 left-2  overflow-x-auto shadow-md sm:rounded-lg mt-2 border-8   divide-black">        
                <div className="flex flex-row gap-8">
                  
                
                {/* Todo */}

                <div className="md:w-[500px]  outline outline-offset-2 outline-4 outline-gray-300  mt-1">
                      <h1 className="w-full text-3xl text-white text-center bg-red-600 rounded-md">TODO</h1>
                     <div className="md:w-full w-[250px] text-[15px] p-4 h-[70vh] shadow-md rounded-md " ref={addToIncompletedRef}>
                     {incompleted.map((task) => (
                      <Player
                        key={task.id}
                        task={task}
                        type="incompleted" 
                   
                      />
                    ))}
                     </div>
                  </div>
                
                
                
                
                
                
                     {/* Progress */}

                  <div className="w-[500px] outline outline-offset-2 outline-4 outline-gray-300  mt-1 ml-2">
                      <h1 className="w-full text-3xl text-white text-center bg-indigo-600">Progress</h1>
                     <div className="md:w-full w-[250px] text-[15px] p-4 h-[70vh] shadow-md rounded-md" ref={addToTodoRef}>
                     {todos.map((task) => (
                         <Player
                         key={task.id}
                         task={task}
                         type="todo"
                     
                         />
                         ))}
                     </div>
                  </div>
   

                    
                 

                      {/* Completed */}




                      <div className="w-[500px] outline outline-offset-2 outline-4 outline-gray-300 mt-1 mr-2">
                      <h1 className="w-full text-3xl text-white text-center bg-green-400 rounded-md">Completed</h1>
                     <div className="md:w-full w-[250px] text-[15px] p-4 h-[70vh] shadow-md rounded-md" ref={addToCompletedRef}>
                     {completed.map((task) => (
                      <Player
                        key={task.id}
                        task={task}
                        type="completed" 
                  
                      />
                    ))}
                     </div>
                  </div>

                </div> 
            </div>
            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TaskUser;