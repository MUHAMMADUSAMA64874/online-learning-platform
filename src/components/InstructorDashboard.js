import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, push, set, onValue } from 'firebase/database'; // Ensure onValue is imported
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

const InstructorDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        const coursesRef = ref(database, 'courses');
        onValue(coursesRef, (snapshot) => {
          const data = snapshot.val();
          const courseList = data ? Object.entries(data).map(([id, details]) => ({ id, ...details })) : [];
          setCourses(courseList);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const addCourse = () => {
    const newCourseRef = push(ref(database, 'courses'));
    const newCourse = {
      title,
      description,
      category,
      instructor: user.email,
      price,
      thumbnail,
      isFeatured: false,
      isTrending: false
    };

    set(newCourseRef, newCourse)
      .then(() => {
        alert('Course added successfully');
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice('');
        setThumbnail('');
      })
      .catch((error) => {
        alert(`Error adding course: ${error.message}`);
      });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Instructor Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Course Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Course Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            style={{ marginTop: '1em' }}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginTop: '1em' }}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginTop: '1em' }}
          />
          <TextField
            label="Thumbnail URL"
            variant="outlined"
            fullWidth
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            style={{ marginTop: '1em' }}
          />
          <Button variant="contained" color="primary" onClick={addCourse} style={{ marginTop: '1em' }}>
            Add Course
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            My Courses
          </Typography>
          {courses.map(course => (
            <Typography key={course.id} variant="body1" component="p">
              {course.title}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorDashboard;
