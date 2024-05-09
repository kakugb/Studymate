import React, { useState } from "react";
import axios from "axios";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function AddDocument() {
    const { id } = useParams();


    const token = sessionStorage.getItem("token");
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userId = decodedToken ? decodedToken.id : null;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
        isPublic: false,
        folder: id,
        uploadedBy: userId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };


            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("file", formData.file);
            formDataToSend.append("isPublic", formData.isPublic);
            formDataToSend.append("folder", formData.folder); 
            formDataToSend.append("uploadedBy", formData.uploadedBy);


            const response = await axios.post(
                "http://localhost:5000/document/documents",
                formDataToSend,
                config
            );


            toast.success("Document added successfully");


            setFormData({
                title: "",
                description: "",
                file: null,
                isPublic: false,
                folder: id, 
                uploadedBy: userId 
            });
        } catch (error) {
            // Handle error
            console.error("Error adding document:", error);
            toast.error("Failed to add document");
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
                            Add Document
                        </h1>

                        <form
                            className="max-w-sm md:mx-auto mr-5"
                            onSubmit={handleSubmit}
                        >
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

                            <div className="my-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Add Document
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

export default AddDocument;
