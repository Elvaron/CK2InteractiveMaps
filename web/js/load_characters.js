var $flowchart = null;
var $blankFlowChartData = null;

function saveJson() {
	var saveData = new DataSaver(houses, titles, characterMap);
	var jsonData = JSON.stringify(saveData);
	download(jsonData, "test.json");
}

function updateSelectionList() {
	$("#select_character_list").empty();
	$("#select_character_graph").empty();
	$("#select_character_graph").append(new Option("", 0));

	var importances = [];
	importances[6] = []; // For dead people
	importances[0] = [];
	importances[1] = [];
	importances[2] = [];
	importances[3] = [];
	importances[4] = [];
	importances[5] = [];

	var dudes = [];
	var councilMembers = [];

	for (var [key, value] of characterMap.entries()) {
		dudes.push(value);

		if (value.council.chancellor > 0)
		{
			councilMembers.push(value.council.chancellor);
		}

		if (value.council.marshal > 0)
		{
			councilMembers.push(value.council.marshal);
		}

		if (value.council.steward > 0)
		{
			councilMembers.push(value.council.steward);
		}

		if (value.council.spymaster > 0)
		{
			councilMembers.push(value.council.spymaster);
		}

		if (value.council.chaplain > 0)
		{
			councilMembers.push(value.council.chaplain);
		}
	}

	dudes.sort(function(a, b) { var textA = a.name.toUpperCase(); var textB = b.name.toUpperCase(); return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; });

	for (var i = 0; i < dudes.length; i++)
	{
		var value = dudes[i];

		if (!value.alive)
		{
			importances[6].push(value);
			continue;
		}

		if (value.primaryTitle != 0 && titles.has(value.primaryTitle))
		{
			var importance = titles.get(value.primaryTitle).titleImportance;
			importances[importance].push(value);
		} else {
			importances[0].push(value);
		}
	}

	for (var i = 5; i >= -1; i--) {
		var subarray = importances[i >= 0 ? i : 6];
		for (var j = 0; j < subarray.length; j++)
		{
			var character = subarray[j];
			var councilMember = (i == 0) && councilMembers.includes(character.id);
			var housedIndex = (i == 0 && character.house > 0) ? ("0.5") : i;

			var index = (!character.alive) ? "[D] " : (councilMember ? "[C] " : "[" + housedIndex + "] ");

			$("#select_character_list").append(new Option(index + character.name, character.id));
			$("#select_character_graph").append(new Option(index + character.name, character.id));
		}
	}
}

function addNewCharacter() {
	var female = getRandomNumber(0, 2) > 0;
	var randomName = female ? femaleNames[getRandomNumber(0, femaleNames.length)] : maleNames[getRandomNumber(0, maleNames.length)];
	var newCharacter = new Character(randomName, characterIterator++);
	newCharacter.gender = female ? gender.FEMALE : gender.MALE;
	newCharacter.age = 20;
	characterMap.set(newCharacter.id, newCharacter);
	updateSelectionList();
	$("#select_character_list").val(newCharacter.id).change();
}

function deleteCharacter() {
	characterMap.delete(currentCharacter);
	currentCharacter = 0;
}

function saveCharacter(reload) {

	var character = characterMap.get(currentCharacter);

	// Name
	character.name = $("[name=CharacterName]").val();	

	// Alive & Gender
	character.alive = $("[name=CharacterAlive]").prop("checked");
	character.gender = $("#CharacterGender").val();

	// Age & Epithet
	character.age = parseInt($("[name=CharacterAge]").val());
	character.epithet = $("[name=CharacterEpithet]").val();
	character.customTitle = $("[name=CustomTitle]").val();
	character.rulerType = $("#CharacterGovernmentType").val();

	// Stronghold Type & Class
	character.strongholdType = $("#select_character_stronghold_type").val();
	character.strongholdClass = $("#select_character_stronghold_class").val();

	// NPC Class & Background
	character.dndattributes.npcClass = $("#select_character_npc_class").val();

	// Race & Armor Class
	character.dndattributes.race = $("#select_character_race").val();
	character.dndattributes.armorClass = parseInt($("[name=CharacterArmorClass]").val());

	// Attributes
	character.dndattributes.strength = parseInt($("[name=CharacterSTR]").val());
	character.dndattributes.dexterity = parseInt($("[name=CharacterDEX]").val());
	character.dndattributes.constitution = parseInt($("[name=CharacterCON]").val());
	character.dndattributes.intelligence = parseInt($("[name=CharacterINT]").val());
	character.dndattributes.wisdom = parseInt($("[name=CharacterWIS]").val());
	character.dndattributes.charisma = parseInt($("[name=CharacterCHA]").val());
	character.ck2attributes.diplomacy = parseInt($("[name=CharacterDIPL]").val());
	character.ck2attributes.martial = parseInt($("[name=CharacterMART]").val());
	character.ck2attributes.stewardship = parseInt($("[name=CharacterSTEW]").val());
	character.ck2attributes.intrigue = parseInt($("[name=CharacterINTR]").val());
	character.ck2attributes.learning = parseInt($("[name=CharacterLEAR]").val());
	character.ck2attributes.combat = parseInt($("[name=CharacterCOMB]").val());

	// Alignment & House
	character.dndattributes.alignment = $("#select_character_alignment").val();
	character.house = parseInt($("#select_character_house").val());

	// Traits
	var traits = GetTraits();
	var options = $('#select_character_current_traits option');

	var selectedValues = $.map(options, function(option) {
	    return option.value;
	});

	character.traits = [];

	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);
		if (traits.has(selectedValue))
		{
			character.addTrait(selectedValue);
		}
	}

	saveRelationship(character);

	// Titles
	saveTitles(character);

	refreshPortrait(character);

	updateSelectionList();

	if (reload)
	{
		$("#select_character_list").val(character.id).change();
	}
}

