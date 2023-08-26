

// Loading Both tables at page load using DataTable library
$(document).ready(function() {
  $('#users-table').DataTable({
    ajax: {
      url: '/admin', // Same URL as the page rendering
      dataSrc: "users"
      
    },
    columns: [
      { data: 'email' },
      { data: 'firstName' },
      { data: 'lastName' },
      {data:'country'},
      {data:'dateCreated'},
      {
        data: null,
        render: function(data, type, row) {
          return '<button class="btn btn-danger delete-user" data-id="' + row._id + '">Delete</button>' +
          '<button class="btn btn-primary update-user"  style="margin-left: 10px;" data-id="' + row._id + '">Update</button>';

        }
      }
      // data-bs-toggle="modal" data-bs-target="#updateUserModal"
      
      
    ],

    createdRow: function(row, data, dataIndex) {
      // Check the permission value in your data
      if (data.permission === 1) {
        // Hide the row if permission value is 1
        $(row).addClass('d-none');
      }
    },
    lengthMenu: [[-1, 5, 10, 20,], ["All", 5, 10, 20,]], 
    
  });

  

  $('#products-table').DataTable({
    ajax: {
      url: '/admin', // Same URL as the page rendering
      dataSrc: "products"
      
    },
    columns: [
      { data: 'Name' },
      { data: 'origin' },
      { data: 'flavor' },
      {data:'price'},
      {
        data: null,
        render: function(data, type, row) {
          return '<button class="btn btn-danger delete-product" data-id="' + row._id + '">Delete</button>' +
          '<button class="btn btn-primary update-product"  style="margin-left: 10px;" data-id="' + row._id + '">Update</button>';
        }
      }
      
      
      
    ],
    
    lengthMenu: [[-1, 5, 10, 20,], ["All", 5, 10, 20,]], 
    
  });

});



// Define isValidEmail function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Creating a new User
$(document).on('submit','#add-user-form',function(e){
  e.preventDefault();
 
// Client-side validation logic for registration form
// const email = $("#email").val();
// const password = $("#password").val();
// const firstName = $("#firstName").val();
// const lastName = $("#lastName").val();
// const country = $("#country").val();
// const address = $("#address").val();
// const postalcode = $("#postalcode").val();

// if (email.trim() === "") {
//   alert("Please enter your email address.");
//   return;
// }

// if (!isValidEmail(email)) {
//   alert("Please enter a valid email address.");
//   return;
// }

// if (password.trim() === "" || password.length < 6) {
//   alert("Please enter a valid password with at least 6 characters.");
//   return;
// }

// if (firstName.trim() === "") {
//     alert("Please enter your first name.");
//     return;
// }


// if (lastName.trim() === "") {
//     alert("Please enter your last name.");
//     return;
// }


// if (country.trim() === "") {
//     alert("Please enter your country.");
//     return;
// }


// if (address.trim() === "") {
//     alert("Please enter your address.");
//     return;
// }


// if (!/^\d+$/.test(postalcode)) {
//     alert("Postal code should contain only numbers.");
//     return;
// }
  $.ajax({
  method:"POST",
  url: "admin/adduser",
  data:$(this).serialize(),
  success: function(response) {
    if (response.success) {
      alert('User Created successfully');
      $('#users-table').DataTable().ajax.reload();
    } else {
      alert('Error creating user');
    }
  },
  error: function(err) {
    alert('An error occurred while creating the user');
  }
});
});



//Creating a new Capsule
$(document).on('submit', '#add-product-form', function (e) {
  e.preventDefault();

  // Validation check
  if (!validateForm()) {
      // Validation failed, do not proceed with the AJAX request
      return;
  }

  $.ajax({
      method: "POST",
      url: "admin/addProduct",
      data: $(this).serialize(),
      success: function (response) {
          if (response.success) {
              alert('Capsule Created successfully');
              $('#products-table').DataTable().ajax.reload();
          } else {
              alert('Error creating Capsule');
          }
      },
      error: function (err) {
          alert('An error occurred while creating the Capsule');
      }
  });
});

