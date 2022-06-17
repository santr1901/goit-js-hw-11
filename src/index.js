import { fetcPhotos } from "./fetcPhotos";

const searchForm = document.querySelector(".search-form")
const searchQuery = document.querySelector("input[name=searchQuery]")

searchForm.addEventListener("submit", search);

function search(event) {
    event.preventDefault();
    const searchedPictureName = searchQuery.value;
    console.log(searchedPictureName);
    fetcPhotos(searchedPictureName)
        .then(data => {
            if (data.data.hits.length ===0) {
                return window.alert("Net nicho")
            }
        show(data)
    })
    } 


function show(data) {
data.data.hits.map(({webformatURL , largeImageURL,tags ,likes ,views ,comments ,downloads  })=>console.log(webformatURL , largeImageURL,tags ,likes ,views ,comments ,downloads ))
}
    