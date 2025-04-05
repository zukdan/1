import React, { useContext } from "react";
import { EduProgramContext } from "../../context/EduProgramContext";
import Course from "../../components/Course/Course";
import CourseForm from "../../components/CourseForm/CourseForm";
import "./EduProgram.css";

const EduProgram = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useContext(EduProgramContext);
  
  return (
    <div className="edu-program">
      <h2>Образовательная программа</h2>
      <CourseForm onSave={addCourse} />
      <div className="course-list">
        {courses.map((course) => (
          <Course 
            key={course.id} 
            course={course} 
            onEdit={updateCourse} 
            onDelete={deleteCourse} 
          />
        ))}
      </div>
    </div>
  );
};

export default EduProgram;
