let parent = document.querySelector("ul");
let addBtn = document.getElementById("addTech");
let newTech = document.getElementById("newTech");

let techs = {
  html: {
    isDone: true,
    name: "html",
  },
  css: {
    isDone: true,
    name: "css",
  },
  js: {
    isDone: false,
    name: "js",
  },
};

function renderTechs(obj) {
  for (let key in obj) {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = obj[key].isDone;
    input.addEventListener("change", function () {
      changeStatus(key);
    });
    let span = document.createElement("span");
    span.textContent = obj[key].name;
    let button = document.createElement("button");
    button.classList.add("del");
    button.textContent = "del";
    button.addEventListener("click", function () {
      deleteTech(li, key);
    });
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    parent.appendChild(li);
  }
}

function addTech(tech) {
  let key = tech.querySelector("span").textContent;
  techs[key] = {
    isDone: tech.querySelector("input").checked,
    name: tech.querySelector("span").textContent,
  };
  changeList();
}

function deleteTech(tech, key) {
  tech.remove();
  delete techs[key];
  changeList();
}

function changeStatus(key) {
  techs[key].isDone = !techs[key].isDone;
  changeList();
}

function changeList() {
  localStorage.setItem("list", JSON.stringify(techs));
}

addBtn.addEventListener("click", function () {
  if (!newTech.value) return;
  let li = document.createElement("li");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.checked = false;
  input.addEventListener("change", function () {
    changeStatus(li.querySelector("span").textContent);
  });
  let span = document.createElement("span");
  span.textContent = newTech.value;
  let button = document.createElement("button");
  button.classList.add("del");
  button.textContent = "del";
  button.addEventListener("click", function () {
    deleteTech(li, li.querySelector("span").textContent);
  });
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);
  parent.appendChild(li);
  newTech.value = "";
  addTech(li);
});

window.addEventListener("load", function () {
  if (!this.localStorage.length) {
    renderTechs(techs);
  } else {
    let data = JSON.parse(localStorage.getItem("list"));
    renderTechs(data);
  }
});
