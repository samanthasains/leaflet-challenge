// Create a map object
var myMap = L.map("map", {
    center: [50,-84],
    zoom: 4
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){
    console.log(data.features[0].geometry.coordinates[2])

    // Loop through all earthquakes
    for (var i=0; i < data.features.length; i++) {

        // Conditionals for depth
        var color = "";
        if (data.features[i].geometry.coordinates[2] > 90) {
            color = "red";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
            color = "orangered";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
            color = "orange";
        }
        else if (data.features[i].geometry.coordinates[2] > 30) {
            color = "salmon";
        }
        else if (data.features[i].geometry.coordinates[2] > 10) {
            color = "yellow";
        }
        else {
            color = "chartreuse";
        };

        // Add circles to map
        L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: color,
        fillColor: color,

        // Adjust radius
        radius: data.features[i].properties.mag * 20000
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + data.features[i].properties.mag + "</h3> <hr> <h3>Coordinates: " + [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]).addTo(myMap);
    }

});

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
// //   });
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
