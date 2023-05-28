const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const filtre = document.querySelector(".filtres");

const loginLink = document.getElementById("login");

const modalBtn = document.getElementById("modifier-btn-projet");
const modal = document.getElementById("modal");
const modalGallery = document.querySelector(".modal-gallery");

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

let modalValue = null;

function displayModal(event) {
  event.preventDefault();
  modalValue = document.querySelector(event.target.getAttribute("href"));
  modalValue.style.display = "flex";
  modalValue.removeAttribute("aria-hidden");
  modalValue.setAttribute("aria-modal", "true");

  modalValue.addEventListener("click", closeModal);
  const modalCloseBtn = document.querySelector(".fa-xmark");
  modalCloseBtn.addEventListener("click", closeModal);
  const propagation = document.querySelector(".stop-propagation");
  propagation.addEventListener("click", stopPropagation);

  for (i = 0; i < works.length; i++) {
    const modalWorks = works[i];
    const modalFigure = document.createElement("figure");
    const modalImg = document.createElement("img");
    modalImg.src = modalWorks.imageUrl;
    modalImg.alt = modalWorks.title;
    const modalIcons = document.createElement("div");
    modalIcons.className = "icons";
    const arrowsIcon = document.createElement("i");
    arrowsIcon.className = "fa-solid fa-arrows-up-down-left-right";
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can";
    trashIcon.addEventListener("click", () => deleteWorks(modalImg));

    const modalEditor = document.createElement("figcaption");
    modalEditor.innerText = "éditer";

    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(modalImg);
    modalFigure.appendChild(modalIcons);
    modalIcons.appendChild(arrowsIcon);
    modalIcons.appendChild(trashIcon);
    modalFigure.appendChild(modalEditor);
  }
}

function closeModal(event) {
  event.preventDefault();
  modalValue.style.display = "none";
  modalValue.setAttribute("aria-hidden", "true");
  modalValue.removeAttribute("aria-modal");
  modalValue = null;
  modalGallery.innerHTML = "";
}

function stopPropagation(event) {
  event.stopPropagation();
}

modalBtn.addEventListener("click", displayModal);

function deleteWorks(modalImg) {
  let id;
  for (i = 0; i < works.length; i++) {
    let clickedSource = modalImg.src;
    let comparedSource = works[i].imageUrl;
    if (clickedSource == comparedSource) {
      id = works[i].id;
      fetch(worksUrl + "/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application.json, */*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.ok) {
          response.preventDefault();
        }
      });
    }
  }
}
