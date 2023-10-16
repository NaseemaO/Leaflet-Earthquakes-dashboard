# leaflet-challenge. Week 15 Assignment
Dashboard link: https://naseemao.github.io/leaflet-challenge/

GitHub link: https://github.com/NaseemaO/leaflet-challenge.git

## Overview: 
Interactive Dashboard created that shows the Significant Earthquakes around the world over a period of 30 days period: 09/11/23-10/11/23/ 
The Magnitude of the earthquakes are indicated by the size of the circle. Earthquakes with higher magnitudes appear larger.   
The depth of the earthquake is indicated by color and depth of the color. Earthquakes with greater depth should appear darker in color.

###Legend on the map: (See picture attached, and in the GitHub images folder)
    red for 90+ magnitude, 
    orange for 70-90, 
    light orange for 50-70, 
    yellow #ffff00 for 30-50, 
    lime for 10-30, 
    bright green for -10 - 10. 

###Information Pop-Up Box: (See picture attached, and in the GitHub images folder)
Click on a circle (an earthquake) to see: 
    Location: Poland-Slovakia border region
    Date: Mon Oct 09 2023 13:23:09 GMT-0500 (Central Daylight Time)
    Magnitude: 5
    Coordinates: 49.0862, 21.7825
    Depth: 8.273

###Earthquake data obtained from: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

###Programs used to create dashboard: html, javascript, css, leaflet. 

###Leaflet-challenge directory cotains: 
    css and js code files in Static folder: located in the GitHub directory: https://github.com/NaseemaO/leaflet-challenge/tree/main/Leaflet_Part_1/static 
    Images folder: Pictures of visualizations
    Resources: Data files significant_month.geojson and earthquake_source_data_format.docx https://github.com/NaseemaO/leaflet-challenge/tree/main/Resources

To run the dashboard using the html file from the directory: Open the index.html file with Google Chrome, the html uses the css and .js file are needed as well, and data lookup /is referenced from external sites. 

## Background of the assignment 
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, the task is to develop visualizations of the USGS data to allow for better eductation to the public and other government organizations on issues facing our planet. This in turn may allow USGS to secure more funding for research. 

Part I completed.  Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
Earthquake data obtained from: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

Part II Optional. Not Completed. Plot a second data set on the map in Part I to illustrate the relationship between tectonic plates and seismic activity by pulling in Tectonic Plates data set
Data on tectonic plates can be found at https://github.com/fraxen/tectonicplatesLinks to an external site.. Visualize it along side the original set of data
Add a number of base maps (Satellite Map, Grayscale Map, Outdoors Map and Dark Map) to choose from
Separate out the two different data sets (earthquakes and tectonic plates) into overlays that can be turned on and off independently
Add layer controls to the map

## References: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
Url of Significant Earthquakes within the Past 7 Days dataset created by the United States Geological Survey USGS:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

Links 
Leaflet documentation  https://leafletjs.com/reference.html

*GeoJSON: http://leafletjs.com/reference.html#geojson

Using GeoJSON with Leaflet tutorial: http://leafletjs.com/examples/geojson/

Plotly.js documentationLinks to an external site. when building the plots.
https://www.w3schools.com/tags/tag_select.asp

Colors hex codes: https://www.w3schools.com/colors/colors_picker.asp

## Acknowledgments: Bootcamp Course Data Visualization and Data Analytics Instructor: Hunter Hollis, TAs: Sam Espe and Randy Sendek, and Tutors. 

