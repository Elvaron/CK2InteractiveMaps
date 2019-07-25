var bounds1 = 9984;
var bounds2 = 9984;

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

map.setView(map.unproject([3940, 2457], mapMaxZoom), mapMaxZoom);

L.tileLayer('http://interactivetadinthadar.000webhostapp.com/tiles/{z}/{x}_{y}.png', {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    bounds: mapBounds,
    noWrap: false,
    continuousWorld: false
}).addTo(map);

var markers = L.layerGroup();
var mapProvinces = L.layerGroup();
var mapRegions = L.layerGroup();
var mapRealms = L.layerGroup();

var overlayMaps = {
	"Markers": markers,
	"Individual Provinces": mapProvinces,
	"Counties & Duchies": mapRegions,
	"Realms": mapRealms
};

L.control.layers(null, overlayMaps).addTo(map);

markers.addTo(map);
mapProvinces.addTo(map);

/*var layerGroup = L.layerGroup().addTo(map);
var vectorGroup = L.layerGroup().addTo(map);*/

function onOverlayAdd(e) {
	if (e.name == "Provinces")
	{
		// Already pushing correct one on top
		return;
	}

	if (map.hasLayer(mapProvinces))
	{
		mapProvinces.eachLayer(function (layer) { layer.bringToFront(); });
	}
}

map.on('overlayadd', onOverlayAdd);


function getPos(x,y) {
	return map.unproject([x, y], mapMaxZoom);
}


function updateOpacity(type, value)
{
  var num = value;

  if (type == "province")
  {
    mapProvinces.eachLayer(function (layer) {
      if (layer.hasOwnProperty('options') && layer.options.hasOwnProperty('fill'))
      {
        layer.setStyle( { fillOpacity: num } );
      }
    });
  }
  else if (type == "region")
  {
    mapRegions.eachLayer(function (layer) {
      if (layer.hasOwnProperty('options') && layer.options.hasOwnProperty('fill'))
      {
        layer.setStyle( { fillOpacity: num } );
      }
    });
  }
  else {
    mapRealms.eachLayer(function (layer) {
      if (layer.hasOwnProperty('options') && layer.options.hasOwnProperty('fill'))
      {
        layer.setStyle( { fillOpacity: num } );
      }
    });
  }
}

window.onload = function() {

  // Load JSON Data
	var mapData = JSON.parse(staticMapData);

	for (var i = 0; i < mapData.length; i++)
	{
		var mapDataEntry = mapData[i];
		Object.setPrototypeOf(mapDataEntry, MapData.prototype);

		if (mapDataEntry.IsMarker())
		{
			var imageUrl = mapDataEntry.GetImageUrl();
			var mark = null;
			if (imageUrl != "")
			{
				// Different height if it has a crown
				var yValues = (imageUrl.substring(0,3) == "map") ? [61.5,60] : [42,40];

				var myIcon = L.icon({
					iconUrl: imageUrl,
					iconSize: [40, yValues[0]],
					iconAnchor: [20, yValues[1]],
					popupAnchor: [0, - yValues[1]],
					/*shadowUrl: 'my-icon-shadow.png',
					shadowSize: [68, 95],
					shadowAnchor: [22, 94]*/
				});

				mark = L.marker(mapDataEntry.GetMarkerPosition(), { icon : myIcon}).addTo( mapDataEntry.group == "Realm" ? mapRealms : markers );
				mark.bindPopup(mapDataEntry.name);
			} else {
				mark = L.marker(mapDataEntry.GetMarkerPosition()).addTo(mapDataEntry.group == "Realm" ? mapRealms : markers);
				mark.bindPopup(mapDataEntry.name);
			}
		}

		if (mapDataEntry.IsPolygon())
		{
			var myFillColor = (mapDataEntry.group == "Realm" ? mapDataEntry.fillColor : mapDataEntry.strokeColor);
			var poly = L.polygon(mapDataEntry.GetBoundaryPositions(), { color: mapDataEntry.strokeColor, weight: 1, opacity: mapDataEntry.strokeOpacity, fillOpacity : mapDataEntry.fillOpacity, fill: true, fillColor: myFillColor }).addTo(
				(mapDataEntry.group == "Province" ? mapProvinces : (mapDataEntry.group == "Region" ? mapRegions : mapRealms))
				);
			poly.bindPopup(mapDataEntry.name);
		}
	}
}