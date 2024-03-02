import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";

function Profile() {
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

            <h1>Profile</h1>
            {/* Other components and content */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
