import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import { getDate } from '../api/api';
import { createMarkup } from '../markup/index';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const btnLoadMoreEl = document.querySelector('.load-more');
const galleryMarkupEl = document.querySelector('.gallery');
const wrapperLoadEl = document.querySelector('.wrapper-loader');

let observer = new IntersectionObserver(callback);
// btnLoadMoreEl.addEventListener('click', onClick);
formEl.addEventListener('submit', onSubmit);

const lightbox = new SimpleLightbox('.gallery a');
let page = 1;
let value = '';
async function onSubmit(event) {
  try {
    event.preventDefault();

    value = event.target.elements.searchInput.value.trim();
    event.target.reset();
    if (value === '') {
      return;
    }
    page = 1;
    wrapperLoadEl.classList.remove('is-hidden');
    const { totalHits, hits } = await getDate(value, page);
    btnLoadMoreEl.classList.add('is-hidden');

    if (hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (totalHits > 40) {
      //   btnLoadMoreEl.classList.remove('is-hidden');
    }
    console.log(totalHits, hits);

    const markup = createMarkup(hits);
    clearGallery();
    addMarkup(markup);
    let target = galleryMarkupEl.querySelector('.card:last-child');
    observer.observe(target);
    lightbox.refresh();
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    wrapperLoadEl.classList.add('is-hidden');
  }
}
function clearGallery() {
  galleryMarkupEl.innerHTML = '';
}
function addMarkup(markup) {
  galleryMarkupEl.insertAdjacentHTML('beforeend', markup);
}
function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      onClick();
    }
    // intersecting: true or false
  });
}

async function onClick() {
  try {
    page += 1;
    wrapperLoadEl.classList.remove('is-hidden');
    const { totalHits, hits } = await getDate(value, page);
    const markup = createMarkup(hits);
    addMarkup(markup);
    lightbox.refresh();

    let target = galleryMarkupEl.querySelector('.card:last-child');
    observer.observe(target);

    if (page * 40 >= totalHits) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    wrapperLoadEl.classList.add('is-hidden');
  }
}
// async function onClick() {
//   try {
//     page += 1;
//     wrapperLoadEl.classList.remove('is-hidden');
//     const { totalHits, hits } = await getDate(value, page);
//     const markup = createMarkup(hits);
//     addMarkup(markup);
//     lightbox.refresh();

//     if (page * 40 >= totalHits) {
//       btnLoadMoreEl.classList.add('is-hidden');
//       Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//   } catch (error) {
//     Notify.failure(error.message);
//   } finally {
//     wrapperLoadEl.classList.add('is-hidden');
//   }
// }
