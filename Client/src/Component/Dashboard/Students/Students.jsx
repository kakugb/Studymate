import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Students() {
  const [data, setData] = useState([]);
  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Corrected syntax
        },
      };
      const PORT = process.env.PORT;
      // Make a GET request to the API endpoint
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SECRET_KEY}/users/all-users`,
            config
          );

          // Set the fetched user data to the state
          const userData = response.data.Users;
          setData(userData);
        } catch (error) {
          console.log("Error Fetching User Data", error);
        }
      };

      fetchData();
    } catch (error) {
      console.log("Error Fetching Token", error);
    }
  }; // Empty dependency array to run the effect only once

  useEffect(() => {    
      

      // Fetch user data
      fetchUserData();
    
  }, []);


  
  const handleDeleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a DELETE request to the API endpoint to delete the user
      await axios.delete(
        `${process.env.REACT_APP_SECRET_KEY}/users/user-delete/${userId}`,
        config
      );

      // Refetch user data after deletion
      fetchUserData();

      // Show success message
       toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId) => {
    // Navigate to the Update page with userId as URL parameter
    window.location.href = `/EditStudent/${userId}`;
  };

  return (
    <div className="flex h-screen md:bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="w-full flex flex-col flex-1 overflow-hidden ">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className=" flex-1 overflow-x-hidden overflow-y-auto  md:bg-gray-200   md:pl-48">
          {/* Your main content goes here */}
          <div className="md:ml-6 mt-2 ">
            {/* Content of the dashboard */}
            <div className="w-full h-12 flex justify-end md:pr-3 pr-3">
              <button className="w-[100px] h-10 bg-blue-500  font-semibold text-sm   rounded-md md:mr-10">
                <Link to="/AddStudent" className="text-white  no-underline">
                  Add Student
                </Link>
              </button>
            </div>
            <div class="md:w-11/12 w-full md:relative absolute md:left-16 left-2  overflow-x-auto shadow-md sm:rounded-lg mt-2  ">
              <table className="md:w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className=" text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                  <tr>
                    <th  className="px-8 py-3">
                      Student name
                    </th>
                    <th  className="px-6 py-3">
                      Email_address
                    </th>
                    <th className="px-6 py-3">
                      Role
                    </th>
                    <th  className="px-6 py-3">
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
                          {item.user_name}
                        </td>
                        <td class="px-6 py-4">{item.email_address}</td>
                        <td class="px-6 py-4">{item.role}</td>
                        <td class="px-6 py-4 space-x-2 flex">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 no-underline  hover:no-underline"
                            onClick={() => handleEditUser(item._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium text-red-600 no-underline hover:text-red-600 hover:no-underline"
                            onClick={() => handleDeleteUser(item._id)}
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

export default Students;
