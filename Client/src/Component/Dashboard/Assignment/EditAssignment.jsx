import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditAssignment() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    file: null
  });



 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await axios.get(
          `http://localhost:5000/assignment/assignments/getById/${id}`,
          config
        );
        const assignmentData = response.data;
        
        // Convert deadline date to YYYY-MM-DD format
        const deadlineDate = new Date(assignmentData.deadline).toISOString().split('T')[0];
  
        // Update the state with the fetched data
        setFormData({
          title: assignmentData.title,
          description: assignmentData.description,
          deadline: deadlineDate,
          file: assignmentData.filePath 
        });
      } catch (error) {
        console.error("Error fetching assignment data:", error);
      }
    };
  
    fetchData();
  }, [id]);
  

  // Handler for updating form data on input change
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
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const formDataToSend = new FormData();
      
      // Append other form data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('deadline', formData.deadline);
      formDataToSend.append('teacher_id', formData.teacher_id);
      formDataToSend.append('file', formData.file);
      await axios.put(
        `http://localhost:5000/assignment/assignments/update/${id}`,
        formData,
        config
      );
      
      // Show success message
      toast.success("Assignment updated successfully");
      setTimeout(() => {
        navigate('/Assignment')
      }, 2000);
    } catch (error) {
      console.error("Error updating assignment:", error);
      // Show error message
      toast.error("Error updating assignment");
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ">
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-2xl font-semibold text-black text-center">Edit Assignment</h1>

            <form className="max-w-sm md:mx-auto mr-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a title"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a description"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>

              <div className="mb-4">
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
              <div className="mb-4">
  <a 
    href={`http://localhost:5000/uploads/${formData.file}`} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
  >
    View
  </a>
  <iframe
    src={`http://localhost:5000/uploads/${formData.file}`}
    className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  />
</div>


              <div className="my-4">
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                  Update Assignment
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

export default EditAssignment;
