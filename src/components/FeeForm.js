import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, DialogContent, DialogActions
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';

const FeeForm = ({ studentId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    month: dayjs(), // use dayjs for date picker
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value) => {
    setFormData(prev => ({ ...prev, month: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId,
      amount: formData.amount,
      month: formData.month.format('MMMM YYYY'), // Example: March 2025
      date: new Date().toISOString(),
    };

    try {
      await axios.post('https://localhost:443/api/v1/addFeeTransaction', payload);
      alert('Fee submitted successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting fee:', error);
      alert('Failed to submit fee.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Add Fee Payment</Typography>

            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
            />

            <DatePicker
              views={['year', 'month']}
              label="Select Fee Month"
              value={formData.month}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </LocalizationProvider>
  );
};

export default FeeForm;
