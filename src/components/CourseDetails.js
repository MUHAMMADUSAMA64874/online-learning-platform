import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Container, Typography, Button } from '@mui/material';
import styled from 'styled-components';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const courseRef = ref(database, `courses/${courseId}`);
    onValue(courseRef, (snapshot) => {
      setCourse(snapshot.val());
    });

    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);

      if (user) {
        const enrollmentRef = ref(database, `users/${user.uid}/enrollments/${courseId}`);
        onValue(enrollmentRef, (snapshot) => {
          setEnrolled(snapshot.exists());
        });
      }
    });

    return () => unsubscribe();
  }, [courseId]);

  const enrollInCourse = () => {
    if (!user) {
      alert('You must be logged in to enroll in a course.');
      return;
    }

    const userEnrollmentsRef = ref(database, `users/${user.uid}/enrollments/${courseId}`);
    userEnrollmentsRef.set({
      progress: 0
    })
      .then(() => {
        setEnrolled(true);
        alert('Enrolled successfully');
      })
      .catch((error) => {
        alert(`Error enrolling: ${error.message}`);
      });
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>{course.title}</Title>
      <Typography variant="h6" component="p">
        {course.description}
      </Typography>
      <Typography variant="body1" component="p">
        Instructor: {course.instructor}
      </Typography>
      <Button variant="contained" color="primary" disabled={enrolled} onClick={enrollInCourse} style={{ marginTop: '1em' }}>
        {enrolled ? 'Enrolled' : 'Enroll'}
      </Button>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
`;

export default CourseDetails;
