var val1 = [];
var val2 = [];
var val3 = [];
firebase.database().ref('/order').on("value", (snapshot) => {
    var result = snapshot.val();

    var trdata = "";

    for (key in result) {

        rec = result[key];
        trdata += "<tr>";

        var count = Object.keys(rec.proName).length

        console.log(count);
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
        trdata += "<td><a class='btn-sm btn-info' onclick=view('" + rec.url + "'); >ดู</a></td>";
        trdata += "<td>" + rec.status + "</td>";
        if (rec.status != 'จัดส่งแล้ว') {
            trdata += "<td><a class='btn-sm btn-success' onclick=update('" + key + "'); >ยืนยัน</a></td>";
        } else {
            trdata += "<td>" + rec.parcel + "</td>";
        }

        //trdata += "<td class='text-center'>";
        //trdata += "<a class='btn-sm btn-info' href='edit_pro.html?id=" + key + "'>แก้ไข</a>&nbsp;";
        //trdata += "<a class='btn-sm btn-danger' onclick=\"del('" + key + "')\">ลบ</a>";
        //trdata += "</td>";
        trdata += "</tr>";

    }
    document.getElementById('tdata').innerHTML = trdata;


}, function (err) {
    alert(err.message);
});
function view(val) {
    Swal.fire({

        title: '<h2>หลักฐานโอนเงิน</h2>',
        text: '',
        imageUrl: val,
        imageWidth: 500,
        imageHeight: 500,
        imageAlt: 'Custom image',
        width: '600px'
    })
}

function view2(vname, vtotal) {
    //console.log(vname)
    //val1.forEach(element => console.log(element));

    console.log(val1.join('\n'));
    Swal.fire({
        title: '<h2>รายการสินค้า</h2><br><h4>' + vname.join('') + '\n' + vtotal + '</h4>',
        text: '',
        //imageUrl: val,
        // imageWidth: 500,
        // imageHeight: 500,
        // imageAlt: 'Custom image',
        width: '600px'
    })
}

function update(val) {
    Swal.fire({
        title: 'แจ้งเลขพัสดุ',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        showLoaderOnConfirm: true,
        preConfirm: (parcel) => {
            if (parcel != '') {
                firebase.database().ref('/order').child(val).update({ "status": 'จัดส่งแล้ว', 'parcel': parcel })
                    .then(function () {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(function (err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.message,
                        })
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'กรุณาป้อนข้อมูล',
                })
            }
        },
        //allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

    })

}

