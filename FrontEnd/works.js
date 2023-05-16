const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");

fetch(worksUrl)
  .then((response) => response.json())
  .then((works) => {
    for (i = 0; i < works.length; i++) {
      const worksSource = works[i];
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = worksSource.imageUrl;
      imageElement.alt = worksSource.title;
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = worksSource.title;

      gallery.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(figcaptionElement);
    }
  });

const filter = document.querySelectorAll(".filtre-btn");

function showWorksFiltered() {
  fetch(categoriesUrl)
    .then((response) => response.json())
    .then((categories) => {
      console.log(categories);
    });
}

filter.forEach((button) => button.addEventListener("click", showWorksFiltered));
