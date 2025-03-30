import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import StudentDetails from './StudentDetails';
import { motion, AnimatePresence } from 'framer-motion';

// Custom styled cell for contrast
const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#ffffff',
  fontSize: '15px',
  backgroundColor: '#2c3e50',
});

// Zebra row styling
const StyledTableRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? '#ecf0f1' : '#ffffff',
}));

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('https://localhost/api/v1/students');
        const data = await res.json();
        const studentArray = Array.isArray(data) ? data : data.data || [];
        setStudents(studentArray);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Paper elevation={4} sx={{ padding: 3, backgroundColor: '#f8f9fa' }}>
      <AnimatePresence mode="wait">
        {!selectedStudentId ? (
          <motion.div
            key="table"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              All Students
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>First Name</StyledTableCell>
                      <StyledTableCell>Last Name</StyledTableCell>
                      <StyledTableCell>Email Address</StyledTableCell>
                      <StyledTableCell>Contact Number</StyledTableCell>
                      <StyledTableCell>Admission Date</StyledTableCell>
                      <StyledTableCell>Class Timings</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(students) && students.length > 0 ? (
                      students.map((student, index) => (
                        <StyledTableRow key={student.studentId} index={index}>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>{student.emailAddress}</TableCell>
                          <TableCell>{student.contactNumber}</TableCell>
                          <TableCell>{new Date(student.admissionDate).toLocaleDateString()}</TableCell>
                          <TableCell>{student.classTimings}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: '#2980b9' }}
                              onClick={() => setSelectedStudentId(student.studentId)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No students found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StudentDetails
              studentId={selectedStudentId}
              onBack={() => setSelectedStudentId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
};

export default StudentTable;
