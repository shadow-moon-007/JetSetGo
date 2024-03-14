import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

function SuccessPage() {
  const location = useLocation();
  const bookingNumber = new URLSearchParams(location.search).get('bookingNumber');

  return (
    <Box className="success-page" sx={{ backgroundColor: '#f5f5f5', padding: 3 }}>
      <h1>Booking Confirmed!</h1>
      <Typography variant="body1">
        Your booking number is: {bookingNumber}
      </Typography>

      <Button href="/" variant="contained" color="primary">
        Go Back Home
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Thank you for booking with us!
      </Typography>
    </Box>
  );
}

export default SuccessPage;
