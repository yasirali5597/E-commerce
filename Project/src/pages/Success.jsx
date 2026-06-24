

import React, { useEffect, useState, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Success = ({
  waitTime = 3000, // Time spinner shows before success message (ms)
  redirectTo = "/", // Redirect path after countdown
  title = "Order Successful!",
  message = "Thank you for your purchase. Your order has been placed and is being processed.",
  countdownStart = 5, // Countdown seconds before redirect
}) => {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(countdownStart);
  const [confettiDimensions, setConfettiDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useNavigate();
  const countdownIntervalRef = useRef(null);

  // 1. Show spinner for waitTime, then show success message
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      console.log("Success: Order placed - event logged");
    }, waitTime);
    return () => clearTimeout(timer);
    

  }, [waitTime]);

  // 2. Handle countdown timer logic
  useEffect(() => {
    if (!loading && countdown > 0 && !isPaused) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(countdownIntervalRef.current);
  }, [loading, countdown, isPaused]);

  // 3. Redirect after countdown hits zero
  useEffect(() => {
    if (!loading && countdown === 0) {
      // toast.success("Order Successfull !")

      navigate("/dashboard");
      window.location.reload();
    }
  }, [countdown, loading, navigate, redirectTo]);

  // 4. Update confetti size on window resize
  useEffect(() => {
    const handleResize = () => {
      setConfettiDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
   

  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-white to-blue-100"
      role="alert"
      aria-live="assertive"
    >
      {loading ? (
        <PropagateLoader color="#10b981" size={20} aria-label="Loading spinner" />
      ) : (
        <>
          <Confetti
            width={confettiDimensions.width}
            height={confettiDimensions.height}
            numberOfPieces={150}
            recycle={false}
            run={!isPaused}
          />
          <div
            className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full text-center animate-fade-in-up"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            tabIndex={0}
            aria-label="Order success message. Countdown paused on focus or hover."
          >
            <CheckCircle className="mx-auto text-green-500" size={72} aria-hidden="true" />
            <h2 className="text-4xl font-bold mt-4 text-gray-800">{title}</h2>
            <p className="text-lg text-gray-600 mt-4">{message}</p>
            <p className="text-sm text-gray-500 mt-6">
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
              <br />
              (Hover here to pause)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Success;




// import React, { useEffect, useState, useRef } from "react";
// import { PropagateLoader } from "react-spinners";
// import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
// import Confetti from "react-confetti";
// import { useNavigate } from "react-router-dom";

// const Success = ({
//   waitTime = 3000,
//   redirectTo = "/Dashboard",
//   title = "Order Placed!",
//   message = "Thank you for your purchase. Your order has been placed and is being processed.",
//   countdownStart = 5,
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [countdown, setCountdown] = useState(countdownStart);
//   const [confettiDimensions, setConfettiDimensions] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 800,
//     height: typeof window !== "undefined" ? window.innerHeight : 600,
//   });

//   // Use ref for isPaused to avoid timer restarts on every hover
//   const [isPaused, setIsPaused] = useState(false);
//   const isPausedRef = useRef(false);

//   const navigate = useNavigate();
//   const countdownIntervalRef = useRef(null);

//   // 1. Show spinner for waitTime, then reveal success card
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, waitTime);
//     return () => clearTimeout(timer);
//   }, [waitTime]);

//   // 2. Start countdown once loading is done — runs only once
//   useEffect(() => {
//     if (loading) return;

//     countdownIntervalRef.current = setInterval(() => {
//       if (!isPausedRef.current) {
//         setCountdown((c) => {
//           if (c <= 1) {
//             clearInterval(countdownIntervalRef.current);
//             return 0;
//           }
//           return c - 1;
//         });
//       }
//     }, 1000);

//     return () => clearInterval(countdownIntervalRef.current);
//   }, [loading]); // ✅ Only runs when loading flips — no isPaused dependency bug

//   // 3. Redirect when countdown hits zero
//   useEffect(() => {
//     if (!loading && countdown === 0) {
//       navigate(redirectTo); // ✅ Uses prop, not hardcoded path
//     }
//   }, [countdown, loading, navigate, redirectTo]);

//   // 4. Update confetti size on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setConfettiDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Pause helpers — update both state (for UI) and ref (for interval)
//   const handlePause = () => {
//     setIsPaused(true);
//     isPausedRef.current = true;
//   };

//   const handleResume = () => {
//     setIsPaused(false);
//     isPausedRef.current = false;
//   };

//   // Progress bar width
//   const progressPercent = ((countdownStart - countdown) / countdownStart) * 100;

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50"
//       role="alert"
//       aria-live="assertive"
//     >
//       {loading ? (
//         /* ── Loading State ── */
//         <div className="flex flex-col items-center gap-6">
//           <PropagateLoader color="#10b981" size={18} aria-label="Processing order..." />
//           <p className="text-gray-500 text-sm tracking-wide animate-pulse">
//             Processing your order...
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* ── Confetti ── */}
//           <Confetti
//             width={confettiDimensions.width}
//             height={confettiDimensions.height}
//             numberOfPieces={200}
//             recycle={false}
//             run={!isPaused}
//             colors={["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"]}
//           />

//           {/* ── Success Card ── */}
//           <div
//             className="
//               relative bg-white shadow-2xl rounded-3xl p-10
//               max-w-lg w-full mx-4 text-center
//               border border-gray-100
//               transition-all duration-300
//             "
//             style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
//             onMouseEnter={handlePause}
//             onMouseLeave={handleResume}
//             onFocus={handlePause}   // ✅ Keyboard accessibility
//             onBlur={handleResume}
//             tabIndex={0}
//             aria-label="Order placed successfully. Countdown paused while hovering or focused."
//           >
//             {/* Top accent bar */}
//             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl" />

//             {/* Icon */}
//             <div className="flex justify-center mb-5">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
//                   <CheckCircle className="text-emerald-500" size={52} aria-hidden="true" />
//                 </div>
//                 {/* Ping animation ring */}
//                 <span className="absolute inset-0 rounded-full bg-emerald-300 opacity-30 animate-ping" />
//               </div>
//             </div>

//             {/* Title */}
//             <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">{title}</h2>

//             {/* Message */}
//             <p className="text-gray-500 mt-3 text-base leading-relaxed">{message}</p>

//             {/* Divider */}
//             <div className="my-6 border-t border-dashed border-gray-200" />

//             {/* Order info chips */}
//             <div className="flex justify-center gap-3 flex-wrap mb-6">
//               <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
//                 <ShoppingBag size={12} /> Order Confirmed
//               </span>
//               <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
//                 📧 Confirmation Email Sent
//               </span>
//             </div>

//             {/* Progress bar */}
//             <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
//               <div
//                 className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-linear"
//                 style={{ width: `${progressPercent}%` }}
//               />
//             </div>

//             {/* Countdown text */}
//             <p className="text-sm text-gray-400">
//               {isPaused ? (
//                 <span className="text-amber-500 font-medium">⏸ Paused — move away to resume</span>
//               ) : (
//                 <>
//                   Redirecting to Dashboard in{" "}
//                   <span className="font-semibold text-gray-600">
//                     {countdown}s
//                   </span>
//                 </>
//               )}
//             </p>

//             {/* Manual redirect button */}
//             <button
//               onClick={() => navigate(redirectTo)}
//               className="
//                 mt-6 inline-flex items-center gap-2
//                 bg-emerald-500 hover:bg-emerald-600
//                 text-white text-sm font-semibold
//                 px-5 py-2.5 rounded-xl
//                 transition-colors duration-200
//                 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
//               "
//             >
//               Go to Dashboard <ArrowRight size={15} />
//             </button>
//           </div>
//         </>
//       )}

//       {/* Keyframe animation */}
//       <style>{`
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Success;