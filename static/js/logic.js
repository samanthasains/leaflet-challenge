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

    // Loop through all earthquakes
    for (var i=0; i < data.features.length; i++) {

        // Conditionals for depth
        var color = "";
        if (data.features[i].geometry.coordinates[2] > 90) {
            color = "darkred";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
            color = "red";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
            color = "darkorange";
        }
        else if (data.features[i].geometry.coordinates[2] > 30) {
            color = "lightsalmon";
        }
        else if (data.features[i].geometry.coordinates[2] > 10) {
            color = "yellow";
        }
        else {
            color = "greenyellow";
        };

        // Add circles to map
        L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: color,
        fillColor: color,

        // Adjust radius
        radius: data.features[i].properties.mag * 20000
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + data.features[i].properties.mag + "</h3> <hr> <h3>Depth: " + data.features[i].geometry.coordinates[2]).addTo(myMap);
    }
});

// Create function to correlate colors for legend
function getColor(d) {
    return d === '-10 - 10'  ? "greenyellow" :
           d === '10 - 30'  ? "yellow" :
           d === '30 - 50' ? "lightsalmon" :
           d === '50 -70' ? "darkorange" :
           d === '70 - 90' ? "red" :
                        "darkred";
}

// Create legend
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    // add information to legend
    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Depth</strong>'],
    categories = ['-10 - 10','10 - 30','30 - 50','50 -70','70 - 90', '90+'];

    // loop through categories of depth to append depth and color circle to legend
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<span class="dot" style="background:' +getColor(categories[i]) + '"></span> ' + (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };

    // add legend to map
    legend.addTo(myMap);
