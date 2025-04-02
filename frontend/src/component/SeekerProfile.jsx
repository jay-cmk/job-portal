import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeekerProfile = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [flash, setFlash] = useState(false);
  const formRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "",
    skill: "",
    location: "",
    experience: "",
    ctc: "",
    noticePeriod: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/user/createjob", profileData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Profile Created Successfully!");
      setProfile(profileData);
      setShowForm(false);
      setFlash(true);
      setTimeout(() => setFlash(false), 1000);
    } catch (error) {
      console.error("Profile Creation Error:", error.response?.data || error.message);
      setMessage(`❌ Error: ${error.response?.data?.message || "Failed to create profile."}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <div className="w-1/15"></div>
        <h1 className="text-xl font-bold text-center flex-grow text-white">Job Seeker Dashboard</h1>
        <button className="bg-red-500 px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-lg bg-gray-800 p-6 shadow-md rounded-lg text-center">
          <div className="grid grid-cols-2 gap-4 mb-6 place-items-center w-full">
            <button className="bg-blue-500 text-white px-6 py-3 rounded w-full" onClick={() => setShowForm(true)}>Create Profile</button>
            <button className="bg-green-500 text-white px-6 py-3 rounded w-full" onClick={() => navigate("/alljobseeker")}>Find Profile</button>
            <button className="bg-green-500 text-white px-6 py-3 rounded w-full" onClick={() => navigate("/alljobs")}>Get Total Jobs</button>
            <button className="bg-green-500 text-white px-6 py-3 rounded w-full" onClick={() => navigate("/allappliedjob")}>All Applied Jobs</button>
          </div>

          {showForm && (
            <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-700 p-6 shadow-md rounded-lg">
              <h3 className="text-lg font-bold mb-4">Create Job Seeker Profile</h3>
              {Object.keys(profileData).map((field) => (
                <input
                  key={field}
                  type={field === "experience" || field === "ctc" || field === "noticePeriod" ? "number" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profileData[field]}
                  onChange={handleChange}
                  className="p-2 w-full mb-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  required
                />
              ))}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Save Profile</button>
            </form>
          )}

          {message && <p className="mt-4 text-center font-semibold">{message}</p>}
          
         
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
