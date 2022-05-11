firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        if(user.email=='admin@gmail.com'){
// if(!user.emailVerified) {
        //     alert("Please verify your email address first!!!");
        //     window.location = "./login_admin.html";
        // }
        document.getElementById('body').className = "visible";
        document.getElementById('pinfo').innerHTML = "USER: " + user.email;
        }else{
            window.location = "../index.html";
        }
        
        
    }else{
        window.location = "./login_admin.html";
    }
    
});