var firebaseConfig = {
    apiKey: "AIzaSyD9glfVOKznsTrKUb0jqTq07vvWhgdkGJY",
    authDomain: "quickmess-258ab.firebaseapp.com",
    databaseURL: "https://quickmess-258ab-default-rtdb.firebaseio.com",
    projectId: "quickmess-258ab",
    storageBucket: "quickmess-258ab.appspot.com",
    messagingSenderId: "99804969659",
    appId: "1:99804969659:web:9f8f94fe760840a893c79e",
    measurementId: "G-2M080W5K5Q"
  };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    
const signUpButton = document.getElementById("registrationButton");
const signOutButton = document.getElementById("signOutButton");
const signInButton = document.getElementById("signInButton");
const auth = firebase.auth();
const db = firebase.firestore();
auth.useDeviceLanguage();

const signUpFunction = () => {

    const registrationEmail = document.getElementById("registrationEmail").value;
    const registrationPassword = document.getElementById("registrationPassword").value;
    const registrationPublicName = document.getElementById("registrationPublicName").value;

    db.collection("users").doc(registrationEmail).set({
        publicName: registrationPublicName,
        emailAdress: registrationEmail,
        password: registrationPassword
    })
        .then(function () {
            console.log("USERNAME SAVED");
        })
        .catch(function (error) {
            console.error("FIRESTORE ERROR", error);
        })

    auth.createUserWithEmailAndPassword(registrationEmail, registrationPassword)
        .then(() => {
            console.log('Signed Up Successfully !');
            sendVerificationEmail();
        })
        .catch(error => {
            console.error(error);
        })
}

const sendVerificationEmail = () => {
    //Built in firebase function responsible for sending the verification email
    auth.currentUser.sendEmailVerification()
        .then(() => {
            console.log('Verification Email Sent Successfully !');
            //redirecting the user to the profile page once everything is done correctly
            window.location.assign('chat.html');
        })
        .catch(error => {
            console.error(error);
        })
}

const signInWithEmailFunction = () => {
    const signInEmail = document.getElementById("signInEmail").value;
    const signInPassword = document.getElementById("signInPassword").value;
    auth.signInWithEmailAndPassword(signInEmail, signInPassword)
        .then(() => {
            window.location.assign('chat.html');
        })
        .catch(_error => {
            alert("WRONG EMAIL OR PASSWORD");
        })

}

auth.onAuthStateChanged(user => {
    console.log(user);
})

signUpButton.addEventListener("click", signUpFunction);
signInButton.addEventListener("click", signInWithEmailFunction)








