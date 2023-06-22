
function loadMapScenario() {
  // Initialize map
  var map = new Microsoft.Maps.Map(document.getElementById('mapContainer'), {
    credentials: 'AupWJapFKBKLkHd57zAQbvaIS3yqTZvM0FdqUI4zphHcEdq2mR2jODNRoY5jvlo-'
  });

  // Adding pins
  var pinLocation1 = new Microsoft.Maps.Location(59.928074, 10.759258); //first location cardinels- Supreme Roastworks – Oslo, Norway
  var pin1 = new Microsoft.Maps.Pushpin(pinLocation1);
  map.entities.push(pin1);

 var pinLocation2 = new Microsoft.Maps.Location(40.423897, -3.705549); //second location cardinels- HanSo Café – Madrid, Spain
  var pin2 = new Microsoft.Maps.Pushpin(pinLocation2);
  map.entities.push(pin2);

  var pinLocation3 = new Microsoft.Maps.Location(44.465591, 26.085674); //third location cardinels- Bob Coffee Lab – Bucharest, Romania
  var pin3 = new Microsoft.Maps.Pushpin(pinLocation3);
  map.entities.push(pin3);

  var pinLocation4 = new Microsoft.Maps.Location(59.928074, 10.759258); 
  var pin4 = new Microsoft.Maps.Pushpin(pinLocation4);
  map.entities.push(pin4);
}
