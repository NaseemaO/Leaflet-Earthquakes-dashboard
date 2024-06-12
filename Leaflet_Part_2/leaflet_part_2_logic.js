//Create our map, set to location Poland-Slovakian border
let myMap = L.map("map", {
  center: [49.0862, 21.7825],
  zoom: 3,
 });

 // add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Get the data with d3.Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map.
d3.json(queryUrl).then(function(data) {
  console.log(data);

  // For Part II // createFeatures(data.features);
  // createFeatures(data.features);
  // function createFeatures(earthquakes) {


  // create markers,  fill color for depth index 2.  color #000000 is black for around the circle
    function createMarker(feature, y) {
      return L.circleMarker(y, {
        opacity: 1,
        fillOpacity: 1,
        fillColor: markerColor(feature.geometry.coordinates[2]),
        radius: feature.properties.mag *2,
        color: "#000",
        weight: 0.5
      });
    }


// marker color for the various depths. hex codes: red ff4000 for 90+, orange #ff8000 for 70-90, light orange #ffbf00 for 50-70, yellow #ffff00 for 30-50, lime #bfff00 for 10-30, bright green #40ff00 for -10-10
    function markerColor(x) {
      return  x > 90 ? 'ff4000':
        x > 70 ? '#ff8000':
        x > 50 ? '#ffbf00' :
        x > 30 ? '#ffff00' :
        x > 10 ? '#bfff00' :
                  '#40ff00'
    }
        

    //add data to map
    L.geoJson(data, {
    pointToLayer: createMarker,

    // add pop up. // Define a function that we want to run once for each feature in the features array. Give each feature a popup that describes the place and time of the earthquake.
    // see earthquake_source_data_format.docx in Resource folder; in features geometry: { type: "Point", coordinates: [ longitude, latitude, depth] will need to show Lat first then Long.
    //in bind pop html format, header, hr gives a line. 
   
    onEachFeature: function (feature,layer) {

      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}
      </p><p>Magnitude: ${feature.properties.mag}</p><p>Coordinates: ${feature.geometry.coordinates[1]}, 
      ${feature.geometry.coordinates[0]}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
    }).addTo(myMap);

    
//add legend. L.control for positioning. 
let legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend'),
        x = [-10, 10, 30, 50, 70, 90];

    for (let i = 0; i < x.length; i++) {
        div.innerHTML +=
            '<i style="background:' + markerColor(x[i] + 1) + '"></i> ' +
            x[i] + (x[i + 1] ? '&ndash;' + x[i + 1] + '<br>' : '+');
    }    
    return div;
}};

// Add legend to map
legend.addTo(myMap);
});

// Part II

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};
 // Create an overlay object to hold our overlay.
 let overlayMaps = {
  Earthquakes: earthquakes
  };

// Create a layer control. Pass it our baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
  }).addTo(myMap);


