import axios from 'axios';
const BASIC_URL = 'https://pixabay.com/api/';
const URL_KEY = '39188541-a1bd6d68f6e7210f6abdbcfe1';
const form = document.querySelector('form');
const { searchInput } = form.elements;
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const finalMessage = document.querySelector('.final-message');
let pageNumber;
let simpleGallery = null;
export const fetchImgs = async params => {
  const response = await axios.get(`${BASIC_URL}?${params}`);
  return response.data;
};