function saveTitle(character, titleId, makePrimary) {
	var title = titles.get(titleId);
	character.addTitle(titleId, makePrimary);
	
	// set owner
	if (title.titleImportance == 2)
	{
		// Case county: Character also owns primaryHolding
		if (title.primaryHolding != 0 && titles.has(title.primaryHolding))
		{
			var primaryHolding = titles.get(title.primaryHolding);
			if (!character.titles.includes(title.primaryHolding))
			{
				character.addTitle(title.primaryHolding, false);
			}
			primaryHolding.owner = character.id;
		}
	}
	else if (title.titleImportance == 1)
	{
		if (title.parent != 0 && titles.has(title.parent))
		{
			var county = titles.get(title.parent);
			if (county.primaryHolding == titleId)
			{
				saveTitle(character, county.id, makePrimary);
			}
		}

		title.owner = character.id;
	}
	else
	{
		title.owner = character.id;
	}

	// Set Ruler Type
	if (makePrimary && title.titleImportance == 1 && character.rulerType == 0)
	{
		if (title.holdingType == holdingtypes.CASTLE)
		{
			character.rulerType = 1;
		}

		if (title.holdingType == holdingtypes.CITY)
		{
			character.rulerType = 2;
		}

		if (title.holdingType == holdingtypes.TEMPLE)
		{
			character.rulerType = 3;
		}
	}

	// Set liege
	if (makePrimary && title.parent != 0 && titles.has(title.parent))
	{
		var parentTitle = titles.get(title.parent);

		var owner = 0;

		if (parentTitle.titleImportance == 2)
		{
			if (parentTitle.primaryHolding != 0 && parentTitle.primaryHolding != titleId && titles.has(parentTitle.primaryHolding))
			{
				owner = titles.get(parentTitle.primaryHolding).owner;
			}
		} else {
			owner = parentTitle.owner;
		}

		if (owner != 0 && characterMap.has(owner))
		{
			var liege = characterMap.get(owner);
			character.liege = liege.id;
			if (!liege.vassals.includes(character.id))
			{
				liege.vassals.push(character.id);
			}
		}
	}

	// Set vassals
	var directVassals = getDirectVassalTitles(title);
	for (var j = 0; j < directVassals.length; j++)
	{
		var directVassalTitle = directVassals[j];
		if (directVassalTitle.owner != 0 && directVassalTitle.owner != character.id && characterMap.has(directVassalTitle.owner))
		{
			var directVassal = characterMap.get(directVassalTitle.owner);
			// Character as liege to his vassals
			directVassal.liege = character.id;
			if (!character.vassals.includes(directVassal.id))
			{
				// Vassals as vassal to character
				character.vassals.push(directVassal.id);
			}
		}
	}
}

function saveTitles(character) {
	var primary = $("#select_character_primary_title").val();
	var primaryValue = parseInt(primary);

	var options = $('#select_character_held_titles option');

	var selectedValues = $.map(options, function(option) {
	    return option.value;
	});

	for (var i = 0; i < character.titles.length; i++)
	{
		var titleId = character.titles[i];
		if (titles.has(titleId))
		{
			var title = titles.get(titleId);
			if (title.owner == character.id)
			{
				title.owner = 0;
			}
		}
	}

	character.titles = [];

	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);
		if (titles.has(selectedValue))
		{
			var isPrimary = !(isNaN(primaryValue) || primaryValue != selectedValue);
			saveTitle(character, selectedValue, isPrimary);
		}
	}

	// Claims
	var options = $('#select_character_title_claims option');

	var selectedValues = $.map(options, function(option) {
	    return option.value;
	});

	character.claims = [];

	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);
		if (titles.has(selectedValue))
		{
			var title = titles.get(selectedValue);
			if (title.titleImportance == 1 && title.parent > 0 && titles.has(title.parent) && titles.get(title.parent).primaryHolding == selectedValue)
			{
				character.claims.push(title.parent);
			}

			character.claims.push(selectedValue);
		}
	}
}

function populateHouses(id) {
	$(id).empty();
	$(id).append(new Option("", 0));

	for (var [key, value] of houses.entries()) {
		$(id).append(new Option(value.name, value.id));
	}
}

function populateTitles(id, hideOwned) {
	$(id).empty();
	for (var [key, value] of titles.entries()) {
		if (value.titleImportance == 1 && value.name == "placeholder")
		{
			continue;
		}

		if (hideOwned && value.owner > 0)
		{
			continue;
		}

		var name = value.name;

		if (value.titleImportance == 2)
		{
			continue;
		}

		var suffix = getTitleMouseOverText(value);

		if (value.titleImportance == 1 && value.parent > 0 && titles.has(value.parent) && titles.get(value.parent).primaryHolding == value.id)
		{
			// Is a primary holding
			suffix = "[C] " + suffix;
		}

		$(id).append(new Option(suffix, value.id));
	}
}

