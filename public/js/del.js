function del(id) {
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
            db.ref("/user").child(id).remove()
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
    // var bConfirm = confirm("asdasdhis record?");
    // if (bConfirm) {
    //     db.ref("/user").child(id).remove()
    //         .then(() => {
    //             alert("Deasdaslete OK");
    //         })
    //         .catch(err => {
    //             alert(err.meaasge);
    //         });
    // }
}