import React from 'react';
function Player({ task }) {
  return (
    <div className='p-2 rounded-md shadow-md mb-3 text-center outline outline-offset-2 outline-4 outline-gray-300'>
      <div className='flex justify-evenly text-black font-semibold'>Task Name: {task.task_name}</div>
      <div className='flex justify-evenly text-black font-semibold'>Assigned by: {task.user_id?.user_name}</div>
      <div className='flex justify-evenly text-black font-semibold'>Deadline: {task.deadline}</div>
      <div className='flex justify-evenly text-black font-semibold'>Status: {task.status}</div>
    </div>
  ); 
}

export default Player;