function populateWithCharacters(id, characterToIgnore) {
	$(id).empty();

	$(id).append(new Option("", 0));

	for (var [key, value] of characterMap.entries()) {
		if (key == characterToIgnore)
		{
			continue;
		}

		$(id).append(new Option(value.name, value.id));
	}
}

function randomizeDndStats()
{
	var str = getRandomStat();
	var dex = getRandomStat();
	var con = getRandomStat();
	var int = getRandomStat();
	var wis = getRandomStat();
	var cha = getRandomStat();
	var ac = 10 + dex;

	$("[name=CharacterSTR]").val(str);
	$("[name=CharacterDEX]").val(dex);
	$("[name=CharacterCON]").val(con);
	$("[name=CharacterINT]").val(int);
	$("[name=CharacterWIS]").val(wis);
	$("[name=CharacterCHA]").val(cha);
	$("[name=CharacterArmorClass]").val(ac);
}

function updateDndStatsRace(race)
{
	var str = parseInt($("[name=CharacterSTR]").val()) + getRacialSTRBonus(race);
	var dex = parseInt($("[name=CharacterDEX]").val()) + getRacialDEXBonus(race);
	var con = parseInt($("[name=CharacterCON]").val()) + getRacialCONBonus(race);
	var int = parseInt($("[name=CharacterINT]").val()) + getRacialINTBonus(race);
	var wis = parseInt($("[name=CharacterWIS]").val()) + getRacialWISBonus(race);
	var cha = parseInt($("[name=CharacterCHA]").val()) + getRacialCHABonus(race);
	var ac = parseInt($("[name=CharacterArmorClass]").val());

	$("[name=CharacterSTR]").val(str);
	$("[name=CharacterDEX]").val(dex);
	$("[name=CharacterCON]").val(con);
	$("[name=CharacterINT]").val(int);
	$("[name=CharacterWIS]").val(wis);
	$("[name=CharacterCHA]").val(cha);
	$("[name=CharacterArmorClass]").val(ac);
}

function updateDndStats(character, npcClass, race)
{
	var str = npcClass.strength + getRacialSTRBonus(race);
	var dex = npcClass.dexterity + getRacialDEXBonus(race);
	var con = npcClass.constitution + getRacialCONBonus(race);
	var int = npcClass.intelligence + getRacialINTBonus(race);
	var wis = npcClass.wisdom + getRacialWISBonus(race);
	var cha = npcClass.charisma + getRacialCHABonus(race);
	var ac = npcClass.armorClass;

	$("[name=CharacterSTR]").val(str);
	$("[name=CharacterDEX]").val(dex);
	$("[name=CharacterCON]").val(con);
	$("[name=CharacterINT]").val(int);
	$("[name=CharacterWIS]").val(wis);
	$("[name=CharacterCHA]").val(cha);
	$("[name=CharacterArmorClass]").val(ac);
}

