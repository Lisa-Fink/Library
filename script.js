
let myLibrary = [];
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const aw = new Book('Alice\'s Adventures in Wonderland', 
    'Lewis Caroll', 352, true)
const hg = new Book('The Hitchhiker\'s Guide to the Galaxy', 
    'Douglas Adams', 254, true)

addBookToLibrary(aw)
addBookToLibrary(hg)

displayBooks()



document.getElementById('new-book').addEventListener('click', showForm)
document.getElementById('add-button').addEventListener('click', addBook)
document.getElementById('cancel-button').addEventListener('click', clearForm)



function addBookToLibrary(book) {
    myLibrary.push(book)
}


function showForm() {
    document.getElementById('book-form').style.display="block"
}

function addBook(e) {
    let author = e.target.form[0].value
    let title = e.target.form[1].value
    let pages = e.target.form[2].value
    let read = e.target.form[3].checked ? true : false
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)

    clearForm(e)
    displayBooks()
}

function displayBooks() {
    document.getElementById('books').innerHTML = ''
    for (let i = 0; i < myLibrary.length; i++) {
            let bookDiv = document.createElement('div')
            bookDiv.classList.add('book')
            let removeButton = document.createElement('button')
            let changeStatusButton = document.createElement('button')
        // Adds book info
        let infoDiv = document.createElement('div')
        for (const property in myLibrary[i]) {
            let bookAttributeDiv = document.createElement('div')
            bookAttributeDiv.classList.add(property)
            let text = property == 'title' ? myLibrary[i][property] :
                property == 'author' ? `by ${myLibrary[i][property]}`:
                property == 'pages' ? `${myLibrary[i][property]} pgs` :
                myLibrary[i][property] ? 'Read' : 'Unread'
            bookAttributeDiv.innerText = text
            infoDiv.appendChild(bookAttributeDiv)
        };

        bookDiv.appendChild(infoDiv)

        // buttons
            removeButton.data = i
            removeButton.innerText = '-'
            changeStatusButton.innerText = myLibrary[i].read ? 'unread' : 'read'
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

function removeBook(e) {
    let index = e.target.data
    myLibrary = (myLibrary.slice(0,index)).concat(myLibrary.slice(index+1))
    displayBooks()
}

function changeStatus(e) {
    let index = e.target.data
    myLibrary[index].read = myLibrary[index].read ? false: true
    displayBooks()
}

function clearForm(e) {
    e.target.form[0].value = ''
    e.target.form[1].value = ''
    e.target.form[2].value = ''
    e.target.form[3].checked = true
    e.target.form[4].checked = false
    document.getElementById('book-form').style.display="none"
}
