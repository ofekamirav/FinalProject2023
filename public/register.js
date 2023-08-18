$(document).ready(async function () {
  $("#registration-form").submit( async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // const formData = new FormData(this);
    // const username = $('#username').val();
    // const password = $('#password').val();
    let postdata={
      username:$('#username').val(),
      password:$('#password').val()
    }

    var resp = {
      "url":`http://localhost:80/register`,
      "method": 'POST',
      "data": { "postdata": postdata }, // Convert the item object to JSON
      // "contentType": "application/json",
  }
  // loadAllItems();
  await $.ajax(resp).done(function(response){
    if(response.message == 'success')
    {
      Swal.fire({
        title: 'Error',
        text:"Fill all data",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    // $.ajax({
    //   url: "/register",
    //   type: "POST",
    //   "data": {"data":postdata},
    //   processData: false,
    //   contentType: false,
    //   success: function (response) {
    //     console.log('successfuly got to AJAX')
    //     if (response.success) {
    //       Swal.fire({
    //         icon: "success",
    //         title: response.message,
    //         confirmButtonText: "OK",
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           window.location.href = "/login";
    //         }
    //       });
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Registration Failed",
    //         text: "Registration failed. Please try again.",
    //         confirmButtonText: "OK",
    //       });
    //     }
    //   },
      
    //   error: function () {
    //     // Show the error message with Swal
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: "An error occurred. Please try again later.",
    //       confirmButtonText: "OK",
    //     });
    //   },
    // });
  });
});
})
