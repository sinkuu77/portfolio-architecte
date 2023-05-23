const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const filtre = document.querySelector(".filtres");

let works;
async function getWorks() {
  works = await fetch(worksUrl).then((response) => response.json());
  displayWorks(works);
}

getWorks();

fetch(categoriesUrl)
  .then((response) => response.json())
  .then(displayCategories);

function displayWorks(works) {
  gallery.innerHTML = "";

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
}

function filterWorks(event) {
  const categoriesId = event.target.id;
  if (categoriesId == 0) {
    return displayWorks(works);
  }
  const filterDeWorks = works.filter((work) => work.categoryId == categoriesId);
  displayWorks(filterDeWorks);
}

function displayCategories(categories) {
  filtre.innerHTML = "";
  const categoryDefault = {
    id: 0,
    name: "Tous",
  };
  categories.unshift(categoryDefault);

  for (i = 0; i < categories.length; i++) {
    const categoriesSource = categories[i];
    const buttonElement = document.createElement("button");
    buttonElement.id = categoriesSource.id;
    buttonElement.innerText = categoriesSource.name;
    buttonElement.classList.add("filtre-btn");

    filtre.appendChild(buttonElement);
  }
}

filtre.addEventListener("click", filterWorks);
