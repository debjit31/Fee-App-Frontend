// src/pages/FeeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FeeDetails() {
  const { id } = useParams();
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const response = await fetch(`http://3.111.84.98:61001/api/v1/getFeeDetails/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFee(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!fee) {
    return <p>No fee found</p>;
  }

  return (
    <div style={{ padding: 20, paddingTop : 80 }}>
      <h2>Fee Details for : {fee.studentName}</h2>
      <p><strong>Student Name:</strong> {fee.studentName}</p>
      <p><strong>Month:</strong> {fee.month}</p>
      <p><strong>Notification Triggered:</strong> {fee.notificationTriggered === 'Y' ? 'Yes' : 'No'}</p>
      <p><strong>Student Email:</strong> {fee.studentEmail}</p>
      <p><strong>Amount:</strong> {fee.amount}</p>
      <p><strong>Transaction Date:</strong> {fee.transactionDate}</p>
    </div>
  );
}

export default FeeDetails;
