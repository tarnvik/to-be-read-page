"use strict";

let tbrs = ["book1", "book2", "book3"];
let listRoot = document.querySelector("#list-root");

function tbrList(items) {
  let list = document.createElement("ul");
  items.forEach((item) => {
    let tbrListItem = document.createElement("li");
    tbrListItem.innerText = item;
    list.append(tbrListItem);
  });
  return list;
}

function updateList() {
  listRoot.innerHTML = "";
  listRoot.append(tbrList(tbrs));
}

updateList();