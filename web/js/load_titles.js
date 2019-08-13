/*function loadJson(json) {
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

		updateSelectionList();
	}
}*/

function saveJson() {
	var saveData = new DataSaver(houses, titles, characterMap);
	var jsonData = JSON.stringify(saveData);
	download(jsonData, "test.json");
}

function isEmpire(title)
{
	return title.titleImportance == 5;
}

function isKingdom(title)
{
	return title.titleImportance == 4;
}

function isDuchy(title)
{
	return title.titleImportance == 3;
}

function isProvince(title)
{
	return title.titleImportance == 2;
}

function isHolding(title)
{
	return title.titleImportance == 1;
}

function updateSelectedTitle(id)
{
	if (!titles.has(id))
	{
		$("#save_character").attr("disabled", true);
		$("#delete_character").attr("disabled", true);
		$("#remove_trait").attr("disabled", true);
		$("#add_trait").attr("disabled", true);
		return;
	}
	
	currentTitle = id;
	var title = titles.get(id);

	$("#TitleId").html(id);

	if (isProvince(title))
	{
		$("[name=TitleName]").val("");
		$("[name=TitleName]").attr("disabled", true);

		// Holdings
		document.getElementById("aboveCounty").style.display = "none";
		document.getElementById("belowCounty").style.display = "block";
		$("[name=holdingsControls]").find("input,button,textarea,select").attr("disabled", false);
		$("[name=titlesControls]").find("input,button,textarea,select").attr("disabled", true);

		// Load holdings
		if (title.primaryHolding > 0 && titles.has(title.primaryHolding))
		{
			var primaryHolding = titles.get(title.primaryHolding);
			$("#holding1Id").html(title.primaryHolding);
			$("#HoldingType1").val(primaryHolding.holdingType);
			$("[name=HoldingName1]").val(primaryHolding.name);
			$("[name=HoldingId1]").val(primaryHolding.id);
			$("[name=title_emblem1]").attr("src", getHoldingTypePreviewImage(primaryHolding.holdingType));

			var holdingIterator = 2;

			for (var i = 0; i < title.holdings.length; i++)
			{
				var holdingId = title.holdings[i];
				if (holdingId == title.primaryHolding)
				{
					continue;
				}

				if (titles.has(holdingId))
				{
					var holding = titles.get(holdingId);
					$("#holding" + holdingIterator + "Id").html(holdingId);
					$("#HoldingType" + holdingIterator).val(holding.holdingType);
					$("[name=HoldingName" + holdingIterator + "]").val(holding.name);
					$("[name=HoldingId" + holdingIterator + "]").val(holdingId);
					$("[name=title_emblem" + holdingIterator + "]").attr("src", getHoldingTypePreviewImage(holding.holdingType));
				}

				holdingIterator++;
			}
		}

	} else {
		
		$("[name=TitleName]").attr("disabled", false);
		document.getElementById("aboveCounty").style.display = "block";
		document.getElementById("belowCounty").style.display = "none";
		$("[name=holdingsControls]").find("input,button,textarea,select").attr("disabled", true);
		$("[name=titlesControls]").find("input,button,textarea,select").attr("disabled", false);

		// Values:
		$("[name=TitleName]").val(title.name);

		// Available Lower Titles:
		refreshTitleLists(title);
	}

	$("#TitleType").val(getTitleType(title));

	$("[name=WikiUrl]").attr("disabled", false);
	$("[name=WikiUrl]").val(title.WikiUrl);

	$("#save_title").attr("disabled", false);
	$("#delete_title").attr("disabled", false);
}

function refreshTitleLists(title)
{
	$("#select_title_available_lower_titles").empty();
	$("#select_title_current_lower_titles").empty();

	for (var [key, value] of titles.entries()) {
		if (value.titleImportance >= title.titleImportance || value.titleImportance == 1)
		{
			// No higher titles, no holdings
			continue;
		}

		if (value.parent > 0 && value.parent != title.id)
		{
			// Already assigned to something else
			continue;
		}

		if (value.titleImportance == 2)
		{
			if (value.primaryHolding)
			{
				if (titles.has(value.primaryHolding))
				{
					$("#select_title_available_lower_titles").append(new Option(titles.get(value.primaryHolding).name, value.id));

					if (value.parent == title.id)
					{
						$("#select_title_current_lower_titles").append(new Option(titles.get(value.primaryHolding).name, value.id));
					}

					continue;
				}
			}
		}

		if (value.parent == title.id)
		{
			$("#select_title_current_lower_titles").append(new Option(value.name, value.id));
		}

		$("#select_title_available_lower_titles").append(new Option(value.name, value.id));
	}
}

