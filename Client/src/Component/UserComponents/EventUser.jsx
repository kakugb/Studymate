import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Resource } from 'devextreme-react/scheduler';
import Scheduler from "devextreme-react/scheduler";
const currentDate = new Date();
const views = ["day", "week", "workWeek", "month"];

function EventUser() {
  
  const [filteredUserData, setFilteredUserData] = useState(null); 
  
console.log("fff",filteredUserData)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await axios.get('http://localhost:5000/calender/all-events', config);
        const allUsersData = response.data; 
       
  
        const userId = getUserId(token); 
        if (userId) {
          const filteredData = allUsersData.filter(user => user.user_id?._id === userId);
          setFilteredUserData(filteredData);
        }
      } catch (error) {
        console.log('Error Fetching User Data', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const getUserId = (tokens) => {
    try {
      const tokenParts = tokens.split('.');
      const decodedPayload = atob(tokenParts[1]);
      const payloadObj = JSON.parse(decodedPayload);
      const userId = payloadObj.id;
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };


  const transformedData = filteredUserData?.map((event) => {
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
            <div className="w-[95%] mx-auto overflow-x-auto overflow-y-auto">
              {filteredUserData && (
                <Scheduler
                timeZone="America/Los_Angeles"
                dataSource={transformedData} 
                views={views}
                defaultCurrentView="month"
                defaultCurrentDate={currentDate}
                height={730}
                showAllDayPanel={false}
                startDayHour={9}
                editing={{
                  allowAdding: false,
                  allowUpdating: true,
                  allowDeleting: true,
                }}
              >
                <Resource
                  dataSource={transformedData}
                  fieldExpr="description"
                  allowMultiple={true}
                />
              </Scheduler>
              )}
            </div>
            {/* Other components and content */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default EventUser;
