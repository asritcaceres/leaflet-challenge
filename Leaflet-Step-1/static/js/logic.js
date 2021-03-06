// Store endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features)
});

function createFeatures(earthquakeData) {

  // Define function to run once for each feature in the features array
  // Give each feature a popup describing the place, time and magnitude of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
    "</h3><hr><p>Magnitude:" +(feature.properties.mag) +"</p>" );
  }

  // Define function to create the circle radius based on the magnitude
  function radiusSize(magnitude) {
    return magnitude *15000;
  }

  // Define function to set the circle color based on the magnitude
  function circleColor(magnitude) {
    if (magnitude < 1) {
      return "green"
    }
    else if (magnitude < 2) {
      return "yellow"
    }
    else if (magnitude < 3) {
      return "orange"
    }
    else if (magnitude < 4) {
      return "red"
    }
    else if (magnitude < 5) {
      return "darkred"
    }
    else {
      return "black"
    }
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng) {
      return L.circle(latlng, {
        radius: radiusSize(earthquakeData.properties.mag),
        color: circleColor(earthquakeData.properties.mag),
        fillOpacity: .5
      })
    },
    onEachFeature: onEachFeature
  });

  // Sending earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the lightmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightmap, earthquakes],

  });
// Create function for colors for the legend
  function getColor(d){
    return d < 1  ? "green" :
           d < 2  ? "yellow" :
           d < 3 ? "orange" :
           d < 4 ? "red" :
           d < 5 ? "darkred" :
                   "black" ;

  }

  //add legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          magnitude = [0, 1, 2, 3, 4, 5];

  //Title for the legend
          div.innerHTML += "Magnitudes <br><hr>"

      // loop through intervals and generate a colored square for each interval
      for (var i = 0; i < magnitude.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(magnitude[i]) +  '">&nbsp&nbsp&nbsp&nbsp</i> ' +
              magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);
}
  
