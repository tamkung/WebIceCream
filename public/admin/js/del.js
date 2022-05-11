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
            db.ref(PRODUCT).child(id).remove()
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