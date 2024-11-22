const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const backlogList = document.getElementById('backlog-list');

// Items
let updatedOnLoad = false;
let backlogListArray = [];

function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
  }
}

function updateSavedColumns() {
  localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
}

function filterArray(array) {
  return array.filter(item => item !== null);
}

function createItemEl(columnEl, item, index) {
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index})`);
  columnEl.appendChild(listEl);
}

function updateDOM() {
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  backlogList.textContent = '';
  backlogListArray.forEach((item, index) => {
    createItemEl(backlogList, item, index);
  });
  backlogListArray = filterArray(backlogListArray);
  updatedOnLoad = true;
  updateSavedColumns();
}

function updateItem(id) {
  const selectedColumnEl = backlogList.children;
  if (!selectedColumnEl[id].textContent) {
    delete backlogListArray[id];
  } else {
    backlogListArray[id] = selectedColumnEl[id].textContent;
  }
  updateDOM();
}

function addToColumn() {
  const itemText = addItems[0].textContent;
  backlogListArray.push(itemText);
  addItems[0].textContent = '';
  updateDOM();
}

function showInputBox() {
  addBtns[0].style.visibility = 'hidden';
  saveItemBtns[0].style.display = 'flex';
  addItemContainers[0].style.display = 'flex';
}

function hideInputBox() {
  addBtns[0].style.visibility = 'visible';
  saveItemBtns[0].style.display = 'none';
  addItemContainers[0].style.display = 'none';
  addToColumn();
}

updateDOM();
