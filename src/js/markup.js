import axios from 'axios';

function getApiService() {
  const apiKey = '39688080-559ef29e62f6f96d97ef6163c'; // Ваш ключ API

  // Параметри запиту
  const params = {
    key: apiKey, // Додайте ключ API тут
    // Додаткові параметри запиту, якщо потрібно
  };

  axios
    .get('https://pixabay.com/api/', { params }) // Передайте параметри як об'єкт
    .then(response => {
      // Обробка відповіді тут
      console.log(response.data); // Вивести дані з API
    })
    .catch(error => {
      // Обробка помилок тут
      console.error('Помилка запиту:', error);
    });
}

getApiService();
