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

L.tileLayer('http://www.tadinthadar.com/tiles/{z}/{x}_{y}.png', {
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
mapRealms.addTo(map);

var helpers = ["helper_1", "helper_2", "helper_3", "helper_4", "helper_5", "helper_6", "helper_7", "helper_8", "helper_9", "helper_10", "helper_11"];
var nextHelper = 12;

var profileMouseOverAreas = [];
var profileClickableAreas = [];
var minMaxClickableProfileBounds = null;
var minMaxProfileBounds = null;

var provinceMouseOverAreas = [];
var provinceClickableAreas = [];
var minMaxClickableProvinceBounds = null;
var minMaxProvinceBounds = null;

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

function GetWikiUrl(title) {
	if (title.WikiUrl != "")
	{
		return title.WikiUrl;
	}

	if (title.parent != 0 && titles.has(title.parent))
	{
		var parentTitle = titles.get(title.parent);
		return GetWikiUrl(parentTitle);
	}
	return "";
}

window.onload = function() {

	clicker = null;
	mover = null;
	profileClicker = null;
	profileMover = null;

	for (var i = 0; i < 200; i++)
	{
		var myTmpCanvas = document.createElement('canvas');
		myTmpCanvas.id = "helper_" + nextHelper; // Id
		nextHelper++; // Increase counter
		myTmpCanvas.width = 200;
		myTmpCanvas.height = 200;
		myTmpCanvas.style.display = "none";
		document.body.appendChild(myTmpCanvas);
		helpers.push(myTmpCanvas.id);
	}

	// Load JSON Title Data
	var allData = loadJson(staticMapInfo);
	sanityCheck();

	// Load JSON Map Data
	var mapData = JSON.parse(staticMapData);

	for (var i = 0; i < mapData.length; i++)
	{
		var mapDataEntry = mapData[i];
		Object.setPrototypeOf(mapDataEntry, MapData.prototype);

		var linkText = "";

		if (mapDataEntry.title != 0 && titles.has(mapDataEntry.title))
		{
			var title = titles.get(mapDataEntry.title);
			var wikiUrl = GetWikiUrl(title);

			if (wikiUrl != "")
			{
				linkText = "<br><a href='" + wikiUrl + "' target='_blank'>Wiki Entry</a>";
			}
		}

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
				mark.bindPopup("<b>" + mapDataEntry.name + "</b>" + linkText);
			} else {
				mark = L.marker(mapDataEntry.GetMarkerPosition()).addTo(mapDataEntry.group == "Realm" ? mapRealms : markers);
				mark.bindPopup("<b>" + mapDataEntry.name + "</b>" + linkText);
			}
		}

		if (mapDataEntry.IsPolygon())
		{
			var myFillColor = (mapDataEntry.group == "Realm" ? mapDataEntry.fillColor : mapDataEntry.strokeColor);
			var poly = L.polygon(mapDataEntry.GetBoundaryPositions(), { color: mapDataEntry.strokeColor, weight: 1, opacity: mapDataEntry.strokeOpacity, fillOpacity : mapDataEntry.fillOpacity, fill: true, fillColor: myFillColor }).addTo(
				(mapDataEntry.group == "Province" ? mapProvinces : (mapDataEntry.group == "Region" ? mapRegions : mapRealms))
				);

			
			var name = mapDataEntry.name;
			var enableClick = false;
			if (mapDataEntry.title > 0 && titles.has(mapDataEntry.title) && mapDataEntry.UseTitleInfo())
			{
				name = getTitleMouseOverText(titles.get(mapDataEntry.title));
				enableClick = true;
			}

			poly.bindPopup("<b>" + name + "</b>" + linkText);
			poly.title = mapDataEntry.title;
			if (enableClick)
			{
				poly.on('click', function (e) {
					if (e.hasOwnProperty('target') && e.target.hasOwnProperty('title'))
					{
						var titleId = e.target.title;
						if (titles.has(titleId))
						{
							var title = titles.get(titleId);

							if (title.titleImportance <= 2)
							{
								renderCounty(titleId);
							} else if (title.owner != 0 && characterMap.has(title.owner)) {
								renderOwner(title.owner);
							}
						}
					}
				});
			}
		}
	}
}

