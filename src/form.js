import { renderBooks, showForm, clearForm, showError } from './display';
import { lib } from './index';

const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const pgInput = document.getElementById('pages');

const addBook = (e) => {
  let author = e.target.form[0].value;
  let title = e.target.form[1].value;
  let pages = e.target.form[2].value;
  let read = e.target.form[3].checked ? true : false;
  let newBook = new Book(title, author, pages, read);
  lib.addBook(newBook);

  clearForm(e);
  renderBooks();
};

const submitBook = (e) => {
  const validated = validateForm(e);
  if (validated) {
    addBook(e);
  }
};

const validateForm = (e) => {
  const a = validateAuthor();
  const t = validateTitle();
  const p = validatePg();
  if (a & t & p) {
    return true;
  } else {
    return false;
  }
};

const validateAuthor = () => {
  if (!authorInput.validity.valid) {
    showError('author');
    return false;
  } else {
    clearError('author');

    return true;
  }
};

const validateTitle = () => {
  if (!titleInput.validity.valid) {
    showError('title');
    return false;
  } else {
    clearError('title');

    return true;
  }
};

const validatePg = () => {
  if (!pgInput.validity.valid) {
    showError('pg');
    return false;
  } else {
    clearError('pg');
    return true;
  }
};

const addEventListeners = (() => {
  document.getElementById('new-book').addEventListener('click', showForm);
  document.getElementById('add-button').addEventListener('click', submitBook);
  document.getElementById('cancel-button').addEventListener('click', clearForm);
  authorInput.addEventListener('input', validateAuthor);
  titleInput.addEventListener('input', validateTitle);
  pgInput.addEventListener('input', validatePg);
})();
