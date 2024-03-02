import React from "react";
import { useEffect,useState } from "react";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard() {
  const [toastShown, setToastShown] = useState(false);

  // Function to display the toast message
  const displayToast = () => {
    if (!toastShown) {
      // Show toast message
      toast.info("Welcome to the Dashboard!");
      // Set the flag to indicate the toast message has been shown
      setToastShown(true);
    }
  };

  useEffect(() => {
    // Call the function to display the toast message when the component mounts
    displayToast();
  }, []); // This useEffect runs only once when the component mounts

 
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60">
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            <h1 className="text-2xl  font-semibold ">Dashboard</h1>
            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
