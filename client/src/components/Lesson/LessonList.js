import React from 'react';

const LessonList = props => {
  const lessonPlans = props.lessons.map(lesson => {
    console.log(lesson);
    return (
      <div key={lesson._id}>
        <h1>{lesson.title}</h1>
        <div>this is a site</div>
        <div>this is a site</div>
        <button onClick={() => props.handleLessonView(lesson._id)}>
          TAKE ME TO THE LESSON!
        </button>
      </div>
    );
  });
  return <div>lessonPlans{lessonPlans}</div>;
};

export default LessonList;
