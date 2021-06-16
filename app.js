// Selectors
const todoInput = document.querySelector(".todo-input");
const todobtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todobtn.addEventListener("click", addTodo);
todoList.addEventListener("click", trashCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions
function addTodo(event) {
  // To Prevent From Submitting (Stop Refresh When Click Add Button)
  event.preventDefault();

  // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create Todo Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerHTML = todoInput.value;
  todoDiv.appendChild(newTodo);

  // Add Todo to LocalStorage
  saveLocalTodos(todoInput.value);

  //  Create Check Mark Button
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="fas fa-check-square"></i>';
  todoDiv.appendChild(completeButton);

  //  Create Trash Button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  todoDiv.appendChild(trashButton);

  // Append Todo DIV
  todoList.appendChild(todoDiv);

  // To Clear Input Value
  todoInput.value = "";
}

function trashCheck(e) {
  const item = e.target;
  // Delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Completed
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  // Check Is Already thing in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// On Window Load Get Item from Local Storage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Todo Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerHTML = todo;
    todoDiv.appendChild(newTodo);

    //  Create Check Mark Button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check-square"></i>';
    todoDiv.appendChild(completeButton);

    //  Create Trash Button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(trashButton);

    // Append Todo DIV
    todoList.appendChild(todoDiv);

    // To Clear Input Value
    todoInput.value = "";
  });
}

// To Remove Item From Local Stroage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
