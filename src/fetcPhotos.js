
const RESOURSE_URL = "https://pixabay.com/api/";
const RESOURSE_KEY = "28107695-b6e67fe78ed729dbc6d2c568c"
const axios = require("axios").default;


export async function fetcPhotos(searchName, pageNumber) {
  try {
    const response = await axios.get(`${RESOURSE_URL}?key=${RESOURSE_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
    
    return response.data; 
      
  } catch (error) {
    console.error(error);
  }
}