function updateSelectedCharacter(id) {

	if (!characterMap.has(id))
	{
		$("#save_character").attr("disabled", true);
		$("#delete_character").attr("disabled", true);
		$("#remove_trait").attr("disabled", true);
		$("#add_trait").attr("disabled", true);
		$("#remove_held_title").attr("disabled", true);
		$("#add_held_title").attr("disabled", true);
		$("#remove_title_claim").attr("disabled", true);
		$("#add_title_claim").attr("disabled", true);
		$("#randomPortrait").attr("disabled", true);
		$("#randomDndStats").attr("disabled", true);
		$("#randomTraits").attr("disabled", true);
		$("#randomSpouse").attr("disabled", true);
		$("#randomParentage").attr("disabled", true);
		$("#randomCouncil").attr("disabled", true);
		$("#clearCouncil").attr("disabled", true);

		$("#addRandomChild").attr("disabled", true);
		$("#addRandomSibling").attr("disabled", true);
		$("#addRandomCourtier").attr("disabled", true);

		$("#randomStronghold").attr("disabled", true);
		$("#randomAge").attr("disabled", true);
		$("#randomNpcClass").attr("disabled", true);

		$("#randomName").attr("disabled", true);

		refreshPortrait(null);
		return;
	}

	currentCharacter = id;
	var character = characterMap.get(id);

	refreshPortrait(character);

	// Populate Character dropdowns
	populateWithCharacters("#select_character_spouse", id);
	populateWithCharacters("#select_character_heir", id);
	populateWithCharacters("#select_character_liege", id);
	populateWithCharacters("#select_character_regent", id);

	// ID & Name
	$("#CharacterId").html(character.id);
	$("[name=CharacterName]").val(character.name);
	// Alive & Gender
	$("[name=CharacterAlive]").prop("checked", character.alive);
	$("#CharacterGender").val(character.gender);
	// Age & Epithet
	$("[name=CharacterAge]").val(character.age);
	$("[name=CharacterEpithet]").val(character.epithet);
	// Title and Ruler Type
	$("[name=CustomTitle]").val(character.customTitle);
	$("#CharacterGovernmentType").val(character.rulerType);
	// Stronghold Type & Class
	$("#select_character_stronghold_type").val(character.strongholdType);
	$("#select_character_stronghold_class").val(character.strongholdClass);
	// NPC Class & Background
	$("#select_character_npc_class").val(character.dndattributes.npcClass);
	//if (character.dndattributes.npcClass != null)

	// Race & Armor Class
	$("#select_character_race").val(character.dndattributes.race);
	$("[name=CharacterArmorClass]").val(character.dndattributes.armorClass);
	
	// Attributes
	$("[name=CharacterSTR]").val(character.dndattributes.strength);
	$("[name=CharacterDEX]").val(character.dndattributes.dexterity);
	$("[name=CharacterCON]").val(character.dndattributes.constitution);
	$("[name=CharacterINT]").val(character.dndattributes.intelligence);
	$("[name=CharacterWIS]").val(character.dndattributes.wisdom);
	$("[name=CharacterCHA]").val(character.dndattributes.charisma);
	$("[name=CharacterDIPL]").val(character.ck2attributes.diplomacy);
	$("[name=CharacterMART]").val(character.ck2attributes.martial);
	$("[name=CharacterSTEW]").val(character.ck2attributes.stewardship);
	$("[name=CharacterINTR]").val(character.ck2attributes.intrigue);
	$("[name=CharacterLEAR]").val(character.ck2attributes.learning);
	$("[name=CharacterCOMB]").val(character.ck2attributes.combat);

	// Alignment & House
	$("#select_character_alignment").val(character.dndattributes.alignment);
	if (character.house > 0)
	{
		$("#select_character_house").val(character.house);
	} else {
		$("#select_character_house").val(0);
	}

	refreshHouseEmblem();

	// Traits
	refreshTraits(character);
	refreshTitles(character);

	$("#save_character").attr("disabled", false);
	$("#delete_character").attr("disabled", false);
	$("#remove_trait").attr("disabled", false);
	$("#add_trait").attr("disabled", false);
	$("#randomPortrait").attr("disabled", false);
	$("#randomDndStats").attr("disabled", false);
	$("#randomTraits").attr("disabled", false);
	$("#randomParentage").attr("disabled", false);
	$("#randomSpouse").attr("disabled", false);
	$("#randomCouncil").attr("disabled", false);
	$("#clearCouncil").attr("disabled", false);

	$("#remove_held_title").attr("disabled", false);
	$("#add_held_title").attr("disabled", false);
	$("#remove_title_claim").attr("disabled", false);
	$("#add_title_claim").attr("disabled", false);

	$("#randomStronghold").attr("disabled", false);
	$("#randomAge").attr("disabled", false);
	$("#randomNpcClass").attr("disabled", false);

	$("#addRandomChild").attr("disabled", false);
	$("#addRandomSibling").attr("disabled", false);
	$("#addRandomCourtier").attr("disabled", false);
	$("#randomName").attr("disabled", false);

	loadRelationship(character);
}

function refreshTraits(character)
{
	$("#select_character_current_traits").empty();

	var traits = GetTraits();

	for (var i = 0; i < character.traits.length; i++) {
		var traitId = character.traits[i];
		if (traits.has(traitId))
		{
			var trait = traits.get(traitId);
			$("#select_character_current_traits").append(new Option(trait.name, trait.id));
		}
	}
}

function refreshTitles(character)
{
	$("#select_character_held_titles").empty();
	$("#select_character_primary_title").empty();
	$("#select_character_primary_title").append(new Option("", 0));

	$("#select_character_title_claims").empty();
	for (var i = 0; i < character.titles.length; i++)
	{
		var titleId = character.titles[i];
		if (titles.has(titleId))
		{
			var title = titles.get(titleId);

			if (title.titleImportance == 2)
			{
				continue;
			}

			$("#select_character_held_titles").append(new Option(title.name, title.id));
			$("#select_character_primary_title").append(new Option(title.name, title.id));
		}
	}

	if (character.primaryTitle != 0 && titles.has(character.primaryTitle))
	{
		var primaryTitle = titles.get(character.primaryTitle);

		if (primaryTitle.titleImportance == 2 && primaryTitle.primaryHolding != 0 && titles.has(primaryTitle.primaryHolding))
		{
			$("#select_character_primary_title").val(primaryTitle.primaryHolding);
		} else {
			$("#select_character_primary_title").val(character.primaryTitle);
		}
	}

	for (var i = 0; i < character.claims.length; i++)
	{
		var titleId = character.claims[i];
		if (titles.has(titleId))
		{
			var title = titles.get(titleId);

			if (title.titleImportance == 2)
			{
				continue;
			}

			$("#select_character_title_claims").append(new Option(title.name, title.id));
		}
	}
}

function refreshPortrait(character)
{
	clearCanvas("portrait");

	if (character)
	{
		var taskOne = renderCharacterPortrait(character, [0,0,0], "portrait", false, true);
		var renderStack = new RenderStack();
		renderStack.addElements(taskOne);

		loadRenderStack(renderStack);
	}
}

function removeSelectedTitles(from)
{
	var selectedValues = $(from).val();
	for (var i = 0; i < selectedValues.length; i++)
	{
		var selectedValue = parseInt(selectedValues[i]);
		$(from + " option[value='" + selectedValue + "']").remove();
	}
}

