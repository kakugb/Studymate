// Player.jsx

import React from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Player({ task, type, onDeleteTask, fetchUserData }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "task",
    item: { task, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDeleteTask = async (taskId) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${process.env.REACT_APP_SECRET_KEY}/task/delete-task/${taskId}`,
        config
      );

      onDeleteTask(taskId);
    window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (taskId) => {
    return `/EditTask/${taskId}`;
  };

  return (
    <div
    className=' p-2 rounded-md shadow-md mb-3 text-center outline outline-offset-2 outline-4 outline-gray-300 ' ref={dragRef}
    style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className='flex justify-evenly text-black font-semibold'>Task Name: {task.task_name}</div>
      <div className='flex justify-evenly text-black font-semibold'>Assigned by: {task.user_id?.user_name}</div>
      <div className='flex justify-evenly text-black font-semibold'>Deadline: {task.deadline}</div>
      <div className='flex justify-evenly text-black font-semibold'>Status: {task.status}</div>
      <div className='flex flex-row gap-2 mt-2 justify-center'>
        <button className='px-2 py-1 bg-gray-400 rounded-2xl text-black font-semibold' onClick={() => handleDeleteTask(task._id)}>Delete</button>
        <button className='px-2 py-1 bg-gray-400 rounded-2xl text-black font-semibold no-underline'><Link to={handleEditTask(task._id)} >Update</Link></button>
      </div>
    </div>
  );
}

export default Player;
