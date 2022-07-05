// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from 'firebase/app';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getFirestore,
  getDocs,
  deleteDoc,
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

const addBookFire = async (book) => {
  try {
    const docRef = await addDoc(collection(db, 'library'), {
      ...book,
    });
    console.log('Document written with ID: ', docRef.id);
    lib.addBook({
      ...book,
      id: docRef.id,
    });
    renderBooks();
  } catch (e) {
    console.log('error adding doc: ', e);
  }
};

const changeBookFire = async (rd, id) => {
  try {
    const docRef = await setDoc(
      doc(db, 'library', id),
      {
        read: rd,
      },
      { merge: true }
    );
  } catch (e) {
    console.log('error editing', e);
  }
};

const deleteBookFire = async (id) => {
  try {
    const docRef = await deleteDoc(doc(db, 'library', id));
  } catch (e) {
    console.log('error deleting', e);
  }
};

getLibrary();

export { lib, changeBookFire, deleteBookFire, addBookFire };
