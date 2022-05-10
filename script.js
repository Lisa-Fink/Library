const Book = class MyBook{
    static myLibrary = [];

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;      
    }
    addBookToLibrary() {
        Book.myLibrary.push(this)
    }
}

const aw = new Book('Alice\'s Adventures in Wonderland', 
    'Lewis Caroll', 352, true)
const hg = new Book('The Hitchhiker\'s Guide to the Galaxy', 
    'Douglas Adams', 254, true)

aw.addBookToLibrary()
hg.addBookToLibrary()

const display = (() => {
    showForm = () => {
        document.getElementById('book-form').style.display="block"
        }

    displayBooks = () => {
        document.getElementById('books').innerHTML = ''
        for (let i = 0; i < Book.myLibrary.length; i++) {
                let bookDiv = document.createElement('div')
                bookDiv.classList.add('book')
                let removeButton = document.createElement('button')
                let changeStatusButton = document.createElement('button')
            // Adds book info
            let infoDiv = document.createElement('div')
            for (const property in Book.myLibrary[i]) {
                let bookAttributeDiv = document.createElement('div')
                bookAttributeDiv.classList.add(property)
                let text = property == 'title' ? Book.myLibrary[i][property] :
                    property == 'author' ? `by ${Book.myLibrary[i][property]}`:
                    property == 'pages' ? `${Book.myLibrary[i][property]} pgs` :
                    Book.myLibrary[i][property] ? 'Read' : 'Unread'
                bookAttributeDiv.innerText = text
                infoDiv.appendChild(bookAttributeDiv)
            };
    
            bookDiv.appendChild(infoDiv)
    
            // buttons
                removeButton.data = i
                removeButton.innerText = '-'
                changeStatusButton.innerText = Book.myLibrary[i].read ? 'unread' : 'read'
                changeStatusButton.data = i
    
            const buttonDiv = document.createElement('div')
            buttonDiv.id = 'button-div'
            removeButton.addEventListener('click', removeBook)
            changeStatusButton.addEventListener('click', changeStatus)
    
                buttonDiv.appendChild(changeStatusButton)
                buttonDiv.appendChild(removeButton)
                bookDiv.appendChild(buttonDiv)
                
            
                document.getElementById('books').appendChild(bookDiv)
    
        }
    }

    removeBook = (e) => {
        let index = e.target.data
        Book.myLibrary = (Book.myLibrary.slice(0,index)).concat(Book.myLibrary.slice(index+1))
        display.displayBooks()
        }

    changeStatus = (e) => {
        let index = e.target.data
        Book.myLibrary[index].read = Book.myLibrary[index].read ? false: true
        displayBooks()
    }


    clearForm = (e) => {
        e.target.form[0].value = ''
        e.target.form[1].value = ''
        e.target.form[2].value = ''
        e.target.form[3].checked = true
        e.target.form[4].checked = false
        document.getElementById('book-form').style.display="none"
    }
    return {displayBooks, showForm, clearForm}
})();

const form = (() => {
    
    addBook = (e) => {
    let author = e.target.form[0].value
    let title = e.target.form[1].value
    let pages = e.target.form[2].value
    let read = e.target.form[3].checked ? true : false
    let newBook = new Book(title, author, pages, read)
    newBook.addBookToLibrary()

    display.clearForm(e)
    display.displayBooks()
    }
    
    addEventListeners = (() => {
        document.getElementById('new-book').addEventListener('click', display.showForm)
        document.getElementById('add-button').addEventListener('click', addBook)
        document.getElementById('cancel-button').addEventListener('click', display.clearForm)
    })()
})();


display.displayBooks()




