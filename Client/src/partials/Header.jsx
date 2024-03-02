import React, { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");
  }; 

  return (
    <nav className="md:w-full w-full border-gray-200 h-14 dark:bg-gray-900 flex items-center justify-end md:pr-4 bg-white mb-3">
      <div className="relative">
        {/* User icon */}
        <button
          type="button"
          className="focus:outline-none"
          onClick={toggleDropdown}
        >
          <FaUser className="text-4xl text-gray-700 hover:text-blue-500 cursor-pointer pr-4" />
        </button>

        {/* Logout dropdown */}
        {isDropdownOpen && (
          <div className=" absolute  right-0  bg-white border border-gray-200 rounded-md shadow-md z-10">
            <ul className="">
              <li>
                <button
                  type="button"
                  className="w-full h-8 flex flex-row px-2 mt-2 text-gray-700   text-left gap-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className=" items-center mt-1" />
                  Logout
                </button>
              </li>
              {/* Add more dropdown items as needed */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
