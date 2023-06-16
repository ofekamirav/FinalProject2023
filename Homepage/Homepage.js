$(document).ready(function() {
    $('.nav-link').click(function(e) {
      e.preventDefault();
      var file = $(this).data('file');
      $('#content-container').load(file);
    });
  });