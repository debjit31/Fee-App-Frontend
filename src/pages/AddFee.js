// src/pages/AddFee.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeeForm from '../components/FeeForm';
import { Box, Typography } from '@mui/material';

function AddFee() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('http://13.127.110.235:61001/api/v1/addFee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Fee added successfully');
        setTimeout(() => {
          navigate('/fees');
        }, 1000); // Redirect after 1 second to allow users to see the success message
      } else {
        setMessage('Failed to add fee');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div style={{ padding: 20, paddingTop : 80 }}>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <FeeForm onSubmit={handleFormSubmit} />
      {message && (
        <Typography variant="body1" mt={2} color={message.includes('successfully') ? 'green' : 'red'}>
          {message}
        </Typography>
      )}
    </Box>
    </div>
  );
}

export default AddFee;
