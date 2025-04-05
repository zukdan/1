import React, { useState } from "react";
import "./CourseForm.css";

const CourseForm = ({ onSave, onCancel, initialData = {} }) => {
  const [course, setCourse] = useState({
    name: initialData.name || "",
    description: initialData.description || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(course);
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={course.name}
        onChange={handleChange}
        placeholder="Название курса"
        required
      />
      <textarea
        name="description"
        value={course.description}
        onChange={handleChange}
        placeholder="Описание курса"
      ></textarea>
      <div className="form-actions">
        <button type="submit" className="save-btn">Сохранить</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default CourseForm;