// Validation function
function validateForm() {
  let isValid = true;

  // Iterate through each input field in the form
  $('#add-product-form').find('input').each(function () {
      const input = $(this);
      const value = input.val();

      // Check if the input is empty
      if (value.trim() === '') {
          isValid = false;
          // Add error styling (you can customize this part)
          input.addClass('is-invalid');
      } else {
          // Remove error styling
          input.removeClass('is-invalid');
      }

      // Check if the price field contains only numbers with optional decimal point
      if (input.attr('name') === 'price' && !/^\d+(\.\d{2})?$/.test(value)) {
          isValid = false;
          input.addClass('is-invalid');
      }

      // Check if the intensity field contains only numbers
      if (input.attr('name') === 'intensity' && !/^\d+$/.test(value)) {
          isValid = false;
          input.addClass('is-invalid');
      }
  });

  return isValid;
}



//Delete User Function
$(document).on('click', '.delete-user', function() {
  var userId = $(this).data('id'); // Getting the user ID from the data attribute
  var row = $(this).closest('tr'); // Getting the row containing the button

  $.ajax({
    
    url: 'admin/deleteUser/' + userId, // Assuming you have a route setup to handle the deletion
    method: 'DELETE',
    success: function(response) {
      if (response.success) {
        $('#users-table').DataTable().row(row).remove().draw(); // Removing the row from the table
        alert('User deleted successfully');
      } else {
        alert('Error deleting user');
      }
    },
    error: function(err) {
      alert('An error occurred while deleting the user');
    }
  });
});



//Delete Product Function
$(document).on('click', '.delete-product', function() {
  var productId = $(this).data('id'); // Getting the user ID from the data attribute
  var row = $(this).closest('tr'); // Getting the row containing the button

  $.ajax({
    
    url: 'admin/deleteProduct/' + productId, // Assuming you have a route setup to handle the deletion
    method: 'DELETE',
    success: function(response) {
      if (response.success) {
        $('#products-table').DataTable().row(row).remove().draw(); // Removing the row from the table
        alert('Product deleted successfully');
      } else {
        alert('Error deleting Product');
      }
    },
    error: function(err) {
      alert('An error occurred while deleting the products');
    }
  });
});



// Variable to store the product ID of the product being updated.
let currentProductId = '';

// Event listener for the 'Update' button in each row.
$('#products-table').on('click', '.update-product', function() {
    // Get the product ID from the clicked button's data-id attribute.
    currentProductId = $(this).data('id');

    // Optionally: Populate modal input fields with data from the DataTable's row. 
    // This requires accessing data from the DataTables API.
    // Assuming you have the corresponding row data. Here's just an example:
    let rowData = $('#products-table').DataTable().row($(this).parents('tr')).data();
    $('#Name').val(rowData.Name);
    $('#origin').val(rowData.origin);
    $('#type').val(rowData.type); // This assumes 'type' is a property in your rowData. Adjust accordingly.
    $('#intensity').val(rowData.intensity); // Similarly, adjust if needed.
    $('#flavor').val(rowData.flavor);
    $('#price').val(rowData.price);

    // Show the modal.
    $('#updateProductModal').modal('show');
});

// Your update product function.
$(document).on('submit', '#update-product-form', function(e) {
    e.preventDefault();

    // Add validation or any other requirements here, similar to the function for adding products.

    $.ajax({
        method: "PUT",
        url: "admin/updateProduct/" + currentProductId,
        data: $(this).serialize(),
        success: function(response) {
            if (response.success) {
                alert('Product updated successfully');
                // Optionally: Refresh the DataTable to reflect the changes.
                $('#products-table').DataTable().ajax.reload();
                // Close the modal.
                $('#updateProductModal').modal('hide');
            } else {
                alert('Error updating product');
            }
        },
        error: function(err) {
            alert('An error occurred while updating the product');
        }
    });
});

// chart  TEST **************************************************
// Dimensions
const width = 800;
const height = 400;
const margin = { top: 50, right: 20, bottom: 50, left: 50 };

// SVG canvas
const svg = d3.select('svg');

// Load the data from your endpoint
d3.json("/admin/data").then(data => {

  // X scale
  const x = d3.scaleBand()
    .domain(data.map(d => d._id)) // Change here
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // Y scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)]).nice()
    .range([height - margin.bottom, margin.top]);

  // X axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // Y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => x(d._id))  // Change here
    .attr("y", d => y(d.count))
    .attr("height", d => y(0) - y(d.count))
    .attr("width", x.bandwidth())
    .attr("fill", "steelblue");

});
