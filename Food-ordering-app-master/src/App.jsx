import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ very important
import { Toaster } from "react-hot-toast";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<> <Navbar />  <HomePage /> </>} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/success"
            element={<ProtectedRoute element={<Success />} />}
          />
          <Route path="/*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>

      {/* ✅ ToastContainer must be outside Routes */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
