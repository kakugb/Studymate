import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import session from '../../pic/session.jpg'
function SessionUser() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/session/all-sessions', config);

        const allUsersData = response.data;
        setUserData(allUsersData);
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

  const tokens = sessionStorage.getItem('token');
  const userId = getUserId(tokens);

  // Function to find user by ID
  const findUserById = (userId) => {
    if (!userData) return null;
    const session = userData.find((session) => session.user_id?._id === userId);
    return session || {}; // Return an empty object if user is not found
  };

  const currentUser = findUserById(userId);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 md:pl-60" style={{ backgroundImage: `url(${session})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="ml-4 mt-2">
            {/* Content of the dashboard */}
            {currentUser ? (
              <div className="md:w-11/12 w-full md:relative absolute md:left-16 left-2  overflow-x-auto shadow-md sm:rounded-lg mt-2 bg-white">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th  className="px-5 py-3">
                        Student Name
                      </th>
                      <th  className="px-5 py-3">
                        Session Name
                      </th>
                      <th  className="px-5 py-3">
                        Start Time
                      </th>
                      <th  className="px-5 py-3">
                        End Time
                      </th>
                      <th  className="px-5 py-3">
                        Progress
                      </th>
                      <th className="px-5 py-3">
                        Materials
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-5 py-4">{currentUser.user_id ? currentUser.user_id.user_name : 'No Student Name'}</td>
                      <td className="px-5 py-4">{currentUser.session_name || 'No Session Name'}</td>
                      <td className="px-5 py-4">{currentUser.start_time || 'No Start Time'}</td>
                      <td className="px-5 py-4">{currentUser.end_time || 'No End Time'}</td>
                      <td className="px-5 py-4">{currentUser.progress || 'No Progress'}</td>
                      <td className="px-5 py-4">{currentUser.materials || 'No Materials'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No session data found</div>
            )}
            {/* Other components and content */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SessionUser;
