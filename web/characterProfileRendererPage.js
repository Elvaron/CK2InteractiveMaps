var characterIterator = 1;
var characterMap = null;
var globalToolTip = "argh";
var clicker = null;
var mover = null;
var minMaxBounds = null;
var minMaxClickableBounds = null;

window.onload = function() {  

	characterMap = new Map();
	initSampleTitles();

	var helpers = ["helper_1", "helper_2", "helper_3", "helper_4", "helper_5", "helper_6", "helper_7", "helper_8", "helper_9", "helper_10", "helper_11"];
	var nextHelper = 12;

	// Randomize Character
	var myCharacter = initSampleCharacter(true);
	//randomizeCharacterTraits(myCharacter);
	myCharacter.alive = coinFlip();
	var female = (myCharacter.gender == gender.FEMALE);

	var titledCharacters = [];

	// Randomize Spouse
	var spouse = initSampleCharacterWithGender(true, female ? gender.MALE : gender.FEMALE);
	myCharacter.spouse = spouse.id;
	spouse.spouse = myCharacter.id;
	spouse.alive = coinFlip();
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
		liege.addVassal(myCharacter.id);
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
	father.alive = coinFlip();
	father.age = getRandomNumber(20, 80);
	myCharacter.parents.push(father.id);
	father.children.push(myCharacter.id);
	if (father.hasPrimaryTitle())
	{
		titledCharacters.push(father);
	}

	var fatherfather = initSampleCharacterWithGender(true, gender.MALE);
	fatherfather.alive = coinFlip();
	father.parents.push(fatherfather.id);
	fatherfather.children.push(father.id);
	if (fatherfather.hasPrimaryTitle())
	{
		titledCharacters.push(fatherfather);
	}

	var fathermother = initSampleCharacterWithGender(true, gender.FEMALE);
	fathermother.alive = coinFlip();
	father.parents.push(fathermother.id);
	fathermother.children.push(father.id);
	if (fathermother.hasPrimaryTitle())
	{
		titledCharacters.push(fathermother);
	}

	var mother = initSampleCharacterWithGender(true, gender.FEMALE);
	mother.age = getRandomNumber(20, 80);
	mother.alive = coinFlip();
	myCharacter.parents.push(mother.id);
	mother.children.push(myCharacter.id);
	if (mother.hasPrimaryTitle())
	{
		titledCharacters.push(mother);
	}

	var motherfather = initSampleCharacterWithGender(true, gender.MALE);
	motherfather.alive = coinFlip();
	mother.parents.push(motherfather.id);
	motherfather.children.push(mother.id);
	if (motherfather.hasPrimaryTitle())
	{
		titledCharacters.push(motherfather);
	}

	var mothermother = initSampleCharacterWithGender(true, gender.FEMALE);
	mothermother.alive = coinFlip();
	mother.parents.push(mothermother.id);
	mothermother.children.push(mother.id);
	if (mothermother.hasPrimaryTitle())
	{
		titledCharacters.push(mothermother);
	}

	// Randomize Regent
	if (myCharacter.age < 16 && myCharacter.alive)
	{
		var regent = initSampleCharacter(true);
		myCharacter.regent = regent.id;
	}

	// Randomize Children
	var numberOfChildren = getRandomNumber(0, 10);

	for (var i = 0; i < numberOfChildren; i++)
	{
		// Randomize Child
		var child = initSampleCharacter(false);
		child.alive = getRandomNumber(0, 5) > 2;
		child.parents.push(myCharacter.id);
		child.parents.push(spouse.id);
		child.house = myCharacter.house;
		spouse.children.push(child.id);
		myCharacter.children.push(child.id);

		// Create Canvas to render child
		var myTmpCanvas = document.createElement('canvas');
		myTmpCanvas.id = "helper_" + nextHelper; // Id
		nextHelper++; // Increase counter
		myTmpCanvas.width = 200;
		myTmpCanvas.height = 200;
		myTmpCanvas.style.display = "none";
		document.body.appendChild(myTmpCanvas);
		helpers.push(myTmpCanvas.id);
	}

	// Randomize Siblings
	var numberOfSiblings = getRandomNumber(0, 10);

	for (var i = 0; i < numberOfSiblings; i++)
	{
		var sibling = initSampleCharacter(true);
		sibling.alive = getRandomNumber(0, 3) > 1;
		sibling.parents.push(father.id);
		sibling.parents.push(mother.id);
		father.children.push(sibling.id);
		mother.children.push(sibling.id);

		if (sibling.hasPrimaryTitle())
		{
			titledCharacters.push(sibling);
		}

		// Create Canvas to render sibling
		var myTmpCanvas = document.createElement('canvas');
		myTmpCanvas.id = "helper_" + nextHelper; // Id
		nextHelper++; // Increase counter
		myTmpCanvas.width = 200;
		myTmpCanvas.height = 200;
		myTmpCanvas.style.display = "none";
		document.body.appendChild(myTmpCanvas);
		helpers.push(myTmpCanvas.id);
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

		// Create Canvas to render vassal
		var myTmpCanvas = document.createElement('canvas');
		myTmpCanvas.id = "helper_" + nextHelper; // Id
		nextHelper++; // Increase counter
		myTmpCanvas.width = 200;
		myTmpCanvas.height = 200;
		myTmpCanvas.style.display = "none";
		document.body.appendChild(myTmpCanvas);
		helpers.push(myTmpCanvas.id);
	}

	// Randomize Council
	if (myCharacter.vassals.length > 0)
	{
		var picked = [];

		var chancellor = getRandomNumber(0, myCharacter.vassals.length);
		var myChancellor = myCharacter.vassals[chancellor];
		characterMap.get(myChancellor).ck2attributes.diplomacy += 20;
		myCharacter.council.chancellor = myChancellor;
		picked.push(myChancellor);

		var marshal = getRandomNumber(0, myCharacter.vassals.length);
		var myMarshal = myCharacter.vassals[marshal];
		characterMap.get(myMarshal).ck2attributes.martial += 20;
		if (!picked.includes(myMarshal))
		{
			myCharacter.council.marshal = myMarshal;
			picked.push(myMarshal);
		}

		var steward = getRandomNumber(0, myCharacter.vassals.length);
		var mySteward = myCharacter.vassals[steward];
		characterMap.get(mySteward).ck2attributes.stewardship += 20;
		if (!picked.includes(mySteward))
		{
			myCharacter.council.steward = mySteward;
			picked.push(mySteward);
		}

		var spymaster = getRandomNumber(0, myCharacter.vassals.length);
		var mySpymaster = myCharacter.vassals[spymaster];
		characterMap.get(mySpymaster).ck2attributes.intrigue += 20;
		if (!picked.includes(mySpymaster))
		{
			myCharacter.council.spymaster = mySpymaster;
			picked.push(mySpymaster);
		}

		var chaplain = getRandomNumber(0, myCharacter.vassals.length);
		var myChaplain = myCharacter.vassals[chaplain];
		characterMap.get(myChaplain).ck2attributes.learning += 20;
		if (!picked.includes(myChaplain))
		{
			myCharacter.council.chaplain = myChaplain;
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
	var renderStack = new RenderStack();
	renderCharacter(myCharacter, [0,0,0], renderStack, "profile", helpers);
	
	/*for (var i = 0; i < tasks.length; i++)
	{
		renderStack.addElements(tasks[i]);
	}*/

	renderStack.callback = function () {
		document.getElementById("loadingScreen").style.display = "none";
		document.getElementById("profile").style.display = "block";

		if (mouseOverAreas && mouseOverAreas.length > 0)
		{
			var c = document.getElementById("profile");
			var cX = c.offsetLeft;
			var cY = c.offsetTop;

			minMaxClickableBounds = getMinMaxBounds();
			minMaxBounds = getMinMaxBounds();

			clicker = function (event) {
				var cursorX = event.pageX - cX;
				var cursorY = event.pageY - cY;

				if (minMaxClickableBounds == null)
				{
					return;
				}

				if (!minMaxClickableBounds.isInShape(cursorX,cursorY))
				{
					return;
				}

				/*$("#CX").html(cursorX);
				$("#CY").html(cursorY);
				return;*/

				for (var i = 0; i < clickableAreas.length; i++) {
					if (clickableAreas[i].isInShape(cursorX,cursorY))
					{
						//alert(clickableAreas[i].description);
						if (clickableAreas[i].action)
						{
							//$("#candidates").html(clickableAreas[i].description);
							clickableAreas[i].action();
						}

						break;
					}
				}
			};

			mover = function (event) {
				var cursorX = event.pageX - cX;
				var cursorY = event.pageY - cY;

				$("#profile").attr("title", "");

				if (minMaxBounds == null)
				{
					return;
				}

				if (!minMaxBounds.isInShape(cursorX,cursorY))
				{
					return;
				}

				/*$("#MX").html(cursorX);
				$("#MY").html(cursorY);
				return;*/

				for (var i = 0; i < mouseOverAreas.length; i++) {
					if (mouseOverAreas[i].isInShape(cursorX,cursorY))
					{
						$("#profile").attr("title", mouseOverAreas[i].description);
						//alert(mouseOverAreas[i].description);
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
		}
	};

	//loadRenderStack(renderStack);

	/*$( document ).tooltip({
		//track: true
	});*/
};