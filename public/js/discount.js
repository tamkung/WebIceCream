firebase.database().ref('/code').on("value", (snapshot) => {

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
        
        trdata += "<div class='col-sm-4'>";
        trdata += "<div class='panel panel-danger'>";
        trdata += "<div class='panel-heading'>" + rec.name + "</div>";
        trdata += "<div class='panel-body'>";
        trdata += "<h1 class='text-center text-success'>โค้ด : "+rec.code +"</h1>";
        trdata += "<p  style='text-align: center'>";
        trdata +=  rec.detail;
        trdata += "</p>";
        trdata += "</div>";
        trdata += "<div class='panel-footer'>";
        trdata += "<div style='text-align: center'>";
        trdata += "<a href='./products.html' class='btn-sm btn-success' style='text-align: right;'>";
        trdata += "ใช้โค้ด";
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