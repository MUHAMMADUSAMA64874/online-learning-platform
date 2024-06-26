import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, onValue, update } from 'firebase/database'; // Ensure onValue is imported
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const coursesRef = ref(database, 'courses');
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      const courseList = data ? Object.entries(data).map(([id, details]) => ({ id, ...details })) : [];
      setFeaturedCourses(courseList.filter((course) => course.isFeatured));
      setTrendingCourses(courseList.filter((course) => course.isTrending));
    });

    return () => unsubscribe();
  }, []);

  const enrollInCourse = (courseId) => {
    if (!user) {
      alert('You must be logged in to enroll in a course');
      return;
    }

    const enrollmentsRef = ref(database, `users/${user.uid}/enrollments/${courseId}`);
    update(enrollmentsRef, { progress: 0 })
      .then(() => alert('Enrolled successfully'))
      .catch((error) => alert(`Error enrolling in course: ${error.message}`));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Featured Courses
      </Typography>
      <Grid container spacing={4}>
        {featuredCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail || 'https://via.placeholder.com/150'}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '1em' }}>
                  Instructor: {course.instructor}
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '1em' }} onClick={() => enrollInCourse(course.id)}>
                  Enroll
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '2em' }}>
        Trending Courses
      </Typography>
      <Grid container spacing={4}>
        {trendingCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail || 'https://via.placeholder.com/150'}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '1em' }}>
                  Instructor: {course.instructor}
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '1em' }} onClick={() => enrollInCourse(course.id)}>
                  Enroll
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
