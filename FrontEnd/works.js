const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const filtre = document.querySelector(".filtres");

fetch(worksUrl)
  .then((response) => response.json())
  .then(displayWorks);

fetch(categoriesUrl)
  .then((response) => response.json())
  .then(displayCategories);

function displayWorks(works) {
  gallery.innerHTML = "";
  console.log(works);
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
    buttonElement.innerText = categoriesSource.name;
    buttonElement.classList.add("filtre-btn");

    // const categorySet = new Set(categories);
    // const categorySetValues = categorySet.values();
    // for (const value of categorySetValues) {
    // }

    filtre.appendChild(buttonElement);
  }
}

filtre.addEventListener("click", (name) => displayWorks(name));
