import { useState } from "react";
import axios from "axios";

// Backend API URL from Render
const API_URL = "https://greeting-app-backend-1.onrender.com";

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  // Function to fetch greeting from backend
  const getGreeting = async () => {
    if (!name.trim()) {
      setGreeting("Please enter a name.");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/greet?name=${name}`);
      setGreeting(response.data.message);
    } catch (error) {
      setGreeting(error.response?.data?.error || "Error fetching greeting.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          🎉 Greeting App
        </h1>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          onClick={getGreeting}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Greeting
        </button>

        {/* Display Greeting */}
        {greeting && <h2 className="mt-4 text-lg text-gray-700">{greeting}</h2>}
      </div>
    </div>
  );
}

export default App;
