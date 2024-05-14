import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

import file from "../../pic/file.png";
import assignment from '../../pic/assignment.jpg'

function DocumentUser() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Assuming token is stored in sessionStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:5000/document/documents",
        config
      );

      // Filter documents based on the folder ID and isPublic=true
      const filteredDocuments = response.data.filter(
        (document) => document.folder === id && document.isPublic
      );

      setDocuments(filteredDocuments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60" style={{ backgroundImage: `url(${assignment})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
           

            <div className="w-10/12 mx-auto grid grid-cols-6 gap-6 mt-5 bg-white">
              {documents.map((document) => (
                <div key={document._id} className="w-32">
                  <a
                    href={`http://localhost:5000/${document.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4  mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    <img src={file} alt="file" className="w-32 h-20" />
                  </a>

                  <h2 className="text-lg text-bold mt-2 text-center">
                    {document.title}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
     
    </div>
  );
}

export default DocumentUser;
