import React, { useState } from 'react';
import {
  TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel,
  FormControl, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import { LocalizationProvider, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const subjectOptions = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

const RegisterStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    contactNumber: '',
    admissionDate: dayjs(),
    subjects: [],
    classTimings: dayjs(),
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDateChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      contactNumber: formData.contactNumber,
      admissionDate: formData.admissionDate.toISOString(),
      subjects: formData.subjects,
      classTimings: formData.classTimings.toISOString(),
    };

    console.log('Submitting Student:', payload);

    try {
      await axios.post('https://localhost/api/v1/addStudent', payload);
      alert('Student registered successfully!');
      navigate('/'); // Redirect to home page after success
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Failed to register student.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: '#f4f6f8', borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#2c3e50', fontWeight: 'bold' }}>
          Register New Student
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange('firstName')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange('lastName')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={formData.emailAddress}
                onChange={handleChange('emailAddress')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                fullWidth
                value={formData.contactNumber}
                onChange={handleChange('contactNumber')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Admission Date"
                value={formData.admissionDate}
                onChange={handleDateChange('admissionDate')}
                renderInput={(params) => <TextField fullWidth {...params} required />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Class Timings"
                value={formData.classTimings}
                onChange={handleDateChange('classTimings')}
                renderInput={(params) => <TextField fullWidth {...params} required />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Subjects</InputLabel>
                <Select
                  multiple
                  value={formData.subjects}
                  onChange={handleChange('subjects')}
                  input={<OutlinedInput label="Subjects" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {subjectOptions.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      <Checkbox checked={formData.subjects.indexOf(subject) > -1} />
                      <ListItemText primary={subject} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#2980b9' }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default RegisterStudent;
