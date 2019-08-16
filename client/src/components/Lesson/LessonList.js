import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const LessonItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
  width: 300px;
`;

const LessonList = props => {
  if (props.lessons.length !== 0) {
    const lessonPlans = props.lessons.map(lesson => {
      return (
        <LessonItem key={lesson._id}>
          <h1>{lesson.title}</h1>
          <div>this is a site</div>
          <div>this is a site</div>
          <button onClick={() => props.handleLessonView(lesson._id)}>
            TAKE ME TO THE LESSON!
          </button>
        </LessonItem>
      );
    });
    return <ListContainer>lessonPlans{lessonPlans}</ListContainer>;
  } else {
    return <div>currently no lessons</div>;
  }
};

export default LessonList;
