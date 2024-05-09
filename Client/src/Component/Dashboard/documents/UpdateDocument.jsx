import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, useParams } from "react-router-dom";

function UpdateDocument() {
  const { id } = useParams();
 

  const token = sessionStorage.getItem("token");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = decodedToken ? decodedToken.id : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileUrl: null,
    isPublic: false,
    folder: id,
    uploadedBy: userId,
  });


  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/document/documents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const documentData = response.data;
        setFormData({
          title: documentData.title,
          description: documentData.description,
          isPublic: documentData.isPublic,
          fileUrl: documentData.fileUrl,
          folder: documentData.folder,
          uploadedBy: documentData.uploadedBy,
        });
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("Failed to fetch document");
      }
    };

    fetchDocument();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: e.target.files[0],
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isPublic", formData.isPublic);
       formDataToSend.append("fileUrl", formData.fileUrl); // Remove this line if not updating the file URL
      // formDataToSend.append("folder", formData.folder); // Remove this line if folder is automatically populated from URL
      formDataToSend.append("uploadedBy", formData.uploadedBy);
  
      await axios.put(
        `http://localhost:5000/document/documents/${id}`,
        formData,
        config
        
      );
  
      toast.success("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document");
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
            <h1 className="text-2xl font-semibold text-black text-center">
              Update Document
            </h1>

            <form className="max-w-sm md:mx-auto mr-5" onSubmit={handleSubmit}>
              {/* Title */}
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
                  placeholder="Enter a title"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter a description"
                  required
                />
              </div>

              {/* File */}
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
              <div className="mb-4">
                <a
                  href={`http://localhost:5000/${formData.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  View Document
                </a>
              </div>
              {/* Public */}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Public
                </label>
                <select
                  name="isPublic"
                  value={formData.isPublic}
                  onChange={handleChange}
                  className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              {/* Submit button */}
              <div className="my-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
                >
                  Update Document
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateDocument;
