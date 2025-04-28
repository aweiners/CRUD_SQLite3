import { useState, useEffect } from 'react'
import Forms from './Forms';
import './App.css'

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("API data received:", data);
        
        const users = Array.isArray(data) ? data : data.users || [];
        setBackendData(users);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="container mx-auto">
        <Forms users={backendData} />

          <div className="flex justify-center items-center">
          <a href="http://localhost:5000/users">
            <button className="border-black border-1 p-3 rounded-lg bg-blue-300 text-black font-bold hover:bg-blue-400">
              Go to users
            </button>
          </a>
          </div>
      </div>

        
    </>
    
  )
}

export default App