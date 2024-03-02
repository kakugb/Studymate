import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Group() {
  const [data, setData] = useState([]);
  // Fetch user data from the API
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
        `${process.env.REACT_APP_SECRET_KEY}/group/get-all-groups`,
        config
      );

      // Set the fetched user data to the state
      //const userData = response.data.Users;
      setData(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts or when it returns to the page
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts or when it returns

  const handleEditUser = (userId) => {
    // Navigate to the Update page with userId as URL parameter
    window.location.href = `/EditGroup/${userId}`;
  };

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
        `${process.env.REACT_APP_SECRET_KEY}/group/group-delete/${userId}`,
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
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className=" bg-gray-200 md:pl-60">
          {/* Your main content goes here */}
          <div className="md:ml-6 md:mr-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full h-10 flex justify-end md:pr-3 pr-3">
              <button className=" bg-blue-500  font-bold py-2 px-4 rounded-md md:mr-8">
                <Link to="/AddGroup" className="text-white no-underline font-semibold">
                  Add Group
                </Link>
              </button>
            </div>
            <div className="md:w-11/12 w-full md:relative absolute md:left-16 left-2  overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-spacing-7">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Group name
                    </th>
                    <th scope="col" class="px-8 py-3">
                      User Name
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
                          {item.group_name}
                        </td>
                        <td class="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user_id && item.user_id.user_name ? item.user_id.user_name : 'N/A'}</td>
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

export default Group;
