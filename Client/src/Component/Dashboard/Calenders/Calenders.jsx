import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Scheduler, Resource} from "devextreme-react/scheduler";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const currentDate = new Date();
const views = ["day", "week", "workWeek", "month"];

function Calenders() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
        `${process.env.REACT_APP_SECRET_KEY}/calender/all-events`,
        config
      );

      // Set the fetched user data to the state
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  // const HandleEditCalender = (userId) => {
  //   // Navigate to the Update page with userId as URL parameter
  //     window.location.href = `/EditEvent/${userId}`;
  // };

  // const handleClick = () => {
  //   //navigate('/AddEvent', { state: { date: currentDate } });
  // };

// Handle cell click in the Scheduler
const handleClick = async (e) => {
  console.log("e",e)
  try {
    // Extract the event data from the clicked cell
    const eventData = e.cellData;

    // Check if the clicked cell contains an event
    if (eventData && eventData.id) {
      // If yes, proceed with the deletion
      await deleteEvent(eventData.id);
    } else {
      // If no event exists, do nothing or provide feedback to the user
      console.log("No event found in the clicked cell.");
    }
  } catch (error) {
    console.error("Error handling click:", error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_SECRET_KEY}/calender/delete-event/${eventId}`,
      config
    );

    
    fetchUserData();
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};



  const transformedData = data.map((event) => {
    const { event_name, event_date, event_time, _id, event_description } = event;
    const startDateTime = `${event_date}T${event_time}:00.000Z`;
    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    
    return {
      text: event_name,
      startDate,
      endDate,
      _id,
      description: event_description
    };
  });
 
  const handleEventDeletion = async (e) => {
    const eventId = e.appointmentData._id;
    console.log('Event data:', e);
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
     
      
      const response = await axios.delete(
        `${process.env.REACT_APP_SECRET_KEY}/calender/delete-event/${eventId}`,
        config
      );

      toast.success("Event deleted successfully!");;

      fetchUserData();
    } catch (error) {
      console.error("Error deleting event:", error);
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60">
          {/* Your main content goes here */}
          <div className="md:ml-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full flex justify-end mr-32 my-2">
              <button className=" bg-blue-500  font-bold py-2 px-4 rounded-md  mr-4 md:mr-12">
                <Link to="/AddEvent" className="text-white no-underline">
                  Add Event
                </Link>
              </button>
            </div>
            <div class="md:w-11/12 w-full md:relative absolute md:left-16 left-2  overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-spacing-7 mb-4">
              <div className="overflow-x-auto overflow-y-auto">
              

<Scheduler
                timeZone="America/Los_Angeles"
                dataSource={transformedData} 
                views={views}
                defaultCurrentView="month"
                defaultCurrentDate={currentDate}
                height={730}
                showAllDayPanel={false}
                startDayHour={9}
                onCellClick={handleClick}
                editing={{
                  allowAdding: false,
                  allowUpdating: true,
                  allowDeleting: true,
                }}
                onAppointmentDeleted={handleEventDeletion}
              >
                <Resource
                  dataSource={transformedData}
                  fieldExpr="description"
                  allowMultiple={true}
                />
              </Scheduler>
              </div>
            </div>
            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Calenders;