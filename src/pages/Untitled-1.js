import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialSemesters = [
  { id: 1, name: "1 семестр", courses: [] },
  { id: 2, name: "2 семестр", courses: [] },
];

export default function EduProgram() {
  const [semesters, setSemesters] = useState(initialSemesters);
  const [newCourse, setNewCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(1);

  const addCourse = () => {
    if (!newCourse) return;
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === selectedSemester
          ? { ...sem, courses: [...sem.courses, newCourse] }
          : sem
      )
    );
    setNewCourse("");
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {semesters.map((sem) => (
        <Semester key={sem.id} semester={sem} />
      ))}
      <CourseForm
        newCourse={newCourse}
        setNewCourse={setNewCourse}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        addCourse={addCourse}
        semesters={semesters}
      />
    </div>
  );
}

function Semester({ semester }) {
  return (
    <div className="p-2 border rounded-lg">
      <h2 className="font-bold mb-2">{semester.name}</h2>
      {semester.courses.map((course, idx) => (
        <Card key={idx} className="mb-2">
          <CardContent>{course}</CardContent>
        </Card>
      ))}
    </div>
  );
}

function CourseForm({ newCourse, setNewCourse, selectedSemester, setSelectedSemester, addCourse, semesters }) {
  return (
    <div className="p-2 border rounded-lg">
      <h2 className="font-bold mb-2">Добавить предмет</h2>
      <Input value={newCourse} onChange={(e) => setNewCourse(e.target.value)} />
      <select
        className="mt-2"
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(Number(e.target.value))}
      >
        {semesters.map((sem) => (
          <option key={sem.id} value={sem.id}>
            {sem.name}
          </option>
        ))}
      </select>
      <Button className="mt-2" onClick={addCourse}>
        Добавить
      </Button>
    </div>
  );
}