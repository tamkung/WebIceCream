function logout() {
    Swal.fire({
        title: 'ออกจากระบบ?',
        text: 'คุณต้องการออกจากระบบใช่หรือไม่',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function (result) {
        if (result.isConfirmed) {
            firebase.auth().signOut()
                .then(() => {
                    window.location = "index.html";
                })
                .catch(err => {
                    Swal.fire(err.meaasge)
                });
        }
    });

}