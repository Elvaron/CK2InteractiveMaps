var characterIterator = 1;
var characterMap = null;
var globalToolTip = "argh";

window.onload = function() {  

	characterMap = new Map();
	initSampleTitles();

	// Randomize Character
	var myCharacter = initSampleCharacter(true);
	randomizeCharacterTraits(myCharacter);
	var female = (myCharacter.gender == gender.FEMALE);

	var titledCharacters = [];

	// Randomize Spouse
	var spouse = initSampleCharacterWithGender(true, female ? gender.MALE : gender.FEMALE);
	myCharacter.spouse = spouse.id;
	spouse.spouse = myCharacter.id;
	if (spouse.hasPrimaryTitle())
	{
		titledCharacters.push(spouse);
	}

	// Randomize Heir
	var heir = initSampleCharacter(true);
	myCharacter.heir = heir.id;

	// Randomize Liege
	var mainTitleImportance = (myCharacter.hasPrimaryTitle()) ? titles.get(myCharacter.primaryTitle).titleImportance : 0;

	if (mainTitleImportance < 5)
	{
		// Liege
		var liege = initSampleCharacter(false);

		newRandomTitle(mainTitleImportance + 1, liege, true);

		titledCharacters.push(liege);

		myCharacter.liege = liege.id;
		liege.addVassal(myCharacter);
	}

	// Randomize Titles
	var numberOfTitles = getRandomNumber(0, 6);
	for (var i = 0; i < numberOfTitles; i++)
	{
		var importance = getRandomNumber(1, 6);
		newRandomTitle(importance, myCharacter, false);
	}

	// Randomize Parents
	var father = initSampleCharacterWithGender(true, gender.MALE);
	father.alive = false;
	father.age = getRandomNumber(20, 80);
	myCharacter.parents.push(father.id);
	father.children.push(myCharacter.id);
	if (father.hasPrimaryTitle())
	{
		titledCharacters.push(father);
	}

	var fatherfather = initSampleCharacterWithGender(true, gender.MALE);
	fatherfather.alive = false;
	father.parents.push(fatherfather.id);
	fatherfather.children.push(father.id);
	if (fatherfather.hasPrimaryTitle())
	{
		titledCharacters.push(fatherfather);
	}

	var fathermother = initSampleCharacterWithGender(true, gender.FEMALE);
	fathermother.alive = false;
	father.parents.push(fathermother.id);
	fathermother.children.push(father.id);
	if (fathermother.hasPrimaryTitle())
	{
		titledCharacters.push(fathermother);
	}

	var mother = initSampleCharacterWithGender(true, gender.FEMALE);
	mother.age = getRandomNumber(20, 80);
	mother.alive = false;
	myCharacter.parents.push(mother.id);
	mother.children.push(myCharacter.id);
	if (mother.hasPrimaryTitle())
	{
		titledCharacters.push(mother);
	}

	var motherfather = initSampleCharacterWithGender(true, gender.MALE);
	motherfather.alive = false;
	mother.parents.push(motherfather.id);
	motherfather.children.push(mother.id);
	if (motherfather.hasPrimaryTitle())
	{
		titledCharacters.push(motherfather);
	}

	var mothermother = initSampleCharacterWithGender(true, gender.FEMALE);
	mothermother.alive = false;
	mother.parents.push(mothermother.id);
	mothermother.children.push(mother.id);
	if (mothermother.hasPrimaryTitle())
	{
		titledCharacters.push(mothermother);
	}

	// Randomize Regent
	if (myCharacter.age < 16)
	{
		var regent = initSampleCharacter(false);
		myCharacter.regent = regent.id;
	}

	// Randomize Children
	var numberOfChildren = getRandomNumber(0, 10);

	for (var i = 0; i < numberOfChildren; i++)
	{
		var child = initSampleCharacter(false);
		child.parents.push(myCharacter.id);
		child.parents.push(spouse.id);
		spouse.children.push(child.id);
		myCharacter.children.push(child.id);
	}

	// Randomize Siblings
	var numberOfSiblings = getRandomNumber(0, 10);

	for (var i = 0; i < numberOfSiblings; i++)
	{
		var sibling = initSampleCharacter(true);
		sibling.parents.push(father.id);
		sibling.parents.push(mother.id);
		father.children.push(sibling.id);
		mother.children.push(sibling.id);

		if (sibling.hasPrimaryTitle())
		{
			titledCharacters.push(sibling);
		}
	}

	// Randomize Vassals
	var numberOfVassals = getRandomNumber(0, 20);

	for (var i = 0; i < numberOfVassals; i++)
	{
		var vassal = initSampleCharacter(true);
		vassal.liege = myCharacter.id;
		myCharacter.vassals.push(vassal.id);

		if (vassal.hasPrimaryTitle())
		{
			titledCharacters.push(vassal);
		}
	}

	// Randomize Pacts
	var numberOfPacts = getRandomNumber(0, 10);
	
	for (var i = 0; i < numberOfPacts; i++)
	{
		var randomTitledCharacter = titledCharacters[getRandomNumber(0, titledCharacters.length)];

		var pactType = pactTypes[getRandomNumber(0, pactTypes.length)];

		var newPact = new Pact(pactIterator++, pactType, [randomTitledCharacter.id, myCharacter.id]);
		pacts.set(newPact.id, newPact);
		randomTitledCharacter.pacts.push(newPact.id);
		myCharacter.pacts.push(newPact.id);
	}

	// Randomize Title claims
	var numberOfTitleClaims = getRandomNumber(0, 8);
	var alreadySelected = [];
	for (var i = 0; i < numberOfTitleClaims; i++)
	{
		var importance = getRandomNumber(1, 6);
		var randomIndex = getRandomNumber(0, sampleTitleClaims.length);
		if (alreadySelected.includes(randomIndex))
		{
			continue;
		}
		alreadySelected.push(randomIndex);
		myCharacter.addTitleClaim(sampleTitleClaims[randomIndex], importance);
	}
	
	//var taskOne = renderCharacterPortrait(myCharacter, [0,0,0], "province");
	var helpers = ["helper_1", "helper_2", "helper_3", "helper_4", "helper_5", "helper_6", "helper_7", "helper_8", "helper_9", "helper_10"];
	var tasks = renderCharacter(myCharacter, [0,0,0], "profile", helpers);
	var renderStack = new RenderStack();
	for (var i = 0; i < tasks.length; i++)
	{
		renderStack.addElements(tasks[i]);
	}

	loadRenderStack(renderStack);

	if (mouseOverAreas && mouseOverAreas.length > 0)
	{
		var c = document.getElementById("profile");
		var cX = c.offsetLeft;
		var cY = c.offsetTop;

		var minMaxBounds = getMinMaxBounds(mouseOverAreas);

		c.addEventListener('mousemove', function(event) {
			var cursorX = event.pageX - cX;
			var cursorY = event.pageY - cY;

			$("#profile").attr("title", "");

			if (!minMaxBounds.isInShape(cursorX,cursorY))
			{
				return;
			}

			for (var i = 0; i < mouseOverAreas.length; i++) {
				if (mouseOverAreas[i].isInShape(cursorX,cursorY))
				{
					$("#profile").attr("title", mouseOverAreas[i].description);
					//alert(mouseOverAreas[i].description);
					break;
				}
			}
		}, false);
	}

	/*$( document ).tooltip({
		//track: true
	});*/
};