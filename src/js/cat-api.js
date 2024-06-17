import axios from 'axios';

const baseUrl = 'https://api.thecatapi.com/v1';
const breedsUrl = `${baseUrl}/breeds`;
const searchDataUrl = `${baseUrl}/images/search`;

axios.defaults.headers.common['x-api-key'] =
  'live_VYbKMLMNU1YPqRUi9zgtBMrP5nI3b3RK1KjJIZalHGbhDzMvyGrx4A9vCcMdLz52';

const fetchBreeds = async () => {
  try {
    const response = await axios.get(breedsUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds: ', error);
  }
};

const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(searchDataUrl, {
      params: { breed_ids: breedId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching breed: ', error);
  }
};

export { fetchBreeds, fetchCatByBreed };
