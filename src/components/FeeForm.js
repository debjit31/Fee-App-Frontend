// src/components/FeeForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function FeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    month: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', amount: '', month: '', email: '' }); // Clear form
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" mb={2}>Add Fee</Typography>
      <TextField
        label="Student Name"
        name="studentName"
        value={formData.studentName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Month"
        name="month"
        value={formData.month}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        name="studentEmail"
        type="email"
        value={formData.studentEmail}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default FeeForm;
