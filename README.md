# usgs_visualization_leaflet

The data was retrieved from the <a href="http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS GeoJSON Feed page</a>. The data set used was 'All Earthquakes from the Past 7 Days' obtained on June 7, 2019. 

The task was to create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.
The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color. When a marker is clicked, the popup displays additional information about the earthquake. 

The second task was utilize a second data set to illustrate the relationship between tectonic plates and seismic activity. The second data set was obtained from <a href="https://github.com/fraxen/tectonicplates">https://github.com/fraxen/tectonicplates</a> which contains data on tectonic plates.

Additional base maps were also added (light, satellite, street), along with a layer control, and a legend for earthquake magnitude.

Note: Use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser.
