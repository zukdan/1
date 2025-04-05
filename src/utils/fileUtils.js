// Функция для сохранения данных в JSON-файл
export const saveToFile = (data, filename = "eduProgram.json") => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // Функция для загрузки данных из JSON-файла
  export const loadFromFile = (callback) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          callback(json);
        } catch (error) {
          console.error("Ошибка при загрузке файла:", error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };
  