import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header */}
      <div className="relative">
        <h1 className="text-3xl font-bold text-gray-900 px-4 py-2 rounded-lg">
          Join as a client or talent
        </h1>
        
      </div>

      {/* Selection Boxes */}
      <div className="mt-6 flex space-x-4">
        <div
          className={`p-6 border-2 rounded-xl cursor-pointer text-center w-64 ${
            selected === "client"
              ? "border-gray-900 shadow-lg"
              : "border-gray-300"
          }`}
          onClick={() => setSelected("client")}
        >
          <span className="text-xl">🚀</span>
          <p className="mt-2 text-gray-700">I’m a client, hiring for a project</p>
          <input
            type="checkbox"
            checked={selected === "client"}
            className="mt-2"
            readOnly
          />
        </div>

        <div
          className={`p-6 border-2 rounded-xl cursor-pointer text-center w-64 ${
            selected === "talent"
              ? "border-gray-900 shadow-lg"
              : "border-gray-300"
          }`}
          onClick={() => setSelected("talent")}
        >
          <span className="text-xl">👨‍💻</span>
          <p className="mt-2 text-gray-700">I’m talent, looking for projects</p>
          <input
            type="checkbox"
            checked={selected === "talent"}
            className="mt-2"
            readOnly
          />
        </div>
      </div>

      {/* Create Account Button */}
      <button onClick={() => navigate("/onboarding/route1")}
        className={`mt-6 px-6 py-2 text-white font-semibold rounded-lg ${
          selected ? "bg-black" : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!selected}
      >
        {selected === "client" ? "Join as a Client" : selected === "talent" ? "Join as Talent" : "Create Account"}
      </button>

      {/* Login Link */}
      <p className="mt-4 text-gray-700">
        Already have an account?{" "}
        <a href="#" className="font-bold text-black">
          Log In
        </a>
      </p>
    </div>
  );
};

export default JoinPage;
