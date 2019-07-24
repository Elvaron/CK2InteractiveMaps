//-----------------------------------------
// THIS PART WORKED

/*var yx = L.latLng;

var xy = function(x, y) {
    if (L.Util.isArray(x)) {    // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x);  // When doing xy(x, y);
};


//var factorx = 0.125
//var factory = 0.125
var factorx = 0.0256410256410;
var factory = 0.0256410256410;

L.CRS.pr = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  transformation: new L.Transformation(factorx, 0, -factory, 0),
  // Changing the transformation is the key part, everything else is the same.
  // By specifying a factor, you specify what distance in meters one pixel occupies (as it still is CRS.Simple in all other regards).
  // In this case, I have a tile layer with 256px pieces, so Leaflet thinks it's only 256 meters wide.
  // I know the map is supposed to be 2048x2048 meters, so I specify a factor of 0.125 to multiply in both directions.
  // In the actual project, I compute all that from the gdal2tiles tilemapresources.xml, 
  // which gives the necessary information about tilesizes, total bounds and units-per-pixel at different levels.

// Scale, zoom and distance are entirely unchanged from CRS.Simple
  scale: function(zoom) {
    return Math.pow(2, zoom);
  },

  zoom: function(scale) {
    return Math.log(scale) / Math.LN2;
  },

  distance: function(latlng1, latlng2) {
    var dx = latlng2.lng - latlng1.lng,
      dy = latlng2.lat - latlng1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true
});

var map = L.map('map_tadinthadar', {
  crs: L.CRS.pr,
  zoomAnimation: false
}).setView(xy(17000, -11000), 1);

var mapheight = 9984;
var mapwidth = 9984;
var sw = map.unproject([0, mapheight], 1);  // Level 4, because this is the level where meters-per-pixel is exactly 1
var ne = map.unproject([mapwidth, 0], 1);
var layerbounds = new L.LatLngBounds(sw, ne);
var mapimage =  L.tileLayer('http://interactivetadinthadar.000webhostapp.com/tiles/{z}/{x}_{y}.png', {
  minZoom: -3,
  maxZoom: 1,
  bounds: layerbounds,
  noWrap: true
})
mapimage.addTo(map);
*/


// Example Positions 4221 2973 Gwyndon  1585 2302 Doma

//-----------------------------------------
// NEW TERRITORY

/*var zoomLevelOffsets = new Map();
zoomLevelOffsets.set(1, [0,0]);
zoomLevelOffsets.set(0, [50,31]);
zoomLevelOffsets.set(-1, [25,16]);
zoomLevelOffsets.set(-2, [12,8]);
zoomLevelOffsets.set(-3, [57,36]);

var zoomLevelScales = new Map();
zoomLevelScales.set(1, [1,1]);
zoomLevelScales.set(0, [1.0255,1.0255]);
zoomLevelScales.set(-1, [1.0255,1.0255]);
zoomLevelScales.set(-2, [1.0255,1.0255]);
zoomLevelScales.set(-3, [1.22999,1.22999]);

function MapMarker (x,y,name,map) {
	this.intendedX = x;
	this.intendedY = y;
	this.name = name;
	this.map = map;
	this.marker = null;
	this.layerGroup = null;
	this.originalZoom = 0;
}

MapMarker.prototype.init = function (zoomLevel, layerGroup)
{
	this.originalZoom = zoomLevel;
	var offsets = zoomLevelOffsets.get(zoomLevel);
	this.layerGroup = layerGroup;
	var position = this.map.unproject([this.intendedX + offsets[0], this.intendedY + offsets[1]], zoomLevel);
	this.marker = L.marker(position, this.name).addTo(this.layerGroup);
}

MapMarker.prototype.refresh = function (zoomLevel) {
	//var offsets = zoomLevelOffsets.get(zoomLevel);
	//var scale = map.getZoomScale(zoomLevel, mapMaxZoom);
	var zooms = zoomLevelScales.get(zoomLevel);
	var newX = this.intendedX * zooms[0];
	var newY = this.intendedY * zooms[1];
	var newPos = this.map.unproject([newX, newY], this.originalZoom);
	if (this.marker != null)
	{
		this.marker.setLatLng(newPos);
	}
}*/

var bounds1 = 9984;//4352
var bounds2 = 9984;//2048

var mapMinZoom = -3;
var mapMaxZoom = 1;
var map = L.map('map_tadinthadar', {
    maxZoom: mapMaxZoom,
    minZoom: mapMinZoom,
    crs: L.CRS.Simple
});

var mapBounds = new L.LatLngBounds(
    map.unproject([0, bounds1], mapMaxZoom),
    map.unproject([bounds2, 0], mapMaxZoom));

//map.setMaxBounds(mapBounds);

//map.setView([-1000, 1000], mapMaxZoom);
map.setView(map.unproject([3940, 2457], mapMaxZoom), mapMaxZoom);

