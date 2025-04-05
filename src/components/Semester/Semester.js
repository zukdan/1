import React from 'react';
import Course from '../Course/Course';
import './Semester.css';

const Semester = ({ semester, onCourseDrop, onCourseEdit, onCourseDelete }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const courseId = e.dataTransfer.getData('courseId');
    if (courseId) {
      onCourseDrop(courseId, semester.id);
    }
  };

  return (
    <div className="semester" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h3 className="semester-title">{semester.name}</h3>
      <div className="course-list">
        {semester.courses.map((course) => (
          <Course
            key={course.id}
            course={course}
            onEdit={() => onCourseEdit(course)}
            onDelete={() => onCourseDelete(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Semester;
