import View from "./View.js";
import Client from "./Client.js";
const view = new View();
const client = new Client();
const list = [];
if (localStorage.getItem("list")) {
  const savedList = JSON.parse(localStorage.getItem("list"));
  list.push(...savedList);
}
for (const movie of list) {
  client.getMovieData(movie).then((data) => view.displayMovieOnPage(data));
}
document.querySelector(".buttons").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-save")) {
    localStorage.setItem("list", JSON.stringify(list));
  } else if (e.target.classList.contains("btn-reset")) {
    list.length = 0;
    localStorage.removeItem("list");
  }
});
const input = document.querySelector("#input");
input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    let movie = input.value;
    if (movie) {
      client.getMovieData(movie).then((data) => {
        list.push(movie);
        view.displayMovieOnPage(data);
      });
    }
  }
});
