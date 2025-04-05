import React from "react";
import "./Course.css";

const Course = ({ course, onDelete, onEdit }) => {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.name}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-actions">
        <button className="edit-btn" onClick={() => onEdit(course)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(course.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Course;