function saveTitle()
{
	if (!titles.has(currentTitle))
	{
		return;
	}

	var title = titles.get(currentTitle);

	if (isProvince(title))
	{
		if (title.primaryHolding > 0 && titles.has(title.primaryHolding))
		{
			var primaryHolding = titles.get(title.primaryHolding);
			primaryHolding.holdingType = $("#HoldingType1").val();
			primaryHolding.name = $("[name=HoldingName1]").val();
		}

		var holdingMap = new Map();

		for (var holdingIterator = 0; holdingIterator < title.holdings.length; holdingIterator++)
		{
			var holdingId = parseInt($("[name=HoldingId" + (holdingIterator + 1) + "]").val());
			holdingMap.set(holdingId, holdingIterator + 1);
			//var holdingName = $("[name=HoldingName" + holdingIterator + "]").val();
			//var holdingType = $("#HoldingType" + holdingIterator).val();
		}

		for (var holdingIt in title.holdings)
		{
			var holdingId = title.holdings[holdingIt];

			if (holdingId == title.primaryHolding)
			{
				continue;
			}

			if (holdingMap.has(holdingId) && titles.has(holdingId))
			{
				var holdingIterator = holdingMap.get(holdingId);
				var holding = titles.get(holdingId);
				holding.holdingType = $("#HoldingType" + holdingIterator).val();
				holding.name = $("[name=HoldingName" + holdingIterator + "]").val();
			}
		}
	} else {
		title.name = $("[name=TitleName]").val();
	}

	title.WikiUrl = $("[name=WikiUrl]").val();

	updateSelectionList();
	$("#select_titles_list").val(currentTitle).change();
}

function deleteTitle()
{
	if (!titles.has(currentTitle))
	{
		return;
	}

	var title = titles.get(currentTitle);

	if (isProvince(title))
	{
		for (var holdingId in title.holdings)
		{
			// Remove owner
			if (titles.has(holdingId))
			{
				var holding = titles.get(holdingId);

				if (holding.owner > 0)
				{
					if (characterMap.has(holding.owner))
					{
						var owner = characterMap.get(holding.owner);
						owner.titles = owner.titles.filter(function (e) { return e !== holdingId});
					}
				}
			}

			titles.delete(holdingId);
		}
	}

	if (title.owner > 0 && characterMap.has(title.owner))
	{
		var owner = characterMap.get(title.owner);
		owner.titles = owner.titles.filter(function (e) { return e !== title.id});
	}
	removeFromParents(title);

	currentTitle = 0;
	updateSelectionList();
	$("#select_titles_list").val(currentTitle).change();
}

function removeFromParents(title, id) {
	if (title.parent == 0 || !titles.has(title.parent))
	{
		return;
	}

	var parent = titles.get(title.parent);

	if (parent.owner > 0 && characterMap.has(parent.owner))
	{
		var owner = characterMap.get(parent.owner);
		owner.titles = owner.titles.filter(function (e) { return e !== id});
	}

	if (parent.titleImportance >= 5)
	{
		// Empire
		parent.kingdoms = parent.kingdoms.filter(function (e) { return e !== id});
	}

	if (parent.titleImportance >= 4)
	{
		// Kingdom
		parent.duchies = parent.duchies.filter(function (e) { return e !== id});
	}

	if (parent.titleImportance >= 3)
	{
		// Duchy
		parent.counties = parent.counties.filter(function (e) { return e !== id});
	}

	removeFromParents(parent, id);
}

