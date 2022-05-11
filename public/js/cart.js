firebase.auth().onAuthStateChanged(user => {
    firebase.database().ref('/cart').child(user.uid).on("value", (snapshot) => {

        var result = snapshot.val();

        var trdata = "";
        for (key in result) {

            rec = result[key];
            trdata += "<tr>";
            trdata += "<td>" + rec.proName + "</td>";
            trdata += "<td>" + rec.price + " บาท" + "</td>";
            trdata += "<td class='text-center'>";
            trdata += "<a class='btn-sm btn-info' onclick=\"sub('" + user.uid + "','" + key + "','" + rec.total + "')\">-</a>";
            trdata += "&nbsp;" + rec.total + "&nbsp;";
            trdata += "<a class='btn-sm btn-info' onclick=\"add('" + user.uid + "','" + key + "','" + rec.total + "')\">+</a>";
            trdata += "</td>";
            trdata += "<td>" + rec.price * rec.total + " บาท" + "</td>";
            trdata += "<td class='text-center'><a class='btn-sm btn-danger' onclick=\"del('" + user.uid + "','" + key + "')\">ลบ</a></td>";

            
        }
        document.getElementById('tdata').innerHTML = trdata;
        
        
        var HABERES = 0;
        for (var i in result) {
            HABERES += parseInt(result[i].total*result[i].price);
            //alert(HABERES);
        }
        console.log(HABERES);
        document.getElementById('sum').innerHTML = HABERES;
        if(HABERES!=0){
            document.getElementById('btn').innerHTML = "<a href='./orderCart.html?id=" + user.uid + "' class='btn btn-info'>สั่งซื้อ</a>";
        }
        
    }, function (err) {
        alert(err.message);
    });

});


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
var chk = false;

function del(id, key) {
    Swal.fire({
        title: 'ลบข้อมูล?',
        text: 'คุณต้องการลบข้อมูลใช่หรือไม่',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function (result) {
        if (result.isConfirmed) {
            db.ref("/cart").child(id).child(key).remove()
                .then(() => {
                    Swal.fire(
                        'ลบสำเร็จ',
                        '',
                        'success'
                    )
                })
                .catch(err => {
                    Swal.fire(err.meaasge)
                });
        }
    });
}
function add(id, key, total) {

//console.log(sum2)
    firebase.database().ref('/cart').child(id).child(key).update({ "total": Number(total) + 1})
        .then(function () {

        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
            })
        });

}
function sub(id, key, total) {
    if (total < 2) {
        total = 2;
    }

    //console.log(sum2)
    firebase.database().ref('/cart').child(id).child(key).update({ "total": Number(total) - 1})
        .then(function () {

        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
            })
        });

}