function renderOwner(characterId) {
	clearCanvas("profile");

	document.getElementById("loadingScreen").style.display = "block";
	document.getElementById("profile").style.display = "none";

	if (!characterMap.has(characterId))
	{
		return;
	}

	var myCharacter = characterMap.get(characterId);

	var profileRenderStack = new RenderStack();

	renderCharacter(myCharacter, [0,0,0], profileRenderStack, "profile", helpers);
	
	profileRenderStack.callback = function () {
		
		if (profileMouseOverAreas && profileMouseOverAreas.length > 0)
		{
			var c = document.getElementById("profile");
			var cX = c.offsetLeft;
			var cY = c.offsetTop;

			minMaxClickableProfileBounds = getMinMaxBounds(profileMouseOverAreas);
			minMaxProfileBounds = getMinMaxBounds(profileMouseOverAreas);

			profileClicker = function (event) {
				var cursorX = event.offsetX;//event.pageX - cX;
				var cursorY = event.offsetY;//event.pageY - cY;

				if (minMaxClickableProfileBounds == null)
				{
					return;
				}

				if (!minMaxClickableProfileBounds.isInShape(cursorX,cursorY))
				{
					return;
				}

				for (var i = 0; i < profileClickableAreas.length; i++) {
					if (profileClickableAreas[i].isInShape(cursorX,cursorY))
					{
						if (profileClickableAreas[i].action)
						{
							profileClickableAreas[i].action();
						}

						break;
					}
				}
			};

			profileMover = function (event) {
				var cursorX = event.offsetX;//event.pageX - cX;
				var cursorY = event.offsetY;//event.pageY - cY;

				$("#profile").attr("title", "");

				if (minMaxProfileBounds == null)
				{
					return;
				}

				if (!minMaxProfileBounds.isInShape(cursorX,cursorY))
				{
					return;
				}

				for (var i = 0; i < profileMouseOverAreas.length; i++) {
					if (profileMouseOverAreas[i].isInShape(cursorX,cursorY))
					{
						$("#profile").attr("title", profileMouseOverAreas[i].description);
						break;
					}
				}
			};

			if (profileClicker)
			{
				c.addEventListener('click', profileClicker, true);
			}

			if (profileMover) 
			{
				c.addEventListener('mousemove', profileMover, false);
			}

			document.getElementById("loadingScreen").style.display = "none";
			document.getElementById("profile").style.display = "block";

			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
		}
	};

	loadRenderStack(profileRenderStack);
}

function renderCounty(titleId) {
	clearCanvas("province");
	clearCanvas("province_helper");

	clearEvents("province", clicker, mover);	

	if (!titles.has(titleId))
	{
		return;
	}

	var myTitle = titles.get(titleId);
	var myProvince = myTitle.titleImportance == 1 ? myTitle.parent : myTitle;

	provinceMouseOverAreas = [];
	provinceClickableAreas = [];

	var taskOne = renderProvince(myProvince, "province");
	var renderStack = new RenderStack();
	renderStack.addElements(taskOne);

	var owner = getTitleOwner(myProvince);

	if (owner != 0 && characterMap.has(owner))
	{
		var myCharacter = characterMap.get(owner);
		var taskTwo = renderCharacterPortrait(myCharacter, [0,0,1000], "province_helper", true, true);
		var taskThree = new RenderedImage(49, 49, 2000, 130, 130, "province_helper", "province");
		provinceMouseOverAreas.push( new MouseOverShape(49, 49, 49 + 130, 49 + 130, getFullNameWithPrimaryTitleLocation(myCharacter)) );
		provinceClickableAreas.push( new ClickableShape(49, 49, 49 + 130, 49 + 130, "Portrait", makeCharacterRenderFunc(myCharacter)) );
		renderStack.addElements(taskTwo);
		renderStack.addElement(taskThree);
	}

	renderStack.callback = function () {
		/*document.getElementById("loadingScreen").style.display = "none";
		document.getElementById("province").style.display = "block";*/

		if (provinceMouseOverAreas && provinceMouseOverAreas.length > 0)
		{
			var c = document.getElementById("province");
			var cX = c.offsetLeft;
			var cY = c.offsetTop;

			minMaxClickableProvinceBounds = getMinMaxBounds(provinceMouseOverAreas);
			minMaxProvinceBounds = getMinMaxBounds(provinceMouseOverAreas);

			clicker = function (event) {
				var cursorX = event.offsetX;//event.pageX - cX;
				var cursorY = event.offsetY;//event.pageY - cY;

				if (minMaxClickableProvinceBounds == null)
				{
					return;
				}

				if (!minMaxClickableProvinceBounds.isInShape(cursorX,cursorY))
				{
					return;
				}

				for (var i = 0; i < provinceClickableAreas.length; i++) {
					if (provinceClickableAreas[i].isInShape(cursorX,cursorY))
					{
						if (provinceClickableAreas[i].action)
						{
							provinceClickableAreas[i].action();
						}

						break;
					}
				}
			};

			mover = function (event) {
				var cursorX = event.offsetX;//event.pageX - cX;
				var cursorY = event.offsetY;//event.pageY - cY;

				$("#province").attr("title", "");

				if (minMaxProvinceBounds == null)
				{
					return;
				}

				if (!minMaxProvinceBounds.isInShape(cursorX,cursorY))
				{
					return;
				}

				for (var i = 0; i < provinceMouseOverAreas.length; i++) {
					if (provinceMouseOverAreas[i].isInShape(cursorX,cursorY))
					{
						$("#province").attr("title", provinceMouseOverAreas[i].description);
						break;
					}
				}
			};

			if (clicker)
			{
				c.addEventListener('click', clicker, true);
			}

			if (mover) 
			{
				c.addEventListener('mousemove', mover, false);
			}

			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
		}
	};

	loadRenderStack(renderStack);
}