import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AssignmentUser() {
  const [studentId, setRole] = useState(null);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  const GetData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:5000/assignment/assignments/getAll",
        config
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        if (decodedToken && decodedToken.id && decodedToken.role) {
          setRole(decodedToken.id);
        } else {
          setError({ message: "ID or role not found in the decoded token" });
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e, assignmentId) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignmentId", assignmentId);
      formData.append("studentId", studentId);
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/assignment/assignments/uploadFile",
        formData,
        config
      );
      toast.success("Assignment Submitted Successfully !");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const isPastDeadline = (deadline) => {
    const now = new Date();
    const assignmentDeadline = new Date(deadline);
    return now > assignmentDeadline;
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60">
          <div className="md:ml-4 mt-2">
            <div className="w-10/12 mx-auto">
              <table className="text-left w-full">
                <thead className="bg-black flex text-white w-full">
                  <tr className="flex w-full mb-4">
                    <th className="p-4 w-1/6">Assignment Title</th>
                    <th className="p-4 w-1/6">Description</th>
                    <th className="p-4 w-1/6">Submission Deadline</th>
                    <th className="p-4 w-1/4">Assignment</th>
                    <th className="p-4 w-1/4">Marks</th>
                    <th className="p-4 w-1/4">Upload Assignment</th>
                  </tr>
                </thead>
                <tbody className="bg-grey-light flex flex-col items-center justify-between  w-full">
                  {data.map((assignment) => (
                    <tr className="flex w-full mb-4" key={assignment._id}>
                      <td className="p-4 w-1/3">{assignment.title}</td>
                      <td className="p-4 w-1/3">{assignment.description}</td>
                      <td className="p-4 w-1/3">
                        {new Date(assignment.deadline).toLocaleString("en-PK")}
                      </td>
                      <td className="p-4 w-1/2">
                        <a
                          href={`http://localhost:5000/uploads/${assignment.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          View Assignment
                        </a>
                      </td>
                      {assignment.submissions.map((e) => {
                        if (studentId === e.student) {
                          return (
                            <td className="p-4 w-1/3 ">
                              {e.result ? e.result : "----"}
                            </td>
                          );
                        }
                        return null;
                      })}
                      <td className="p-4 w-1/4 ">
                        {!isPastDeadline(assignment.deadline) && (
                          <form
                            onSubmit={(e) => handleSubmit(e, assignment._id)}
                          >
                            <input
                              type="file"
                              name="file"
                              onChange={handleFileChange}
                            />
                            <div className="w-full flex justify-end mt-4">
                              <button
                                type="submit"
                                className="w-20 rounded bg-info px-4 py-1 text-xs font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        )}
                        {isPastDeadline(assignment.deadline) && (
                          <p className="text-red-500">
                            Deadline has passed. Cannot submit.
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AssignmentUser;
