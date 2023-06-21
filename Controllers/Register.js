// המתודה הראשית שמופעלת כאשר נשלח הטופס
function handleSubmit(event) {
  event.preventDefault();
  
  // בדיקות תקינות
  if (!validateForm()) {
    return;
  }
  
  // איסוף הנתונים מהטופס
  const firstName = document.getElementById('floatingTextInput1').value;
  const lastName = document.getElementById('TextInput2').value;
  const email = document.getElementById('EmailInput').value;
  // המשך לאיסוף שאר הנתונים...
  
  // ביצוע פעולות נוספות כמו שליחת הנתונים לשרת
  
  // איפוס הטופס
  resetForm();
}

// בדיקת תקינות הטופס
function validateForm() {
  let isValid = true;

  // בדיקות תקינות עבור כל שדה
  
  // בדיקה לשם פרטי
  const firstNameInput = document.getElementById('floatingTextInput1');
  const firstNameValue = firstNameInput.value.trim();
  if (firstNameValue === '') {
    displayError(firstNameInput, 'Please enter your first name');
    isValid = false;
  } else {
    removeError(firstNameInput);
  }
  
  // בדיקות תקינות נוספות כמו בשדה הזה...
  
  return isValid;
}

// הצגת הודעת שגיאה לצד השדה המתאים
function displayError(inputElement, errorMessage) {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  errorElement.innerText = errorMessage;
  
  const inputContainer = inputElement.parentElement;
  inputContainer.appendChild(errorElement);
  
  inputElement.classList.add('error');
}

// הסרת הודעת השגיאה והסימון הוויזואלי מהשדה
function removeError(inputElement) {
  const inputContainer = inputElement.parentElement;
  const errorElement = inputContainer.querySelector('.error-message');
  if (errorElement) {
    inputContainer.removeChild(errorElement);
  }
  
  inputElement.classList.remove('error');
}

// איפוס הטופס לאחר הגשתו
function resetForm() {
  document.getElementById('registration-form').reset();
}

// מיפוי פונקציית השליחה על סאבמיט הטופס
document.getElementById('registration-form').addEventListener('submit', handleSubmit);
