// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAbpnqu6epGr5wYQxc0VCg5VRn7VIbVGtY",
    authDomain: "critr-345718.firebaseapp.com",
    projectId: "critr-345718",
    storageBucket: "critr-345718.appspot.com",
    messagingSenderId: "1071848271714",
    appId: "1:1071848271714:web:f2c41e9afbb55ba4ecc63b",
    measurementId: "G-1LNJKKWHZP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth =  firebase.auth();

// Sign Up Function
function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);

    promise.catch(e=>alert(e.message));
    alert("SignUp Successful");
}

// Sign In Function
function  signIn() {
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));     
}


// Sign Out Function
function signOut() {
    auth.signOut();
    alert("SignOut Successfully from System");
}

//active user to homepage
firebase.auth().onAuthStateChanged((user)=> {
    if(user) {
        var email = user.email;
        alert("Active user " + email);
        window.location.replace("home.html");

    } else {
        alert("No active user found!")
    }
})