"use strict"; 

const LOCAL_STORAGE_KEY_TODOS = "todos";
const LOCAL_STORAGE_KEY_READS = "reads";

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS)) || [];
let reads = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_READS)) || [];

let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");
let bookList = document.querySelector("#book-list");

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (listInput.value.trim() === "") {
    return;
  }
  todos.push(createTodo(listInput.value.trim()));
  updateList();
  listInput.value = "";
});

function createTodo(name) {
  return {
    id: Date.now().toString(),
    name: name,
  };
}


function todoList(items) {
  let list = document.createElement("ul");
  items.forEach((item) => {
    let listItem = document.createElement("li");
    let todoListItem
    todoListItem.innerText = item.name;
    todoListItem.setAttribute("data-id", item.id);
    todoListItem.setAttribute("name", item.name);
    todoListItem.addEventListener("click", moveItem);
    let deleteBox = document.createElement("input");
    deleteBox.setAttribute("type", "checkbox")
    deleteBox.setAttribute("onclick", "removeItem")
    todoListItem.setAttribute("data-id", item.id);

    todoListItem.append(deleteBox);
    list.append(todoListItem);
  });
  return list;
}



function deleteItem(event){
  let itemToRemove = event.target.getAttribute("data-id");
  console.log(itemToRemove);
  reads = reads.filter((item) => item.id !== itemToRemove);
  todos = todos.filter((item) => item.id !== itemToRemove);
}

function moveItem(event) {
  let itemShouldBeRemoved = false;
  let itemToMove = event.target.getAttribute("data-id");
  let readBook = event.target.getAttribute("name");
  reads.forEach((item) => {
    if (item.id === itemToMove){
      itemShouldBeRemoved = true;
    }
  });
  if (itemShouldBeRemoved) {
    todos.push(createTodo(readBook));   
    itemShouldBeRemoved = false;
  } else {
    reads.push(createTodo(readBook));   
  }
  reads = reads.filter((item) => item.id !== itemToMove);
  todos = todos.filter((item) => item.id !== itemToMove);
  updateList();
}

function updateList() {
  saveList();
  listRoot.innerHTML = "";
  listRoot.append(todoList(todos));
  bookList.innerHTML = "";
  bookList.append(todoList(reads));
}

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
  localStorage.setItem(LOCAL_STORAGE_KEY_READS, JSON.stringify(reads));
}

updateList();