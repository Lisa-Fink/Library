import { changeBookFire, lib, deleteBookFire } from './index';

const authorError = document.querySelector('#author + span.error');
const titleError = document.querySelector('#title + span.error');
const pgError = document.querySelector('#pages + span.error');

const createBookCard = (i) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  const infoDiv = getBookInfo(i);
  bookDiv.appendChild(infoDiv);

  const buttonDiv = createCardButtons(i);
  bookDiv.appendChild(buttonDiv);

  return bookDiv;
};

const getBookInfo = (i) => {
  let infoDiv = document.createElement('div');

  const props = ['title', 'author', 'pages', 'read'];
  for (let prop of props) {
    let bookAttributeDiv = document.createElement('div');
    bookAttributeDiv.className = prop;
    let text =
      prop == 'title'
        ? lib.booksArr[i][prop]
        : prop == 'author'
        ? `by ${lib.booksArr[i][prop]}`
        : prop == 'pages'
        ? lib.booksArr[i][prop] > 1
          ? `${lib.booksArr[i][prop]} pgs`
          : '1 pg'
        : lib.booksArr[i][prop]
        ? 'Read'
        : 'Unread';
    bookAttributeDiv.innerText = text;
    infoDiv.appendChild(bookAttributeDiv);
  }

  return infoDiv;
};

const createCardButtons = (i) => {
  let removeButton = document.createElement('button');
  let changeStatusButton = document.createElement('button');

  removeButton.data = i;
  removeButton.innerText = '-';
  changeStatusButton.innerText = lib.booksArr[i].read
    ? 'set as unread'
    : 'set as read';
  changeStatusButton.data = i;

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-div');
  removeButton.addEventListener('click', removeBook);
  changeStatusButton.addEventListener('click', changeStatus);

  buttonDiv.appendChild(changeStatusButton);
  buttonDiv.appendChild(removeButton);
  return buttonDiv;
};

const renderBooks = () => {
  console.log('rendering');
  const bookCase = document.getElementById('books');
  bookCase.innerHTML = '';
  for (let i = 0; i < lib.booksArr.length; i++) {
    const bookCard = createBookCard(i);
    bookCase.appendChild(bookCard);
  }
};

const removeBook = (e) => {
  let index = e.target.data;
  const id = lib.booksArr[index].id;
  lib.removeBook(index);
  deleteBookFire(id);
  renderBooks();
};

const changeStatus = (e) => {
  let index = e.target.data;
  lib.toggleRead(index);
  const id = lib.booksArr[index].id;
  const readStatus = lib.booksArr[index].read;
  changeBookFire(readStatus, id);
  renderBooks();
};

const showForm = () => {
  document.getElementById('book-form').style.display = 'block';
};

const clearForm = (e) => {
  e.target.form[0].value = '';
  e.target.form[1].value = '';
  e.target.form[2].value = '';
  e.target.form[3].checked = true;
  e.target.form[4].checked = false;
  document.getElementById('book-form').style.display = 'none';
  clearError('all');
};

const clearError = (type) => {
  if (type == 'author') {
    authorError.textContent = '';
    authorError.classList.remove('active');
  }
  if (type == 'title') {
    titleError.textContent = '';
    titleError.classList.remove('active');
  }
  if (type == 'pg') {
    pgError.textContent = '';
    pgError.classList.remove('active');
  }
  if (type == 'all') {
    clearError('author');
    clearError('title');
    clearError('pg');
  }
};

const showError = (type) => {
  const authorInput = document.getElementById('author');
  const titleInput = document.getElementById('title');
  const pgInput = document.getElementById('pages');
  if (type == 'author') {
    if (authorInput.validity.valueMissing) {
      authorError.classList.add('active');
      authorError.textContent = 'Please enter an author';
    }
  }
  if (type == 'title') {
    if (titleInput.validity.valueMissing) {
      titleError.classList.add('active');
      titleError.textContent = 'Please enter a title';
    }
  }
  if (type == 'pg') {
    if (pgInput.validity.valueMissing) {
      pgError.classList.add('active');
      pgError.textContent = 'Please enter a number';
    }
  }
};
export { renderBooks, showForm, clearForm, showError, clearError };
