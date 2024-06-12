///////////EXAMPLE//////////////////////////////////////////////////////////////////////////////
// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level for sf
// This gets inserted into the div with an id of 'map' in index.html
var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiY2hpYW15YzA5ODciLCJhIjoiY2swdzUxb3I2MGRiMzNpbnliN293OXBteiJ9.at8rk5Trv5oNH1dD2E9EAw"
}).addTo(myMap);

// Store our API endpoint
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

//  GET color radius call to the query URL
d3.json(queryUrl, function(data) {
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}
// set different color from magnitude
  function getColor(magnitude) {
  switch (true) {
  case magnitude > 5:
    return "#ea2c2c";
  case magnitude > 4:
    return "#ea822c";
  case magnitude > 3:
    return "#ee9c00";
  case magnitude > 2:
    return "#eecc00";
  case magnitude > 1:
    return "#d4ee00";
  default:
    return "#98ee00";
  }
}
// set radiuss from magnitude
  function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }

  return magnitude * 4;
}
  // GeoJSON layer
  L.geoJson(data, {
    // Maken cricles
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // cirecle style
    style: styleInfo,
    // popup for each marker
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(myMap);

  // an object legend
  var legend = L.control({
    position: "bottomright"
  });

  // details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(myMap);
});


////////////////////////////////////////////////////////////////////////////////////////
//explore data on web https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

//const url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

// Define a function that we want to run once for each feature in the features array. Give each feature a popup that describes the place and time of the earthquake.
// see earthquake_source_data_format.docx in Resource folder; in features geometry: { type: "Point", coordinates: [ longitude, latitude, depth] will need to show Lat first then Long.
//in bind pop html format, header, hr gives a line. 

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}
      </p><p>Magnitude: ${feature.properties.mag}</p><p>Coordinates: ${feature.geometry.coordinates[1]} , ${feature.geometry.coordinates[0]}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
  let earthquakes = L.geoJSON(earthquakeData, {
     onEachFeature: onEachFeature
  });

    // HOW DO I ADD A CIRCLE MARKER FOR EACH TO THE MAP AND HAVE THE DEPTH INDEX 3 IN COORDINATES REPRESENTED WITH A DEEPER COLOR AND DIFFERENT COLOR FOR EACH.
    //let marker = L.marker(earthquakeData, {onEachFeature: onEachFeature}), 
    //   draggable: false,
    // .addTo(myMap);
//
//  Loop through locations, and create the circle marker for earthquakeData.
//  for (let i = 0; i < locations.length; i++) {
//     stateMarkers.push(
// // //       L.circle(locations[i].coordinates, {
// // //         stroke: false,
// // //         fillOpacity: 0.75,
// // //         color: "white",
// // //         fillColor: "white",
// // //         radius: markerSize(locations[i].state.population)
// // //       })
// // //     );

    createMap(earthquakes);
  }


// Send our earthquakes layer to the createMap function
function createMap(earthquakes) {

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

//Create our map, giving it the streetmap and earthquakes layers to display on load as default start. Set to location Poland-Slovakian border
let myMap = L.map("map", {
  center: [49.0862, 21.7825],
  zoom: 3,
  layers: [street, earthquakes]
 });



// Create a layer control. Pass it our baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
  }).addTo(myMap);

// Creating a new marker Circle Marker. We pass in some initial options, and then add the marker to the map by using the addTo() method.




}














// var legend = L.control({position: 'bottomright'});


// legend.onAdd = function (){
//   var div = L.DomUtil.create('div', 'info legend');
//   var grades = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
//   var colors = [
//       'rgb(19, 235, 45)',
//       'rgb(138, 206, 0)',
//       'rgb(186, 174, 0)',
//       'rgb(218, 136, 0)',
//       'rgb(237, 91, 0)',
//       'rgb(242, 24, 31)'
//       ];
//   var labels = [];
//   // loop through our density intervals and generate a label with a colored square for each interval
//   grades.forEach(function(grade, index){
//       labels.push("<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 20px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>");
//   })

//   div.innerHTML += "<ul>" + labels.join("") +"</ul>";
//   return div;

// };

// legend.addTo(myMap);

// // "<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 15px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>"





// //  GET color radius call to the query URL
// // d3.json(queryUrl, function(data) {
// //   function styleInfo(feature) {
// //     return {
// //       opacity: 1,
// //       fillOpacity: 1,
// //       fillColor: getColor(feature.properties.mag),
// //       color: "#000000",
// //       radius: getRadius(feature.properties.mag),
// //       stroke: true,
// //       weight: 0.5
// //     };
// //   }
// //   // set different color from magnitude
// //     function getColor(magnitude) {
// //     switch (true) {
// //     case magnitude > 5:
// //       return "#800026";
// //     case magnitude > 4:
// //       return "#bd0026";
// //     case magnitude > 3:
// //       return "#e31a1c";
// //     case magnitude > 2:
// //       return "#fc4e2a";
// //     case magnitude > 1:
// //       return "#fd8d3c";
// //     default:
// //       return "#feb24c";
// //     }
// //   }
// //   // set radius from magnitude
// //     function getRadius(magnitude) {
// //     if (magnitude === 0) {
// //       return 1;
// //     }

// //     return magnitude * 4;
// //   }
// //     // GeoJSON layer
// //     L.geoJson(data, {
// //       // Make cricles
// //       pointToLayer: function(feature, latlng) {
// //         return L.circleMarker(latlng);
// //       },
//       // cirecle style
// //       style: styleInfo,
// //       // popup for each marker
// //       onEachFeature: function(feature, layer) {
// //         layer.bindPopup(`<h3>${feature.properties.mag}</h3><hr><p>${feature.properties.place}</p><hr><p1>${feature.properties.geometry ? 0,1,2? }</p1>`);
// //               }
// //     }).addTo(myMap);
  
// //     // an object legend
// //     let legend = L.control({
// //       position: "bottomright"
// //     });
  
// // //     // details for the legend
// // //     legend.onAdd = function() {
// // //       var div = L.DomUtil.create("div", "info legend");
  
// // //       var grades = [0, 1, 2, 3, 4, 5];
// // //       var colors = [
// // //         "#800026",
// // //         "#bd0026",
// // //         "#e31a1c",
// // //         "#fc4e2a",
// // //         "#fd8d3c",
// // //         "#feb24c"
// // //       ];
  
  
// // //     // Finally, we our legend to the map.
// // //     legend.addTo(myMap);
// // //   });


// // // ////
// // // // Loop through locations, and create the city and state markers.
// // // for (let i = 0; i < locations.length; i++) {
// // //     // Setting the marker radius for the state by passing population into the markerSize function
// // //     stateMarkers.push(
// // //       L.circle(locations[i].coordinates, {
// // //         stroke: false,
// // //         fillOpacity: 0.75,
// // //         color: "white",
// // //         fillColor: "white",
// // //         radius: markerSize(locations[i].state.population)
// // //       })
// // //     );

