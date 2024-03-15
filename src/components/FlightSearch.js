import React, { useState } from 'react';
import FlightCard from './FlightCard';
import { TextField, Select, InputLabel, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FlightSearch({ flights }) {
    const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [airlineFilter, setAirlineFilter] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'origin':
        setOrigin(value);
        break;
      case 'destination':
        setDestination(value);
        break;
      default:
        break;
    }
  };

  const handleAirlineFilterChange = (event) => {
    setAirlineFilter(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement search logic based on origin and destination (if needed)

    const filtered = flights.filter((flight) => {
      return (
        (!airlineFilter || flight.airline === airlineFilter) &&
        ((!origin || flight.origin === origin) || (!destination || flight.destination === destination))
      );
    });

    setFilteredFlights(filtered);

    // Apply sorting based on sortBy
    if (sortBy === 'price-low-to-high') {
      filtered.sort((a, b) => a.price - b.price); // Sort by price (low to high)
    } else if (sortBy === 'price-high-to-low') {
      filtered.sort((a, b) => b.price - a.price); // Sort by price (high to low)
    } else if (sortBy === 'departureTime') {
      filtered.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime)); // Sort by departure time (ascending)
    } else {
      // Default sorting (optional)
    }
  };

  const handleBooking = (flight) => {
    //alert('Your flight is booked!');
    const bookingNumber = Math.random().toString(36).substring(2, 15);
    navigate(`/SuccessPage?bookingNumber=${bookingNumber}`);
  };

  return (
   <form onSubmit={handleSubmit}>
    //  <TextField
    //    label="Origin"
     //   name="origin"
     //   value={origin}
    //    onChange={handleInputChange}
    //    margin="normal"
    //    fullWidth
        // Style for dark input field
    //    sx={{
    //      '& .MuiInputBase-root': {
    //        backgroundColor: '#222',
    //        color: '#fff',
    //      },
   //      '& .MuiOutlinedInput-input': {
     //       '&::placeholder': {
    //          color: '#ccc',
    //          opacity: 1,
   //         },
   //       },
  //      }}
  //    />
   //   <TextField
   //     label="Destination"
   //     name="destination"
   //     value={destination}
   //     onChange={handleInputChange}
   //     margin="normal"
   //     fullWidth
  //     
   //     sx={{
    //      '& .MuiInputBase-root': {
   //         backgroundColor: '#222',
   //         color: '#fff',
  //       },
//          '& .MuiOutlinedInput-input': {
 //           '&::placeholder': {
 //             color: '#ccc',
//              opacity: 1,
//            },
//          },
//        }}
 //     />
      <InputLabel id="airline-filter-label">Filter by Airline</InputLabel>
      <Select
        labelId="airline-filter-label"
        id="airline-filter"
        value={airlineFilter}
        onChange={handleAirlineFilterChange}
        label="Airline"
        // Style for dark sorting dropdown
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: '#222',
            color: '#fff',
          },
          '& .MuiInputLabel-outlined': {
            color: '#fff',
          },
        }}
      >
<MenuItem value="">All Airlines</MenuItem>
        {flights.map((flight) => (
          <MenuItem key={flight.id} value={flight.airline}>
            {flight.airline}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="sort-by-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        value={sortBy}
        onChange={handleSortByChange}
        label="Sort By"
        // Style for dark sorting dropdown (continued)
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: '#222',
            color: '#fff',
          },
          '& .MuiInputLabel-outlined': {
            color: '#fff',
          },
        }}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="price-low-to-high">Price (Low to High)</MenuItem>
        <MenuItem value="price-high-to-low">Price (High to Low)</MenuItem>
        <MenuItem value="departureTime">Departure Time (Ascending)</MenuItem>
        {/* Add more sorting options as needed */}
      </Select>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Search Flights
      </Button>
      {filteredFlights.length > 0 && (
        <div className="flight-results">
          <h2>Search Results</h2>
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} handleBooking={handleBooking} />
          ))}
        </div>
      )}
    </form>
  );
}

export default FlightSearch;