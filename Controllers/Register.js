function handleSubmit(event) {
  event.preventDefault();
  
  // Check form validity
  if (!validateForm()) {
    return;
  }
  
  // Save all form data
  const firstName = document.getElementById('floatingTextInput1').value;
  const lastName = document.getElementById('TextInput2').value;
  const email = document.getElementById('EmailInput').value;
  const username = document.getElementById('userSet').value;
  const birthdate = document.getElementById('DateSet').value;
  const phonenum = document.getElementById('phoneSet').value;
  const address = document.getElementById('addressInput').value;
  const zip = document.getElementById('Zip').value;
  
  //server 
   sendDataToServer({
    firstName,
    lastName,
    email,
    username,
    birthdate,
    phoneNum,
    address,
    zip,
    city,
    country,
  });


  
  // Reset the form
  resetForm();
}

// Validate the form
function validateForm() {
  let isValid = true;

  const firstNameInput = document.getElementById('floatingTextInput1');
  const firstNameValue = firstNameInput.value.trim();
  if (firstNameValue === '') {
    alert('Please enter your first name');
    isValid = false;
  }

  const lastNameInput = document.getElementById('TextInput2');
  const lastNameValue = lastNameInput.value.trim();
  if (lastNameValue === '') {
    alert('Please enter your last name');
    isValid = false;
  }

  const emailInput = document.getElementById('EmailInput');
  const emailValue = emailInput.value.trim();
  if (emailValue === '') {
    alert('Please enter your email address');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    alert('Please enter a valid email address');
    isValid = false;
  }

  const usernameInput = document.getElementById('userSet');
  const usernameValue = usernameInput.value.trim();
  if (usernameValue === '') {
    alert('Please create a username');
    isValid = false;
  }

  const birthdateInput = document.getElementById('DateSet');
  const birthdateValue = birthdateInput.value.trim();
  if (birthdateValue === '') {
    alert('Please enter your birthdate');
    isValid = false;
  }

  const phoneInput = document.getElementById('phoneSet');
  const phoneValue = phoneInput.value.trim();
  if (phoneValue === '') {
    alert('Please enter your phone number');
    isValid = false;
  }

  const addressInput = document.getElementById('addressInput');
  const addressValue = addressInput.value.trim();
  if (addressValue === '') {
    alert('Please enter your address');
    isValid = false;
  }

  const zipInput = document.getElementById('Zip');
  const zipValue = zipInput.value.trim();
  if (zipValue === '') {
    alert('Please enter your zip code');
    isValid = false;
  }

  return isValid;
}

// Reset the form after submission
function resetForm() {
  document.getElementById('registration-form').reset();
}

// Check if the email address is valid
function isValidEmail(email) {
  // Use a regular expression or any other validation method to check the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//function to send the values to server
// Send form data to the server (you need to implement this function)
function sendDataToServer(formData) {
  // Perform additional actions like sending the data to the server or saving it to a database
  // You can use AJAX, Fetch API, or any other method to send the data asynchronously
  // Example using Fetch API:
  fetch('https://example.com/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the server response if needed
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}




// Map the form submission handler
document.getElementById('registration-form').addEventListener('submit', handleSubmit);
