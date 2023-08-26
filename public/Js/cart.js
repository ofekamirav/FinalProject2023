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



  // Create a new order with all products in the user's cart
$(document).on('click', '#buy-button', function(e) {
  e.preventDefault();  // prevent the default form submission

  // Collect all items in the cart
  let items = [];
  $('table tbody tr').each(function() {
      let productId = $(this).find('.delete-product').data('id');
      let quantity = $(this).find('select').val();

      items.push({
          itemId: productId,
          quantity: parseInt(quantity)
      });
  });

  // Sending an Order
  $.ajax({
      url: '/order/createOrder',
      method: 'POST',
      contentType: 'application/json', 
      data: JSON.stringify({ items: items }),
      success: function(response) {
          if (response.success) {
              alert('Order Created Successfully!');
              location.reload(); // Refresh the page or redirect to another page e.g. orders page
          } else {
              alert('Failed Creating the Order');
          }
      },
      error: function(err) {
          alert('An error occurred while trying to create the order');
      }
  });
});

  