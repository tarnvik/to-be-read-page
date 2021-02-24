"use strict"; 

const LOCAL_STORAGE_KEY_TBRS = "tbrs";
const LOCAL_STORAGE_KEY_READS = "reads";

let tbrs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TBRS)) || [];
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
  tbrs.push(createListItem(listInput.value.trim()));
  updateList();
  listInput.value = "";
});

function createListItem(name) {
  return {
    id: Date.now().toString(),
    name: name,
  };
}

function list(items) {
  let list = document.createElement("ul");
  items.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.innerText = item.name;
    listItem.setAttribute("data-id", item.id);
    listItem.setAttribute("name", item.name);
    listItem.addEventListener("click", moveItem);
    list.append(listItem);
    /*
    let todoListItem    
    let deleteBox = document.createElement("input");
    deleteBox.setAttribute("type", "checkbox")
    deleteBox.setAttribute("onclick", "removeItem")
    todoListItem.setAttribute("data-id", item.id);
    todoListItem.append(deleteBox);
     */
  });
  return list;
}

function deleteItem(event){
  let itemToRemove = event.target.getAttribute("data-id");
  console.log(itemToRemove);
  reads = reads.filter((item) => item.id !== itemToRemove);
  tbrs = tbrs.filter((item) => item.id !== itemToRemove);
}

function moveItem(event) {
  let itemIsInReads = false;
  let itemToMove = event.target.getAttribute("data-id");
  let itemToMoveName = event.target.getAttribute("name");  
  reads.forEach((item) => {
    if (item.id === itemToMove){
      itemIsInReads = true;
    }
  });
  if (itemIsInReads) {
    tbrs.push(createListItem(itemToMoveName));
    reads = reads.filter((item) => item.id !== itemToMove);
    itemIsInReads = false;
  } else {
    reads.push(createListItem(itemToMoveName)); 
    tbrs = tbrs.filter((item) => item.id !== itemToMove);  
  }
  updateList();
}

function updateList() {
  saveList();
  listRoot.innerHTML = "";
  listRoot.append(list(tbrs));
  bookList.innerHTML = "";
  bookList.append(list(reads));
}

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TBRS, JSON.stringify(tbrs));
  localStorage.setItem(LOCAL_STORAGE_KEY_READS, JSON.stringify(reads));
}

updateList();