import { useEffect, useState } from "react";
import Semester from "../components/Semester";
import CourseForm from "../components/CourseForm";

export default function EduProgram({ data, setData }) {
  const [semesters, setSemesters] = useState(
    data || [
      { id: 1, name: "1 семестр", courses: [] },
      { id: 2, name: "2 семестр", courses: [] },
    ]
  );


  useEffect(() => {
    if (data) setSemesters(data);
  }, [data]);

  const addCourse = (course, description, semesterId) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? { ...sem, courses: [...sem.courses, { name: course, description }] }
          : sem
      )
    );
  };

  const addSemester = () => {
    const newId = semesters.length + 1;
    setSemesters([...semesters, { id: newId, name: `${newId} семестр`, courses: [] }]);
  };

  useEffect(() => {
    setData(semesters);
  }, [semesters, setData]);

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {semesters.map((sem) => (
        <Semester key={sem.id} semester={sem} />
      ))}
      <CourseForm addCourse={addCourse} semesters={semesters} />
      <button onClick={addSemester} className="p-2 bg-green-500 text-white rounded mt-4">
        Добавить семестр
      </button>
    </div>
  );
}