var characterIterator = 1;
var characterMap = null;

function render(character) {
	clearCanvas("portrait");

	var taskOne = renderCharacterPortrait(character, [0,0,0], "portrait", false, true);
	var renderStack = new RenderStack();
	renderStack.addElements(taskOne);

	loadRenderStack(renderStack);
}

window.onload = function() {  

	characterMap = new Map();

	var myCharacter = initSampleCharacter(true);
	
	$("[name=CharacterAge]").val(myCharacter.age);
	$("#CharacterGender").val(myCharacter.gender);
	var titleImportance = myCharacter.primaryTitle > 0 ? titles.get(myCharacter.primaryTitle).titleImportance : 0;
	$("#CharacterTitle").val(titleImportance);
	$("[name=RandomSeed]").val(myCharacter.GetSeed());

	$("#randomizeSeed").click(function () {
		randomizePortraitData(myCharacter);
		$("[name=RandomSeed]").val(myCharacter.GetSeed());
		render(myCharacter);
	});

	$("#render").click(function () {
		myCharacter.age = parseInt($("[name=CharacterAge]").val());
		myCharacter.gender = $("#CharacterGender").val();
		var importance = $("#CharacterTitle").val();
		newRandomTitle(importance, myCharacter);
		var seed = $("[name=RandomSeed]").val();
		myCharacter.ParseSeed(seed);
		render(myCharacter);
	});

	render(myCharacter);
};