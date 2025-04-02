import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobConnector() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl">
      {/* Job Connector Button */}
      <button
        className="bg-green-500 text-white font-semibold px-10 py-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={() => setShowOptions(!showOptions)}
      >
        JOB Connector
      </button>

      {/* Job Seeker & Job Provider Buttons */}
      {showOptions && (
        <div className="flex flex-col gap-4 mt-6 w-full max-w-sm">
          <button
            className="bg-blue-500 text-white font-semibold px-10 py-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={() => navigate("/jobseeker-login")}
          >
            Select For Seeker or Provider
          </button>
        </div>
      )}
    </div>
  );
}