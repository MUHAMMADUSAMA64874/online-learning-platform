import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import styled from 'styled-components';

const CourseProgress = ({ courseId, userId }) => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const progressRef = ref(database, `progress/${userId}/${courseId}`);
    onValue(progressRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProgress(data);
      }
    });
  }, [courseId, userId]);

  const markLessonComplete = (lessonId) => {
    const newProgress = { ...progress, [lessonId]: true };
    setProgress(newProgress);
    set(ref(database, `progress/${userId}/${courseId}`), newProgress);
  };

  return (
    <div>
      <Title>Course Progress</Title>
      <ProgressContainer>
        {['Lesson 1', 'Lesson 2', 'Lesson 3'].map((lesson, idx) => (
          <ProgressItem key={idx}>
            <LessonTitle>{lesson}</LessonTitle>
            <CompletionStatus>
              {progress[`lesson${idx + 1}`] ? 'Completed' : 'Incomplete'}
              {!progress[`lesson${idx + 1}`] && (
                <CompleteButton onClick={() => markLessonComplete(`lesson${idx + 1}`)}>
                  Mark as Complete
                </CompleteButton>
              )}
            </CompletionStatus>
          </ProgressItem>
        ))}
      </ProgressContainer>
    </div>
  );
};

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ProgressItem = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const LessonTitle = styled.p`
  font-size: 1em;
  color: #343a40;
`;

const CompletionStatus = styled.p`
  font-size: 1em;
  color: ${props => props.completed ? 'green' : 'red'};
`;

const CompleteButton = styled.button`
  margin-left: 1em;
`;

export default CourseProgress;
