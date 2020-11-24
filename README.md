# leaflet-challenge
##### The task was to obtain the information from the dataset provided on USGS site. I chose the Past Day- All Earthquakes. In order to view the data I added the URL to the variable queryURL. I then proceeded to use d3.json to request the URL and used createFeatures to get the information from the site. I console.log the data.features to see what paramaters I would be using in conjunction with the onEachFeature function. I was able to get the information for each place, time and magnitude for each earthquake to appear if the circle is clicked to provide more information.

##### From here I used a function to get the radius of the circles to be the size of the magnitude- due to such small numbers I magnified the size by multiplying by 15,000. I then proceeded to use another function to create the colors that would be used for each magnitude- depending on its strength. 

##### Once the layer was created for the features of the array I was about to create the map using mapbox. My API key is in a config.js file that is hidden on github. I created a light map as the base and used the information from the variable earthquakes (the features of the array) as the overlay of the map.

##### Now that the map was generated I needed to add the legend. I used the getColor function to add the colors for the labels that would be needed. I found the syntax in the documentation for Leaflet and used that to position the legend on the bottom right and use a for loop to match the magnitude to the colors it would be associated with based on its strength and then added this to the map.

![alt text](https://github.com/asritcaceres/leaflet-challenge/blob/main/Leaflet-Step-1/static/images/earthquake_map.PNG?raw=true)