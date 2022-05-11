// function SignUp() {
//     const email = document.getElementById('txtEmail').value;
//     const password = document.getElementById('txtPass').value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(() => {
//             var user = firebase.auth().currentUser;
//             user.sendEmailVerification()
//                 .then(() => {
//                     alert("A verification email has been sent to you already!");
//                 })
//                 .catch(err => {
//                     alert(err.message);
//                 });
//         })
//         .catch((err) => {
//             alert(err.message);
//         });
// }
//-------------------------------------------------------------------------
function SignIn() {
    const email = document.getElementById('txtEmail').value;
    const password = document.getElementById('txtPass').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            Swal.fire(
                'Good job!',
                'เข้าสู่ระบบสำเร็จ',
                'success'
            )
            
            setTimeout(function () {
                window.location = "./admin.html";
            }, 1500);
            
            //alert("OK");
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
              })
        });
}
//-----------------------------------------------------------------
function SignOut() {
    firebase.auth().signOut()
        .then(() => {
            window.location = "./login_admin.html";
        })
        .catch(err => {
            alert(err.message);
        });
}
//------------------------------------------------------------------
