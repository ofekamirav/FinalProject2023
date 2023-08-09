// Function to validate the form inputs
async function validateForm()  { async
  // Get form input elements
  var firstNameInput = document.getElementById('firstName');
  var lastNameInput = document.getElementById('LastName');
  var emailInput = document.getElementById('EmailInput');
  var usernameInput = document.getElementById('userSet');
  var dateInput = document.getElementById('DateSet');
  var phoneInput = document.getElementById('phoneSet');
  var countryInput = document.getElementById('Country');
  var cityInput = document.getElementById('City');
  var addressInput = document.getElementById('addressInput');
  var zipInput = document.getElementById('Zip');
  var passwordInput = document.getElementById('pass');
  var confirmInput = document.getElementById('confirm');
  var termsCheckbox = document.getElementById('flexSwitchCheckChecked');

  // Validate each input field
  if (firstNameInput.value.trim() === '') {
    firstNameInput.addEventListener('keydown', preventFormSubmit);
    return false;
  }

  if (firstNameInput.value.trim().length < 2) {
    showError(firstNameInput, 'First name should be at least 2 characters long.');
    return false;
  }

  if (lastNameInput.value.trim() === '') {
    showError(lastNameInput, 'Please enter your last name.');
    return false;
  }

  if (lastNameInput.value.trim().length < 2) {
    showError(lastNameInput, 'Last name should be at least 2 characters long.');
    return false;
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Please enter your email address.');
    return false;
  }

  if (!emailInput.value.includes('@')) {
    showError(emailInput, 'Please enter a valid email address.');
    return false;
  }

  if (usernameInput.value.trim() === '') {
    showError(usernameInput, 'Please create a username.');
    return false;
  }
   // Check if the username already exists in the database
   const existingUser = await ClientDB.findOne({ username: usernameInput.value.trim() });
   if (existingUser) {
     showError(usernameInput, 'Username already exists. Please choose a different username.');
     return false;
   }

  if (dateInput.value.trim() === '') {
    showError(dateInput, 'Please enter your birthdate.');
    return false;
  }

  if (phoneInput.value.trim() === '') {
    showError(phoneInput, 'Please enter your phone number.');
    return false;
  }

  if (countryInput.value.trim() === '') {
    showError(countryInput, 'Please enter your country.');
    return false;
  }

  if (cityInput.value.trim() === '') {
    showError(cityInput, 'Please enter your city.');
    return false;
  }

  if (addressInput.value.trim() === '') {
    showError(addressInput, 'Please enter your address.');
    return false;
  }

  if (zipInput.value.trim() === '') {
    showError(zipInput, 'Please enter your zip code.');
    return false;
  }

  if (passwordInput.value.trim() === '') {
    showError(passwordInput, 'Please enter a password.');
    return false;
  }

  if (passwordInput.value.trim().length < 6) {
    showError(passwordInput, 'Password should be at least 6 characters long.');
    return false;
  }

  if (confirmInput.value.trim() === '') {
    showError(confirmInput, 'Please confirm your password.');
    return false;
  }

  if (passwordInput.value !== confirmInput.value) {
    showError(confirmInput, 'Passwords do not match.');
    return false;
  }

  if (!termsCheckbox.checked) {
    alert('Please agree to the Terms and Conditions.');
    return false;
  }

  // All inputs are valid


  const newClient = new ClientDB({
    FirstName: firstNameInput.value.trim(),
    LastName: lastNameInput.value.trim(),
    Email: emailInput.value.trim(),
    username: usernameInput.value.trim(),
    Birthdate: dateInput.value.trim(),
    Phone: phoneInput.value.trim(),
    Country: countryInput.value.trim(),
    City: cityInput.value.trim(),
    Address: addressInput.value.trim(),
    ZipCode: zipInput.value.trim(),
    Password: passwordInput.value.trim(),
  });

  await newClient.save(); // Save the new document to the database
  
  return true;
}

// Function to display the error message on the input field
    const showError = (input, message) => {
      const formField = input.parentElement;
      formField.classList.remove('success');
      formField.classList.add('error');
      const error = formField.querySelector('small');
      error.textContent = message;
    };

    // Function to display the success state of the input field
    const showSuccess = (input) => {
      const formField = input.parentElement;
      formField.classList.remove('error');
      formField.classList.add('success');
      const error = formField.querySelector('small');
      error.textContent = '';
    };



// Attach the keydown event listener to the form
document.querySelector('form').addEventListener('keydown', function(event) {
  // Check if the Enter key was pressed
  if (event.key === 13) {
    event.preventDefault();
  }
});

// Attach the form submission event listener
document.querySelector('form').addEventListener('submit', function(event) {
  // Prevent form submission if inputs are not valid
  if (!validateForm()) {
    event.preventDefault();
  }
});
