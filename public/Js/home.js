const socket=io('/');
socket.on('usercnt', function(msg) {
    $('#UsersCounnt')[0].innerHTML = "There is "+ msg +" Users online";
  });