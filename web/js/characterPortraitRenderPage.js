var characterIterator = 1;
var characterMap = null;

function render(character) {
	clearCanvas("portrait");

	var taskOne = renderCharacterPortrait(character, [0,0,0], "portrait", false, true);
	var renderStack = new RenderStack();
	renderStack.addElements(taskOne);

	loadRenderStack(renderStack);
}

function assignCharacterRace(character)
{
	var val = race.HUMAN;

	if (character.dndattributes.race == race.HALFLINGSTOUT || character.dndattributes.race == race.HALFLINGLIGHTFOOT)
	{
		val = race.HALFLINGSTOUT;
	}

	if (character.dndattributes.race == race.ELFHIGH || character.dndattributes.race == race.ELFWOOD)
	{
		val = race.ELFHIGH;
	}

	if (character.dndattributes.race == race.DWARFMOUNTAIN || character.dndattributes.race == race.DWARFHILL)
	{
		val = race.DWARFHILL;
	}

	if (character.dndattributes.race == race.HALFELF)
	{
		val = race.HALFELF;
	}

	if (character.dndattributes.race == race.HALFORC)
	{
		val = race.HALFORC;
	}

	$("#CharacterRace").val(val);
}

window.onload = function() {  

	characterMap = new Map();

	var myCharacter = initSampleCharacter(true);
	
	$("[name=CharacterAge]").val(myCharacter.age);
	$("#CharacterGender").val(myCharacter.gender);
	var titleImportance = myCharacter.primaryTitle > 0 ? titles.get(myCharacter.primaryTitle).titleImportance : 0;
	$("#CharacterTitle").val(titleImportance);

	assignCharacterRace(myCharacter);

	$("[name=RandomSeed]").val(myCharacter.GetSeed());

	$("#randomizeSeed").click(function () {
		randomizePortraitData(myCharacter);
		$("[name=RandomSeed]").val(myCharacter.GetSeed());
		render(myCharacter);
	});

	$("#render").click(function () {
		myCharacter.age = parseInt($("[name=CharacterAge]").val());
		myCharacter.gender = $("#CharacterGender").val();
		myCharacter.dndattributes.race = $("#CharacterRace").val();
		var importance = $("#CharacterTitle").val();
		newRandomTitle(importance, myCharacter, true);
		var seed = $("[name=RandomSeed]").val();
		myCharacter.ParseSeed(seed);
		render(myCharacter);
	});

	render(myCharacter);
};