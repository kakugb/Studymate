import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function StudentSubAssignment() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const GetData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:5000/assignment/assignments/submissions/${id}`,
        config
      );

      setData(response.data);
      // Initialize results state with empty strings for each assignment
      setResults(response.data.map(() => ""));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleResultChange = (index, value) => {
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[index] = value;
      return updatedResults;
    });
  };

  const handleUpdateResult = async (studentId, index) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
  
      // Get the student ID from the data state
      const student = data[index];
      const studentId = student.student;
  
      await axios.put(
        `http://localhost:5000/assignment/assignments/updateResult/${id}`,
        { studentId, result: results[index] },
        config
      );
  
      // Handle success response
      toast.success("Result updated successfully!");
    } catch (error) {
      console.error("Error updating assignment result:", error);
      // Handle error response
      toast.error("Failed to update result");
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60">
          <div className="md:ml-4 mt-2">
            <h1 className="text-2xl font-semibold text-black text-center">
              Add Folder
            </h1>
            <div className="w-10/12 mx-auto">
              <table className="text-left w-full">
                <thead className="bg-black flex text-white w-full">
                  <tr className="flex w-full mb-4">
                    <th className="p-4 w-1/2">Student id</th>
                    <th className="p-4 w-1/2">Assignment</th>
                    <th className="p-4 w-1/2">Add Marks</th>
                  </tr>
                </thead>
                <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                  {data?.map((ele, index) => (
                    <tr className="flex w-full mb-4" key={ele.id}>
                      <td className="p-4 w-1/2">{ele.student}</td>
                      <td className="p-4 w-1/2">
                        <a
                          href={`http://localhost:5000/uploads/${ele.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4  mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          View Assignment
                        </a>
                      </td>
                      <td className="p-4 w-1/2">
                        <div>
                          <input
                            type="text"
                            value={results[index]}
                            onChange={(e) =>
                              handleResultChange(index, e.target.value)
                            }
                          />
                          <button
                            onClick={(e) =>
                              handleUpdateResult(ele.student, index)
                            }
                            type="button"
                            className="inline-block rounded-xl bg-primary px-1 ml-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                          >
                            Add Result
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default StudentSubAssignment;



