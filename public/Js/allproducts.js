$(document).ready(function() {
  $("#search-input").on("input", function() {
    var searchValue = $(this).val().toLowerCase();
    var autocompleteDropdown = $("#autocomplete-dropdown");
    autocompleteDropdown.empty();

    // Check if the search value is empty
    if (searchValue.length === 0) {
      // Hide the dropdown if the search input is empty
      autocompleteDropdown.hide();
      return; // Return early to skip the AJAX request
    }

    $.ajax({
      url: "/shop/search",
      method: "POST",
      data: { searchValue: searchValue },
      success: function(response) {
        response.forEach(function(item) {
          var dropdownItem = $("<a>", {
            class: "dropdown-item",
            href: "/shop/capsule?name=" + encodeURIComponent(item["_id"]),
            text: item["_id"],
            
            
          });

          autocompleteDropdown.append(dropdownItem);
        });

        // Show the dropdown if there are results
        if (response.length > 0) {
          autocompleteDropdown.show();
        } else {
          autocompleteDropdown.hide();
        }
      },
      error: function(error) {
        console.error("Failed to fetch autocomplete data:", error);
      }
    });
  });
});
