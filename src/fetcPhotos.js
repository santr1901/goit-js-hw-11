

const RESOURSE_URL = "https://pixabay.com/api/";
const RESOURSE_KEY = "28107695-b6e67fe78ed729dbc6d2c568c"
const axios = require("axios").default;
// export const fetcPhotos = async (search) => {
//   const response = await fetch(`RESOURSE?key=28107695-b6e67fe78ed729dbc6d2c568c&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`);
//     const photos = await response.json();
//     console.log(photos);
// //   return photos;
// };


export async function fetcPhotos(search) {
  try {
    const response =  await axios.get(`${RESOURSE_URL}?key=${RESOURSE_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
    return response; 
      
  } catch (error) {
    console.error(error);
  }
}



// export async function fetcPhotos(search) {
//   try {
//       const response = await axios.get(RESOURSE_URL, {
//           params: {
//               key: RESOURSE_KEY,
//               q: search,
//               image_type: 'photo',
//               orientation: 'horizontal',
//               safesearch: true,

//           }
//       })
//           return response
//       }      
//    catch (error) {
//     console.error(error);
//   }
// }