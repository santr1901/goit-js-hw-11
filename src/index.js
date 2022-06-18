import { fetcPhotos } from "./fetcPhotos";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


const searchForm = document.querySelector(".search-form")
const searchQuery = document.querySelector("input[name=searchQuery]");
const gallery = document.querySelector(".gallery");
// const loadBtn = document.querySelector("button .load-more");



searchForm.addEventListener("submit", search);


function search(event) {
    event.preventDefault();
    const searchedPictureName = searchQuery.value;
    console.log(searchedPictureName);
    fetcPhotos(searchedPictureName)
        .then(data => {
            if (data.data.hits.length === 0) {
                return  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            createCard(data)
            loadMoreBtn()
            
    })
    } 


function createCard(data) {
    const cardMarkup = data.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
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
    
	gallery.innerHTML = cardMarkup;
    new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250' });
    // gallery.refresh(); 
}

function loadMoreBtn() {
    const markupBtn = `<div class="button-wrap"><button type="button" class="load-more">Load more</button></div>`
    gallery.insertAdjacentHTML("afterend", markupBtn);

    // loadBtn.addEventListener("click", console.log("done"))
    
}

    