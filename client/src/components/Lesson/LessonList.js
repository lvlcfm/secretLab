import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

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
          <h1>TITLE: {lesson.title ? lesson.title : ''}</h1>
          <div>SUMMARY: {lesson.summary ? lesson.summary : ''}</div>
          <div>CONTENT: {lesson.content ? lesson.content : ''}</div>
          <div>MEDIA: {lesson.media ? lesson.media : ''}</div>
          <div>WEEK: {lesson.week ? lesson.week : ''}</div>
          <div>EXIT TICKET: {lesson.exitTicket ? lesson.exitTicket : ''}</div>
          <button onClick={() => props.handleLessonView(lesson._id)}>
            TAKE ME TO THE LESSON!
          </button>
          <button onClick={() => props.handleEditLesson(lesson._id)}>
            EDIT LESSON
          </button>
          <button onClick={() => props.handleDeleteLesson(lesson._id)}>
            DELETE LESSON
          </button>
        </LessonItem>
      );
    });
    return <ListContainer>lessonPlans{lessonPlans}</ListContainer>;
  } else {
    return <div>currently no lessons</div>;
  }
};

export default withRouter(LessonList);
