function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = "th";
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      

      window.location = "account.html";
    })
    .catch((err) => {
      alert(err.message);
    });
}

