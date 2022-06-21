import { fetcPhotos } from "./fetcPhotos";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


const searchForm = document.querySelector(".search-form")
const searchQuery = document.querySelector("input[name=searchQuery]");
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".load-more");
const wrapBtnLoad = document.querySelector(".button-wrap")
let pageNumber = 1;
let searchedPictureName = null;

searchForm.addEventListener("submit", search);
loadBtn.addEventListener("click", loadMore);
 


 function search(event) {
    event.preventDefault();
 searchedPictureName = searchQuery.value;
   if (searchedPictureName === "") {
     Notiflix.Notify.info("Input the name of the picture")
     return
   }
   console.log(searchedPictureName);
   pageNumber = 1;
    dontShowBtn();
    clearGallery();
   
   fetcPhotos(searchedPictureName, pageNumber)
        .then(data => {
          if (data.hits.length === 0) {
            clearInput();
                return  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
          }
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
          
          createCard(data)
          showBtn()
          
        })
   
   
} 
    
function loadMore() {

  pageNumber += 1
  let totalPages;
  fetcPhotos(searchedPictureName, pageNumber)
    .then(data => {
      totalPages = Math.ceil(data.totalHits / 40)
      console.log(totalPages)
      createCard(data)
      if (pageNumber >= totalPages) {
        dontShowBtn();
        return  Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }

      console.log(pageNumber)
    })
  
    }



function createCard(data) {
    const cardMarkup = data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
  <a class="photo-link" href =${largeImageURL}><img class="gallery-photo" src=${webformatURL} alt=${tags}  loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes} </b>
    </p>
    <p class="info-item">
      <b>Views: ${views} </b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments} </b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads} </b>
    </p>
  </div>
</div>`).join("");
    gallery.insertAdjacentHTML("beforeend", cardMarkup)
    new SimpleLightbox('.gallery div a', { captionsData: 'alt', captionDelay: '250' });
    
}

function dontShowBtn() {
   wrapBtnLoad.classList.add('is-hidden');
}

function showBtn() {
      wrapBtnLoad.classList.remove('is-hidden');
}
    
function clearInput() {
  searchQuery.value = "";
}

function clearGallery() {
  gallery.innerHTML = "";
}