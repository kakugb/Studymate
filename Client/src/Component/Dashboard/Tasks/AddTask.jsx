import React, { useState, useEffect } from "react";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTask() {
  const [userData, setUserData] = useState({
    task_name: "",
    priority: "",
    deadline: "",
    status:"Incompleted",
    user_id: "",
    group_id: "",
  });
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const usersResponse = await axios.get(
          `${process.env.REACT_APP_SECRET_KEY}/users/all-users`,
          config
        );
        const groupresponse = await axios.get(
          `${process.env.REACT_APP_SECRET_KEY}/group/get-all-groups`,
          config
        );

        // Filter out users who are not admins
        const adminUsers = usersResponse.data.Users.filter(user => user.role === 'admin');

        setUsers(adminUsers);
        setGroups(groupresponse.data);
      } catch (error) {
        console.error("Error fetching user data for editing:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Concatenate user_name and group_name before submitting
      const user = users.find((user) => user._id === userData.user_id);
      const group = groups.find((group) => group._id === userData.group_id);
      const userGroupName = `${user.user_name} - ${group.group_name}`;

      const dataToSend = {
        ...userData,
        user_name: userGroupName,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SECRET_KEY}/task/add-task`,
        dataToSend,
        config
      );
      console.log("User added successfully:", response.data);
      
      toast.success("Task Add successfully!");
      // Redirect or perform any other actions after successful add
      setTimeout(() => {
        navigate("/Tasks");
      }, 2000);


    } catch (error) {
      console.error(
        "Error adding user:",
        error.response ? error.response.data : error.message
      );
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-2xl text-center font-semibold text-black ">Add Task</h1>

            <form className="max-w-sm md:mx-auto mr-5" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Task Name
                </label>
                <input
                  type="text"
                  name="task_name"
                  value={userData.task_name}
                  onChange={(e) =>
                    setUserData({ ...userData, task_name: e.target.value })
                  }
                  className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a name "
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Priority
                </label>
                <select
                  value={userData.priority}
                  onChange={(e) =>
                    setUserData({ ...userData, priority: e.target.value })
                  }
                  className="shadow appearance-none border rounded font-medium w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Priority</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={userData.deadline}
                  onChange={(e) =>
                    setUserData({ ...userData, deadline: e.target.value })
                  }
                  className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>


              /* <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  placeholder="Incompleted"
                  value={userData.status}
                  onChange={(e) =>
                    setUserData({ ...userData, status: e.target.value })
                   
                  }
                  className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
                {/* <select
                  value={userData.status}
                  onChange={(e) =>
                    setUserData({ ...userData, status: e.target.value })
                  }
                  className="shadow appearance-none border rounded font-medium w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Priority</option>
                  <option value="Incompleted">Incompleted</option>
                  
                </select> */}
              </div> */



              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Select User
                </label>
                <select
                  name="user_id"
                  value={userData.user_id}
                  onChange={(e) =>
                    setUserData({ ...userData, user_id: e.target.value })
                  }
                  className="focus:outline-none shadow-sm bg-gray-50 border font-medium border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.user_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Select Group
                </label>
                <select
                  name="group_id"
                  value={userData.group_id}
                  onChange={(e) =>
                    setUserData({ ...userData, group_id: e.target.value })
                  }
                  className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                >
                  <option value="">Select Group</option>
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                  Add Task
                </button>
              </div>
            </form>
            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTask;
