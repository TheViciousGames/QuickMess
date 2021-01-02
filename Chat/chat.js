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

const auth = firebase.auth();
const db = firebase.firestore();
const signOutButton = document.getElementById("signOutButton");
const sendMessageButton = document.getElementById("sendMessageButton");

firebase.database().ref("messages").on("child_added", function (snap) {
    var messageList = document.getElementById("messageList");
    var messageElement = document.createElement("li");
    var message =snap.val().message;
    messageElement.setAttribute('class', 'messageElementLeft');
    messageElement.innerHTML = message;
    messageList.appendChild(messageElement);
});

const sendMessage = () => {
    let message = document.getElementById("message").value;
    var usersEmail = firebase.auth().currentUser.email;
    var data;
    db.collection("users").where("emailAdress", "==", usersEmail).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data=doc.data();
            var publicName=data.publicName;
            if (!message == "") {
                firebase.database().ref("messages").push().set
                    ({
                        "message": publicName+":"+message
                    });
            }
            let message1 = document.getElementById("message")
            message1.value = ""
        });
    })
}

const signOutFunction = () => {
    auth.signOut().then(() => {
        window.location.assign('index.html');
    }).catch(error => {
        console.error(error);
    })
}

signOutButton.addEventListener("click",signOutFunction);
sendMessageButton.addEventListener("click",sendMessage);