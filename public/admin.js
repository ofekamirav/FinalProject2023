$(document).ready(function() {
    $('#usersTable').DataTable({
      ajax: {
        url: '/admin', // Same URL as the page rendering
        dataSrc: ''
      },
      columns: [
        { data: '_id' },
        { data: 'firstName' },
        { data: 'lastName' }
      ]
    });
  });