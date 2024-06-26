import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Container, Typography, LinearProgress, Grid, Box } from '@mui/material';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        const enrollmentsRef = ref(database, `users/${user.uid}/enrollments`);
        onValue(enrollmentsRef, (snapshot) => {
          const data = snapshot.val();
          const enrollmentList = data ? Object.entries(data).map(([id, details]) => ({ id, ...details })) : [];
          setEnrollments(enrollmentList);
        });

        const coursesRef = ref(database, 'courses');
        onValue(coursesRef, (snapshot) => {
          const coursesData = snapshot.val();
          setCourses(coursesData || {});
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Dashboard
      </Typography>
      <Grid container spacing={3}>
        {enrollments.map(enrollment => (
          <Grid item xs={12} md={6} key={enrollment.id}>
            <Typography variant="h6" component="h2">
              {courses[enrollment.id]?.title || 'Loading...'}
            </Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant="determinate" value={enrollment.progress} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Progress: {enrollment.progress}%
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
