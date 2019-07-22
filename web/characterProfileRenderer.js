var mouseOverAreas = [];

function renderCharacter(myCharacter, offset, targetCanvas, helperCanvases)
{
	var elements = [[]];

	var helperCanvasIterator = 0;

	var traits = GetTraits();

	// -------------------------------------- BACKGROUND --------------------------------------

	elements[0].push( new Shape(offset[0], offset[1], offset[2] + 1, "profile/bg.png", 549, 693, targetCanvas));

	// -------------------------------------- TITLE, AGE, ARMOR CLASS --------------------------------------
	var characterName = getFullName(myCharacter);
	elements[0].push( new TextLabel(offset[0] + 20, offset[1] + 30, offset[2] + 3, 300, 16, characterName, "left", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 444, offset[1] + 72, offset[2] + 4, 300, 20, myCharacter.age, "left", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 507, offset[1] + 72, offset[2] + 5, 300, 20, myCharacter.dndattributes.armorClass, "left", "black", true, targetCanvas));	

	// -------------------------------------- DND Attributes & Modifiers --------------------------------------
	var dndStats = myCharacter.getDndStats();

	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 99, offset[2] + 6, 100, 18, dndStats[0], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 121, offset[2] + 6, 100, 18, dndStats[1], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 143, offset[2] + 6, 100, 18, dndStats[2], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 167, offset[2] + 6, 100, 18, dndStats[3], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 190, offset[2] + 6, 100, 18, dndStats[4], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 214, offset[2] + 6, 100, 18, dndStats[5], "right", "black", true, targetCanvas));

	elements[0].push( new TextLabel(offset[0] + 525, offset[1] + 99, offset[2] + 7, 100, 18, dndStats[6], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 525, offset[1] + 121, offset[2] + 7, 100, 18, dndStats[7], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 525, offset[1] + 143, offset[2] + 7, 100, 18, dndStats[8], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 525, offset[1] + 167, offset[2] + 7, 100, 18, dndStats[9], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 525, offset[1] + 190, offset[2] + 7, 100, 18, dndStats[10], "right", "black", true, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 525, offset[1] + 214, offset[2] + 7, 100, 18, dndStats[11], "right", "black", true, targetCanvas));

	// -------------------------------------- SPOUSE --------------------------------------
	if (myCharacter.spouse > 0 && characterMap.has(myCharacter.spouse))
	{
		var spouse = characterMap.get(myCharacter.spouse);
		elements[0].push( new Shape(offset[0] + 210, offset[1] + 117, offset[2] + 2, "profile/bg_spouse.png", 120, 132, targetCanvas));

		elements.push( renderCharacterPortrait(spouse, [0,0,0], helperCanvases[helperCanvasIterator], false, false) );
		elements.push( new RenderedImage(201, 115, 400, 133, 133, helperCanvases[helperCanvasIterator], targetCanvas) );
		helperCanvasIterator++;

		mouseOverAreas.push( new MouseOverShape(offset[0] + 215, offset[1] + 115, offset[0] + 360, offset[1] + 248, getFullName(spouse)) );

		elements[0].push( new Shape(offset[0] + 217, offset[1] + 128, offset[2] + 500, "profile/frame_spouse.png", 102, 106, targetCanvas));
		elements[0].push( new Shape(offset[0] + 215, offset[1] + 219, offset[2] + 501, "profile/scroll_spouse.png", 106, 30, targetCanvas));

		var spouseText = (spouse.age < 16 || myCharacter.age < 16) ? "Betrothed" : (spouse.gender == gender.FEMALE ? "Wife" : "Husband");

		elements[0].push( new TextLabel(offset[0] + 268, offset[1] + 239, 503, 170, 16, spouseText, "center", "black", true, targetCanvas) );
	}

	// -------------------------------------- PORTRAIT --------------------------------------
	var portraitElements = renderCharacterPortrait(myCharacter, [50,60,10], targetCanvas, false, true);
	elements[0] = elements[0].concat(portraitElements);

	// -------------------------------------- HOUSE SHIELD --------------------------------------
	var houseName = "Lowborn";
	if (myCharacter.house > 0 && houses.has(myCharacter.house))
	{
		var house = houses.get(myCharacter.house);
		houseName = house.name;
		elements[0].push( new Shape(offset[0] + 347, offset[1] + 78, offset[2] + 4, getHouseImage(house), 80, 84, targetCanvas));
	}

	elements[0].push( new TextLabel(offset[0] + 384, offset[1] + 63, offset[2] + 5, 150, 16, houseName, "center", "black", true, targetCanvas));

	/*elements.push( renderCharacterPortrait(myCharacter, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
	elements.push( new RenderedImage(50, 60, 300, 200, 200, helperCanvases[helperCanvasIterator], targetCanvas) );
	helperCanvasIterator++;*/

	// -------------------------------------- Alignment & Race --------------------------------------
	/*
	Race: 349,182,33,33
	Alignment: 394,182,33,33
	*/
	var raceImage = myCharacter.getRaceImage();
	elements[0].push( new Shape(offset[0] + 349, offset[1] + 182, offset[2] + 10, raceImage, 33, 33, targetCanvas));
	mouseOverAreas.push( new MouseOverShape(offset[0] + 349, offset[1] + 182, offset[0] + 382, offset[1] + 215, myCharacter.dndattributes.race) );

	var alignmentImage = myCharacter.getAlignmentImage();
	elements[0].push( new Shape(offset[0] + 394, offset[1] + 182, offset[2] + 11, alignmentImage, 33, 33, targetCanvas));
	mouseOverAreas.push( new MouseOverShape(offset[0] + 394, offset[1] + 182, offset[0] + 427, offset[1] + 215, myCharacter.getAlignmentText()) );

	// -------------------------------------- CK2 Attributes & Modifiers --------------------------------------
	var ck2Stats = myCharacter.getCK2Stats();

	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 238, offset[2] + 12, 100, 18, ck2Stats[0], "right", "white", false, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 259, offset[2] + 12, 100, 18, ck2Stats[1], "right", "white", false, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 280, offset[2] + 12, 100, 18, ck2Stats[2], "right", "white", false, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 301, offset[2] + 12, 100, 18, ck2Stats[3], "right", "white", false, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 322, offset[2] + 12, 100, 18, ck2Stats[4], "right", "white", false, targetCanvas));
	elements[0].push( new TextLabel(offset[0] + 488, offset[1] + 343, offset[2] + 12, 100, 18, ck2Stats[5], "right", "white", false, targetCanvas));

	if (myCharacter.dndattributes.npcClass > 0 && npcClasses.has(myCharacter.dndattributes.npcClass))
	{
		var npcClass = npcClasses.get(myCharacter.dndattributes.npcClass);
		elements[0].push( new TextLabel(offset[0] + 387, offset[1] + 245, offset[2] + 13, 90, 18, npcClass.name, "center", "black", true, targetCanvas));
	}

	// -------------------------------------- S&F -----------------------------------------
	if (myCharacter.strongholdType != strongholdType.NONE)
	{
		var icon = getStrongholdTypeIcon(myCharacter.strongholdType);

		elements[0].push( new Shape( offset[0] + 381, offset[1] + 322, offset[2] + 14, icon, 24, 24, targetCanvas) );
		mouseOverAreas.push( new MouseOverShape(offset[0] + 381, offset[1] + 322, offset[0] + 405, offset[1] + 346, myCharacter.strongholdType) );
	}

	if (myCharacter.strongholdClass != classType.NONE)
	{
		var icon = getStrongholdClassIcon(myCharacter.strongholdClass);

		elements[0].push( new Shape( offset[0] + 410, offset[1] + 322, offset[2] + 14, icon, 24, 24, targetCanvas) );
		mouseOverAreas.push( new MouseOverShape(offset[0] + 410, offset[1] + 322, offset[0] + 434, offset[1] + 346, myCharacter.strongholdClass) );
	}

	// -------------------------------------- Traits --------------------------------------

	// More than 14: space is not enough
	var idealDistance = 3;
	var iconWidth = 24;
	var widthOffset = iconWidth + idealDistance;
	var availableSpace = 378;
	var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

	if (myCharacter.traits.length > maxNumberWithoutOverlay)
	{
		widthOffset = Math.floor(availableSpace / myCharacter.traits.length);
	}

	// If widthOffset is less than 24 we get overlap
	var mouseOverWidth = iconWidth;
	if (widthOffset < iconWidth)
	{
		mouseOverWidth = widthOffset;
	}

	myCharacter.traits.sort(function(a,b) { return a - b; });
	for (var traitIterator = 0; traitIterator < myCharacter.traits.length; traitIterator++)
	{
		var traitId = myCharacter.traits[traitIterator];
		var trait = traits.get(traitId);
		var traitImage = trait.getImageUrl();
		var xOffset = 45 + (widthOffset * traitIterator);

		var xPos = offset[0] + xOffset;
		var yPos = offset[1] + 295;

		elements[0].push( new Shape(xPos, yPos, offset[2] + 12 + traitIterator, traitImage, 24, 24, targetCanvas));
		mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + mouseOverWidth, yPos + 24, trait.getMouseOverText()) );
	}

	// -------------------------------------- Modifiers --------------------------------------
	// Have to look up event modifiers under common/event_modifiers/

	// -------------------------------------- Realm Shield --------------------------------------
	var titleToRender = 0;
	if (myCharacter.primaryTitle > 0)
	{
		titleToRender = myCharacter.primaryTitle;
	}
	
	if (myCharacter.liege > 0 && characterMap.has(myCharacter.liege))
	{
		var liege = characterMap.get(myCharacter.liege);

		var searchForHigherTitle = (titleToRender == 0);
		var tmpLiege = liege;
		while (searchForHigherTitle)
		{
			if (tmpLiege.primaryTitle > 0)
			{
				// Found primary title
				titleToRender = tmpLiege.primaryTitle;
				searchForHigherTitle = false;
			}
			else if (tmpLiege.liege == 0 || !(characterMap.has(tmpLiege.liege)))
			{
				// Nobody found
				searchForHigherTitle = false;
			}
			else
			{
				tmpLiege = characterMap.get(tmpLiege.liege);
				searchForHigherTitle = true;
			}
		}

		// I guess this is a good time to render the liege as well
		// -------------------------------------- LIEGE --------------------------------------
		elements.push( renderCharacterPortrait(liege, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
		elements.push( new RenderedImage(231, 48, 550, 74, 74, helperCanvases[helperCanvasIterator], targetCanvas) );
		helperCanvasIterator++;

		elements[0].push( new Shape(offset[0] + 224, offset[1] + 99, offset[2] + 600, "profile/scroll_heir.png", 88, 30, targetCanvas));
		elements[0].push( new TextLabel(offset[0] + 268, offset[1] + 117, 610, 170, 16, "Liege", "center", "black", true, targetCanvas) );

		if (liege.hasPrimaryTitle())
		{
			var liegeTitle = titles.get(liege.primaryTitle);
			var titleImages = getTitleImages(liegeTitle);
			var crownImages = getCrownImages(liegeTitle);

			elements[0].push( new Shape(offset[0] + 214, offset[1] + 70, offset[2] + 620, titleImages[0], 35, 37, targetCanvas));
			elements[0].push( new Shape(offset[0] + 214, offset[1] + 70, offset[2] + 622, titleImages[1], 35, 37, targetCanvas));
			elements[0].push( new Shape(offset[0] + 216, offset[1] + 46, offset[2] + 630, crownImages[0], 30, 30, targetCanvas));
			elements[0].push( new Shape(offset[0] + 216, offset[1] + 46, offset[2] + 632, crownImages[1], 30, 30, targetCanvas));
		}

		// Shield: 214,70,35,37
		// Crown: 216,47,30,30
	}

	if (titleToRender > 0 && titles.has(titleToRender))
	{
		var renderTitle = titles.get(titleToRender);

		var titleImages = getTitleImages(renderTitle);
		var crownImages = getCrownImages(renderTitle);

		elements[0].push( new Shape(offset[0] + 10, offset[1] + 140, offset[2] + 624, titleImages[0], 80, 84, targetCanvas));
		elements[0].push( new Shape(offset[0] + 10, offset[1] + 140, offset[2] + 626, titleImages[1], 80, 84, targetCanvas));
		elements[0].push( new Shape(offset[0] + 17, offset[1] + 88, offset[2] + 634, crownImages[0], 64, 64, targetCanvas));
		elements[0].push( new Shape(offset[0] + 17, offset[1] + 88, offset[2] + 636, crownImages[1], 64, 64, targetCanvas));
	}

	// -------------------------------------- Heir --------------------------------------
	if (myCharacter.heir > 0 && characterMap.has(myCharacter.heir))
	{
		var heir = characterMap.get(myCharacter.heir);

		elements.push( renderCharacterPortrait(heir, [0,0,0], helperCanvases[helperCanvasIterator], false, false) );
		elements.push( new RenderedImage(69, 210, 700, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
		helperCanvasIterator++;

		//mouseOverAreas.push( new MouseOverShape(offset[0] + 215, offset[1] + 115, offset[0] + 360, offset[1] + 248, getFullName(spouse)) );

		elements[0].push( new Shape(offset[0] + 76, offset[1] + 215, offset[2] + 800, "profile/frame_heir.png", 59, 49, targetCanvas));
		elements[0].push( new Shape(offset[0] + 61, offset[1] + 259, offset[2] + 801, "profile/scroll_heir.png", 88, 30, targetCanvas));

		elements[0].push( new TextLabel(offset[0] + 105, offset[1] + 277, 810, 170, 16, "Heir", "center", "black", true, targetCanvas) );
	}

	// -------------------------------------- Held Titles --------------------------------------
	if (myCharacter.titles.length > 0)
	{
		myCharacter.titles.sort(function (a,b) {
			return titles.get(b).titleImportance - titles.get(a).titleImportance;
		});

		var idealDistance = 5;
		var iconWidth = 26;
		var widthOffset = iconWidth + idealDistance;
		var availableSpace = 200;
		var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

		if (myCharacter.titles.length > maxNumberWithoutOverlay)
		{
			widthOffset = Math.floor(availableSpace / myCharacter.titles.length);
		}

		// If widthOffset is less than 24 we get overlap
		var mouseOverWidth = iconWidth;
		if (widthOffset < iconWidth)
		{
			mouseOverWidth = widthOffset;
		}

		for (var titleIterator = 0; titleIterator < myCharacter.titles.length; titleIterator++)
		{
			var titleId = myCharacter.titles[titleIterator];
			var title = titles.get(titleId);

			// Shield: 44, 364, 22, 23
			// Crown: 45, 346, 20, 20

			var xOffset = 44 + (widthOffset * titleIterator);
			var xPos = offset[0] + xOffset;
			var yPos = offset[1] + 361;

			var titleImages = getTitleImages(title);
			var crownImages = getCrownImages(title);

			elements[0].push( new Shape(xPos, yPos, offset[2] + 640 + titleIterator, titleImages[0], 26, 27, targetCanvas));
			elements[0].push( new Shape(xPos, yPos, offset[2] + 643 + titleIterator, titleImages[1], 26, 27, targetCanvas));

			elements[0].push( new Shape(xPos + 1, yPos - 20, offset[2] + 645 + titleIterator, crownImages[0], 24, 24, targetCanvas));
			elements[0].push( new Shape(xPos + 1, yPos - 20, offset[2] + 647 + titleIterator, crownImages[1], 24, 24, targetCanvas));

			mouseOverAreas.push( new MouseOverShape(xPos, yPos - 20, xPos + mouseOverWidth, yPos + 51, getTitleMouseOverText(title)) );
		}
	}

	// -------------------------------------- Title Claims --------------------------------------
	if (myCharacter.claims.length > 0)
	{
		myCharacter.claims.sort(function (a,b) {
			return titles.get(b).titleImportance - titles.get(a).titleImportance;
		});

		var idealDistance = 4;
		var iconWidth = 24;
		var widthOffset = iconWidth + idealDistance;
		var availableSpace = 103;
		var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

		if (myCharacter.claims.length > maxNumberWithoutOverlay)
		{
			widthOffset = Math.floor(availableSpace / myCharacter.claims.length);
		}

		// If widthOffset is less than 24 we get overlap
		var mouseOverWidth = iconWidth;
		if (widthOffset < iconWidth)
		{
			mouseOverWidth = widthOffset;
		}

		for (var titleIterator = 0; titleIterator < myCharacter.claims.length; titleIterator++)
		{
			var titleId = myCharacter.claims[titleIterator];
			var title = titles.get(titleId);

			// Shield: 44, 364, 22, 23
			// Crown: 45, 346, 20, 20

			var xOffset = 284 + (widthOffset * titleIterator);
			var xPos = offset[0] + xOffset;
			var yPos = offset[1] + 364;

			var titleImages = getTitleImages(title);
			var crownImages = getCrownImages(title);

			elements[0].push( new Shape(xPos + 0.5, yPos, offset[2] + 640 + titleIterator, titleImages[0], 22, 23, targetCanvas));
			elements[0].push( new Shape(xPos + 0.5, yPos, offset[2] + 642 + titleIterator, titleImages[1], 22, 23, targetCanvas));
			elements[0].push( new Shape(xPos, yPos, offset[2] + 644 + titleIterator, "profile/claim.png", 24, 24, targetCanvas));

			elements[0].push( new Shape(xPos + 1, yPos - 19, offset[2] + 646 + titleIterator, crownImages[0], 22, 22, targetCanvas));
			elements[0].push( new Shape(xPos + 1, yPos - 19, offset[2] + 648 + titleIterator, crownImages[1], 22, 22, targetCanvas));

			mouseOverAreas.push( new MouseOverShape(xPos, yPos - 20, xPos + mouseOverWidth, yPos + 51, getTitleMouseOverText(title)) );
		}
	}

	// -------------------------------------- Title Claims --------------------------------------
	if (myCharacter.pacts.length > 0)
	{
		myCharacter.pacts.sort(function (a,b) {
			return pacts.get(a).getTypeIndex() - pacts.get(b).getTypeIndex();
		});

		var idealDistance = 2;
		var iconWidth = 24;
		var widthOffset = iconWidth + idealDistance;
		var availableSpace = 108;
		var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

		if (myCharacter.pacts.length > maxNumberWithoutOverlay)
		{
			widthOffset = Math.floor(availableSpace / myCharacter.pacts.length);
		}

		// If widthOffset is less than 24 we get overlap
		var mouseOverWidth = iconWidth;
		if (widthOffset < iconWidth)
		{
			mouseOverWidth = widthOffset;
		}

		var pactUsedIterator = 0;

		for (var pactIterator = 0; pactIterator < myCharacter.pacts.length; pactIterator++)
		{
			var pactId = myCharacter.pacts[pactIterator];
			var pact = pacts.get(pactId);
			var otherCharacterId = pact.getOtherCharacter(myCharacter.id);

			if (otherCharacterId == 0)
			{
				continue;
			}

			var otherCharacter = characterMap.get(otherCharacterId);

			if (!otherCharacter.hasPrimaryTitle())
			{
				continue;
			}

			var otherCharacterTitle = titles.get(otherCharacter.primaryTitle);

			if (otherCharacterTitle.name == "")
			{
				continue;
			}

			// Shield: 44, 364, 22, 23
			// Crown: 45, 346, 20, 20

			var xOffset = 420 + (widthOffset * pactUsedIterator);
			var xPos = offset[0] + xOffset;
			var yPos = offset[1] + 351;

			var titleImages = getTitleImages(otherCharacterTitle);

			elements[0].push( new Shape(xPos + 1, yPos + 17, offset[2] + 648 + pactUsedIterator, pact.getImageUrl(), 20, 24, targetCanvas));

			elements[0].push( new Shape(xPos, yPos, offset[2] + 650 + pactUsedIterator, titleImages[0], 22, 23, targetCanvas));
			elements[0].push( new Shape(xPos, yPos, offset[2] + 652 + pactUsedIterator, titleImages[1], 22, 23, targetCanvas));

			//mouseOverAreas.push( new MouseOverShape(xPos, yPos - 20, xPos + mouseOverWidth, yPos + 51, getTitleMouseOverText(title)) );

			pactUsedIterator++;
		}
	}

	// -------------------------------------- Parents --------------------------------------
	if (myCharacter.parents.length > 0)
	{
		var fatherId = myCharacter.getFather();
		var motherId = myCharacter.getMother();
		var pit = 0;
		var parentPositions = [[50,426], [114,426]];

		var grandParentPositions = [[[220,426], [255,426]],[[280,426],[315,426]]];

		// Render First
		if (fatherId > 0)
		{
			var father = characterMap.get(fatherId);
			elements.push( renderCharacterPortrait(father, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(parentPositions[pit][0], parentPositions[pit][1], 1100, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;	

			if (!father.alive)
			{
				elements.push( new Shape(offset[0] + parentPositions[pit][0] + 9, offset[1] + parentPositions[pit][1] + 40, offset[2] + 1300, "portrait/skull.png", 28, 28, targetCanvas));
			}

			// -------------------------------------- Grandparents Father Side --------------------------------------

			pit++;
		}

		if (motherId > 0)
		{
			var mother = characterMap.get(motherId);
			elements.push( renderCharacterPortrait(mother, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(parentPositions[pit][0], parentPositions[pit][1], 1200, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;

			if (!mother.alive)
			{
				elements.push( new Shape(offset[0] + parentPositions[pit][0] + 9, offset[1] + parentPositions[pit][1] + 40, offset[2] + 1300, "portrait/skull.png", 28, 28, targetCanvas));
			}

			// -------------------------------------- Grandparents Mother Side --------------------------------------
		}
	}

	return elements;
}

/*
	Scroll for the heir: 61,259,88,30
	Scroll for liege: 224,149,88,30

	BG Splotch for Spouse: 210,117,120,132
	Frame for spouse: 217,128,102,106
	Scroll for spouse: 215,219,106,30
*/



/*function getCrown(character, offset, targetCanvas, behind)
{
	var title = titles.get(character.primaryTitle);
	var crown = 5 - title.titleImportance;

	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var genderPart = character.gender == gender.MALE ? "male" : "female";
	var identifier = behind ? "_headgear_behind" : "_headgear";
	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + identifier + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] +  (behind ? 25 : 65), path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = crown * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function renderCharacter(myCharacter, offset, targetCanvas)
{
	var elements = [];

	// Background: society_symbol_bg_stone.ong
	// Male child: portrait/default_son.png
	// Female child: portrait/default_daughter.png
	// Other child: portrait/duck_son.png

	var crowned = (myCharacter.primaryTitle > 0) && titles.has(myCharacter.primaryTitle);
	var bearded = (myCharacter.gender == gender.MALE) && (myCharacter.age >= 20);

	elements.push( new Shape(-1, 2, offset[2] + 1, "portrait/society_symbol_bg_stone.png", 200, 201, targetCanvas));

	if (myCharacter.age < 16)
	{
		if (myCharacter.gender == gender.OTHER)
		{
			elements.push( new Shape( 24, 24, offset[2] + 2, "portrait/duck_son.png", 152, 152, targetCanvas));
		}
		else if (myCharacter.gender == gender.MALE)
		{
			elements.push( new Shape( 24, 24, offset[2] + 2, "portrait/default_son.png", 152, 152, targetCanvas));
		}
		else if (myCharacter.gender == gender.FEMALE)
		{
			elements.push( new Shape( 24, 24, offset[2] + 2, "portrait/default_daughter.png", 152, 152, targetCanvas));
		}
	} else {
		elements.push( getBackground(myCharacter, offset, targetCanvas) );

		elements.push( getHair(myCharacter, offset, targetCanvas, true) );

		if (crowned)
		{
			elements.push( getCrown(myCharacter, offset, targetCanvas, true) );
		}

		elements.push( getClothes(myCharacter, offset, targetCanvas, true) );

		if (bearded)
		{
			elements.push( getBeard(myCharacter, offset, targetCanvas, true ) );
		}

		// Facial Features
		elements.push( getFace(myCharacter, offset, targetCanvas) );
		elements.push( getNeck(myCharacter, offset, targetCanvas) );
		elements.push( getCheeks(myCharacter, offset, targetCanvas) );
		elements.push( getChin(myCharacter, offset, targetCanvas) );
		elements.push( getMouth(myCharacter, offset, targetCanvas) );
		elements.push( getNose(myCharacter, offset, targetCanvas) );
		elements.push( getEar(myCharacter, offset, targetCanvas) );

		var eyeParts = getEyes(myCharacter, offset, targetCanvas);
		for (var i = 0; i < eyeParts.length; i++)
		{
			elements.push( eyeParts[i] );
		}

		elements.push( getHair(myCharacter, offset, targetCanvas, false) );

		elements.push( getClothes(myCharacter, offset, targetCanvas, false) );

		if (bearded)
		{
			elements.push( getBeard(myCharacter, offset, targetCanvas, false ) );
		}

		if (crowned)
		{
			elements.push( getCrown(myCharacter, offset, targetCanvas, false) );
		}
	}

	var importance = 0;

	var feudalFrames = new Map();
	feudalFrames.set(1, [18, 12, "portrait/Baron_Feudal.png", 162, 175]);
	feudalFrames.set(2, [17, 12, "portrait/Count_Feudal.png", 165, 176]);
	feudalFrames.set(3, [19, 12, "portrait/Duke_Feudal.png", 162, 176]);
	feudalFrames.set(4, [14, 12, "portrait/King_Feudal.png", 171, 176]);
	feudalFrames.set(5, [14, 12, "portrait/Emperor_Feudal.png", 171, 176]);

	if (crowned)
	{
		var primaryTitle = titles.get(myCharacter.primaryTitle);

		if (feudalFrames.has(primaryTitle.titleImportance))
		{
			var frame = feudalFrames.get(primaryTitle.titleImportance);

			elements.push( new Shape(frame[0], frame[1], offset[2] + 300, frame[2], frame[3], frame[4], targetCanvas));
		}
	}

	return elements;
}*/