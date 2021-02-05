// Create a map object
var myMap = L.map("map", {
    center: [36.54, -80.91],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  


// // Create the map with our layers
// var map = L.map("map", {
//     center: [36.54, -80.91],
//     zoom: 5,
//   });

// // Create the tile layer that will be the background of our map
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   maxZoom: 18,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(map);


// // Initialize all of the LayerGroups we'll be using
// var layers = {
//   COMING_SOON: new L.LayerGroup(),
//   EMPTY: new L.LayerGroup(),
//   LOW: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   OUT_OF_ORDER: new L.LayerGroup()
// };

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "Coming Soon": layers.COMING_SOON,
//   "Empty Stations": layers.EMPTY,
//   "Low Stations": layers.LOW,
//   "Healthy Stations": layers.NORMAL,
//   "Out of Order": layers.OUT_OF_ORDER
// };

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//   COMING_SOON: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   EMPTY: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   OUT_OF_ORDER: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   LOW: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   NORMAL: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };

// // Perform an API call to the Citi Bike Station Information endpoint
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(infoRes) {

// //   // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
// //   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
// //     var updatedAt = infoRes.last_updated;
// //     var stationStatus = statusRes.data.stations;
// //     var stationInfo = infoRes.data.stations;

// //     // Create an object to keep of the number of markers in each layer
// //     var stationCount = {
// //       COMING_SOON: 0,
// //       EMPTY: 0,
// //       LOW: 0,
// //       NORMAL: 0,
// //       OUT_OF_ORDER: 0
// //     };

// //     // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
// //     var stationStatusCode;

// //     // Loop through the stations (they're the same size and have partially matching data)
// //     for (var i = 0; i < stationInfo.length; i++) {

// //       // Create a new station object with properties of both station objects
// //       var station = Object.assign({}, stationInfo[i], stationStatus[i]);
// //       // If a station is listed but not installed, it's coming soon
// //       if (!station.is_installed) {
// //         stationStatusCode = "COMING_SOON";
// //       }
// //       // If a station has no bikes available, it's empty
// //       else if (!station.num_bikes_available) {
// //         stationStatusCode = "EMPTY";
// //       }
// //       // If a station is installed but isn't renting, it's out of order
// //       else if (station.is_installed && !station.is_renting) {
// //         stationStatusCode = "OUT_OF_ORDER";
// //       }
// //       // If a station has less than 5 bikes, it's status is low
// //       else if (station.num_bikes_available < 5) {
// //         stationStatusCode = "LOW";
// //       }
// //       // Otherwise the station is normal
// //       else {
// //         stationStatusCode = "NORMAL";
// //       }

// //       // Update the station count
// //       stationCount[stationStatusCode]++;
// //       // Create a new marker with the appropriate icon and coordinates
// //       var newMarker = L.marker([station.lat, station.lon], {
// //         icon: icons[stationStatusCode]
// //       });

// //       // Add the new marker to the appropriate layer
// //       newMarker.addTo(layers[stationStatusCode]);

// //       // Bind a popup to the marker that will  display on click. This will be rendered as HTML
// //       newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
// //     }

// //     // Call the updateLegend function, which will... update the legend!
// //     updateLegend(updatedAt, stationCount);
//   });
// });

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