function addSelectedTitles(idAvailable, idCurrent, idDropdown)
{
	var selectedValues = $(idAvailable).val();

	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);

		if ($(idCurrent + " option[value='" + selectedValue + "']").length > 0)
		{
			continue;
		}

		if (titles.has(selectedValue))
		{
			var title = titles.get(selectedValue);
			$(idCurrent).append(new Option(title.name, title.id));

			if (idDropdown != "")
			{
				// Primary title
				if ($(idDropdown + " option[value='" + selectedValue + "']").length <= 0)
				{
					$(idDropdown).append(new Option(title.name, title.id));
				}
			}
		}
	}
}

function removeSelectedTraits(id)
{
	var selectedValues = $(id).val();

	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);
		$(id + " option[value='" + selectedValue + "']").remove();
	}
}

function addSelectedTraits(idAvailable, idCurrent)
{
	var selectedValues = $(idAvailable).val();

	var traits = GetTraits();

	for (var i = 0; i < selectedValues.length; i++) {
		var selectedValue = parseInt(selectedValues[i]);

		if ($(idCurrent + " option[value='" + selectedValue + "']").length > 0)
		{
			continue;
		}

		if (traits.has(selectedValue))
		{
			var trait = traits.get(selectedValue);
			$(idCurrent).append(new Option(trait.name, trait.id));
		}
	}
}

function loadTraits(id)
{
	var traits = GetTraits();

	for (var [key, value] of traits.entries()) {
		$(id).append(new Option(value.name, value.id));
	}
}

function loadAlignments(id)
{
	$(id).append(new Option("Lawful Good", alignments.LG));
	$(id).append(new Option("Neutral Good", alignments.NG));
	$(id).append(new Option("Chaotic Good", alignments.CG));
	$(id).append(new Option("Lawful Neutral", alignments.LN));
	$(id).append(new Option("Neutral", alignments.N));
	$(id).append(new Option("Chaotic Neutral", alignments.CN));
	$(id).append(new Option("Lawful Evil", alignments.LE));
	$(id).append(new Option("Neutral Evil", alignments.NE));
	$(id).append(new Option("Chaotic Evil", alignments.CE));
}

function loadStrongholdTypes(id)
{
	$(id).append(new Option("None", strongholdType.NONE));
	$(id).append(new Option("Keep", strongholdType.KEEP));
	$(id).append(new Option("Tower", strongholdType.TOWER));
	$(id).append(new Option("Establishment", strongholdType.ESTABLISHMENT));
	$(id).append(new Option("Temple", strongholdType.TEMPLE));
}

function loadStrongholdClasses(id)
{
	$(id).append(new Option("None", classType.NONE));
	$(id).append(new Option("Barbarian", classType.BARBARIAN));
	$(id).append(new Option("Bard", classType.BARD));
	$(id).append(new Option("Cleric", classType.CLERIC));
	$(id).append(new Option("Druid", classType.DRUID));
	$(id).append(new Option("Fighter", classType.FIGHTER));
	$(id).append(new Option("Monk", classType.MONK));
	$(id).append(new Option("Paladin", classType.PALADIN));
	$(id).append(new Option("Ranger", classType.RANGER));
	$(id).append(new Option("Rogue", classType.ROGUE));
	$(id).append(new Option("Sorcerer", classType.SORCERER));
	$(id).append(new Option("Warlock", classType.WARLOCK));
	$(id).append(new Option("Wizard", classType.WIZARD));
}

function loadRaces(id) {
	$(id).append(new Option("Human", race.HUMAN));
	$(id).append(new Option("Half-Elf", race.HALFELF));
	$(id).append(new Option("High Elf", race.ELFHIGH));
	$(id).append(new Option("Wood Elf", race.ELFWOOD));
	$(id).append(new Option("Stout Halfling", race.HALFLINGSTOUT));
	$(id).append(new Option("Nimble Halfling", race.HALFLINGNIMBLE));
	$(id).append(new Option("Gnome", race.GNOME));
	$(id).append(new Option("Deep Gnome", race.GNOMEDEEP));
	$(id).append(new Option("Mountain Dwarf", race.DWARFMOUNTAIN));
	$(id).append(new Option("Hill Dwarf", race.DWARFHILL));
	$(id).append(new Option("Duergar", race.DUERGAR));
	$(id).append(new Option("Half-Orc", race.HALFORC));
	$(id).append(new Option("Dragonborn", race.DRAGONBORN));
	$(id).append(new Option("Tiefling", race.TIEFLING));
	$(id).append(new Option("Orc", race.ORC));
	$(id).append(new Option("Goblin", race.GOBLIN));
	$(id).append(new Option("Tabaxi", race.TABAXI));
	$(id).append(new Option("Drow", race.DROW));
	$(id).append(new Option("Triton", race.TRITON));
	$(id).append(new Option("Aarakocra", race.AARAKOCRA));
	$(id).append(new Option("Tortle", race.TORTLE));
	$(id).append(new Option("Air Genasi", race.GENASIAIR));
	$(id).append(new Option("Earth Genasi", race.GENASIEARTH));
	$(id).append(new Option("Water Genasi", race.GENASIWATER));
	$(id).append(new Option("Fire Genasi", race.GENASIFIRE));
	$(id).append(new Option("Goliath", race.GOLIATH));
	$(id).append(new Option("Eladrin", race.ELADRIN));
	$(id).append(new Option("Kenku", race.KENKU));
}

function loadNpcClasses(id) {
	for (var [key, value] of npcClasses.entries()) {
		$(id).append(new Option(value.name, value.id));
	}
}

