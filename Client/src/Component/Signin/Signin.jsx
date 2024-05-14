import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import grade from '../../pic/grade.jpg'
function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already logged in before rendering the login page
    if (sessionStorage.getItem("token")) {
      // If token exists, user is already logged in, so redirect to dashboard based on role
      const decodedToken = JSON.parse(
        atob(sessionStorage.getItem("token").split(".")[1])
      );
      if (decodedToken.role === "admin") {
        navigate("/Students");
      }else if(decodedToken.role === "student"){
           navigate("/Users")
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (password.length < 4) {
       toast.error("Password must be at least 5 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email_address: email,
        password: password,
      });
      sessionStorage.setItem("isLoggedIn", "true");
     // Store the token in Session storage
     sessionStorage.setItem("token", response.data.token);
     const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
     if (decodedToken.role === "admin") {
       navigate("/Students");
     } else if (decodedToken.role === "student") {
       navigate("/Users");
     }
    } catch (error) {
       toast.error("Login unsuccessful. Please check your credentials.");
    }
  };

  return (
   
    <div class="h-screen bg-gradient-to-br bg-gray-300 flex justify-center items-center w-full" style={{ backgroundImage: `url(${grade})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <form>
        <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div class="space-y-4">
            <h1 class="text-center text-2xl font-semibold text-gray-600">Sign In </h1>
            <div>
              <label  className="block mb-1 text-gray-600 font-semibold">Email</label>
              <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required=""
              className="bg-indigo-50 font-medium text-slate-950  py-2 outline-none rounded-md w-full" />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">Password</label>
              <input 
               type="password"
               placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               name="password"
              id="password"
              className="bg-indigo-50 text-slate-950 py-2 outline-none rounded-md w-full" />
            </div>
          </div>
          <button
           type="button"
           onClick={handleLogin}
          className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>



  );
}

export default Signin;




