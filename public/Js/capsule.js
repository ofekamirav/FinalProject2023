$(document).on('submit','#addToCart',function(e){
    e.preventDefault();
  
    const productId = $(this).find('button[name="action"]').val().split(':')[1];
  
    $.ajax({
      method: "POST",
      url: "/cart/addToCart",
      data: { productId: productId },
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
  