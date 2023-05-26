const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const filtre = document.querySelector(".filtres");

const loginLink = document.getElementById("login");

const modalBtn = document.getElementById("modifier-btn-projet");

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

  displayEditionMode();
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

function displayEditionMode() {
  if (localStorage.getItem("token") !== null) {
    const editionBar = document.getElementById("mode-edition");
    const modifierBtn = document.getElementById("modifier-btn");
    const modifierBtnProjet = document.getElementById("modifier-btn-projet");
    editionBar.style.display = "flex";
    modifierBtn.style.display = "block";
    modifierBtnProjet.style.display = "block";
    loginLink.innerHTML = "Logout";
    loginLink.href = "#";
    filtre.style.visibility = "hidden";
  }
}

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

filtre.addEventListener("click", filterWorks);

loginLink.addEventListener("click", clearLocalStorage);

function displayModal(event) {
  event.preventDefault();
}

modalBtn.addEventListener("click", displayModal);
