import React, { useState, useCallback, useEffect } from 'react';
import {
  Typography, Grid, Divider, List, ListItem, ListItemText, Paper, Button,
  Dialog, DialogTitle, IconButton, Tooltip, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeeForm from './FeeForm';

const StudentDetails = ({ studentId, onBack }) => {
  const [student, setStudent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [openFeeForm, setOpenFeeForm] = useState(false);

  const fetchStudentAndTransactions = useCallback(async () => {
    if (!studentId) return;

    try {
      const studentRes = await fetch(`https://43.204.98.7:443/api/v1/getStudentById/${studentId}`);
      if (!studentRes.ok) throw new Error(`Failed to fetch student details`);
      const studentData = await studentRes.json();
      setStudent(studentData.data || studentData);
    } catch (err) {
      console.error("Student fetch error:", err);
    }

    try {
      const txnRes = await fetch(`https://43.204.98.7:443/api/v1/getFeesList/${studentId}`);
      if (!txnRes.ok) throw new Error(`Failed to fetch transactions`);
      const txnData = await txnRes.json();
      setTransactions(txnData.data || []);
    } catch (err) {
      console.error("Transactions fetch error:", err);
      setTransactions([]);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudentAndTransactions();
  }, [fetchStudentAndTransactions]);

  const handleEdit = () => {
    alert('Edit student functionality coming soon!');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Delete this student and all their transactions?');
    if (!confirmDelete) return;

    try {
      // Step 1: Delete transactions
      const txnRes = await fetch(`https://43.204.98.7:443/api/v1/deleteTransactionsByStudentId/${studentId}`, {
        method: 'DELETE',
      });

      if (!txnRes.ok) {
        alert('Failed to delete transactions. Student was not deleted.');
        return;
      }

      // Step 2: Delete student
      const studentRes = await fetch(`https://43.204.98.7:443/api/v1/deleteStudent/${studentId}`, {
        method: 'DELETE',
      });

      if (!studentRes.ok) {
        alert('Failed to delete student after transactions were deleted.');
        return;
      }

      alert('Student and all transactions deleted successfully!');
      onBack(); // Go back to student list
    } catch (err) {
      console.error('Error during deletion:', err);
      alert('An error occurred while deleting the student.');
    }
  };

  if (!student) {
    return <Typography>Loading student details...</Typography>;
  }

  return (
    <Paper elevation={4} sx={{ padding: 4, backgroundColor: '#f8f9fa', mt: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Student Details
        </Typography>
        <Box>
          <Tooltip title="Edit Student">
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Student">
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>First Name:</strong> {student.firstName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Last Name:</strong> {student.lastName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Email Address:</strong> {student.emailAddress}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Contact Number:</strong> {student.contactNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Admission Date:</strong> {new Date(student.admissionDate).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Class Timings:</strong> {new Date(student.classTimings).toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Subjects:</strong> {student.subjects?.join(', ') || 'N/A'}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Fee Transactions
      </Typography>

      {transactions.length === 0 ? (
        <Typography>No transactions found for this student.</Typography>
      ) : (
        <List>
          {transactions.map((txn, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`Amount: ₹${txn.amount}`}
                  secondary={`Date: ${new Date(txn.transactionDate).toLocaleDateString()} | Month: ${txn.month}`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}

      <Button
        variant="outlined"
        color="success"
        sx={{ mt: 3, mr: 2 }}
        onClick={() => setOpenFeeForm(true)}
      >
        Accept Fees
      </Button>

      {onBack && (
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={onBack}>
          Back
        </Button>
      )}

      {/* Modal for FeeForm */}
      <Dialog open={openFeeForm} onClose={() => setOpenFeeForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Accept Fee</DialogTitle>
        <FeeForm
          studentId={studentId}
          onClose={() => setOpenFeeForm(false)}
          onSuccess={fetchStudentAndTransactions}
        />
      </Dialog>
    </Paper>
  );
};

export default StudentDetails;
