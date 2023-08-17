// // Existing code

// document.getElementById("registration-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the default form submission
  
//     const formData = new FormData(document.getElementById("registration-form"));
  
//     fetch("/register", {
//       method: "POST",
//       body: formData,
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           Swal.fire({
//             icon: "success",
//             title: "Successfully Created Your Account",
//             confirmButtonText: "OK",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               window.location.href = "/login";
//             }
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Registration Failed",
//             text: data.message,
//             confirmButtonText: "OK",
//           });
//         }
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Unexpected Error",
//           text: "An unexpected error occurred. Please try again later.",
//           confirmButtonText: "OK",
//         });
//       });
//   });
  
//   // Existing code
  