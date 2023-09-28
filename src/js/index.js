import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.gallery'),
};

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY_API = '39688080-559ef29e62f6f96d97ef6163c';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const TOTAL_PAGE = 40;
let defaulPage;

const simple = async function (params) {
  const response = await axios.get(`${KEY_API}?${params}`);
  return response.data;
  console.log(response);
};
