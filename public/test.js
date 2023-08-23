	// Open Modal on Button Click
    $('#add-product-btn').on('click', function() {
        $('#add-product-modal').modal('show');
      });
      
      // Handle Form Submission
      $('#add-product-form').on('submit', function(event) {
        event.preventDefault();
      
        var newProduct = {
          name: $('#name').val(),
          origin: $('#origin').val(),
          // Add other product fields here
        };
      
        $.ajax({
          url: 'admin/add-product', // Server-side URL for adding product
          method: 'POST',
          data: JSON.stringify(newProduct),
          contentType: 'application/json',
          success: function(response) {
            if (response.success) {
              $('#add-product-modal').modal('hide'); // Hide Modal
              alert('Product added successfully');
              $('#products-table').DataTable().ajax.reload(); // Refresh products table
            } else {
              alert('Error adding product');
            }
          },
          error: function(err) {
            alert('An error occurred while adding the product');
          }
        });
      });