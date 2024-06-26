// src/components/TrendingCourses.js
import React from 'react';
import styled from 'styled-components';

const TrendingCourses = ({ courses }) => {
  return (
    <Section>
      <Title>Trending Courses</Title>
      <CourseGrid>
        {courses.map(course => (
          <CourseCard key={course.id}>
            <Thumbnail src={course.thumbnail} alt="Course Thumbnail" />
            <CourseInfo>
              <CourseTitle>{course.title}</CourseTitle>
              <InstructorName>{course.instructor}</InstructorName>
              <CourseDescription>{course.description}</CourseDescription>
            </CourseInfo>
          </CourseCard>
        ))}
      </CourseGrid>
    </Section>
  );
};

const Section = styled.section`
  margin: 2em 0;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const CourseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
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

const CourseDescription = styled.p`
  font-size: 1em;
  color: #777;
`;

export default TrendingCourses;
