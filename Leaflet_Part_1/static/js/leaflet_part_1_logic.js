// Store our API endpoint as queryUrl. significant earthquakes 30 days. 
const EARTHQUAKE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

//Create our map, set Kansas City Airport MCI as midpint mid continent.coordinates obtained from airnav.com/airports. 
let myMap = L.map("map", {
  center: {lat: 39.2976111, lng:-94.7138889},
  zoom: 3,
 });

 // add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Depth marker color for different depths. fill color for coordinates [2] depth is index 2. x=magnitude
// hex codes: red ff4000 for 90+, orange #ff8000 for 70-90, light orange #ffbf00 for 50-70, yellow #ffff00 for 30-50, lime #bfff00 for 10-30, bright green #40ff00 for -10-10
// this works also.
//function markerColor(x) {
//   return x > 90 ? '#ff4000':
//     x > 70 ? '#ff8000':
//     x > 50 ? '#ffbf00' :
//     x > 30 ? '#ffff00' :
//     x > 10 ? '#bfff00' :
//              '#40ff00'
// }

// could also do the // set different color for depths.  x= magnitude
  function markerColor(x) {
    switch (true) {
    case x > 90:
      return '#ff4000';
    case x  > 70:
      return '#ff8000';
    case x > 50:
      return '#ffbf00' ;
    case x > 30:
      return '#ffff00';
    case x > 10:
      return '#bfff00';
    default:   // anything <10
      return '#40ff00';
    }
  }

// Get the data with d3.
d3.json(EARTHQUAKE_URL).then(function(data) {
  console.log(data);
  
  // create circle markers based on radius of magnitude; color #000000 is black for around the circle. 
  // The Magnitude of the earthquakes are indicated by the size of the circle. Earthquakes with higher magnitudes appear larger.
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

    //add data to map
    L.geoJson(data, {
    pointToLayer: createMarker,

    // add pop up. // Define a function that we want to run once for each feature in the features array. Give each feature a popup that describes the place and time of the earthquake.
    // see earthquake_source_data_format.docx in Resource folder; in features geometry: { type: "Point", coordinates: [ longitude, latitude, depth] will need to show Lat first then Long.
    //in bind pop html format, header, hr gives a line. 
   
    onEachFeature: function (feature, layer) {

      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}
      </p><p>Magnitude: ${feature.properties.mag}</p><p>Coordinates: ${feature.geometry.coordinates[1]}, 
      ${feature.geometry.coordinates[0]}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
    }).addTo(myMap);

    
//add legend
let legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    let x = [90, 70, 50, 30, 10, -10];
    let y = [
      '#ff4000',
      '#ff8000',
      '#ffbf00',
      '#ffff00',
      '#bfff00',
      '#40ff00'
    ];

    for (let i = 0; i < x.length; i++) {
        div.innerHTML +=
            '<i style="background:' + y[i] + '"></i> ' +
            x[i] + (x[i + 1] ? '&ndash;' + x[i + 1] + '<br>' : '+');
    }    
    return div;
};

// Add legend to map
legend.addTo(myMap);
});

