$(document).ready(function() {
    $('.nav-link').click(function(e) {
      e.preventDefault();
      var file = $(this).data('Register.html');
      $('#content-container').load(file);
    });
  });