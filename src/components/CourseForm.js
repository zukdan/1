import { useState } from "react";

import Input from './ui/input';
import Button from './ui/button';

export default function CourseForm({ addCourse, semesters }) {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]?.id || 1);

  const handleSubmit = () => {
    if (!courseName || !courseDescription) return;
    addCourse(courseName, courseDescription, selectedSemester);
    setCourseName("");
    setCourseDescription("");
  };

  return (
    <div className="p-2 border rounded-lg">
      <h2 className="font-bold mb-2">Добавить предмет</h2>
      <Input
        placeholder="Название предмета"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Описание предмета"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        className="mb-2"
      />
      <select
        className="mb-2 p-2 border rounded"
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(Number(e.target.value))}
      >
        {semesters.map((sem) => (
          <option key={sem.id} value={sem.id}>
            {sem.name}
          </option>
        ))}
      </select>
      <Button onClick={handleSubmit} className="mt-2">
        Добавить
      </Button>
    </div>
  );
}