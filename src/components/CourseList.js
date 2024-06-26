import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { database, auth } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

const CourseList = () => {
  const [categories] = useState([
    { name: 'Programming', subCategories: ['JavaScript', 'Python', 'Java'] },
    { name: 'Design', subCategories: ['Graphic Design', 'UI/UX Design', '3D Modeling'] },
    { name: 'Business', subCategories: ['Marketing', 'Finance', 'Management'] }
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const coursesRef = ref(database, 'courses');
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      const courseList = data ? Object.entries(data).map(([id, details]) => ({ id, ...details })) : [];
      setCourses(courseList);
    });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const enrollInCourse = (courseId) => {
    const user = auth.currentUser;
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
    <div>
      <Title>Course Listing</Title>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard key={category.name} onClick={() => handleCategoryClick(category.name)}>
            {category.name}
            {selectedCategory === category.name && (
              <SubCategoryList>
                {category.subCategories.map((subCategory) => (
                  <SubCategoryItem key={subCategory}>
                    <Link to={`/courses?category=${subCategory}`}>{subCategory}</Link>
                  </SubCategoryItem>
                ))}
              </SubCategoryList>
            )}
          </CategoryCard>
        ))}
      </CategoryGrid>
      <CourseGrid>
        {courses.filter(course => selectedCategory ? course.category === selectedCategory : true).map((course) => (
          <CourseCard key={course.id}>
            <Thumbnail src={course.thumbnail || 'https://via.placeholder.com/150'} alt="Course Thumbnail" />
            <CourseInfo>
              <CourseTitle>{course.title}</CourseTitle>
              <InstructorName>{course.instructor}</InstructorName>
              <CourseRating>Rating: 4.5</CourseRating>
              <Button variant="contained" color="primary" style={{ marginTop: '1em' }} onClick={() => enrollInCourse(course.id)}>
                Enroll
              </Button>
            </CourseInfo>
          </CourseCard>
        ))}
      </CourseGrid>
    </div>
  );
};

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

const CategoryCard = styled.div`
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  padding: 1em;
  text-align: center;
  flex: 1;
  cursor: pointer;
`;

const SubCategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0.5em;
`;

const SubCategoryItem = styled.li`
  margin: 0.5em 0;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CourseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-top: 2em;
`;

const CourseCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 1em);
  box-sizing: border-box;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const CourseInfo = styled.div`
  margin-top: 0.5em;
`;

const CourseTitle = styled.h3`
  font-size: 1.5em;
  margin: 0.5em 0;
`;

const InstructorName = styled.p`
  font-size: 1em;
  color: #555;
`;

const CourseRating = styled.p`
  font-size: 1em;
  color: #777;
`;

export default CourseList;