$(document).ready(function() {
	$flowchart = $('#character_relationships');
	$blankFlowChartData = {
	  "operators": {},
	  "links": {},
	  "operatorTypes": {}
	};

	$flowchart.flowchart({
  		data: $blankFlowChartData
	});
});

function arrayWithoutElement(array, element)
{
	return array.filter(function (e) { return e !== element});
}

function randomParentage(myCharacter) {
	// If (s)he already has parents, remove that relationship
	for (var i = 0; i < myCharacter.parents.length; i++)
	{
		var parentId = myCharacter.parents[i];
		if (characterMap.has(parentId))
		{
			var parent = characterMap.get(parentId);
			parent.children = arrayWithoutElement(parent.children, myCharacter.id);
		}
	}
	myCharacter.parents = [];

	// Randomize Parents
	var father = initSampleCharacterWithGender(false, gender.MALE);
	father.alive = coinFlip();
	father.age = getRandomNumber(Math.min(99,myCharacter.age + 14), 100);
	if (father.alive && father.age > 95) { father.alive = false; }
	myCharacter.parents.push(father.id);
	father.children.push(myCharacter.id);
	
	var fatherfather = initSampleCharacterWithGender(false, gender.MALE);
	fatherfather.alive = coinFlip();
	fatherfather.age = getRandomNumber(Math.min(99,father.age + 14), 100);
	if (fatherfather.alive && fatherfather.age > 95) { fatherfather.alive = false; }
	father.parents.push(fatherfather.id);
	fatherfather.children.push(father.id);
	
	var fathermother = initSampleCharacterWithGender(false, gender.FEMALE);
	fathermother.alive = coinFlip();
	fathermother.age = getRandomNumber(Math.min(99,father.age + 14), 100);
	if (fathermother.alive && fathermother.age > 95) { fathermother.alive = false; }
	father.parents.push(fathermother.id);
	fathermother.children.push(father.id);
	
	var mother = initSampleCharacterWithGender(false, gender.FEMALE);
	mother.alive = coinFlip();
	mother.age = getRandomNumber(Math.min(99,myCharacter.age + 14), 100);
	if (mother.alive && mother.age > 95) { mother.alive = false; }
	myCharacter.parents.push(mother.id);
	mother.children.push(myCharacter.id);
	
	var motherfather = initSampleCharacterWithGender(false, gender.MALE);
	motherfather.alive = coinFlip();
	motherfather.age = getRandomNumber(Math.min(99,mother.age + 14), 100);
	if (motherfather.alive && motherfather.age > 95) { motherfather.alive = false; }
	mother.parents.push(motherfather.id);
	motherfather.children.push(mother.id);
	
	var mothermother = initSampleCharacterWithGender(false, gender.FEMALE);
	mothermother.alive = coinFlip();
	mothermother.age = getRandomNumber(Math.min(99,mother.age + 14), 100);
	if (mothermother.alive && mothermother.age > 95) { mothermother.alive = false; }
	mother.parents.push(mothermother.id);
	mothermother.children.push(mother.id);
}

function randomCouncil(myCharacter) {
	clearCouncil(myCharacter);

	// Chancellor
	var chancellor = initSampleCharacter(false);
	chancellor.liege = myCharacter.id;
	myCharacter.vassals.push(chancellor.id);
	if (chancellor.age < 20)
	{ 
		chancellor.age += 20;
	}

	if (chancellor.ck2attributes.diplomacy < 10)
	{
		chancellor.ck2attributes.diplomacy += 10;
	}

	myCharacter.council.chancellor = chancellor.id;

	// Marshal
	var marshal = initSampleCharacter(false);
	marshal.liege = myCharacter.id;
	myCharacter.vassals.push(marshal.id);
	if (marshal.age < 20)
	{ 
		marshal.age += 20;
	}

	if (marshal.ck2attributes.martial < 10)
	{
		marshal.ck2attributes.martial += 10;
	}

	myCharacter.council.marshal = marshal.id;

	// Steward
	var steward = initSampleCharacter(false);
	steward.liege = myCharacter.id;
	myCharacter.vassals.push(steward.id);
	if (steward.age < 20)
	{ 
		steward.age += 20;
	}

	if (steward.ck2attributes.stewardship < 10)
	{
		steward.ck2attributes.stewardship += 10;
	}

	myCharacter.council.steward = steward.id;

	// Spmyaster
	var spymaster = initSampleCharacter(false);
	spymaster.liege = myCharacter.id;
	myCharacter.vassals.push(spymaster.id);
	if (spymaster.age < 20)
	{ 
		spymaster.age += 20;
	}

	if (spymaster.ck2attributes.intrigue < 10)
	{
		spymaster.ck2attributes.intrigue += 10;
	}

	myCharacter.council.spymaster = spymaster.id;

	// Chaplain
	var chaplain = initSampleCharacter(false);
	chaplain.liege = myCharacter.id;
	myCharacter.vassals.push(chaplain.id);
	if (chaplain.age < 20)
	{ 
		chaplain.age += 20;
	}

	if (chaplain.ck2attributes.learning < 10)
	{
		chaplain.ck2attributes.learning += 10;
	}

	myCharacter.council.chaplain = chaplain.id;
}

