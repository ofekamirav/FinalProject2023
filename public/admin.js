$(document).ready(function() {
  $('#usersTable').DataTable({
    ajax: {
      url: '/admin', // Same URL as the page rendering
      dataSrc: ''
      
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
    lengthMenu: [[1, 2, 10, 25, -1], [1, 2, 10, 15, "All"]], // Change this line
    
  });
});
