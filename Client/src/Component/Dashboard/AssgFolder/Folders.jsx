import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import folderimg from "../../../pic/folder.png";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import folder from '../../../pic/folder.jpg'
function AssgFolder() {
  const navigate = useNavigate();

  const UpdateFolder = (id) => {
    navigate(`/UpdateFolder/${id}`);
  };
    const [folders, setFolders] = useState([]);

    
     
        const fetchData = async () => {
            try {
              const token = sessionStorage.getItem('token'); 
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
          
              const response = await axios.get('http://localhost:5000/folder/folders', config);
          
          
              setFolders(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          useEffect(() => {  
      fetchData();
    }, []); 
 

const DeleteFolder =async(id)=>{
    try {
        const token = sessionStorage.getItem("token"); 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
       
        const res = await axios.delete(`http://localhost:5000/folder/folders/${id}`, config);
      
        toast.success('Folder deleted Successfully !')
  
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60" style={{ backgroundImage: `url(${folder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full flex justify-end mr-32 my-3">
             <Link to="/AddFolder">
             <button className=" bg-blue-500 text-white font-bold py-2 px-4 rounded-md md:mr-12">
                Add folder
              </button>
             </Link>
            </div>

            <div className="w-10/12 mx-auto grid grid-cols-6 gap-6 mt-5">
              {
                folders?.map((folder)=>(

              
               <div className="w-32" key={folder._id}>
                  <DeleteOutlinedIcon className="absolute z-10 ml-24 mt-2"  onClick={(e)=>DeleteFolder(folder._id)}/>
                  <CreateIcon className="absolute z-10 mt-[56px] ml-[86px]" onClick={(e)=>UpdateFolder(folder._id)}/>
               <Link to={`/Documents/${folder._id}`}>
                <img src={folderimg} alt="folder" 
                className="w-32 h-20"
                />
               
                <h2 className=" text-lg text-bold mt-2 text-center">{folder.name}</h2>
                </Link>
               </div>
                ))
            }
            </div>

            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AssgFolder;
