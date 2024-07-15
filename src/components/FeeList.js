// src/components/FeeList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

function FeeList() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFees = async () => {
    try {
      const response = await fetch('http://localhost:61001/api/v1/getFeeList');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFees(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:61001/api/v1/deleteTransaction/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Refresh the fee list after deletion
      fetchFees();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleViewClick = (id) => {
    navigate(`/fee-details/${id}`);
  };

  return (
    <div style={{ padding: 20, paddingTop : 80 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Month</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Notification Triggered</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fees.map((fee) => (
          <TableRow key={fee.transactionId}>
            <TableCell>{fee.studentName}</TableCell>
            <TableCell>{fee.month}</TableCell>
            <TableCell>{fee.amount}</TableCell>
            <TableCell>{fee.notificationTriggered === 'Y' ? 'Yes' : 'No'}</TableCell>
            <TableCell>
              <Button onClick={() => handleViewClick(fee.transactionId)} variant="contained" sx={{ mr: 1 }}>
                View
              </Button>
              <Button onClick={() => handleDeleteClick(fee.transactionId)} variant="contained" color="secondary" sx={{ ml: 1 }}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}

export default FeeList;
