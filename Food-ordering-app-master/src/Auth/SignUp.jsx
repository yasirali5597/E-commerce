import React,{useState , useEffect} from "react";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const Signup = () => {

    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
      toast.info("Please fill the form to create an account")

    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        const user = {
            name,  
            email , 
            password, 
            confirmPassword,
            
        }

        localStorage.setItem("user" , JSON.stringify(user));
        alert("acccount created successfully ");
        toast.success("account created successfully")

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login")

    }

    const navigare = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
      <form 
      onSubmit={handleSubmit}
      className="border border-emerald-600 p-10 rounded-md w-[350px]">
        <h1 className="text-3xl font-bold mb-6 text-emerald-500">
          Sign Up
        </h1>

        <div className="mb-4 flex flex-col gap-2">
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Full Name"
            className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 rounded-md px-4 py-1 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 rounded-md px-4 py-1 outline-none focus:border-emerald-500"
          />
        </div>

        {/* <div className="mb-4 flex flex-col gap-2">
          <label>User Name</label>
          <input
            type="text"
            placeholder="Choose User Name"
            className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 rounded-md px-4 py-1 outline-none focus:border-emerald-500"
          />
        </div> */}

        <div className="mb-4 flex flex-col gap-2">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Create Password"
            className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 rounded-md px-4 py-1 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label>Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 rounded-md px-4 py-1 outline-none focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-red-300 py-1 rounded-md font-semibold hover:scale-105 transition-all duration-300"
        >
          Create Account
        </button>

        <p className=" text-gray-400 mt-1 text-xs text-right">
          Already have an account?{" "}
          <span className="text-emerald-500 cursor-pointer hover:underline" onClick={()=> navigare("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;