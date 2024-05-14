import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import file from "../../../pic/file.png";

function Document() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
 
  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:5000/document/documents",
        config
      );

      // Filter documents based on the folder ID
      const filteredDocuments = response.data.filter(
        (document) => document.folder === id
      );

      setDocuments(filteredDocuments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const DeleteDocument =async(id)=>{
    try {
        const token = sessionStorage.getItem("token"); 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
       
        const res = await axios.delete(`http://localhost:5000/document/documents/${id}`, config);
      
        toast.success('Document deleted Successfully !')
  
        fetchData()
      } catch (error) {
        console.error("Error deleting record:", error);
      }
}
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
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full flex justify-end mr-32 my-3">
              <button className=" bg-blue-500  font-bold py-2 px-4 rounded-md md:mr-12">
                <Link
                  to={`/AddDocument/${id}`}
                  className="text-white no-underline"
                >
                  Add Document
                </Link>
              </button>
            </div>

            <div className="w-10/12 mx-auto grid grid-cols-6 gap-6 mt-5">
              {documents.map((document) => (
                <div key={document._id} className="w-32">
                  <a
                    href={`http://localhost:5000/${document.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4  mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    {document.isPublic ? (
                      <RemoveRedEyeIcon className="absolute z-20 mt-[75px] ml-[70px]" />
                    ) : (
                      <VisibilityOffIcon className="absolute z-20 mt-[75px] ml-[70px]" />
                    )}
                   
                    <img src={file} alt="file" className="w-32 h-20" />
                  </a>
                  <DeleteOutlinedIcon className="absolute z-10 ml-16 mt-1" onClick={(e)=>DeleteDocument(document._id)} />

                  <h2 className="text-lg text-bold mt-2 text-center">
                    {document.title}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Document;
