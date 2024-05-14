import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import grade from '../../../pic/grade.jpg'
function Grades() {
  const [data, setData] = useState([]);
  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to the API endpoint
      const response = await axios.get(
        `${process.env.REACT_APP_SECRET_KEY}/grade/all-grades`,
        config
      );
      // Set the fetched user data to the state
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    // Fetch user data when the component mounts or when it returns to the page
    fetchUserData();
  }, []);

  const HandleEditGrade = (userId) => {
    // Navigate to the Update page with userId as URL parameter
    window.location.href = `/EditGrade/${userId}`;
  };

  const HandleDeleteGrade = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a DELETE request to the API endpoint to delete the user
      await axios.delete(
        `${process.env.REACT_APP_SECRET_KEY}/grade/delete-grade/${userId}`,
        config
      );

      // Refetch user data after deletion
      fetchUserData();

      // Show success message
       toast.success("Grades deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60" style={{ backgroundImage: `url(${grade})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full flex justify-end mr-32 my-3">
              <button className=" bg-blue-500  font-bold py-2 px-4 rounded-md md:mr-12">
                <Link to="/AddGrade" className="text-white no-underline">
                  Add Grade
                </Link>
              </button>
            </div>
            
            <div class="md:w-11/12 w-full md:relative absolute md:left-16 left-2  overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-spacing-7">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Course Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Grade Data
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Calculated Grade
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Student-Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.course_name}
                        </td>
                        <td class="px-6 py-4">{item.grades_data}</td>
                        <td class="px-6 py-4">{item.calculated_grade}</td>
                        <td class="px-6 py-4">{item.user_id && item.user_id.user_name ? item.user_id.user_name : 'N/A'}</td>
                        <td class=" pl-16 space-x-2 py-4">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 no-underline  hover:no-underline"
                            onClick={() => HandleEditGrade(item._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium text-red-600 no-underline hover:text-red-600 hover:no-underline"
                            onClick={() => HandleDeleteGrade(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Grades;
