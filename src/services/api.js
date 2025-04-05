const API_BASE_URL = "https://your-backend-api.com";

export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) throw new Error("Ошибка при получении курсов");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createCourse = async (course) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    if (!response.ok) throw new Error("Ошибка при создании курса");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateCourse = async (id, updatedCourse) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCourse),
    });
    if (!response.ok) throw new Error("Ошибка при обновлении курса");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка при удалении курса");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
