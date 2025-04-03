import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobSeekerLogin = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState("seeker"); 
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const backendUrl = import.meta.env.VITE_BACKEND_LINKKAS || "http://localhost:3000";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true); 

        const apiUrl = `https://job-portal-3-ensm.onrender.com/api/auth${role === "provider" ? "provider" : ""}/${isSignup ? "signup" : "login"}`;

        try {
            const { data } = await axios.post(apiUrl, formData);
            setMessage(data.message);
            localStorage.setItem("token", data.token); 

            navigate(role === "seeker" ? "/seeker-profile" : "/recruiter-profile");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            console.error("Login/Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="w-96 bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {isSignup ? "Create Your Account" : "Welcome Back"}
                </h2>
                
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 rounded-l-lg ${role === "seeker" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => setRole("seeker")}
                    >
                        Job Seeker
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-lg ${role === "provider" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => setRole("provider")}
                    >
                        Job Provider
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {isSignup && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <input type="email" name="email" placeholder="Email" className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.password} onChange={handleChange} required />
                    
                    <button
                        type="submit"
                        className={`text-white font-semibold px-6 py-3 rounded-lg ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"}`}
                        disabled={loading}
                    >
                        {loading ? (isSignup ? "Signing Up..." : "Logging In...") : isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>
                
                {message && <p className="mt-4 text-red-500 font-semibold text-center">{message}</p>}
                
                <p className="text-blue-500 cursor-pointer mt-4 text-center" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
                </p>
            </div>
        </div>
    );
};

export default JobSeekerLogin;