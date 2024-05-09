// Player.jsx

import React from 'react';
import { useDrag } from 'react-dnd';


function Player({ task, type,  fetchUserData }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "task",
    item: { task, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });



    


  return (
    <div
    className=' p-2 rounded-md shadow-md mb-3 text-center outline outline-offset-2 outline-4 outline-gray-300 ' ref={dragRef}
    style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className='flex justify-evenly text-black font-semibold'>Task Name: {task.task_name}</div>
      <div className='flex justify-evenly text-black font-semibold'>Assigned by: {task.user_id?.user_name}</div>
      <div className='flex justify-evenly text-black font-semibold'>Deadline: {task.deadline}</div>
      <div className='flex justify-evenly text-black font-semibold'>Status: {task.status}</div>
     
    </div>
  );
}

export default Player;
