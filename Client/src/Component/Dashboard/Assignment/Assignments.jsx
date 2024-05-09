import React, { useEffect ,useState} from "react";
import axios from 'axios'
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Assignments() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const GetData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to the API endpoint
      const response = await axios.get(
        'http://localhost:5000/assignment/assignments/getAll',
        config
      );

      // Set the fetched user data to the state
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    GetData();
  }, []);


  const DeleteRec = async (id) => {
    try {
      const token = sessionStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
     
      const res = await axios.delete(`http://localhost:5000/assignment/assignments/delete/${id}`, config);
      toast.success('Assignment deleted successfully !')

      GetData()
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  }
  
  const handleEdit = (assignmentId) => {
    navigate(`/EditAssignment/${assignmentId}`);
  };

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
                <Link to="/CreateAssignment" className="text-white no-underline">
                  Add Assignment
                </Link>
              </button>
            </div>
       
            <div className="w-10/12 mx-auto">

	<table className="text-left w-full">
		<thead className="bg-black flex text-white w-full">
			<tr className="flex w-full mb-4">
				<th className="p-4 w-1/4">Title</th>
				<th className="p-4 w-1/4">Description</th>
        <th className="p-4 w-1/4">Submission Deadline</th>
				<th className="p-4 w-1/4">Assignment</th>			
				<th className="p-4 w-1/4">Summited Assignment</th>		        	
        <th className="p-4 ">Action</th>
			</tr>
		</thead>
  
		<tbody className="bg-grey-light flex flex-col items-center justify-between  w-full">
    {data.map(assignment => (
                    <tr className="flex w-full mb-4" key={assignment._id}>
                      <td className="p-4 w-1/2">{assignment.title}</td>
                      <td className="p-4 w-1/2">{assignment.description}</td>
                      <td className="p-4 w-1/4">{new Date(assignment.deadline).toLocaleString('en-PK')}</td>
                      <td className="p-4 w-1/4"> <a
                          href={`http://localhost:5000/uploads/${assignment.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4  mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          View Assignment
                        </a></td>
                        <td className="p-4 w-1/4"><Link to={`/StudentSubAssignment/${assignment._id}`} className="text-black font-bold no-underline">Submitted Assignment</Link>
                        </td>
                      <td className="p-4 w-1/6 flex justify-between">
                        <button className="h-12 bg-blue-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => handleEdit(assignment._id)}>Edit</button>
                        <button className="h-12 bg-red-500 text-white px-3 py-1 rounded-md" onClick={()=>DeleteRec(assignment._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
		</tbody>
	</table>
</div>
            
            {/* Other components and content */}
          </div>
        </main>
      </div>
    <ToastContainer/>
    </div>
  );
}

export default Assignments;
