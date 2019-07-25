function initDataForm() {

    $("#save_zip").click(function () {
		$("#save_zip").attr("disabled", true);
		//renderMapIcons();
	});

	document.getElementById('ctFile').onchange = function(evt) {
        try {
            let files = evt.target.files;
            if (!files.length) {
                alert('No file selected!');
                return;
            }
            let file = files[0];
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
                loadCtJson(event.target.result)
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }

    document.getElementById('mapFile').onchange = function(evt) {
        try {
            let files = evt.target.files;
            if (!files.length) {
                alert('No file selected!');
                return;
            }
            let file = files[0];
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
                loadMapJson(event.target.result)
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }
}

function loadCtJson(data)
{
    $("#ct-data-loaded").prop('checked', true);
    loadJson(data);
    refreshMemoryStats();
}

function loadMapJson(data)
{
    $("#map-data-loaded").prop('checked', true);
}

function refreshMemoryStats()
{
    $("#characterCount").html(characterMap.size);   
    $("#titleCount").html(titles.size);
    $("#houseCount").html(houses.size);
}

function loadJson(json) {
    var data = JSON.parse(json);

    var dataContainer = new DataLoader();

    var highestChar = 0;
    var highestTitle = 0;
    var highestHouse = 0;

    if (data.characters)
    {
        for (var i = 0; i < data.characters.length; i++)
        {
            if (data.characters[i].length > 1)
            {
                var index = parseInt(data.characters[i][0]);
                highestChar = Math.max(index, highestChar);
                dataContainer.characters.set(index, data.characters[i][1]);
            }
        }
    }

    if (data.houses)
    {
        for (var i = 0; i < data.houses.length; i++)
        {
            if (data.houses[i].length > 1)
            {
                var index = parseInt(data.houses[i][0]);
                highestHouse = Math.max(index, highestHouse);
                dataContainer.houses.set(index, data.houses[i][1]);
            }
        }
    }

    if (data.titles)
    {
        for (var i = 0; i < data.titles.length; i++)
        {
            if (data.titles[i].length > 1)
            {
                var index = parseInt(data.titles[i][0]);
                highestTitle = Math.max(index, highestTitle);
                dataContainer.titles.set(index, data.titles[i][1]);
            }
        }
    }

    if (dataContainer instanceof DataLoader)
    {
        characterMap = dataContainer.characters;
        houses = dataContainer.houses;
        titles = dataContainer.titles;

        characterIterator = ++highestChar;
        houseIterator = ++highestHouse;
        titleIterator = ++highestTitle;
    }
}