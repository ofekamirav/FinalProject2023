// Function to validate the form inputs
function validateForm() {
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
    alertAndFocus(firstNameInput, 'Please enter your first name.');
    return false;
  }

  if (firstNameInput.value.trim().length < 2) {
    alertAndFocus(firstNameInput, 'First name should be at least 2 characters long.');
    return false;
  }

  if (lastNameInput.value.trim() === '') {
    alertAndFocus(lastNameInput, 'Please enter your last name.');
    return false;
  }

  if (lastNameInput.value.trim().length < 2) {
    alertAndFocus(lastNameInput, 'Last name should be at least 2 characters long.');
    return false;
  }

  if (emailInput.value.trim() === '') {
    alertAndFocus(emailInput, 'Please enter your email address.');
    return false;
  }

  if (!emailInput.value.includes('@')) {
    alertAndFocus(emailInput, 'Please enter a valid email address.');
    return false;
  }

  if (usernameInput.value.trim() === '') {
    alertAndFocus(usernameInput, 'Please create a username.');
    return false;
  }

  if (dateInput.value.trim() === '') {
    alertAndFocus(dateInput, 'Please enter your birthdate.');
    return false;
  }

  if (phoneInput.value.trim() === '') {
    alertAndFocus(phoneInput, 'Please enter your phone number.');
    return false;
  }

  if (countryInput.value.trim() === '') {
    alertAndFocus(countryInput, 'Please enter your country.');
    return false;
  }

  if (cityInput.value.trim() === '') {
    alertAndFocus(cityInput, 'Please enter your city.');
    return false;
  }

  if (addressInput.value.trim() === '') {
    alertAndFocus(addressInput, 'Please enter your address.');
    return false;
  }

  if (zipInput.value.trim() === '') {
    alertAndFocus(zipInput, 'Please enter your zip code.');
    return false;
  }

  if (passwordInput.value.trim() === '') {
    alertAndFocus(passwordInput, 'Please enter a password.');
    return false;
  }

  if (passwordInput.value.trim().length < 6) {
    alertAndFocus(passwordInput, 'Password should be at least 6 characters long.');
    return false;
  }

  if (confirmInput.value.trim() === '') {
    alertAndFocus(confirmInput, 'Please confirm your password.');
    return false;
  }

  if (passwordInput.value !== confirmInput.value) {
    alertAndFocus(confirmInput, 'Passwords do not match.');
    return false;
  }

  if (!termsCheckbox.checked) {
    alert('Please agree to the Terms and Conditions.');
    return false;
  }

  // All inputs are valid, allow form submission
  return true;
}

// Function to display an alert box, focus the input field, and prevent the default form submission
function alertAndFocus(element, message) {
  alert(message);
  element.focus();
  event.preventDefault();
}

// Attach the form submission event listener
document.querySelector('form').addEventListener('submit', function(event) {
  // Prevent form submission if inputs are not valid
  if (!validateForm()) {
    event.preventDefault();
  }
});


function loadCityData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "cityData.json", true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
      }
  };
  xhr.send(null);
}

function autocompleteCities() {
  var countryInput = document.getElementById('Country');
  var cityInput = document.getElementById('City');
  var citySuggestions = document.getElementById('citySuggestions');

  countryInput.addEventListener('input', function () {
      var selectedCountry = countryInput.value.trim().toLowerCase();
      cityInput.value = '';
      citySuggestions.innerHTML = '';

      if (selectedCountry === '') {
          citySuggestions.innerHTML = '';
          return;
      }

      loadCityData(function (data) {
          var filteredCities = data.filter(function (city) {
              return city.country.toLowerCase() === selectedCountry;
          });

          if (filteredCities.length > 0) {
              filteredCities.forEach(function (city) {
                  var option = document.createElement('option');
                  option.value = city.name;
                  citySuggestions.appendChild(option);
              });
          } else {
              citySuggestions.innerHTML = '';
          }
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  autocompleteCities();
});




