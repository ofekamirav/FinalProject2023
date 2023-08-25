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
            href: "/shop/capsule?name=" + encodeURIComponent(item["Name"]),
            text: item["Name"],
            
            
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


//Add Product to cart Function
$(document).on('submit','#addToCart',function(e){
  e.preventDefault();
 
  const productId = $(this).find('button[name="action"]').val().split(':')[1];


  $.ajax({
  method:"POST",
  url: "cart/addToCart",
  data:{ productId: productId },
  success: function(response) {
    if (response.success) {
      alert('Added to cart');
    } else {
      alert('Error in adding to cart');
    }
  },
  error: function(err) {
    alert('An error occurred while attempting to add to cart');
  }
});
});

//filters
$("input[type='checkbox']").change(function () {
  
  const selectedValue = $(this).val();

  if ($(this).is(":checked")) {
      
    getFilteredProducts(selectedValue);
  } 
});


function getFilteredProducts(selectedValue){

  $.ajax({
      type: "POST",
      url: "/shop", 
      data: { filters: selectedFilters }, 
      success: function (data) {
          
          $("#searchResultsContainer").html(data);
      },
      error: function (error) {
          console.error("Failed to fetch filtered products:", error);
      }
  });
}
