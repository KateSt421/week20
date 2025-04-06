document.getElementById("fetchButton").addEventListener("click", fetchData);

function fetchData() {
  const entity = document.getElementById("entity").value;
  const id = document.getElementById("id").value;
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");
  const loader = document.getElementById("loader");

  // Сбрасываем предыдущие сообщения
  resultDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  // Проверяем корректность идентификатора
  if (id < 1 || id > 10) {
    errorDiv.innerHTML = "Идентификатор должен быть от 1 до 10.";
    return;
  }

  const url = `https://swapi.py4e.com/api/${entity}/${id}/`;

  loader.style.display = "block"; // Показываем лоадер

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((data) => {
      loader.style.display = "none"; // Скрываем лоадер
      const name = data.name || "Не указано";
      const height = data.height || "Не указано";
      const mass = data.mass || "Не указано";
      const created = data.created || "Не указано";
      const birth_year = data.birth_year || "Не указано";

      // Формируем вывод
      const output = `Name: ${name}<br>Height: ${height}<br>Mass: ${mass}<br>Created: ${created}<br>Birth_year: ${birth_year}`;

      resultDiv.innerHTML = output; // Отображаем данные на странице
    })
    .catch((error) => {
      loader.style.display = "none"; // Скрываем лоадер
      switch (error) {
        case 404:
          errorDiv.innerHTML = "Ресурс не найден.";
          break;
        case 500:
          errorDiv.innerHTML = "Ошибка сервера. Попробуйте позже.";
          break;
        default:
          errorDiv.innerHTML = "Сервер не доступен.";
      }
    });
}