function addRandomChild(myCharacter)
{
	if (myCharacter.age < 14)
	{
		return;
	}

	var child = initSampleCharacter(false);
	child.alive = getRandomNumber(0, 5) > 2;
	child.parents.push(myCharacter.id);

	child.age = getRandomNumber(1, myCharacter.age - 14);

	if (myCharacter.spouse > 0 && characterMap.has(myCharacter.spouse))
	{
		child.parents.push(myCharacter.spouse);
		characterMap.get(myCharacter.spouse).children.push(child.id);
	}
	
	child.house = myCharacter.house;
	
	myCharacter.children.push(child.id);
}

function addRandomSibling(myCharacter)
{
	if (myCharacter.parents.length == 0)
	{
		return;
	}

	var sibling = initSampleCharacter(false);
	sibling.alive = getRandomNumber(0, 5) > 2;

	for (var i = 0; i < myCharacter.parents.length; i++)
	{
		var parentId = myCharacter.parents[i];
		if (characterMap.has(parentId))
		{
			var parent = characterMap.get(parentId);
			parent.children.push(sibling.id);
			sibling.parents.push(parentId);
		}
	}

	sibling.house = myCharacter.house;
}

function addRandomCourtier(myCharacter)
{
	var courtier = initSampleCharacter(false);
	courtier.liege = myCharacter.id;
	myCharacter.vassals.push(courtier.id);
}

function createRandomCharacterForTitle(title) {

	var isPriest = title.holdingType == holdingtypes.TEMPLE;

	var randomCharacter = isPriest ? initSampleCharacterWithGender(false, gender.MALE) : initSampleCharacter(false);

	// Randomize adult
	randomCharacter.age = getRandomNumber(24, 90);

	// Title
	randomCharacter.addTitle(title.id, true);
	title.owner = randomCharacter.id;

	// Randomize Parents
	randomParentage(randomCharacter);
	randomCouncil(randomCharacter);

	if (!isPriest && getRandomNumber(0,3) < 1)
	{
		var female = (randomCharacter.gender == gender.FEMALE);
		var spouse = initSampleCharacterWithGender(false, female ? gender.MALE : gender.FEMALE);
		randomParentage(spouse);
		randomCharacter.spouse = spouse.id;
		spouse.spouse = randomCharacter.id;

		var numChildren = getRandomNumber(0, 3);
		for (var i = 0; i < numChildren; i++) {
			addRandomChild(randomCharacter);
		}
	}

	var numSiblings = getRandomNumber(0, 4);
	for (var i = 0; i < numSiblings; i++) {
		addRandomSibling(randomCharacter);
	}

	var numCourtiers = getRandomNumber(0, 3);
	for (var i = 0; i < numCourtiers; i++) {
		addRandomCourtier(randomCharacter);
	}
}

function clearCouncil(character) {
	if (character.council.exists())
	{
		character.council.clear();
	}
}

function refreshHouseEmblem() {
	var houseId = parseInt($("#select_character_house").val());
	if (houses.has(houseId))
	{
		var house = houses.get(houseId);
		$("[name=house_emblem]").attr("src", getHouseImage(house));
	} else {
		$("[name=house_emblem]").attr("src", "");
	}
}