function addNewCounty()
{
	var newTitle = new County("MyNameDoesNotMatter", titleIterator++);

	for (var i = 0; i < 7; i++)
	{
		var newHolding = new Holding("placeholder", titleIterator++, holdingtypes.EMPTY);
		newHolding.parent = newTitle.id;
		titles.set(newHolding.id, newHolding);
		newTitle.holdings.push(newHolding.id);
		if (i == 0)
		{
			newTitle.primaryHolding = newHolding.id;
		}
	}

	titles.set(newTitle.id, newTitle);
	updateSelectionList();
	$("#select_titles_list").val(newTitle.id).change();
}

function addNewDuchy()
{
	var newTitle = new Duchy("MyHappyDuchy", titleIterator++);
	titles.set(newTitle.id, newTitle);
	updateSelectionList();
	$("#select_titles_list").val(newTitle.id).change();
}

function addNewKingdom()
{
	var newTitle = new Kingdom("MyHappyKingdom", titleIterator++);
	titles.set(newTitle.id, newTitle);
	updateSelectionList();
	$("#select_titles_list").val(newTitle.id).change();
}

function addNewEmpire()
{
	var newTitle = new Empire("MyHappyEmpire", titleIterator++);
	titles.set(newTitle.id, newTitle);
	updateSelectionList();
	$("#select_titles_list").val(newTitle.id).change();
}

function addLowerTitles(titleId)
{
	if (!titles.has(titleId))
	{
		return;
	}

	var title = titles.get(titleId);

	if (title.titleImportance <= 2)
	{
		return;
	}

	var selectedValues = $("#select_title_available_lower_titles").val();
	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);

		if (!titles.has(selectedValue))
		{
			continue;
		}

		var selectedTitle = titles.get(selectedValue);
		selectedTitle.parent = titleId;

		if (isProvince(selectedTitle) && title.counties)
		{
			title.counties.push(selectedValue);
		}

		if (isDuchy(selectedTitle) && title.duchies)
		{
			title.duchies.push(selectedValue);
		}

		if (isKingdom(selectedTitle) && title.kingdoms)
		{
			title.kingdoms.push(selectedValue);
		}
	}

	refreshTitleLists(title);
}

function removeLowerTitles(titleId)
{
	if (!titles.has(titleId))
	{
		return;
	}

	var title = titles.get(titleId);

	if (title.titleImportance <= 2)
	{
		return;
	}

	var selectedValues = $("#select_title_current_lower_titles").val();
	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);

		if (!titles.has(selectedValue))
		{
			continue;
		}

		var selectedTitle = titles.get(selectedValue);
		selectedTitle.parent = 0;

		if (isProvince(selectedTitle) && title.counties)
		{
			title.counties = title.counties.filter(function (e) { return e !== selectedValue});
		}

		if (isDuchy(selectedTitle) && title.duchies)
		{
			title.duchies = titles.duchies.filter(function (e) { return e !== selectedValue});
		}

		if (isKingdom(selectedTitle) && title.kingdoms)
		{
			title.kingdoms = titles.kingdoms.filter(function (e) { return e !== selectedValue});
		}
	}

	refreshTitleLists(title);
}

function updateSelectionList()
{
	$("#select_titles_list").empty();

	var insertionMap = new Map([...titles].sort((a, b) => a[1].titleImportance == b[1].titleImportance ? 0 : a[1].titleImportance > b[1].titleImportance ? -1 : 1 ));

	for (var [key, value] of insertionMap.entries()) {
		if (value.titleImportance == 1)
		{
			continue;
		}

		if (value.titleImportance == 2)
		{
			if (value.primaryHolding)
			{
				if (titles.has(value.primaryHolding))
				{
					$("#select_titles_list").append(new Option(titles.get(value.primaryHolding).name, value.id));
					continue;
				}
			}
		}

		$("#select_titles_list").append(new Option(value.name, value.id));
	}
}

function populateHoldingTypes(id)
{
	$(id).append(new Option("Empty", holdingtypes.EMPTY));
	$(id).append(new Option("Castle", holdingtypes.CASTLE));
	$(id).append(new Option("City", holdingtypes.CITY));
	$(id).append(new Option("Temple", holdingtypes.TEMPLE));
	$(id).append(new Option("Fort", holdingtypes.FORT));
	$(id).append(new Option("Trade Post", holdingtypes.TRADE));
}

