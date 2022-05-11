
function addCode() {
    var txtName = document.getElementById('txtName').value;
    var txtDetail = document.getElementById('txtDetail').value.trim();
    var txtCode = document.getElementById('txtCode').value;
    var txtDis = document.getElementById('txtDis').value;
    var txtTotal = document.getElementById('txtTotal').value;

    if (txtName == '' || txtDetail == '' || txtCode == '' || txtDis == '' || txtTotal == '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        })
    } else {
        db.ref('/code').push({ "name": txtName, "detail": txtDetail, "code": txtCode, "discount": txtDis, "total": txtTotal })
            .then(function () {
                Swal.fire(
                    'Good job!',
                    'เพิ่มสำเร็จ',
                    'success'
                )

                setTimeout(function () {
                    window.location = "./admin.html";
                }, 1500);
            })
            .catch(function (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
            });
    }

}

firebase.database().ref('/code').on("value", (snapshot) => {
    var result = snapshot.val();

    var trdata = "";
    for (key in result) {

        rec = result[key];
        trdata += "<tr>";
        trdata += "<td>" + rec.name + "</td>";
        trdata += "<td>" + rec.detail + "</td>";
        trdata += "<td>" + rec.code + " บาท" + "</td>";
        trdata += "<td>" + rec.discount + " %" + "</td>";
        trdata += "<td>" + rec.total + "</td>";
        trdata += "<td class='text-center'>";
        //trdata += "<a class='btn-sm btn-info' href='edit_pro.html?id=" + key + "'>แก้ไข</a>&nbsp;";
        trdata += "<a class='btn-sm btn-danger' onclick=\"del('" + key + "')\">ลบ</a>";
        trdata += "</td>";
        trdata += "</tr>";
    }
    document.getElementById('tdata').innerHTML = trdata;

}, function (err) {
    alert(err.message);
});

function del(id) {
    Swal.fire({
        title: 'ต้องการลบ?',
        text: "คุณต้องการลบใช่หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่ใช่'
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.database().ref('/code').child(id).remove()
                .then(() => {
                    Swal.fire(
                        'Deleted!',
                        'ลบสำเร็จ',
                        'success'
                    )
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.meaasge,
                    })
                });

        }
    })
    // var bConfirm = confirm("Do you really want delete this record?");
    // if(bConfirm){
    //     db.ref(PRODUCT).child(id).remove()
    //     .then(() => {
    //         alert("Delete OK");
    //     })
    //     .catch(err => {
    //         alert(err.meaasge);
    //     });
    // }
}