function initCharacterForm() {

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
                sanityCheck();
                populateHouses("#select_character_house");
                populateTitles("#select_character_available_titles", false);
				updateSelectionList();
            };
            reader.readAsText(file);            
        } catch (err) {
            console.error(err);
        }
    }

	// Genders
	$("#CharacterGender").append(new Option("Male", gender.MALE));
	$("#CharacterGender").append(new Option("Female", gender.FEMALE));
	$("#CharacterGender").append(new Option("Other", gender.OTHER));

	// Strongholds
	loadStrongholdTypes("#select_character_stronghold_type");
	loadStrongholdClasses("#select_character_stronghold_class");

	// Alignments
	loadAlignments("#select_character_alignment");

	// Races
	loadRaces("#select_character_race");

	// NPC Classes
	loadNpcClasses("#select_character_npc_class");

	// Traits
	loadTraits("#select_character_available_traits");

	// Houses
	populateHouses("#select_character_house");

	characterMap = new Map();
	updateSelectionList();

	$("#showTakenTitles").click(function() {
		populateTitles("#select_character_available_titles", false);
	});

	$("#hideTakenTitles").click(function() {
		populateTitles("#select_character_available_titles", true);
	});

	$("#select_character_list").change(function() {
		var id = parseInt($("#select_character_list").val());

		if (id == currentCharacter)
		{
			return;
		}

		if (characterMap.has(id))
		{
			updateSelectedCharacter(id);
		}
	});

	$("#select_character_graph").change(function() {

		if (currentCharacter <= 0)
		{
			return;
		}

		var id = parseInt($("#select_character_graph").val());

		if (id != 0 && characterMap.has(id))
		{
			var character = characterMap.get(id);
			createOperatorFor(character, 800, 10);
		}
	});

	$("#select_character_npc_class").change(function() {

		if (currentCharacter <= 0)
		{
			return;
		}

		var id = parseInt($("#select_character_npc_class").val());
		var race = $("#select_character_race").val();

		if (id != 0 && npcClasses.has(id) && characterMap.has(currentCharacter))
		{
			var npcClass = npcClasses.get(id);
			var character = characterMap.get(currentCharacter);
			updateDndStats(character, npcClass, race);
		}
	});

	$("#select_character_race").change(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		var id = parseInt($("#select_character_npc_class").val());
		var race = $("#select_character_race").val();

		if (id != 0 && npcClasses.has(id) && characterMap.has(currentCharacter))
		{
			var npcClass = npcClasses.get(id);
			var character = characterMap.get(currentCharacter);
			updateDndStats(character, npcClass, race);
		}
	});

	$("#select_character_house").change(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		refreshHouseEmblem();
	});

	$("#save_house").click(function() {

		var newHouse = $("[name=add_new_house]").val();

		if (newHouse && newHouse.length > 1)
		{
			var newHouseObject = new House(newHouse, houseIterator++);
			houses.set(newHouseObject.id, newHouseObject);
			populateHouses("#select_character_house");
			$("[name=add_new_house]").val("");
		}
	});

	$("#randomPortrait").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);
			randomizePortraitData(character);
			refreshPortrait(character);
		}
	});

	$("#randomDndStats").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);
			randomizeDndStats();
			var race = $("#select_character_race").val();
			updateDndStatsRace(race);
		}
	});

	$("#randomAge").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			saveCharacter(false);
			var character = characterMap.get(currentCharacter);
			randomizeAge(character);
			$("[name=CharacterAge]").val(character.age);
		}
	});

	$("#randomName").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			saveCharacter(false);
			var character = characterMap.get(currentCharacter);
			character.name = getRandomName(character.gender == gender.FEMALE);
			$("[name=CharacterName]").val(character.name);
		}
	});

	$("#randomizeHoldings").click(function() {
		for (var [key, value] of titles.entries()) {
			if (value.titleImportance != 1)
			{
				// Only assign holdings
				continue;
			}

			if (value.parent != 0 && titles.has(value.parent) && titles.get(value.parent).primaryHolding == value.id)
			{
				// Ignore primary holdings
				continue;
			}

			if (value.owner != 0)
			{
				// ignore assigned holdings
				continue;
			}

			if (value.name == "placeholder")
			{
				// Ignore placeholders
				continue;
			}

			if (value.holdingType != holdingtypes.CASTLE && value.holdingType != holdingtypes.CITY && value.holdingType != holdingtypes.TEMPLE)
			{
				continue;
			}

			createRandomCharacterForTitle(value);
		}

		updateSelectionList();
	});

	$("#randomStronghold").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			saveCharacter(false);
			var character = characterMap.get(currentCharacter);
			randomizeStronghold(character);
			$("#select_character_stronghold_type").val(character.strongholdType);
			$("#select_character_stronghold_class").val(character.strongholdClass);
		}
	});

	$("#randomNpcClass").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			saveCharacter(true);
			var character = characterMap.get(currentCharacter);
			randomizeNpcClass(character);
			var race = $("#select_character_race").val();
			updateDndStats(character, npcClasses.get(character.dndattributes.npcClass), race);
			$("#select_character_npc_class").val(character.dndattributes.npcClass);
		}
	});

	$("#randomTraits").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			saveCharacter(true);
			var character = characterMap.get(currentCharacter);
			randomizeCharacterTraits(character);
			refreshTraits(character);
		}
	});

	$("#randomSpouse").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			if (character.spouse != 0 && characterMap.has(character.spouse))
			{
				var currentSpouse = characterMap.get(character.spouse);
				currentSpouse.spouse = 0;
				character.spouse = 0;
			}

			var female = (character.gender == gender.FEMALE);
			var spouse = initSampleCharacterWithGender(false, female ? gender.MALE : gender.FEMALE);
			character.spouse = spouse.id;
			spouse.spouse = character.id;

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#randomParentage").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			randomParentage(character);			

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#randomCouncil").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			randomCouncil(character);			

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#addRandomChild").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			addRandomChild(character);

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#addRandomCourtier").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			addRandomCourtier(character);

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#addRandomSibling").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			addRandomSibling(character);

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#clearCouncil").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		if (characterMap.has(currentCharacter))
		{
			var character = characterMap.get(currentCharacter);

			clearCouncil(character);			

			loadRelationship(character);

			saveCharacter(true);
		}
	});

	$("#save_character").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		saveCharacter(true);
	});	

	$("#delete_character").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		deleteCharacter();
	});

	$("#add_new_character").click(function() {
		if (currentCharacter > 0)
		{
			saveCharacter(true);
		}

		addNewCharacter();
	});

	$("#add_held_title").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		addSelectedTitles("#select_character_available_titles", "#select_character_held_titles", "#select_character_primary_title");
	});

	$("#add_title_claim").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		addSelectedTitles("#select_character_available_titles", "#select_character_title_claims", "");
	});

	$("#remove_held_title").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		removeSelectedTitles("#select_character_held_titles");
	});

	$("#remove_title_claim").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		removeSelectedTitles("#select_character_title_claims");
	});

	$("#remove_trait").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		removeSelectedTraits("#select_character_current_traits");
	});

	$("#add_trait").click(function() {
		if (currentCharacter <= 0)
		{
			return;
		}

		addSelectedTraits("#select_character_available_traits", "#select_character_current_traits");
	});

	$("#save_json").click(function() {
		if (currentCharacter > 0)
		{
			saveCharacter(true);
		}

		saveJson();
	});
}