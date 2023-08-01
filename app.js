import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    set,
    remove
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js'

import {
    getStorage,
    uploadBytes,
    ref as storageRef,
    getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js'

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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app)
const storage = getStorage(app)
// login, register form and slider start code

const registerBtn = document.getElementById('register_btn')
const loginBtn = document.getElementById('login_btn')
const registerForm = document.getElementById('register_form')
const loginForm = document.getElementById('login_form')
const formDisplay = document.getElementById('form_display')
const cancelRegisterBtn = document.getElementById('cancel_register_btn')
const cancelLoginBtn = document.getElementById('cancel_login_btn')
const registerNow = document.getElementById('register_now')
const loginNow = document.getElementById('login_now')
const carouselExampleFade = document.getElementById('carouselExampleFade')
const eventForm = document.getElementById('event_form')
const createEvent = document.getElementById('create_event')
const cancelEventForm = document.getElementById('cancel_event_form')
const logout = document.getElementById('logout')
const eventContainer = document.getElementById('event_container')
const event = document.getElementById('event')
// console.log(eventContainer);
// console.log(carouselExampleFade);

// const userImgInput = document.getElementById('user_img_input')
// let user_img_url = null
// let userInfo = null
// let anotherUser = null
// let userUid = null
// console.log(loginForm, registerForm);
// byDefult()
// function byDefult(){
//     registerForm.style.display = "none"
//     loginForm.style.display = "none"
// }



registerNow.addEventListener('click', () => {
    registerForm.style.display = "block"
    loginForm.style.display = "none"
})

loginNow.addEventListener('click', () => {
    loginForm.style.display = "block"
    registerForm.style.display = "none"
})

cancelRegisterBtn.addEventListener('click', () => {
    registerForm.style.display = "none"
    carouselExampleFade.style.display = "block"
})

cancelLoginBtn.addEventListener('click', () => {
    loginForm.style.display = "none"
    carouselExampleFade.style.display = "block"
})

formDisplay.addEventListener('click', () => {
    loginForm.style.display = "block"
    registerForm.style.display = "none"
    carouselExampleFade.style.display = "none"
})


createEvent.addEventListener('click', () => {
    eventForm.style.display = "block"
    registerForm.style.display = "none"
    loginForm.style.display = "none"
    carouselExampleFade.style.display = "none"
    eventContainer.style.display = "none"

})

cancelEventForm.addEventListener('click', () => {
    eventForm.style.display = "none"
    carouselExampleFade.style.display = "block"
    eventContainer.style.display = "block"
})

event.addEventListener('click', () => {
    eventForm.style.display = "none"
    registerForm.style.display = "none"
    loginForm.style.display = "none"
    carouselExampleFade.style.display = "none"
    eventContainer.style.display = "block"
})

// login, register form and slider end code

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        registerForm.style.display = "none"
        loginForm.style.display = "none"
        carouselExampleFade.style.display = "block"
        formDisplay.style.display = "none"
        logout.style.display = "block"
        // getUserInfo()
        // if (condition) {

        // }
        getEvents()
        getUserInfo()
        // ...
    } else {
        // registerForm.style.display = "block"
        // loginForm.style.display = "block"
        carouselExampleFade.style.display = "block"
        formDisplay.style.display = "block"
        logout.style.display = "none"
        //...
    }
});


function getUserInfo(uid) {
    const userRef = ref(db, 'users', auth.currentUser.uid)
    onValue(userRef, (snapshot) => {
        const datahai = snapshot.exists();
        // return datahai
        
        if (datahai) {
            // list_container.innerHTML = null
            snapshot.forEach(userdata => {
                const userinfo =  userdata.val()
                console.log(userinfo.name);
                // console.log(userdata.val());
                //  console.log(userinfo.name);
            })
                        
    };
})
// console.log(datahai);
}



registerBtn.addEventListener('click', () => {
    const userName = document.getElementById('user_name')
    const registerEmail = document.getElementById('register_email')
    const registerPassword = document.getElementById('register_password')
    console.log(userName.value, registerEmail.value, registerPassword.value);
    createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
        .then(userCredential => {
            const user = userCredential.user
            const obj = {
                name: userName.value,
                email: registerEmail.value,
                // image: user_img_url,
                id: user.uid
            }
            console.log('user--->', user)
            const userRef = ref(db, `users/${user.uid}`)
            console.log('userRef--->', userRef)
            set(userRef, obj)
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            // alert(errorMessage)
        })

})


loginBtn.addEventListener('click', () => {
    const loginEmail = document.getElementById('login_email')
    const loginPassword = document.getElementById('login_password')
    const comfirmLoginPassword = document.getElementById('comfirm_login_password')
    console.log(loginEmail.value, loginPassword.value);
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then(userCredential => {
            const user = userCredential.user
            console.log('user--->', user)
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log('errorMessage--->', errorMessage)
        })
})


// function getUserInfo() {
//     get(child(ref(db), `users/${auth.currentUser.uid}`))
//         .then(snapshot => {
//             if (snapshot.exists()) {
//                 console.log(snapshot.val())
//                 userInfo = snapshot.val()
//                 document.getElementById('user_img_navbar').src = userInfo.userimg
//             } else {
//                 console.log('No data available')
//             }
//         })
//         .catch(error => {
//             console.error(error)
//         })
// }

