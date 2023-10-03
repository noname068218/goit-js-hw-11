import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39688080-559ef29e62f6f96d97ef6163c';

export async function getDate(q, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q,
    page,
    per_page: 40,
  });
  const { data } = await axios.get(`?${params}`);
  return data;
}
