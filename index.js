const todoText = document.querySelector("#todo_text");
const todoBtn = document.querySelector("button");
const todoContainer = document.querySelector(".todo_container");
const doneContainer = document.querySelector(".done_container");

let todoArr = JSON.parse(localStorage.getItem("todos")) || [];
console.log("App startet. Todos hentet fra localStorage:", todoArr);

todoBtn.addEventListener("click", submitToDo);
renderTodos();

function submitToDo() {
  console.log("Klik på 'Add todo'");

  if (!todoText.value.trim()) {
    console.log("Input er tomt – todo blev ikke oprettet");
    return;
  }

  const toDoObj = {
    id: crypto.randomUUID(),
    text: todoText.value,
    amount: 1,
    done: false,
    favorite: false,
  };

  console.log("Ny todo oprettet:", toDoObj);

  todoArr.push(toDoObj);
  console.log("Todo-array efter push:", todoArr);

  todoText.value = "";
  saveAndRender();
}

function toggleDone(id) {
  console.log("Toggle done på todo med id:", id);

  const todo = todoArr.find((t) => t.id === id);
  todo.done = !todo.done;

  console.log("Todo efter toggle done:", todo);

  saveAndRender();
}

function toggleFavorite(id) {
  console.log("Toggle favorite på todo med id:", id);

  const todo = todoArr.find((t) => t.id === id);
  todo.favorite = !todo.favorite;

  console.log("Todo efter toggle favorite:", todo);

  saveAndRender();
}

function deleteTodo(id) {
  console.log("Sletter todo med id:", id);

  todoArr = todoArr.filter((t) => t.id !== id);

  console.log("Todo-array efter sletning:", todoArr);

  saveAndRender();
}

function saveAndRender() {
  console.log("Gemmer todos i localStorage...");
  localStorage.setItem("todos", JSON.stringify(todoArr));

  console.log("Gen-renderer UI");
  renderTodos();
}

function renderTodos() {
  console.log("RenderTodos kaldt");

  todoContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  todoArr.forEach((todo) => {
    console.log("Renderer todo:", todo);

    const li = document.createElement("li");
    li.classList.add("todo_item");

    // favorit-stjerne
    const star = document.createElement("span");
    star.textContent = todo.favorite ? "★" : "☆";
    star.classList.add("star");
    star.onclick = () => toggleFavorite(todo.id);

    // tekst
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    const leftWrapper = document.createElement("div");
    leftWrapper.classList.add("todo_left");
    leftWrapper.append(star, textSpan);

    // knapper
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.done ? "Fortryd" : "Færdig";
    toggleBtn.onclick = () => toggleDone(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slet";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("todo_buttons");
    btnWrapper.append(toggleBtn, deleteBtn);

    li.append(leftWrapper, btnWrapper);

    if (todo.done) {
      doneContainer.appendChild(li);
      console.log("Todo tilføjet til DONE-listen");
    } else {
      todoContainer.appendChild(li);
      console.log("Todo tilføjet til TODO-listen");
    }
  });
}