// userImgInput.addEventListener('change', () => {
//     const imgRef = storageRef(storage, `users/${this.files[0].name}`)
//     uploadBytes(imgRef, this.files[0])
//         .then(snapshot => {
//             getDownloadURL(imgRef)
//                 .then(url => {
//                     const userimg = document.getElementById('user_img')
//                     userimg.src = url
//                     user_img_url = url
//                 })
//                 .catch(err => console.error(err))
//         })
// })



const submitEvent = document.getElementById("submitEvent");
// console.log(submitEvent);
submitEvent.addEventListener('click', () => {
    // const eventInput = document.getElementById("eventInput").value;
    const eventName = document.getElementById("eventName").value;
    const numOfPeople = document.getElementById("numOfPeople").value;
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const eventDescription = document.getElementById("eventDescription").value;

    const EventRef = ref(db, `Events/${auth.currentUser.uid}`)
    const newEventRef = push(EventRef)
    console.log("eventref", EventRef)
    const obj = {
        // eventInput : eventInput,
        eventName: eventName,
        numOfPeople: numOfPeople,
        location: location,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        eventDescription: eventDescription,
    }
    set(newEventRef, obj)
    eventForm.style.display = "none"
    carouselExampleFade.style.display = "block"
    eventContainer.style.display = "block"
})



function getEvents() {
    const eventRef = ref(db, `Events/${auth.currentUser.uid}`)
    onValue(eventRef, snapshot => {
        const isDataExist = snapshot.exists()
        // console.log(isDataExist);
        if (isDataExist) {
            snapshot.forEach(childSnapshot => {
                // console.log(childSnapshot);
                const childData = childSnapshot.val()
                const childKey = childSnapshot.key
                // console.log("childKey==>", childKey);
                // console.log('childData=>', childData)
                let datebreak = childData.startDate
                const getYear = datebreak.slice(0, 4)
                const getMonth = datebreak.slice(5, 7)
                const getDate = datebreak.slice(8, 10)

                let timebreak = childData.startTime
                let hours = timebreak.slice(0, 2)
                // console.log(hours);
                const minutes = timebreak.slice(3, 5)
                if (hours > 12) {
                    hours = hours - 12 + " : " + minutes + " PM"
                    // console.log(hours);
                } else
                    if (hours == 12) {
                        hours = hours + " : " + minutes + " PM"
                        // console.log(hours);
                    } else
                        if (hours < 12) {
                            hours = hours + " : " + minutes + " AM"
                            // console.log(hours);
                        }

                let date = new Date()
                date.setDate(getDate)
                date.setFullYear(getYear)
                date.setMonth(getMonth - 1)
                date = date.getDay()
                if (date == 0) { var day = 'Sunday' } else
                    if (date == 1) { var day = 'Monday' } else
                        if (date == 2) { var day = 'Tuesday' } else
                            if (date == 3) { var day = 'Wednesday' } else
                                if (date == 4) { var day = 'Thursday' } else
                                    if (date == 5) { var day = 'Firday' } else
                                        if (date == 6) { var day = 'Saturday' }


                if (getMonth == 1) { var month = 'January' } else
                    if (getMonth == 2) { var month = 'February' } else
                        if (getMonth == 3) { var month = 'March' } else
                            if (getMonth == 4) { var month = 'April' } else
                                if (getMonth == 5) { var month = 'May' } else
                                    if (getMonth == 6) { var month = 'June' } else
                                        if (getMonth == 7) { var month = 'July' } else
                                            if (getMonth == 8) { var month = 'August' } else
                                                if (getMonth == 9) { var month = 'September' } else
                                                    if (getMonth == 10) { var month = 'October' } else
                                                        if (getMonth == 11) { var month = 'November' } else
                                                            if (getMonth == 12) { var month = 'December' }
                const eventCard = `<div class="eventCard ">  
                        <img src="./pic/food.jpg">
                        <span >This ${day}, ${getDate}, ${month}  At ${hours} </span>
                        <div class="fs-3 fw-bold">${childData.eventName}</div>
                        <span ><b>loction:</b> ${childData.location}</span>    <br>
                        <span ><b>Member:</b> ${childData.numOfPeople}</span>
                        <span class="deletBtn" id="${childKey}"><i class="fa-solid fa-trash"></i></span>
                </div>`
                // console.log("eventCard--->", eventCard);
                eventContainer.innerHTML += eventCard
                setTimeout(() => {
                    const deleteBtn = document.getElementById(childKey)
                    console.log(deleteBtn);
                    deleteBtn.addEventListener('click', deleteFunc)
                }, 1000)
            })
        }
    })
}
function deleteFunc() {
    const eventRef = ref(db, `Events/${auth.currentUser.uid}/${this.id}`)
    // console.log(eventRef);
    remove(eventRef)
}




logout.addEventListener('click', logoutFunc)
function logoutFunc() {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch(error => {
            // An error happened.
        })
}
