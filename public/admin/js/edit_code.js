firebase.database().ref('/products').on("value", (snapshot) => {
    var result = snapshot.val();

    var trdata = "";
    for (key in result) {

        rec = result[key];
        trdata += "<tr>";
        trdata += "<td>" + rec.proName + "</td>";
        trdata += "<td>" + rec.detail + "</td>";
        trdata += "<td>" + rec.price + " บาท" + "</td>";
        trdata += "<td><img src='" + rec.urlImg + "' style='width: 100px;'></td>";

        trdata += "<td class='text-center'>";
        trdata += "<a class='btn-sm btn-info' href='edit_pro.html?id=" + key + "'>แก้ไข</a>&nbsp;";
        trdata += "<a class='btn-sm btn-danger' onclick=\"del('" + key + "')\">ลบ</a>";
        trdata += "</td>";
        trdata += "</tr>";
    }
    document.getElementById('tdata').innerHTML = trdata;

}, function (err) {
    alert(err.message);
});

function read() {
    var sect;
    var rdSect = document.getElementsByName('menu');
    for (i = 0; i < rdSect.length; i++) {
        if (rdSect[i].checked) {
            sect = rdSect[i].value;
        }
    }
    firebase.database().ref('/products').orderByChild('type').equalTo(sect).on("value", (snapshot) => {
        var result = snapshot.val();

        var trdata = "";
        for (key in result) {

            rec = result[key];
            trdata += "<tr>";
            trdata += "<td>" + rec.proName + "</td>";
            trdata += "<td>" + rec.detail + "</td>";
            trdata += "<td>" + rec.price + " บาท" + "</td>";
            trdata += "<td><img src='" + rec.urlImg + "' style='width: 100px;'></td>";

            trdata += "<td class='text-center'>";
            trdata += "<a class='btn-sm btn-info' href='edit_pro.html?id=" + key + "'>แก้ไข</a>&nbsp;";
            trdata += "<a class='btn-sm btn-danger' onclick=\"del('" + key + "')\">ลบ</a>";
            trdata += "</td>";
            trdata += "</tr>";
        }
        document.getElementById('tdata').innerHTML = trdata;

    }, function (err) {
        alert(err.message);
    });
}