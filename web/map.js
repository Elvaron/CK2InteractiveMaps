/*
A Leaflet map has one CRS (and one CRS only), that can be changed when creating the map. For our game map we’ll use CRS.Simple, which represents a square grid:
*/
var map = L.map('map_tadinthadar', {
	crs: L.CRS.Simple,
    minZoom: -5
});

/*
Then we can just add a L.ImageOverlay with the starmap image and its approximate bounds:
*/
var bounds = [[0,0], [1000,1000]];
var iamge = L.imageOverlay('map_full.png', bounds).addTo(map);

/*
And show the whole map:
*/
map.fitBounds(bounds);
