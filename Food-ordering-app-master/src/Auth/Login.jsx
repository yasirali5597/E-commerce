import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn) {
      toast.error("No Account founD! please sign up first");
      return;
    }
    if (email !== isLoggedIn.email || password !== isLoggedIn.password) {
      toast.error(`Invalid credentials! please try again, ${isLoggedIn?.name || ""}`, { autoClose: 5000 });
      navigate("/");
    }
    toast.success(`Login successful! Welcome back, ${isLoggedIn.name}!`);
    // toast.success(`Welcome ${isLoggedIn.name}!`); 
    navigate("/home");
  };
  return (
    // <div>
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black  text-white border">
      <form
        onSubmit={handleSubmit}
        className="border border-emerald-600 p-10 rounded-md "
      >
        <h1 className="text-3xl font-bold mb-4 text-emerald-500 ">Login</h1>
        <div className="mb-5 flex flex-col gap-2 ">
          <label> User Name</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter User Name"
            className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600  rounded-md px-4 py-1 "
          />
        </div>
        <div>
          <label> Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="bg-gray-800 flex flex-col mt-2 text-white placeholder:text-gray-500 border border-gray-600  rounded-md px-4 py-1 "
          />
        </div>
        <p className=" text-gray-400 mt-1 text-xs text-right">
          Already have an account?{" "}
          <span
            className="text-emerald-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>{" "}
        <button className=" w-full bg-gradient-to-r from-emerald-500 to-red-300  mt-8 py-1 rounded-md ">
          Login
        </button>
        {/* </div> */}
      </form>
    </div>

    // </div>
  );
};

export default Login;
