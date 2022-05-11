var val1 = [];
var val2 = [];
var val3 = [];
firebase.auth().onAuthStateChanged(user => {
    firebase.database().ref('/order').orderByChild('email').equalTo(user.email).on("value", (snapshot) => {
        var result = snapshot.val();

        var trdata = "";
        for (key in result) {

            rec = result[key];
            trdata += "<tr>";
            var count = Object.keys(rec.proName).length
            console.log(count);
            // if (rec.price != null) {
            //     trdata += "<td>" + rec.proName + "</td>";
            //     trdata += "<td>" + rec.price + " บาท" + "</td>";
            //     trdata += "<td>" + rec.num + "</td>";
            //     trdata += "<td><img src='" + rec.urlImg + "' style='width: 100px;'></td>";
            // } else {
            //     trdata += "<td colspan='3'>จำนวนสินค้า " + count + " รายการ</td>";
            //     trdata += "<td>ไม่มีรูปภาพ</td>";
            // }
            if (rec.price != null) {
                trdata += "<td style='width: 300px;'>" + rec.proName + "</td>";
                //trdata += "<td>" + rec.price + " บาท" + "</td>";
                trdata += "<td>" + rec.num + "</td>";
                //trdata += "<td><img src='" + rec.urlImg + "' style='width: 100px;'></td>";
            } else {
                val1 = [];
                val2 = [];
                val3 = [];
                //trdata += "<td colspan='2' style='white-space:pre'>";
                for (key2 in rec.proName) {

                    rec2 = rec.proName[key2];

                    val1.push(rec2.proName);
                    val2.push(rec2.price);
                    val3.push(rec2.total);
                    //console.log(rec2.proName)
                    // trdata += rec2.proName;
                    // trdata += rec2.total;
                    // trdata += '\n';

                }
                //trdata += "</td>";
                trdata += "<td style='width: 300px;white-space:pre'>" + val1.join("\n") + "</td>";
                // trdata += "<td>" + val2 + "</td>";
                trdata += "<td style='width: 300px;white-space:pre'>" + val3.join("\n") + "</td>";
                //trdata += "<td>" + rec2.total + "</td>";
                //trdata += "<td>" + rec2.price + "</td>";
                //trdata += "<td colspan='3'><a class='btn-sm btn-primary' onclick=view2('" + val1 + "','" + val2 + "'); >จำนวนสินค้า " + count + " รายการ</a></td>";
                //trdata += "<td>ไม่มีรูปภาพ</td>";
            }
            trdata += "<td>" + rec.sum + " บาท" + "</td>";
            trdata += "<td>" + rec.fname + "</td>";
            trdata += "<td>" + rec.addr + "</td>";
            trdata += "<td>" + rec.tel + "</td>";
            trdata += "<td>" + rec.email + "</td>";
            trdata += "<td><img src='" + rec.url + "' style='width: 100px;'></td>";
            trdata += "<td>";
            trdata += rec.status;
            if (rec.status == 'จัดส่งแล้ว') {
                trdata += "<a class='btn-sm btn-info' onclick=view('" + rec.parcel + "'); >ดู</a>";
            }
            trdata += "</td>";
            //trdata += "<td class='text-center'>";
            //trdata += "<a class='btn-sm btn-info' href='edit_pro.html?id=" + key + "'>แก้ไข</a>&nbsp;";
            //trdata += "<a class='btn-sm btn-danger' onclick=\"del('" + key + "')\">ลบ</a>";
            //trdata += "</td>";
            trdata += "</tr>";
            //if(rec.price==null){}
        }
        document.getElementById('tdata').innerHTML = trdata;
        console.log(rec.proName);

    }, function (err) {
        alert(err.message);
    });
});
function view(val) {
    Swal.fire({

        title: 'เลขพัสดุของคุณ',

        title: '<h2>เลขพัสดุของคุณ</h2>' + '\n' + '</h3>' + val + '</h3>',
    })
}