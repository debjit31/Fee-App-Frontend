// src/pages/Home.js
import React from 'react';
// import FeeList from '../components/FeeList';
import { Container, Typography } from '@mui/material';
import StudentTable from '../components/StudentTable';

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Fees
      </Typography>
      {/* <FeeList /> */}
      <StudentTable />
    </Container>
  );
}

export default Home;
