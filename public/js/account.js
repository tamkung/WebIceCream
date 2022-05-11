firebase.auth().onAuthStateChanged(user => {
firebase.database().ref('/user').orderByChild('email').equalTo(user.email).on("value", (snapshot) => {
    var result = snapshot.val();
    var trdata = "";
    for (key in result) {

        rec = result[key];
        // trdata += "<tr>";
        // trdata += "<td>" + rec.name + "</td>";
        // trdata += "<td>" + rec.home + "</td>";
        // trdata += "<td>" + rec.district + "</td>";
        // trdata += "<td>" + rec.amphoe + "</td>";
        // trdata += "<td>" + rec.province + "</td>";
        // trdata += "<td>" + rec.zipcode + "</td>";
        // trdata += "<td>" + rec.tel + "</td>";
        // trdata += "<td>" + rec.email + "</td>";

        // trdata += "<td class='text-center'>";
        // //trdata += "<a class='btn-sm btn-info' href='edit_pro.html?id=" + key + "'>แก้ไข</a>&nbsp;";
        // trdata += "<a class='btn-sm btn-danger' onclick=\"del('" + key + "')\">ลบ</a>";
        // trdata += "</td>";
        // trdata += "</tr>";
    }
    //document.getElementById('tdata').innerHTML = trdata;
   if ( snapshot.val()==null)
   {
    document.getElementById('txtname').innerHTML =  'ไม่ระบุ';
    document.getElementById('txthome').innerHTML =  'ไม่ระบุ';
    document.getElementById('txtdistrict').innerHTML =  'ไม่ระบุ';
    document.getElementById('txtamphoe').innerHTML =  'ไม่ระบุ';
    document.getElementById('txtprovince').innerHTML =  'ไม่ระบุ';
    document.getElementById('txtzipcode').innerHTML =  'ไม่ระบุ';
    document.getElementById('txttel').innerHTML =  'ไม่ระบุ';
    document.getElementById('txtemail').innerHTML =  'ไม่ระบุ';
   }else{
    document.getElementById('txtname').innerHTML =  rec.name;
    document.getElementById('txthome').innerHTML =  rec.home;
    document.getElementById('txtdistrict').innerHTML =  rec.district;
    document.getElementById('txtamphoe').innerHTML =  rec.amphoe;
    document.getElementById('txtprovince').innerHTML =  rec.province;
    document.getElementById('txtzipcode').innerHTML =  rec.zipcode;
    document.getElementById('txttel').innerHTML =  rec.tel;
    document.getElementById('txtemail').innerHTML =  rec.email;
   }
    
    
    
}, function (err) {
    alert(err.message);
});
});
/*
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//db.ref(TABLE + "/" + id).once()
firebase.database("/user").child(id).once('value')
.then((snapshot) =>{
    document.getElementById('id').value = id;
    var result = snapshot.val();
    document.getElementById('txtname').value = result.name;
    document.getElementById('tel').value = result.tel;
})
.catch((err) => {
    alert(err.message);
});
function edit() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var tel = document.getElementById('tel').value;
    var sect;
    var rdSect = document.getElementsByName('sect');
    for(i=0; i<rdSect.length; i++){
        if(rdSect[i].checked) sect = rdSect[i].value;
    }
    db.ref(TABLE).child(id).update({"name": name, "sect": sect, "tel": tel})
    .then(function() {
        alert("Edit OK");
        window.location = "/";
    })
    .catch(function(err) {
        alert(err.message);
    });
}*/