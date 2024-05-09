import React from "react";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    user_name: "",
    email_address: "",
    password: "",
    role_name: "",
  });
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SECRET_KEY}/users/adduser`,
        userData,
        config
      );
      toast.success("User Add successfully !")
  setTimeout(() => {
    navigate("/Students");
  }, 3000);
    } catch (error) {
      console.error("Error adding user:", error.response ? error.response.data : error.message);
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
        <main className="w-full bg-gray-200 ">
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-2xl text-center font-semibold text-black ">
              Add Student
            </h1>

            <form className="max-w-sm md:mx-auto mr-5" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={userData.user_name}
                  onChange={(e) =>
                    setUserData({ ...userData, user_name: e.target.value })
                  }
                  className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                  value={userData.email_address}
                  onChange={(e) =>
                    setUserData({ ...userData, email_address: e.target.value })
                  }
                  placeholder="Enter Email"
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  placeholder="Enter Password"
                  id="repeat-password"
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Role
                </label>
                <select 
                  value={userData.role_name}
                  onChange={(e) =>
                    setUserData({ ...userData, role_name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 font-medium text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="student">student</option>
                </select>
              </div>
              <div className=" my-4">
                <button className=" bg-blue-500 text-white  font-bold py-2 px-4 rounded-md">
                  Add Student
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

export default AddStudent;
