class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.booksArr = [];
  }
  addBook(book) {
    this.booksArr.push(book);
  }
  removeBook(index) {
    this.booksArr = this.booksArr
      .slice(0, index)
      .concat(this.booksArr.slice(index + 1));
  }
  toggleRead(index) {
    this.booksArr[index].read = this.booksArr[index].read ? false : true;
  }
}
const library = new Library();

const aw = new Book(
  "Alice's Adventures in Wonderland",
  'Lewis Caroll',
  352,
  true
);
const hg = new Book(
  "The Hitchhiker's Guide to the Galaxy",
  'Douglas Adams',
  254,
  true
);

library.addBook(aw);
library.addBook(hg);

const display = (() => {
  const authorError = document.querySelector('#author + span.error');
  const titleError = document.querySelector('#title + span.error');
  const pgError = document.querySelector('#pages + span.error');

  createBookCard = (i) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const infoDiv = getBookInfo(i);
    bookDiv.appendChild(infoDiv);

    const buttonDiv = createCardButtons(i);
    bookDiv.appendChild(buttonDiv);

    return bookDiv;
  };

  getBookInfo = (i) => {
    let infoDiv = document.createElement('div');
    for (const property in library.booksArr[i]) {
      let bookAttributeDiv = document.createElement('div');
      bookAttributeDiv.classList.add(property);
      let text =
        property == 'title'
          ? library.booksArr[i][property]
          : property == 'author'
          ? `by ${library.booksArr[i][property]}`
          : property == 'pages'
          ? `${library.booksArr[i][property]} pgs`
          : library.booksArr[i][property]
          ? 'Read'
          : 'Unread';
      bookAttributeDiv.innerText = text;
      infoDiv.appendChild(bookAttributeDiv);
    }
    return infoDiv;
  };

  createCardButtons = (i) => {
    let removeButton = document.createElement('button');
    let changeStatusButton = document.createElement('button');

    removeButton.data = i;
    removeButton.innerText = '-';
    changeStatusButton.innerText = library.booksArr[i].read ? 'unread' : 'read';
    changeStatusButton.data = i;

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');
    removeButton.addEventListener('click', removeBook);
    changeStatusButton.addEventListener('click', changeStatus);

    buttonDiv.appendChild(changeStatusButton);
    buttonDiv.appendChild(removeButton);
    return buttonDiv;
  };

  renderBooks = () => {
    const bookCase = document.getElementById('books');
    bookCase.innerHTML = '';
    for (let i = 0; i < library.booksArr.length; i++) {
      const bookCard = createBookCard(i);
      bookCase.appendChild(bookCard);
    }
  };

  removeBook = (e) => {
    let index = e.target.data;
    library.removeBook(index);
    display.renderBooks();
  };

  changeStatus = (e) => {
    let index = e.target.data;
    library.toggleRead(index);
    renderBooks();
  };

  showForm = () => {
    document.getElementById('book-form').style.display = 'block';
  };

  clearForm = (e) => {
    e.target.form[0].value = '';
    e.target.form[1].value = '';
    e.target.form[2].value = '';
    e.target.form[3].checked = true;
    e.target.form[4].checked = false;
    document.getElementById('book-form').style.display = 'none';
    clearError('all');
  };

  clearError = (type) => {
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

  showError = (type) => {
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
  return { renderBooks, showForm, clearForm, showError };
})();

const form = (() => {
  const authorInput = document.getElementById('author');
  const titleInput = document.getElementById('title');
  const pgInput = document.getElementById('pages');

  addBook = (e) => {
    let author = e.target.form[0].value;
    let title = e.target.form[1].value;
    let pages = e.target.form[2].value;
    let read = e.target.form[3].checked ? true : false;
    let newBook = new Book(title, author, pages, read);
    library.addBook(newBook);

    display.clearForm(e);
    display.renderBooks();
  };

  submitBook = (e) => {
    const validated = validateForm(e);
    if (validated) {
      addBook(e);
    }
  };

  validateForm = (e) => {
    const a = validateAuthor();
    const t = validateTitle();
    const p = validatePg();
    if (a & t & p) {
      return true;
    } else {
      return false;
    }
  };

  validateAuthor = () => {
    if (!authorInput.validity.valid) {
      display.showError('author');
      return false;
    } else {
      clearError('author');

      return true;
    }
  };

  validateTitle = () => {
    if (!titleInput.validity.valid) {
      display.showError('title');
      return false;
    } else {
      clearError('title');

      return true;
    }
  };

  validatePg = () => {
    if (!pgInput.validity.valid) {
      display.showError('pg');
      return false;
    } else {
      clearError('pg');
      return true;
    }
  };

  addEventListeners = (() => {
    document
      .getElementById('new-book')
      .addEventListener('click', display.showForm);
    document.getElementById('add-button').addEventListener('click', submitBook);
    document
      .getElementById('cancel-button')
      .addEventListener('click', display.clearForm);
    authorInput.addEventListener('input', validateAuthor);
    titleInput.addEventListener('input', validateTitle);
    pgInput.addEventListener('input', validatePg);
  })();
})();

display.renderBooks();
