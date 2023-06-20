function initMap() {
  // Your Bing Maps API key
  var apiKey = 'AoNW-VGef1vSDuJEZC2bYlvV5vMZgUAa9kKxDeVC1nj8ZrEo1Ut3pEXEHPAU7x39';

  // Create the search manager
  var searchManager = new Microsoft.Maps.Search.SearchManager(map);

  // Create the autocomplete object
  var autoComplete = new Microsoft.Maps.AutosuggestManager({ map: map });

  // Set the options for the autocomplete object
  autoComplete.setOptions({
      maxResults: 5, // Maximum number of suggestions to return
      countryCode: 'IL', // ISO Alpha-2 country code
      ignoreCase: true 
  });

  // Wire up the event handlers
  Microsoft.Maps.Events.addHandler(autoComplete, 'autosuggestionselected', onAutosuggestionSelected);
  Microsoft.Maps.Events.addHandler(autoComplete, 'autosuggestsionssupdated', onAutosuggestionsUpdated);

  function onAutosuggestionSelected(result) {
      // Handle the selected suggestion
      var selectedSuggestion = result.result;

      // Set the value of the search box to the selected suggestion
      document.getElementById('City').value = selectedSuggestion.displayName;
  }

  function onAutosuggestionsUpdated(result) {
      // Handle the updated suggestions
      var suggestions = result.result.suggestions;

      // Get the container for the city suggestions
      var citySuggestionsContainer = document.getElementById('citySuggestions');

      // Clear any previous suggestions
      citySuggestionsContainer.innerHTML = '';

      // Create and append the new suggestion options
      for (var i = 0; i < suggestions.length; i++) {
          var suggestion = suggestions[i];
          var option = document.createElement('option');
          option.value = suggestion.displayName;
          citySuggestionsContainer.appendChild(option);
      }
  }

  // Add event listener to the city input box
  document.getElementById('City').addEventListener('input', function() {
      var query = this.value;

      // Call the autoComplete.search method to update the suggestions
      autoComplete.search(query);
  });
}



function Submit() {
  const password = document.getElementById('pass').value;
  const checkTerms = document.getElementById('flexSwitchCheckChecked').checked;
  if (password.length < 6) {
    alert('Password must have at least 6 characters');
  }
  if (!checkTerms) {
    alert('Must agree to the terms of Secret Coffee');
  }


  event.preventDefault();
}
