const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");

function addTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <i class="fas fa-check-square"></i>
      <i class="fas fa-trash"></i>
    `;
    const checkBtn = li.querySelector(".fa-check-square");
    checkBtn.addEventListener("click", function () {
      const taskSpan = li.querySelector("span");
      taskSpan.classList.toggle("checked-text");
    });
    const trashBtn = li.querySelector(".fa-trash");
    trashBtn.addEventListener("click", function () {
      li.remove();
    });
    ulEl.appendChild(li);
  }
  
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = inputEl.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      inputEl.value = "";
    }
  });
  
  ulEl.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-check-square")) {
      const taskSpan = event.target.previousElementSibling;
      taskSpan.classList.toggle("checked-text");
    } else if (event.target.classList.contains("fa-trash")) {
      event.target.parentElement.remove();
    }
  });
  