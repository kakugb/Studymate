import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import group from "../../../pic/group.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import grade from '../../../pic/grade.jpg' 
function PsychometricTests() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/psychometric-test/psyhometric`,
        config
      );
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };
  const deleteTest = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:5000/psychometric-test/psyhometric/${id}`,
        config
      );
      toast.success("Test deleted successfully");
      // After deleting, fetch the updated tests
      fetchTests();
    } catch (error) {
      console.error("Error deleting test:", error);
      toast.error("Error deleting test");
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
        <main className="w-full h-screen bg-gray-200 md:pl-60 overflow-auto"  style={{ backgroundImage: `url(${grade})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="md:ml-6 md:mr-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full flex justify-end mr-32 my-3">
              <button className="w-[150px] bg-blue-500  font-bold py-2 px-4 rounded-md md:mr-8 mr-3 ">
                <Link to="/AddQuestion" className="text-white no-underline">
                  Add Questions
                </Link>
              </button>
            </div>
            <div className="w-full text-center my-4 underline">
              <h1 className="text-3xl font-extrabold text-black">Quiz Questions</h1>
            </div>
            <div className="w-full grid grid-cols-3 gap-6">
              {tests?.map((questions) => (
                <div class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                  <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    <div class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label className="block text-gray-500 font-bold md:text-right  md:mb-0 pr-4">
                        Test Name :
                      </label>
                      {questions.name}
                      <div class="grid ml-auto place-items-center justify-self-end">
                        <button
                          class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => deleteTest(questions._id)}
                        >
                          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-5 h-5 absolute -top-5"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label className="block text-gray-500 font-bold md:text-right  md:mb-0 pr-4">
                        Test Description :
                      </label>
                      {questions.description}
                    </div>
                    <div class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label className="block text-gray-500 font-bold md:text-right  md:mb-0 pr-4">
                        Total Questions :
                      </label>{" "}
                      {questions.questions.length}
                    </div>
                  </nav>
                </div>
              ))}
            </div>

            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PsychometricTests;
