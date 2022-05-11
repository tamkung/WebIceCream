function upload() {
    var image = document.getElementById('image').files[0];
    var imgName = image.name;
    const ref = firebase.storage().ref("/PATH_TO_FILE/" + imgName);

    var uploadTask = ref.put(image); // Upload File

    uploadTask.on('state_changed', function progress(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = Math.round(progress);
        var total = Math.round(snapshot.totalBytes / 1000);
        document.getElementById('progress').innerHTML = progress + "% of " + total + " KB";
        document.getElementById('progressBar').innerHTML = progress + "%";
        document.getElementById('progressBar').style.width = progress + "%";
    },
        function error(err) {
            alert(err.message);
        },
        function complete() {
            uploadTask.snapshot.ref.getDownloadURL()
                .then(URL => {
                    document.getElementById('urlImg').value = URL;
                    document.getElementById('img').src = URL;
                })
                .catch(function (err) {
                    alert(err.message);
                });
        });
}
function addPro () {
    var proName = document.getElementById('txtProName').value;
    var detail = document.getElementById('detail').value.trim();
    var price = document.getElementById('txtprice').value;
    var urlImg = document.getElementById('urlImg').value;

    if(proName == '' || detail == '' || price == '' || urlImg == ''){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
          })
    }else{
        db.ref("/products").push({"proName": proName, "detail": detail, "price": price, "urlImg": urlImg})
        .then(function() {
            Swal.fire(
                'Good job!',
                'เพิ่มสำเร็จ',
                'success'
            )
            
            setTimeout(function () {
                window.location = "./admin.html";
            }, 1500);
        })
        .catch(function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
              })
        });
    }
    
}