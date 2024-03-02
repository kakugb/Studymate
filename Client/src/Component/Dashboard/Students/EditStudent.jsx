import React from "react";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditStudent() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
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
          `${process.env.REACT_APP_SECRET_KEY}/users/get-user/${userId}`,
          config
        );

        setUserData(response.data);
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
        `${process.env.REACT_APP_SECRET_KEY}/users/user-update/${userId}`,
        userData,
        config
      );
     
      toast.success("User Edit successfully!");
      setTimeout(()=>{
        navigate("/Students");
      }, 3000);
    
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!userData) {
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
          <div className=" mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-2xl text-center font-semibold text-black ">
              Edit Student
            </h1>

            <form className="max-w-sm md:mx-auto mr-5" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={userData.user_name}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a name "
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email_address"
                  value={userData.email_address}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Role
                </label>
                <select
                  type="text"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-medium mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="student">student</option>
                </select>
              </div>
              <div className="w-full my-2 ">
                <button className=" bg-blue-500 text-white  font-bold py-2 px-4 rounded-md ">
                  Update Student
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

export default EditStudent;
