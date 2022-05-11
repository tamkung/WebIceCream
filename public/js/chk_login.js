firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if(user.email!='admin@gmail.com'){
      document.getElementById('body').style.display = "block";
      document.getElementById('img').innerHTML = "<img style='width: 100px' class='img-circle' src='" + user.photoURL + "'>";
      document.getElementById('name').innerHTML = "<label>ชื่อผู้ใช้ : " + user.displayName + "</label>";
      //document.getElementById('img').innerHTML = "<img style='width: 100px' class='img-circle' src='" + user.photoURL + "'>";
      document.getElementById('id').innerHTML = user.uid;
    }else{
      window.location = "admin/admin.html";
    }
    //console.log(user);
    //document.getElementById('log').style.display = "none";
    
    
  } else {
    window.location = "login.html";
    
  }
});