/*var southWest = map.unproject([0, 11000], mapMaxZoom);
var northEast = map.unproject([11000, 0], mapMaxZoom);
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));*/

//map.fitBounds(mapBounds);
L.tileLayer('http://interactivetadinthadar.000webhostapp.com/tiles/{z}/{x}_{y}.png', {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    bounds: mapBounds,
    noWrap: false,
    continuousWorld: false
}).addTo(map);


var layerGroup = L.layerGroup().addTo(map);
var vectorGroup = L.layerGroup().addTo(map);

function getPos(x,y) {
	return map.unproject([x, y], mapMaxZoom);
}

/*var myMarkers = [];

// Wasserscheide: 3940, 2457
var myExampleMarker = new MapMarker(3940,2457,"Test",map);
myExampleMarker.init(mapMaxZoom, layerGroup);
myMarkers.push(myExampleMarker);

var gwyndon = new MapMarker(4221, 2973, "Gwyndon", map);
gwyndon.init(mapMaxZoom, layerGroup);
myMarkers.push(gwyndon);

var doma = new MapMarker(1585, 2302, "Doma", map);
doma.init(mapMaxZoom, layerGroup);
myMarkers.push(doma);

var southeast = new MapMarker(9984, 9984, "SE", map);
southeast.init(mapMaxZoom, layerGroup);
myMarkers.push(southeast);

var northeast = new MapMarker(9984, 0, "NE", map);
northeast.init(mapMaxZoom, layerGroup);
myMarkers.push(northeast);

var northwest = new MapMarker(0, 0, "NW", map);
northwest.init(mapMaxZoom, layerGroup);
myMarkers.push(northwest);

var southwest = new MapMarker(0, 9984, "SW", map);
southwest.init(mapMaxZoom, layerGroup);
myMarkers.push(southwest);*/


// create markers
L.marker(getPos(3940,2457)).addTo(layerGroup);
L.marker(getPos(4221,2973)).addTo(layerGroup);
L.marker(getPos(1585,2302)).addTo(layerGroup);
L.marker(getPos(9984,9984)).addTo(layerGroup);
L.marker(getPos(9984,0)).addTo(layerGroup);
L.marker(getPos(0,0)).addTo(layerGroup);
L.marker(getPos(0,9984)).addTo(layerGroup);

/*var myOverlays = [];

var points = [ ];
var polygon = L.polygon(points, {color: 'red', fill: true, fillColor: 'red', fillOpacity: 0.6, className: 'funWithFlags'}).addTo(vectorGroup);
myOverlays.push(polygon);*

// remove all the markers in one go

/*map.on('zoomend', function() {
	var zoom = map.getZoom();

	for (var markerIterator = 0; markerIterator < myMarkers.length; markerIterator++)
	{
		var myMarker = myMarkers[markerIterator];
		myMarker.refresh(zoom);
	}

	for (var overlayIterator = 0; overlayIterator < myOverlays.length; overlayIterator++)
	{
		var poly = myOverlays[overlayIterator];
	}

  layerGroup.clearLayers();

  var scale = map.getZoomScale(zoom, mapMaxZoom);

  var newX = scale * 4221;
  var newY = scale * 2972;

  var newPos = map.unproject([newX, newY], zoom);
  L.marker(newPos).addTo(layerGroup);
  //}
});*/

//-----------------------------------------

/*for (var i = 0; i < points.length; i++)
{
  points[i].lat = points[i].lat - 512;
  points[i].lng = points[i].lng + 512;
}*/


/*map.on('moveend', function() {
  var zoom = map.getZoom();

  if (zoom < 1)
  {
    var list = document.getElementsByTagName("svg");
    for (var i = 0; i < list.length; i++)
    {
      var svg = list[i];
    }
  }
  // zoom 1: index 0
  // 0: 1
  // -1: 2
  // -2: 3
  // -3: 4
});*/

//var points = [ map.project([3700,2500],1), map.project([3800,2500], 1), map.project([3800,3000],1), map.project([3700,3000],1)];

//var polygon = L.polygon(points, {color: 'red', fill: true, fillColor: 'red', fillOpacity: 0.6}).addTo(map);

// Zoom Level -2: 0-4
// Zoom Level -1: 0-9
// Zoom Level 0: 0-19
// Zoom Level 2: 2-77

/*L.control.scale({
  imperial: false
}).addTo(map);*/

/*
A Leaflet map has one CRS (and one CRS only), that can be changed when creating the map. For our game map we’ll use CRS.Simple, which represents a square grid:
*/
/*var map = L.map('map_tadinthadar', {
	crs: L.CRS.pr
	//center: [5120,5120]
});*/



