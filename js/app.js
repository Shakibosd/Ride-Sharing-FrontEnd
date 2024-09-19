let map;

// Array of markers
let markers = [
  {
    coordinates: { lat: 53.46283320275885, lng: -2.248211115991157 },
    iconImage: "https://img.icons8.com/fluent/48/000000/marker-storm.png",
    content: "<h5>Habiganj, Bangladesh</h5>",
  },
  {
    coordinates: { lat: 53.463842391942, lng: -2.247733682839402 },
  },
];

function initMap() {
  const options = {
    zoom: 16,
    center: { lat: 53.46312701980667, lng: -2.2472026054971903 },
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  // Listen to map click
  google.maps.event.addListener(map, "click", function (event) {
    addMarker({ coordinates: event.latLng });
  });

  for (let i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
  }

  drawDirection();
}

function addMarker(prop) {
  let marker = new google.maps.Marker({
    position: prop.coordinates,
    map: map,
  });

  if (prop.iconImage) {
    marker.setIcon(prop.iconImage);
  }

  if (prop.content) {
    let information = new google.maps.InfoWindow({
      content: prop.content,
    });

    marker.addListener("click", function () {
      information.open(map, marker);
    });
  }
}

function drawDirection() {
  const directionService = new google.maps.DirectionsService();
  const directionRenderer = new google.maps.DirectionsRenderer();

  directionRenderer.setMap(map);

  calculationAndDisplayRoute(directionService, directionRenderer);
}

function calculationAndDisplayRoute(directionService, directionRenderer) {
  const start = { lat: 53.46279485096965, lng: -2.2514995069397745 };
  const end = { lat: 53.46344635618052, lng: -2.249321553337068 };
  const request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionRenderer.setDirections(response);
      let myRoute = response.routes[0];
      let txt = "";
      for (let i = 0; i < myRoute.legs[0].steps.length; i++) {
        txt += myRoute.legs[0].steps[i].instructions + "<br />";
      }

      document.getElementById("directions").innerHTML = txt;
    } else {
      console.error("Directions request failed due to " + status);
    }
  });
}
