var characterIterator = 1;
var characterMap = null;

var currentCharacter = 0;
var $flowchart = null;
var $blankFlowChartData = null;

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

		populateHouses("#select_character_house");
		updateSelectionList();
	}
}

function saveJson() {
	var saveData = new DataSaver(houses, titles, characterMap);
	var jsonData = JSON.stringify(saveData);
	download(jsonData, "test.json");
}

function updateSelectionList() {
	$("#select_character_list").empty();
	$("#select_character_graph").empty();
	$("#select_character_graph").append(new Option("", 0));

	for (var [key, value] of characterMap.entries()) {
		$("#select_character_list").append(new Option(value.name, value.id));
		$("#select_character_graph").append(new Option(value.name, value.id));
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
	refreshPortrait(character);

	updateSelectionList();

	if (reload)
	{
		$("#select_character_list").val(character.id).change();
	}
}

function populateHouses(id) {
	$(id).empty();
	$(id).append(new Option("", 0));

	for (var [key, value] of houses.entries()) {
		$(id).append(new Option(value.name, value.id));
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
		$("#randomPortrait").attr("disabled", true);
		$("#randomDndStats").attr("disabled", true);
		$("#randomTraits").attr("disabled", true);
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
	}

	// Traits
	refreshTraits(character);

	$("#save_character").attr("disabled", false);
	$("#delete_character").attr("disabled", false);
	$("#remove_trait").attr("disabled", false);
	$("#add_trait").attr("disabled", false);
	$("#randomPortrait").attr("disabled", false);
	$("#randomDndStats").attr("disabled", false);
	$("#randomTraits").attr("disabled", false);

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

window.onload = function() {	

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
                loadJson(event.target.result)
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

		var houseId = parseInt($("#select_character_house").val());
		if (houses.has(houseId))
		{
			var house = houses.get(houseId);
			$("[name=house_emblem]").attr("src", getHouseImage(house));
		} else {
			$("[name=house_emblem]").attr("src", "");
		}
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