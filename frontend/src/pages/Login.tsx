import { useState, useContext } from "react";
import { login } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {toast,  Toaster } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuthToken } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      setAuthToken(data.token);
      toast.success("Login Successful!");
      setTimeout(() => navigate("/tasks"), 1000); 
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-400">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login to Your Account</h2>
        <input 
          type="text" 
          placeholder="Username" 
          className="border p-2 my-2 w-full rounded" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 my-2 w-full rounded" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
        
        {/* New User? Register Here */}
        <p className="mt-4 text-sm text-center">
          New User?{" "}
          <button 
            type="button" 
            onClick={() => navigate("/register")} 
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