function populateTitleTypes(id)
{
	$(id).append(new Option("County", titleTypes.COUNTY));
	$(id).append(new Option("Duchy", titleTypes.DUCHY));
	$(id).append(new Option("Kingdom", titleTypes.KINGDOM));
	$(id).append(new Option("Empire", titleTypes.EMPIRE));
}

function initTitlesForm()
{
	document.getElementById('contentFile').onchange = function(evt) {
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
                loadJson(event.target.result);
                updateSelectionList();
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }

	populateTitleTypes("#TitleType");

	populateHoldingTypes("#HoldingType1");
	populateHoldingTypes("#HoldingType2");
	populateHoldingTypes("#HoldingType3");
	populateHoldingTypes("#HoldingType4");
	populateHoldingTypes("#HoldingType5");
	populateHoldingTypes("#HoldingType6");
	populateHoldingTypes("#HoldingType7");
	
	$("[name=holdingsControls]").find("input,button,textarea,select").attr("disabled", true);
	$("[name=titlesControls]").find("input,button,textarea,select").attr("disabled", true);
	document.getElementById("aboveCounty").style.display = "none";
	document.getElementById("belowCounty").style.display = "none";

	updateSelectionList();

	$("#select_titles_list").change(function() {
		var id = parseInt($("#select_titles_list").val());

		if (titles.has(id))
		{
			updateSelectedTitle(id);
		}
	});

	$("#HoldingType1").change(function() {
		var type = $("#HoldingType1").val();
		$("[name=title_emblem1]").attr("src", getHoldingTypePreviewImage(type));
	});
	$("#HoldingType2").change(function() {
		var type = $("#HoldingType2").val();
		$("[name=title_emblem2]").attr("src", getHoldingTypePreviewImage(type));
	});
	$("#HoldingType3").change(function() {
		var type = $("#HoldingType3").val();
		$("[name=title_emblem3]").attr("src", getHoldingTypePreviewImage(type));
	});
	$("#HoldingType4").change(function() {
		var type = $("#HoldingType4").val();
		$("[name=title_emblem4]").attr("src", getHoldingTypePreviewImage(type));
	});
	$("#HoldingType5").change(function() {
		var type = $("#HoldingType5").val();
		$("[name=title_emblem5]").attr("src", getHoldingTypePreviewImage(type));
	});
	$("#HoldingType6").change(function() {
		var type = $("#HoldingType6").val();
		$("[name=title_emblem6]").attr("src", getHoldingTypePreviewImage(type));
	});
	$("#HoldingType7").change(function() {
		var type = $("#HoldingType7").val();
		$("[name=title_emblem7]").attr("src", getHoldingTypePreviewImage(type));
	});
	
	$("#add_lower_title").click(function() {
		if (currentTitle == 0)
		{
			return;
		}

		addLowerTitles(currentTitle);
	});

	$("#remove_lower_title").click(function() {
		if (currentTitle == 0)
		{
			return;
		}

		removeLowerTitles(currentTitle);
	});

	$("#save_json").click(function() {
		if (currentTitle > 0)
		{
			saveTitle();
		}

		saveJson();
	});

	$("#add_new_county").click(function() {
		if (currentTitle > 0)
		{
			saveTitle();
		}

		addNewCounty();
	});

	$("#add_new_duchy").click(function() {
		if (currentTitle > 0)
		{
			saveTitle();
		}

		addNewDuchy();
	});

	$("#add_new_kingdom").click(function() {
		if (currentTitle > 0)
		{
			saveTitle();
		}

		addNewKingdom();
	});

	$("#add_new_empire").click(function() {
		if (currentTitle > 0)
		{
			saveTitle();
		}

		addNewEmpire();
	});

	$("#delete_title").click(function() {
		if (currentTitle <= 0)
		{
			return;
		}

		deleteTitle();
	});

	$("#save_title").click(function() {
		if (currentTitle <= 0)
		{
			return;
		}

		saveTitle();
	});
}