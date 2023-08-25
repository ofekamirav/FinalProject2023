

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

//Beginning of work on evenListeners i.e: delete update ...

//Creating a new User
$(document).on('submit','#add-user-form',function(e){
  e.preventDefault();
 
  $.ajax({
  method:"POST",
  url: "admin/adduser",
  data:$(this).serialize(),
  success: function(response) {
    if (response.success) {
      alert('User Created successfully');
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
$(document).on('submit','#add-product-form',function(e){
  e.preventDefault();
 
  $.ajax({
  method:"POST",
  url: "admin/addProduct",
  data:$(this).serialize(),
  success: function(response) {
    if (response.success) {
      alert('Capsule Created successfully');
    } else {
      alert('Error creating Capsule');
    }
  },
  error: function(err) {
    alert('An error occurred while creating the Capsule');
  }
});
});



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




//Updating Product 

//Update User Function
// $(document).on('click', '.update-product', function() {
//   var table = $('#products-table').DataTable();
//   var data = table.row($(this).closest('tr')).data();
//   $('#uName').val(data.Name);
//   $('#uOrigin').val(data.origin);
//   $('#uFlavor').val(data.flavor);
//   $('#uIntensity').val(data.intensity);
//   $('#uType').val(data.type);
//   $('#uPrice').val(data.price);
//   $('#updateProductModal').modal('show');
// });

$(document).on('click', '.update-product', function() {
  // Define the table variable
  var table = $('#products-table').DataTable();

  // Get the row data
  var data = table.row($(this).closest('tr')).data();

  // Store the product ID for later use (like on form submission)
  var productId = data._id;  // Assuming your product data has an "_id" field

  // Fill the input fields in the modal with data
  $('#uName').val(data.Name);
  $('#uOrigin').val(data.origin);
  $('#uFlavor').val(data.flavor);
  $('#uIntensity').val(data.intensity);
  $('#uType').val(data.type);
  $('#uPrice').val(data.price);

  // Show the modal
  $('#updateProductModal').modal('show');
});

//merge the functions ? 

$(document).on('click', '#updateProductButton', function(e) {
  e.preventDefault();  // Prevent the default form submission behavior

  // Capture the updated data
  var updatedName = $('#uName').val();
  var updatedOrigin = $('#uOrigin').val();
  var updatedFlavor = $('#uFlavor').val();
  var updatedPrice = $('#uPrice').val();
  var updatedType= $('#uType').val();
  var updatedIntensity=$('#iIntensity').val();
  var productId = table.row($(this).closest('tr')).data()._id;  // Assuming your product data has an "_id" field

  // Make an AJAX call to update the product on the server
  $.ajax({
    url: 'admin/updateProduct/' + productId,
    method: 'PUT',
    data: {
      Name: updatedName,
      origin: updatedOrigin,
      flavor: updatedFlavor,
      price: updatedPrice,
      type:updatedType,
      intensity:updatedIntensity
    },
    success: function(response) {
      if (response.success) {
        alert('Product updated successfully');

        // Reload the DataTable to reflect the changes
        $('#products-table').DataTable().ajax.reload();

        // Hide the modal after successful update
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

//End of updating product

