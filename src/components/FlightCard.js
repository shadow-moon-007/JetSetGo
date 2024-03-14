import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function FlightCard({ flight, handleBooking }) {
  return (
    <Card sx={{ minWidth: 275, margin: '10px' }}> 
      <CardContent>
        <Typography variant="h5" component="div">
          {flight.airline} - {flight.flightNumber}
        </Typography>
        <Typography sx={{ mb: 1.2 }} color="text.secondary">
          {flight.origin} ({flight.departureTime}) - {flight.destination} ({flight.arrivalTime})
        </Typography>
        <Typography variant="body2">
          Duration: {flight.duration}
        </Typography>
        <Typography variant="body2">
          Price: ₹{flight.price}
        </Typography>
        <Button variant="contained" size="small" onClick={() => handleBooking(flight)}>
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default FlightCard;
