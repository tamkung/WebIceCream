const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
var chk = false;

//db.ref(TABLE + "/" + id).once()
var HABERES = 0;
var count = 0;
var test = [];
firebase.auth().onAuthStateChanged(user => {
    firebase.database().ref('/cart').child(user.uid).on("value", (snapshot) => {

        var result = snapshot.val();
        test = snapshot.val();
        var trdata = "";

        for (key in result) {

            rec = result[key];

            // var count = Object.keys(result).length
            // console.log(count);

            trdata += "<tr>";
            trdata += "<td>" + rec.proName + "</td>";
            trdata += "<td>" + rec.price + " บาท" + "</td>";
            trdata += "<td class='text-center'>";
            // trdata += "<a class='btn-sm btn-info' onclick=\"sub('" + user.uid + "','" + key + "','" + rec.total + "')\">-</a>";
            trdata += "&nbsp;" + rec.total + "&nbsp;";
            //trdata += "<a class='btn-sm btn-info' onclick=\"add('" + user.uid + "','" + key + "','" + rec.total + "')\">+</a>";
            trdata += "</td>";
            trdata += "<td>" + rec.price * rec.total + " บาท" + "</td>";
            //trdata += "<td class='text-center'><a class='btn-sm btn-danger' onclick=\"('" + user.uid + "','" + key + "')\">ลบ</a></td>";


        }

        document.getElementById('tdata').innerHTML = trdata;

        for (var i in result) {
            HABERES += parseInt(result[i].total * result[i].price);
            //alert(HABERES);
            //var count = Object.keys(result[i].proName).length
            count += parseInt(result[i].total);
        }


        console.log(HABERES);
        document.getElementById('sum').innerHTML = HABERES + ' บาท';
        console.log(count);
        if (count >= 1 && count <= 5) {
            document.getElementById('shipping').innerHTML = 300 + ' บาท';
            document.getElementById('txtsum2').value = HABERES + 300 + ' บาท';
        } else if (count > 5 && count <= 10) {
            document.getElementById('shipping').innerHTML = 500 + ' บาท';
            document.getElementById('txtsum2').value = HABERES + 500 + ' บาท';
        } else if (count > 10) {
            document.getElementById('shipping').innerHTML = 700 + ' บาท';
            document.getElementById('txtsum2').value = HABERES + 700 + ' บาท';
        }
        else {
            document.getElementById('shipping').innerHTML = count;
            document.getElementById('txtsum2').value = HABERES + ' บาท';
        }



    }, function (err) {
        alert(err.message);
    });

});

// firebase.database().ref("/products").child(id).once('value')
//     .then((snapshot) => {
//         document.getElementById('id').value = id;
//         var result = snapshot.val();
//         document.getElementById('txtProName').value = result.proName;
//         document.getElementById('type').value = result.type;
//         document.getElementById('txtprice').value = result.price;
//         document.getElementById('img').src = result.urlImg;
//         document.getElementById('urlImg').value = result.urlImg;
//     })
//     .catch((err) => {
//         alert(err.message);
//     });

firebase.auth().onAuthStateChanged(user => {
    firebase.database().ref("/user").child(user.uid).once('value')
        .then((snapshot) => {
            //document.getElementById('id').value = id;

            var result = snapshot.val();
            document.getElementById('txtfname').value = result.name;
            document.getElementById('txtaddr').value = result.home + " ตำบล:" + result.district + " อำเภอ:" + result.amphoe + " จังหวัด:" + result.province + " " + result.zipcode;
            document.getElementById('txttel').value = result.tel;
            document.getElementById('txtemail').value = result.email;
            //alert(result.name);
        })
        .catch((err) => {
            alert(err.message);
        });
});
var sum;

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
                    document.getElementById('imgor').src = URL;
                    chk = true;
                })
                .catch(function (err) {
                    alert(err.message);
                });
        });
}
function add_or() {
    firebase.auth().onAuthStateChanged(user => {
        var id = document.getElementById('id').value;
        //var proName = document.getElementById('txtProName').value;
        //var type = document.getElementById('type').value;
        //var price = document.getElementById('txtprice').value;
        //var num = document.getElementById('txtnum').value;
        //var sum = document.getElementById('txtsum').value;
        //var img = document.getElementById('img').src;
        var sum2 = document.getElementById('txtsum2').value;

        var fname = document.getElementById('txtfname').value;
        var addr = document.getElementById('txtaddr').value;
        var tel = document.getElementById('txttel').value;
        var email = document.getElementById('txtemail').value;
        var url = document.getElementById('urlImg').value



        if (chk == false) {
            alert('err.message');
        } else {
            firebase.database().ref("/order").push({ "proName": test, "sum": HABERES, "urlImg": url, "fname": fname, "addr": addr, "tel": tel, "email": email, "url": url, "status": "รอยืนยัน" })
                .then(function () {
                    db.ref("/cart").child(user.uid).remove()
                        .then(() => {
                            Swal.fire(
                                'Good job!',
                                'You clicked the button!',
                                'success'
                            )

                            setTimeout(function () {
                                window.location = "../myorder.html";
                            }, 1500);
                        })
                        .catch(err => {
                            Swal.fire(err.meaasge)
                        });

                })
                .catch(function (err) {
                    alert(err.message);
                });
        }

    });
}

function discount() {
    var dis = document.getElementById('txtdis').value;
    //var dis2;
    if (dis != '') {
        firebase.database().ref('/code').orderByChild('code').equalTo(dis).on("value", (snapshot) => {

            var result = snapshot.val();
            for (key in result) {
                rec = result[key];
            }

            if (dis == rec.code) {
                if (HABERES >= rec.total) {
                    console.log(rec.discount);
                    console.log(HABERES - (HABERES * (rec.discount / 100)));
                    document.getElementById('txtsum2').value = parseInt(HABERES - (HABERES * (rec.discount / 100))) + ' บาท';
                    document.getElementById('codedetail').innerHTML = rec.detail;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ขั้นต่ำน้อยกว่าที่กำหนด',
                    })
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'โค้ดส่วนลดไม่ถูกต้อง',
                })
            }


            // document.getElementById('ttt').innerHTML = 'ลด '+rec.discount+' %'

        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ไม่มีโค้ดส่วนลด',
        })
    }

}