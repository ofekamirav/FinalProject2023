//Delete Product From cart Function
$(document).on('click', '.delete-product', function() {
    var productId = $(this).data('id'); // Getting the product ID from the data attribute
    var rowToDelete = $(this).closest('tr');
  
    $.ajax({
      
      url: 'cart/deleteProduct/' + productId, 
      method: 'DELETE',
      success: function(response) {
        if (response.success) {
          alert('Product Removed');
          rowToDelete.remove();
        } else {
          alert('Failed Removing the product');
        }
      },
      error: function(err) {
        alert('An error occurred while trying to remove');
      }
    });
  });