import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL; // Make sure this is defined in your .env file

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${https://sampledatacollection-api.vercel.app/}/your-endpoint`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data from API</h1>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
