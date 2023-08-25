$(document).ready(function () {
    $("#login-form").submit(function (e) {
        e.preventDefault();

        // Get the values of the username (email) and password fields
        const username = $("#username").val();
        const password = $("#password").val();

        // Validate that both fields are not empty
        if (!username.trim() || !password.trim()) {
            alert("Please enter both email and password.");
            return;
        }

        // Validate the email format
        if (!isValidEmail(username)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Perform an Ajax request to the server to handle the login
        $.ajax({
            type: "POST",
            url: "/login",
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                if (response.success) {
                    // Redirect to the desired page upon successful login
                    window.location.href = "/";
                } else {
                    // Handle unsuccessful login (e.g., display an error message)
                    alert("Invalid email or password. Please try again.");
                }
            },
            error: function (err) {
                // Handle Ajax request errors
                console.error("An error occurred during the login request.");
            }
        });
    });
});

// Define isValidEmail function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
