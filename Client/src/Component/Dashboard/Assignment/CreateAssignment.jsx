import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import assignment from '../../../pic/assignment.jpg'
import { useNavigate } from "react-router-dom";
function CreateAssignment() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    file: null
  });



  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const teacher_id = decodedToken.id; 
      setFormData(prevState => ({
        ...prevState,
        teacher_id: teacher_id
      }));
    } else {
      console.error("Token not found in session storage.");
    }
  }, []);
  
   



  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };
      const formDataToSend = new FormData();
      
      // Append other form data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('deadline', formData.deadline);
      formDataToSend.append('teacher_id', formData.teacher_id);
  
      // Append file data
      formDataToSend.append('file', formData.file);
  
 
      // Send the formDataToSend to the server
      const response = await axios.post('http://localhost:5000/assignment/assignments/create', formDataToSend, config);
    toast.success('Assignment Add Successfully')
      setTimeout(() => {
      navigate('/Assignment')
    }, 2000);

    } catch (error) {
      toast.error('Failed to create assignment');
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 " style={{ backgroundImage: `url(${assignment})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-3xl text-center font-extrabold text-white my-4 ">Add Assignment</h1>

            <form className="max-w-md md:mx-auto mr-5 bg-white p-4 rounded-md" onSubmit={handleSubmit} >
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a name"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                   name="description"
                   value={formData.description}
                   onChange={handleChange}
                   className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   placeholder="Enter a Description"
                   required
                 />
              </div>

              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  File
                </label>
                <input 
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>

              <div className="my-4">
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                  Add Assignment
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

export default CreateAssignment;
