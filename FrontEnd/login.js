const loginUrl = "http://localhost:5678/api/users/login";
const form = document.querySelector("#form");

function sendRequest(event) {
  event.preventDefault();
  const email = document.querySelector("#mail").value;
  const password = document.querySelector("#password").value;
  const user = {
    email: email,
    password: password,
  };

  fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      });
    } else {
      const errorMessage = document.getElementById("error");
      errorMessage.style.display = "block";
    }
  });
}

form.addEventListener("submit", sendRequest);
