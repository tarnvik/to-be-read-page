"use strict";

const LOCAL_STORAGE_KEY_TBRS = "tbrs";
const LOCAL_STORAGE_KEY_READS = "reads";

let tbrs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TBRS)) || [];
let reads = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_READS)) || [];

let listRoot = document.querySelector("#tbr-list");
let bookList = document.querySelector("#book-list");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");
let deleteButton = document.querySelector("#deleteButton");
let deleteMode = false;

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (listInput.value.trim() === "") {
    return;
  }
  tbrs.push(createListItem(listInput.value.trim()));
  updateList();
  listInput.value = "";
});

deleteButton.addEventListener("click", () => {
  if (!deleteMode) {
    deleteMode = true;
  } else {
    deleteMode = false;
  }
  console.log(deleteMode);
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
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    listItem.innerText = item.name;
    listItem.setAttribute("data-id", item.id);
    listItem.setAttribute("name", item.name);
    listItem.addEventListener("click", moveItem);
    list.append(listItem);
  });
  return list;
}

function moveItem(event) {
  let itemToMove = event.target.getAttribute("data-id");
  let itemToMoveName = event.target.getAttribute("name");
  let itemIsInReads = false;
  reads.forEach((item) => {
    if (item.id === itemToMove) {
      itemIsInReads = true;
    }
  });
  if (!deleteMode && itemIsInReads) {
    tbrs.push(createListItem(itemToMoveName));
    reads = reads.filter((item) => item.id !== itemToMove);
    itemIsInReads = false;
  } else if (!deleteMode && !itemIsInReads) {
    reads.push(createListItem(itemToMoveName));
    tbrs = tbrs.filter((item) => item.id !== itemToMove);
  } else if (deleteMode && itemIsInReads) {
    reads = reads.filter((item) => item.id !== itemToMove);
  } else if (deleteMode && !itemIsInReads) {
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