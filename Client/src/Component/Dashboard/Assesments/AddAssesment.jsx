import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../../partials/Header'
import Sidebar from '../../../partials/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import student from '../../../pic/student.jpg'

function AddAssesment() {

    const [userData, setUserData] = useState({
        assesment_name: "",
        assesment_result: "",
        user_id: "",
      });
      const navigate = useNavigate();
      const [users, setUsers] = useState([]);
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
    
            setUsers(usersResponse.data.Users);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);

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
    
          await axios.post(
            `${process.env.REACT_APP_SECRET_KEY}/assesment/add-assesment`,
            userData,
            config
          );
    
          toast.success("Assesment Add successfully!");
          // Redirect or perform any other actions after successful add
          setTimeout(() => {
            navigate("/Assesments");
          }, 2000);
        } catch (error) {
          console.error("Error adding group:", error);
        }
      }; 

      if (!users && !userData) {
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
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200" style={{ backgroundImage: `url(${student})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Your main content goes here */}
        <div className="md:ml-4  mt-2">
          {/* Content of the dashboard */}
          <h1 className="text-3xl text-center font-extrabold text-white my-4 ">
            Add Assesment
          </h1>

          <form className="max-w-md md:mx-auto mr-5 bg-white p-4 rounded-md" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Assesment Name
              </label>
              <input
                type="text"
                name="assesment_name"
                value={userData.assesment_name}
                onChange={handleChange}
                className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter a name"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Assesment Result
              </label>
              <input
                type="text"
                name="assesment_result"
                value={userData.assesment_result}
                onChange={handleChange}
                className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter a name"
                required
              />
            </div>   
            <div className="mb-2">
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Select Student
              </label>
              <select
                name="user_id"
                value={userData.user_id}
                onChange={handleChange}
                className="focus:outline-none shadow-sm bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              >
                <option value="">Select Student</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.user_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-4">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                Add Assesment
              </button>
            </div>
          </form>
          {/* Other components and content */}
        </div>
      </main>
    </div>
    <ToastContainer />
  </div>
  )
}

export default AddAssesment
