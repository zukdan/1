import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const EduProgramContext = createContext();

export const EduProgramProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (course) => {
    const newCourse = { ...course, id: uuidv4() };
    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
    );
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <EduProgramContext.Provider
      value={{ courses, addCourse, updateCourse, deleteCourse }}
    >
      {children}
    </EduProgramContext.Provider>
  );
};
