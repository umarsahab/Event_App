import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";



import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut }
 from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getDatabase, ref, set, 
  // push, onValue, child, get, update, remove 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

import { getFirestore
  // push, onValue, child, get, update, remove 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB31ox1ABc41g_BamAamxqpn2QGqZCJ27A",
  authDomain: "foodside-9bead.firebaseapp.com",
  databaseURL: "https://foodside-9bead-default-rtdb.firebaseio.com",
  projectId: "foodside-9bead",
  storageBucket: "foodside-9bead.appspot.com",
  messagingSenderId: "793400657115",
  appId: "1:793400657115:web:039e240feee465ba1878fe",
  measurementId: "G-NF3HLTBQTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestoreDb = getFirestore(app);
console.log(app);



var innerDiv = document.getElementById('containerdiv')
var secondDiv = document.getElementById('main_div1')

var content = document.getElementById('content_div')
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("user mojood hn")

    console.log("user uid" + uid)
    content.style.display = "block";
    innerDiv.style.display = "none";
    // secondDiv.style.display = "none";
    // content()
    // second.style.display = "block";



    // ...
  } else {

    console.log("user mojood nhi hn")
    // contentDiv.style.display = "none";
    // innerDiv.style.display = "block";
    // secondDiv.style.display = "block";


    // User is signed out
    // ...
  }
});
// const analytics = getAnalytics(app);

console.log(app);
var button1 = document.getElementById('btn_up')
button1.addEventListener('click', signInMain)

function signInMain() {
  const reg_email = document.getElementById('email')
  const reg_password = document.getElementById('password')
  const userName = document.getElementById('name')
  const FatherName = document.getElementById('fname')

  createUserWithEmailAndPassword(auth, reg_email.value, reg_password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const obj = {
        name: userName,
        FatherName,
        Email: reg_email
      }

      const userRef = ref(db, `users/${user.uid}`)
      console.log('user' + userRef)
      set(userRef, obj)


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorMessage);
    });


}
const signIn_btn = document.getElementById('loginIn_btn')
signIn_btn.addEventListener('click' , login)

function login () {
  const reg_email = document.getElementById('email')
  const reg_password = document.getElementById('password')
  signInWithEmailAndPassword(auth, reg_email.value, reg_password.value)
    .then(userCredential => {
      const user = userCredential.user
      console.log('user--->', user)
      alert('hello')
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('errorMessage--->', errorMessage)
    })
}

const logOutBtn = document.getElementById('btn_up1')
logOutBtn.addEventListener('click', logOut)


function logOut() {
  signOut(auth).then(() => {
    // Sign-out successful.


  }).catch((error) => {
    // An error happened.
  });
}


// var show = document.getElementById('show')

// function content(){
// var show = document.getElementById('show')

//   const showContent = `<div id
//   ="content_div" class="content_div" style="display: none;">

//   <div id="left_side" class="left_side">
//              <h1>Events</h1>
//              <input type="text" placeholder="Search events">
//   </div>
//   <div id="right_side" class="right_side">

//   </div>
// </div>`

// show.innerHTML += showContent
// }