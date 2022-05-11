const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//db.ref(TABLE + "/" + id).once()
firebase.database().ref("/products").child(id).once('value')
.then((snapshot) =>{
    document.getElementById('id').value = id;
    var result = snapshot.val();
    document.getElementById('txtProName').value = result.proName;
    document.getElementById('detail').value = result.detail;
    document.getElementById('txtprice').value = result.price;
    document.getElementById('img').src = result.urlImg;
    document.getElementById('urlImg').value = result.urlImg;
})
.catch((err) => {
    alert(err.message);
});
function edit() {
    var id = document.getElementById('id').value;
    var proName = document.getElementById('txtProName').value;
    var detail = document.getElementById('detail').value.trim();
    var price = document.getElementById('txtprice').value;
    var img = document.getElementById('urlImg').value;
    
    db.ref(PRODUCT).child(id).update({"proName": proName, "detail": detail, "price": price, "urlImg": img})
    .then(function() {
        Swal.fire(
            'Good job!',
            'แก้ไขสำเร็จ',
            'success'
        )
        
        setTimeout(function () {
            window.location = "all_pro.html";
        }, 1500);
        
    })
    .catch(function(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.meaasge,
          })
    });
}