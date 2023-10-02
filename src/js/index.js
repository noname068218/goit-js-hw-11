import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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

form.addEventListener('submit', handlerFunction);

function handlerFunction(event) {
  event.preventDefault();
  pageNumber = 1;
  const params = new URLSearchParams({
    key: URL_KEY,
    q: searchInput.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 39,
  });

  fetchImgs(params);
}

async function fetchImgs(params) {
  try {
    const response = await axios.get(`${BASIC_URL}?${params}`);
    const imgs = response.data;

    if (imgs.hits.length === 0) {
      if (simpleGallery !== null) simpleGallery.refresh();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    gallery.innerHTML = createMarkUp(imgs.hits);
    simpleGallery = new SimpleLightbox('.gallery a', {
      /* options */
    });
    Notify.success(`Hooray! We found ${imgs.totalHits} images.`);

    if (imgs.totalHits <= pageNumber * 39) {
      loadMoreButton.setAttribute('hidden', 'true');
      finalMessage.removeAttribute('hidden');
    } else {
      loadMoreButton.removeAttribute('hidden');
      finalMessage.setAttribute('hidden', 'true');
    }
  } catch (error) {
    console.log(error);
  }
}

loadMoreButton.addEventListener('click', loadMoreFunction);

function loadMoreFunction() {
  pageNumber += 1;
  const params = new URLSearchParams({
    key: URL_KEY,
    q: searchInput.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageNumber,
    per_page: 39,
  });

  fetchImgs(params);
}

export function createMarkUp(imgs) {
  const markUp = imgs
    .map(
      ({
        downloads,
        comments,
        views,
        tags,
        webformatURL,
        largeImageURL,
        likes,
      }) => {
        return `<div class="photo-card">
        <a href= "${largeImageURL}"><img src="${webformatURL}" class="photo" width="600px" height="400px" alt="${tags}" loading="lazy" /></a>
            <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
    </div>`;
      }
    )
    .join('');

  return markUp;
}
