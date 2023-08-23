

// Loading Both tables at page load using DataTable library
$(document).ready(function() {
  $('#users-table').DataTable({
    ajax: {
      url: '/admin', // Same URL as the page rendering
      dataSrc: "users"
      
    },
    columns: [
      { data: '_id' },
      { data: 'firstName' },
      { data: 'lastName' },
      {data:'Country'},
      {
        data: null,
        render: function(data, type, row) {
          return '<button class="btn btn-danger delete-user" data-id="' + row._id + '">Delete</button>' +
          '<button class="btn btn-primary update-user" style="margin-left: 10px;" data-id="' + row._id + '">Update</button>';
        }
      }
      
      
      
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
      { data: '_id' },
      { data: 'origin' },
      { data: 'flavor' },
      {data:'price'},
      {
        data: null,
        render: function(data, type, row) {
          return '<button class="btn btn-danger delete-product" data-id="' + row._id + '">Delete</button>' +
          '<button class="btn btn-primary update-product" style="margin-left: 10px;" data-id="' + row._id + '">Update</button>';
        }
      }
      
      
      
    ],
    
    lengthMenu: [[-1, 5, 10, 20,], ["All", 5, 10, 20,]], 
    
  });

});

//Beginning of work on evenListeners i.e: delete update ...


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




