firebase.database().ref('/products').on("value", (snapshot) => {

    var result = snapshot.val();

    var trdata = "";
    for (key in result) {

        rec = result[key];
        // trdata += "<tr>";
        // trdata += "<td>" + rec.proName + "</td>";
        // trdata += "<td>" + rec.detail + "</td>";
        // trdata += "<td>" + rec.price + " บาท" + "</td>";
        // trdata += "<td><img src='" + rec.urlImg + "' style='width: 100px;'></td>";

        // trdata += "<td class='text-center'>";
        // trdata += "<a class='btn-sm btn-info' onclick=addCart('" + rec.proName + "','" + rec.price + "'); >เพิ่มลงในตะกร้า</a>";
        // trdata += "</td>";
        // trdata += "<td class='text-center'>";
        // trdata += "<a class='btn-sm btn-success' href='../order.html?id=" + key + "'>สั่งซื้อเลย</a>";
        // trdata += "</td>";
        // trdata += "</tr>";
        trdata += "<div class='col-sm-3'>";
        trdata += "<div class='panel panel-primary'>";
        trdata += "<div class='panel-heading'>" + rec.proName + "</div>";
        trdata += "<div class='panel-body text-center'>";
        trdata += "<a onclick=view('" + rec.proName + "','" + rec.urlImg + "','" + rec.detail + "')><img src='" + rec.urlImg + "' class='img-responsive img1' alt='Image' /></a>";
        trdata += "<p  style='text-align: center'>";
        trdata += "ราคา " + rec.price + " บาท";
        trdata += "</p>";
        trdata += "</div>";
        trdata += "<div class='panel-footer'>";
        trdata += "<div style='text-align: center'>";
        trdata += "<a class='btn-sm btn-info' onclick=addCart('" + rec.proName + "','" + rec.price + "'); >ใส่ตะกร้า</a> &nbsp;";
        trdata += "<a href='../order.html?id=" + key + "' class='btn-sm btn-success' style='text-align: right;'>";
        trdata += "สั่งซื้อ";
        trdata += "</a>";
        trdata += "</div>";
        trdata += "</div>";
        trdata += "</div>";
        trdata += "</div>";
        
    }
    document.getElementById('tdata').innerHTML = trdata;

}, function (err) {
    alert(err.message);
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
var chk = false;

function view(Vname, Vimg, Vdetail) {
    Swal.fire({
        title: '<h2>' + Vname + '</h2>' + '\n' + '</h3>' + Vdetail + '</h3>',
        text: '',
        imageUrl: Vimg,
        imageWidth: 700,
        imageHeight: 700,
        imageAlt: 'Custom image',
        width: '800px'
    })
}

function addCart(proName1, price1) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref("/cart").child(user.uid).push({ 'proName': proName1, 'price': price1, 'total': 1})
                .then(function () {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เพิ่มลงในตะกร้าสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    // setTimeout(function () {
                    //     window.location = "../myorder.html";
                    // }, 1500);
                })
                .catch(function (err) {
                    alert(err.message);
                });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณาเข้าสู่ระบบ',
                showConfirmButton: false,
                timer: 1500
            })
        }

    });
}
function add_or() {
    firebase.auth().onAuthStateChanged(user => {
        var id = document.getElementById('id').value;
        var proName = document.getElementById('txtProName').value;
        //var type = document.getElementById('type').value;
        var price = document.getElementById('txtprice').value;
        var num = document.getElementById('txtnum').value;
        var sum = document.getElementById('txtsum').value;
        var img = document.getElementById('img').src;
        var fname = document.getElementById('txtfname').value;
        var addr = document.getElementById('txtaddr').value;
        var tel = document.getElementById('txttel').value;
        var email = document.getElementById('txtemail').value;
        var url = document.getElementById('urlImg').value


        if (num == '' || chk == false) {
            alert('err.message');
        } else {
            firebase.database().ref("/order").child(user.uid).push({ "proName": proName, "price": price, "num": num, "sum": sum, "urlImg": img, "fname": fname, "addr": addr, "tel": tel, "email": email, "url": url, "status": "รอยืนยัน" })
                .then(function () {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )

                    setTimeout(function () {
                        window.location = "../myorder.html";
                    }, 1500);
                })
                .catch(function (err) {
                    alert(err.message);
                });
        }

    });
}