import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditTask() {
  const { userId } = useParams();
  const [userData, setUserData] = useState([]);
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

        const response = await axios.get(
          `${process.env.REACT_APP_SECRET_KEY}/task/get-task/${userId}`,
          config
        );
        const usersResponse = await axios.get(
          `${process.env.REACT_APP_SECRET_KEY}/users/all-users`,
          config
        );
        const groupresponse = await axios.get(
          `${process.env.REACT_APP_SECRET_KEY}/group/get-all-groups`,
          config
        );
        setUserData(response.data);
        setUsers(usersResponse.data.Users);
        setGroups(groupresponse.data);
      } catch (error) {
        console.error("Error fetching user data for editing:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `${process.env.REACT_APP_SECRET_KEY}/task/update-task/${userId}`,
        userData,
        config
      );

      toast.success("Task Edit successfully!");
      // Redirect or perform any other actions after successful add
      setTimeout(() => {
        navigate("/Tasks");
      }, 2000);


    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!userData || !users) { 
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ">
          {/* Your main content goes here */}
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-2xl text-center font-semibold text-black ">Edit Task</h1>

            <form className="max-w-sm md:mx-auto mr-5" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Task Name
                </label>
                <input
                  type="text"
                  name="task_name"
                  value={userData.task_name}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a name "
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Priorty
                </label>
                <select
                  type="text"
                  name="priority"
                  value={userData.priority}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Role</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={userData.deadline}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a name "
                  required
                />
              </div>
              
             


              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select User
                </label>
                <select
                  name="user_id"
                  value={userData.user_id}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select User
                </label>
                <select
                  name="group_id"
                  value={userData.group_id}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
              <div className=" my-4">
                <button className=" bg-blue-500 text-white  font-bold py-2 px-4 rounded-md">
                  Update Task
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

export default EditTask;
