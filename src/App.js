import React, { useState, useEffect } from 'react';
import './App.css';
import FlightSearch from './components/FlightSearch';
import SuccessPage from './components/SuccessPage'; // Import SuccessPage
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://api.npoint.io/378e02e8e732bb1ac55b');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setError('An error occurred while fetching flights. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
          <h1>JetSetGo</h1>
          {error ? (
            <p className="error">{error}</p>
          ) : isLoading ? (
            <p>Loading flights...</p>
          ) : (
            <Routes>
              <Route path="/" element={<FlightSearch flights={flights} />} />
              <Route path="/SuccessPage" element={<SuccessPage />} /> {/* Success page route */}
            </Routes>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
