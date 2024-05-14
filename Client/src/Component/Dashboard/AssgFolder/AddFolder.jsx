import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import folder from '../../../pic/folder.jpg'
function AddFolder() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    createdBy: "",
  });


  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;
        setFormData(prevState => ({
            ...prevState,
            createdBy: userId
        }));
    }else {
        console.error("Token not found in session storage.");
      }
  },[])

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
        `${process.env.REACT_APP_SECRET_KEY}/folder/folders`,
        formData,
        config
      );

      toast.success("Assesment Add successfully!");
      // Redirect or perform any other actions after successful add
      setTimeout(() => {
        navigate("/AssgFolder");
      }, 2000);
    } catch (error) {
      console.error("Error adding group:", error);
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 " style={{ backgroundImage: `url(${folder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-3xl text-center font-extrabold text-white my-4 ">Add Folder</h1>

            <form className="max-w-md md:mx-auto mr-5 bg-white p-4 rounded-md" onSubmit={handleSubmit} >
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a name"
                  required
                />
              </div>

            
              <div className="my-4">
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                  Add Folder
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

export default AddFolder;