/*
Then we can just add a L.ImageOverlay with the starmap image and its approximate bounds:
*/
//var bounds = [[0,0], [2304,1565]];
/*var bounds = [[0,0], [5000,5000]];
//var image = L.imageOverlay('map/fullMap.png', bounds).addTo(map);
L.tileLayer('http://interactivetadinthadar.000webhostapp.com/tiles/{z}/00{x}_00{y}.png', {
	bounds: [[1,1],[512,512]],
	maxZoom: 1,
	minZoom: 1,
	crs: L.CRS.Simple
}).addTo(map);


//map.setMaxBounds(bounds);

/*
And show the whole map:
*/
//map.setView(xy(2,2),1);

// --------------------
// Polygon test
/*
var points = [xy(836,422),xy(771,399),xy(764,358),xy(810,323),xy(827,325)];
var polygon = L.polygon(points, {color: 'red', fill: true, fillColor: 'red', fillOpacity: 1}).addTo(map);

points = [ xy(842,428),xy(842,430),xy(835,436),xy(830,442),xy(829,442),xy(821,442),xy(817,443),xy(814,443),xy(808,450),xy(808,456),xy(808,457),xy(811,463),xy(811,467),xy(811,469),xy(806,483),xy(798,482),xy(790,484),xy(789,484),xy(785,487),xy(783,494),xy(785,506),xy(786,508),xy(787,516),xy(788,522),xy(787,528),xy(784,540),xy(782,543),xy(780,550),xy(786,557),xy(787,564),xy(786,570),xy(779,578),xy(775,580),xy(767,582),xy(766,583),xy(763,583),xy(761,580),xy(753,568),xy(750,561),xy(751,556),xy(748,551),xy(747,551),xy(741,547),xy(735,550),xy(734,553),xy(730,556),xy(721,556),xy(715,553),xy(712,545),xy(711,544),xy(707,539),xy(699,538),xy(697,538),xy(697,535),xy(698,534),xy(699,525),xy(700,517),xy(701,510),xy(702,496),xy(704,490),xy(706,479),xy(707,467),xy(707,466),xy(708,460),xy(709,458),xy(711,455),xy(715,454),xy(719,456),xy(720,462),xy(717,465),xy(718,467),xy(719,471),xy(720,478),xy(724,478),xy(725,475),xy(723,470),xy(725,464),xy(729,463),xy(733,464),xy(734,456),xy(730,450),xy(728,449),xy(715,442),xy(715,437),xy(714,432),xy(713,431),xy(719,426),xy(732,419),xy(750,410),xy(756,409),xy(768,400),xy(775,400),xy(776,401),xy(781,402),xy(793,407),xy(804,411),xy(818,416),xy(829,419),xy(834,421)];
polygon = L.polygon(points, {color: '#49441a', opacity:0.4, fill: true, fillColor: '#807522', fillOpacity: 0.4}).addTo(map);

*/
//points = [xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,),xy(,)];

// --------------------
// ICON TEST
//80,112
/*var myIcon = L.icon({
	iconUrl: 'map/icons/fronsmal.png',
	iconSize: [80,112],
	iconAnchor: [0,0],
	className: 'myHappyClassName'
});

var myOtherIcon = L.icon({
	iconUrl: 'map/icons/obergau.png',
	iconSize: [80,112],
	iconAnchor: [0,0],
	className: 'myHappyClassName'
});*/

//var markerSizes = [[80,112,-40,-56], [40,56,-20,-28], [20,28,-10,-14], [10,14,-5,-7], [5,7,-2.5,-3.5]/*, [2.5,3.5,-1.25,-1.75], [1.25,1.75,-0.626,-0.875]*/];
/*
//800x380
L.marker(xy(800,370), {icon: myIcon}).addTo(map).bindPopup('Fronsmal');
// --------------------

// 915,333
L.marker(xy(915,333), {icon: myOtherIcon}).addTo(map).bindPopup('Obergau');

// 1186,507
var gwyndon = xy(1186,507);
L.marker(gwyndon).addTo(map).bindPopup('Gwyndon');

map.setView(xy(1050,300),0);


map.on('zoomend', function() {
	var zoom = map.getZoom();
	// zoom 1: index 0
	// 0: 1
	// -1: 2
	// -2: 3
	// -3: 4
	var index = (zoom * -1) + 1;
	var sizes = markerSizes[index];
	$('#map_tadinthadar .myHappyClassName').css({'width':sizes[0] + 'px','height':sizes[1] + 'px', 'marginLeft':sizes[2]+'px','marginTop':sizes[3] + 'px'});

	/*var zoom = (map.getZoom() + 6);
    var newwidth = '' + ((80 / 10) * zoom) +'px';
    var newheight = '' + ((112 / 10) * zoom) +'px';
    var newMarginLeft = '' + ((40 / 10) * zoom) +'px';
    var newMarginRight = '' + ((56 / 10) * zoom) +'px';
	$('#map_tadinthadar .myHappyClassName').css({'width':newwidth,'height':newheight, 'marginLeft':newMarginLeft,'marginRight':newMarginRight}); */
//});