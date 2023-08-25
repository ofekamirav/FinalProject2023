$(document).on('submit','#registration-form',function(e){
    e.preventDefault();
    
    // Client-side validation logic for registration form
    const email = $("#email").val();
    const password = $("#password").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const country = $("#country").val();
    const address = $("#address").val();
    const postalcode = $("#postalcode").val();

    if (email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }
    

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.trim() === "" || password.length < 6) {
      alert("Please enter a valid password with at least 6 characters.");
      return;
    }
    // Validation for first name
    if (firstName.trim() === "") {
        alert("Please enter your first name.");
        return;
    }

    // Validation for last name
    if (lastName.trim() === "") {
        alert("Please enter your last name.");
        return;
    }

    // Validation for country
    if (country.trim() === "") {
        alert("Please enter your country.");
        return;
    }

    // Validation for address
    if (address.trim() === "") {
        alert("Please enter your address.");
        return;
    }

    // Validation for postal code (only numbers)
    if (!/^\d+$/.test(postalcode)) {
        alert("Postal code should contain only numbers.");
        return;
    }
    // Continue with form submission if validations pass
    $.ajax({
      method: "POST",
      url: "/register",
      data: $(this).serialize(),
      success: function (response) {
        if (response.success) {
          alert('User Created successfully');
        } else {
          alert('Error creating user');
        }
      },
      error: function (err) {
        alert('An error occurred while creating the user');
      }
    });
});

// Define isValidEmail function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
  