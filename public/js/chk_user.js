firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (user.email != 'admin@gmail.com') {
      //console.log(user);
      //document.getElementById('log').style.display = "none";
      document.getElementById('myOrder').innerHTML = 'รายละเอียดการสั่งซื้อ';
      document.getElementById('myOrder').href = './myorder.html';

      document.getElementById('cart').innerHTML = 'ตะกร้าสินค้า';
      document.getElementById('cart').href = './cart.html';

      document.getElementById('txtLogin').innerHTML = 'บัญชีของฉัน';
      //document.getElementById('txtemail').innerHTML = user.email;
    } else {
      window.location = "../admin/admin.html";
    }


  } else {
    // window.location = "login.html";

  }
});
