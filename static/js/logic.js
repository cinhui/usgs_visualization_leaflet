// Create a map using Leaflet that plots all of the earthquakes from your data set 
// based on their longitude and latitude.

function getColor(d) {
  return d > 5 ? '#E31A1C' :
         d > 4 ? '#E31A1C' :
         d > 3 ? '#FC4E2A' :
         d > 2 ? '#FD8D3C' :
         d > 1 ? '#FEB24C' :
                 '#FFEDA0';
} 

// createMap function
function createMap(locations){

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  var layers = {
    Earthquakes: locations
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.5815225,-96.1196247],
    zoom: 4,
    layers: [lightmap, locations]
  });

  // Create a legend that will provide context for your map data.
  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    magnitude = [0, 1, 2, 3, 4, 5],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(magnitude[i]+1) + '"></i>' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(map);


}

// createMarkers function
function createMarkers(earthquakeData){

    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3>
        ${new Date(feature.properties.time)}<br>
        Magnitude: ${feature.properties.mag}`);
      },
      pointToLayer: function (feature, latlng) {
        // Earthquakes with higher magnitudes should 
        // appear larger and darker in color.

        var geojsonMarkerOptions = {
          radius: 5*feature.properties.mag,
          fillColor: getColor(feature.properties.mag),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    });

  createMap(earthquakes);
}

// USGS all earthquake past 7 days geojson
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(link, function(data){
  createMarkers(data.features);
});
