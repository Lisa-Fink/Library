// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from 'firebase/app';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getFirestore,
  getDocs,
} from 'firebase/firestore';

import { renderBooks, showForm, clearForm, showError } from './display';
import './form';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDR8W5zPHM1ymRIP8qFlGW_ktg3C3UFO1s',
  authDomain: 'library-d6366.firebaseapp.com',
  projectId: 'library-d6366',
  storageBucket: 'library-d6366.appspot.com',
  messagingSenderId: '305622640025',
  appId: '1:305622640025:web:60ff763f6704e3d3addf08',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// class Book {
//   constructor(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//   }
// }

class Library {
  constructor() {
    this.booksArr = [];
  }
  addBook(book) {
    this.booksArr.push(book);
    console.log('added', this.booksArr);
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
const lib = new Library();

const getLibrary = async () => {
  const snapshot = await getDocs(collection(db, 'library'));
  console.log(snapshot);
  snapshot.forEach((doc) => {
    console.log(doc.data(), doc.id);
    let id = doc.id;
    let bookObj = doc.data();
    lib.addBook({ ...bookObj, id });
  });
  renderBooks();
  console.log('after render');
};

const addBookFire = async (title, auth, pgs, rd) => {
  try {
    const docRef = await addDoc(collection(db, 'library'), {
      author: auth,
      pages: pgs,
      read: rd,
      title: title,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.log('error adding doc: ', e);
  }
};
// addBook("The Hitchhiker's Guide to the Galaxy", 'Douglas Adams', 254, true);
// addBook("Alice's Adventures in Wonderland", 'Lewis Caroll', 352, true);
// const aw = new Book(
//   "Alice's Adventures in Wonderland",
//   'Lewis Caroll',
//   352,
//   true
// );
// const hg = new Book(
//   "The Hitchhiker's Guide to the Galaxy",
//   'Douglas Adams',
//   254,
//   true
// );

// library.addBook(aw);
// library.addBook(hg);
getLibrary();

export { lib };
