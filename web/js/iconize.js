function getMarkersFromMapData() {
	// Step 1: get map data
	var mapData = JSON.parse(staticMapData);

	var markerData = [];

	for (var i = 0; i < mapData.length; i++)
	{
		var mapDataEntry = mapData[i];
		Object.setPrototypeOf(mapDataEntry, MapData.prototype);
		if (mapDataEntry.IsMarker() && titles.has(mapDataEntry.title))
		{
			markerData.push(mapDataEntry);
		}
	}

	return markerData;
}

function renderMapIcons() {
	//var helpers = [];
	//var helperIterator = 0;
	var nextHelper = 0;
	var markerData = getMarkersFromMapData();
	var helperMap = new Map();

	// Create Canvases
	for (var i = 0; i < markerData.length; i++)
	{
		var myTmpCanvas = document.createElement('canvas');
		myTmpCanvas.id = "helper_" + nextHelper; // Id
		nextHelper++;
		myTmpCanvas.width = 80;
		myTmpCanvas.height = 123;
		myTmpCanvas.style.display = "none";

		document.body.appendChild(myTmpCanvas);
		//helpers.push(myTmpCanvas.id);

		helperMap.set(i, myTmpCanvas.id);
	}

	var zip = new JSZip();

	storeMapData(zip);

	for (var i = 0; i < markerData.length; i++)
	{
		var markerToRender = markerData[i];
		var canvasToRenderTo = helperMap.get(i);

		renderMapIcon(markerToRender, canvasToRenderTo, zip, markerData.length);
	}
}

function storeMapData(zip)
{
	var mapData = [];

	var example1 = new MapData("1", 1);
	example1.group = "Automatic";

	var example2 = new MapData("2", 2);
	example2.group = "Automatic";

	mapData.push(example1);
	mapData.push(example2);

	var jsonData = JSON.stringify(mapData);
	var fullData = "var staticMapData = '" + jsonData + "';";

	zip.file("mapData.js", fullData);
}

var currentZipCount = 0;

function renderMapIcon (mapDataItem, canvasId, zip, zipLength)
{
	var renderStack = new RenderStack();

	var title = titles.get(mapDataItem.title);

	// Partial Images
	var titleImages = getTitleImages(title);
	var crownImages = getCrownImages(title);

	//renderStack.addElement( new Shape(0, 41, 1, titleImages[0], 80, 84, canvasId));
	renderStack.addElement( new Shape(0, 41, 2, titleImages[1], 80, 84, canvasId));
	//renderStack.addElement( new Shape(9, -11, 3, crownImages[0], 64, 64, canvasId));
	renderStack.addElement( new Shape(9, -11, 4, crownImages[1], 64, 64, canvasId));

	// Callback Function
	renderStack.callback = function () {
		var targetCanvas = document.getElementById(canvasId);
		targetCanvas.toBlob(function (blob) {
			zip.file((title.name != "" ? title.name : title.id) + ".png", blob);
			currentZipCount++;
			if (currentZipCount >= zipLength)
			{
				zip.generateAsync({type:"blob"}).then(function(content) { saveAs(content, "example.zip")});
			}
		});
	};

	loadRenderStack(renderStack);
}

function saveAs(content, fileName)
{
	if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(content, fileName);
    }
    else {
        //Everything else
        var url = window.URL.createObjectURL(content);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName;

        setTimeout(() => {
            //setTimeout hack is required for older versions of Safari

            a.click();

            //Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 1);
    }
}


window.onload = function() {

	initPage();
}

function loadTitles()
{
	// Load JSON Title Data
	var titleData = JSON.parse(staticTitles);

	for (var i = 0; i < titleData.length; i++)
	{
		var myTitle = titleData[i];

		if (myTitle.titleImportance == 5)
		{
			Object.setPrototypeOf(myTitle, Empire.prototype);
		}
		else if (myTitle.titleImportance == 4)
		{
			Object.setPrototypeOf(myTitle, Kingdom.prototype);
		}
		else if (myTitle.titleImportance == 3)
		{
			Object.setPrototypeOf(myTitle, Duchy.prototype);
		}
		else if (myTitle.titleImportance == 2)
		{
			Object.setPrototypeOf(myTitle, County.prototype);
		}
		else if (myTitle.titleImportance == 1)
		{
			Object.setPrototypeOf(myTitle, Holding.prototype);
		}

		titles.set(myTitle.id, myTitle);
	}
}

function initPage() {
	loadTitles();

	$("#save_zip").click(function () {
		$("#save_zip").attr("disabled", true);
		renderMapIcons();
	});
}