class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;      
    }
}

class Library {
    constructor () {
        this.booksArr = []
    }
    addBook(book) {
        this.booksArr.push(book)
    }
    removeBook(index) {
        this.booksArr = (this.booksArr.slice(0,index)).concat(this.booksArr.slice(index+1))
    }
    toggleRead(index) {
        this.booksArr[index].read = this.booksArr[index].read ? false: true
    } 
}
const library = new Library()

const aw = new Book('Alice\'s Adventures in Wonderland', 
    'Lewis Caroll', 352, true)
const hg = new Book('The Hitchhiker\'s Guide to the Galaxy', 
    'Douglas Adams', 254, true)

library.addBook(aw)
library.addBook(hg)

const display = (() => {

    createBookCard = (i) => {
        const bookDiv = document.createElement('div')
        bookDiv.classList.add('book')
        
        const infoDiv = getBookInfo(i)
        bookDiv.appendChild(infoDiv)
        
        const buttonDiv = createCardButtons(i)
        bookDiv.appendChild(buttonDiv)

        return bookDiv
    }

    getBookInfo = (i) => {
        let infoDiv = document.createElement('div')
        for (const property in library.booksArr[i]) {
            let bookAttributeDiv = document.createElement('div')
            bookAttributeDiv.classList.add(property)
            let text = property == 'title' ? library.booksArr[i][property] :
                property == 'author' ? `by ${library.booksArr[i][property]}`:
                property == 'pages' ? `${library.booksArr[i][property]} pgs` :
                library.booksArr[i][property] ? 'Read' : 'Unread'
            bookAttributeDiv.innerText = text
            infoDiv.appendChild(bookAttributeDiv)
            
        };
        return infoDiv
    }
    
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
    }

    renderBooks = () => {
        const bookCase = document.getElementById('books');
        bookCase.innerHTML = '';
        for (let i = 0; i < library.booksArr.length; i++) {
            const bookCard = createBookCard(i);
            bookCase.appendChild(bookCard);
        }
    }

    removeBook = (e) => {
        let index = e.target.data;
        library.removeBook(index) ;
        display.renderBooks();
        }

    changeStatus = (e) => {
        let index = e.target.data;
        library.toggleRead(index);
        renderBooks();
    }


    showForm = () => {
        document.getElementById('book-form').style.display="block";
        }

    clearForm = (e) => {
        e.target.form[0].value = '';
        e.target.form[1].value = '';
        e.target.form[2].value = '';
        e.target.form[3].checked = true;
        e.target.form[4].checked = false;
        document.getElementById('book-form').style.display="none";
    }
    return {renderBooks, showForm, clearForm};
})();

const form = (() => {
    
    addBook = (e) => {
    let author = e.target.form[0].value;
    let title = e.target.form[1].value;
    let pages = e.target.form[2].value;
    let read = e.target.form[3].checked ? true : false;
    let newBook = new Book(title, author, pages, read);
    newBook.addBookToLibrary();

    display.clearForm(e);
    display.renderBooks();
    }
    
    addEventListeners = (() => {
        document.getElementById('new-book').addEventListener('click', display.showForm);
        document.getElementById('add-button').addEventListener('click', addBook);
        document.getElementById('cancel-button').addEventListener('click', display.clearForm);
    })()
})();


display.renderBooks();