import SlimSelect from "slim-select";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import { toggleVisibility } from "./helpers.js";

const loader = document.querySelector(".loading-container");
const breedSelect = document.querySelector(".select");
const infoContainer = document.querySelector(".info-container");

const buildSelectList = (breeds) => {
  const defaultOption = '<option data-placeholder="true"></option>';
  const breedsOptions = breeds
    .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
    .join("");

  breedSelect.insertAdjacentHTML(
    "afterbegin",
    `${defaultOption}${breedsOptions}`
  );

  new SlimSelect({
    select: "#selectElement",
  });
};

const showMessage = (text, isError) => {
  iziToast.error({
    title: isError ? "Error" : "Success",
    message: text,
    position: "topRight",
  });
};

const onFetchBreeds = async () => {
  toggleVisibility(loader, false);
  const breeds = await fetchBreeds();
  toggleVisibility(loader, true);
  if (breeds && breeds.length) {
    toggleVisibility(breedSelect, false);
    buildSelectList(breeds);
  } else {
    showMessage("Sorry, there is an error loading breed info. Try reloading the page.", true);
  }
};

onFetchBreeds();

breedSelect.addEventListener("change", async (event) => {
  toggleVisibility(loader, false);
  infoContainer.innerHTML = '';
  const breedId = event.target.value;
  const cat = await fetchCatByBreed(breedId);
  toggleVisibility(loader, true);
  if (cat && cat.length) {
    const { name, description, temperament } = cat[0].breeds[0];
    const url = cat[0].url;

    infoContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <img class="img" src="${url}" alt="${name}" width="400" height="320">
        <div class="text-container">
        <h2>${name}</h2>
        <p>${description}</p>
        <p>
        <span class="bold">Temperament:</span>
         ${temperament}</p>
        </div>
      `
    );
    toggleVisibility(infoContainer, false);
  } else {
    showMessage("Sorry, there is an error loading cat info. Try reloading the page.", true);
  }
});
