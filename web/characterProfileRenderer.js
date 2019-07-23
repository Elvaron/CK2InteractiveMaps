var mouseOverAreas = [];
var clickableAreas = [];

function clearEvents(targetCanvas)
{
	var c = document.getElementById(targetCanvas);
	if (clicker)
	{
		c.removeEventListener('click', clicker, true);
	}

	if (mover)
	{
		c.removeEventListener('mousemove', mover, false);
	}

	clicker = null;
	mover = null;
}

function renderCharacter(myCharacter, offset, renderStack, targetCanvas, helperCanvases)
{
	clearCanvas(targetCanvas);
	clearEvents(targetCanvas);
	mouseOverAreas = [];
	clickableAreas = [];
	renderStack.clear();

	var elements = [[]];

	var helperCanvasIterator = 0;

	var traits = GetTraits();

	/*
		Large Skulls
		Myself:	186,197,32,32
		Spouse: 298,204,32,32

	*/

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

		mouseOverAreas.push( new MouseOverShape(offset[0] + 201, offset[1] + 115, offset[0] + 201 + 133, offset[1] + 115 + 133, getFullName(spouse)) );
		clickableAreas.push( new ClickableShape(offset[0] + 201, offset[1] + 115, offset[0] + 201 + 133, offset[1] + 115 + 133, "Spouse", function () {
			renderCharacter(spouse, offset, renderStack, targetCanvas, helperCanvases);
		}));

		elements[0].push( new Shape(offset[0] + 217, offset[1] + 128, offset[2] + 500, "profile/frame_spouse.png", 102, 106, targetCanvas));
		elements[0].push( new Shape(offset[0] + 215, offset[1] + 219, offset[2] + 501, "profile/scroll_spouse.png", 106, 30, targetCanvas));

		if (!spouse.alive)
		{
			elements[0].push( new Shape(offset[0] + 297, offset[1] + 218, offset[2] + 502, "portrait/skull_large.png", 32, 32, targetCanvas));
		}

		var spouseText = (spouse.age < 16 || myCharacter.age < 16) ? "Betrothed" : (spouse.gender == gender.FEMALE ? "Wife" : "Husband");

		elements[0].push( new TextLabel(offset[0] + 268, offset[1] + 239, 503, 170, 16, spouseText, "center", "black", true, targetCanvas) );
	}

	// -------------------------------------- PORTRAIT --------------------------------------
	var portraitElements = renderCharacterPortrait(myCharacter, [50,60,10], targetCanvas, false, true);
	elements[0] = elements[0].concat(portraitElements);

	if (!myCharacter.alive)
	{
		elements[0].push( new Shape(offset[0] + 188, offset[1] + 207, offset[2] + 750, "portrait/skull_large.png", 32, 32, targetCanvas));
	}

	// -------------------------------------- HOUSE SHIELD --------------------------------------
	var houseName = "Lowborn";
	if (myCharacter.house > 0 && houses.has(myCharacter.house))
	{
		var house = houses.get(myCharacter.house);
		houseName = house.name;
		elements[0].push( new Shape(offset[0] + 347, offset[1] + 78, offset[2] + 4, getHouseImage(house), 80, 84, targetCanvas));
		mouseOverAreas.push( new MouseOverShape(offset[0] + 347, offset[1] + 78, offset[0] + 347 + 80, offset[1] + 78 + 84, "House " + houseName) );
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

		mouseOverAreas.push( new MouseOverShape(offset[0] + 231, offset[1] + 48, offset[0] + 231 + 74, offset[1] + 48 + 74, getFullName(liege)) );
		clickableAreas.push( new ClickableShape(offset[0] + 231, offset[1] + 48, offset[0] + 231 + 74, offset[1] + 48 + 74, "Liege", function () {
			renderCharacter(liege, offset, renderStack, targetCanvas, helperCanvases);
		}));

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

		mouseOverAreas.push( new MouseOverShape(offset[0] + 10, offset[1] + 88, offset[0] + 10 + 80, offset[1] + 140 + 84, getTitleMouseOverText(renderTitle)) );
		if (renderTitle.owner > 0 && characterMap.has(renderTitle.owner))
		{
			var titleOwner = characterMap.get(renderTitle.owner);
			clickableAreas.push( new ClickableShape(offset[0] + 10, offset[1] + 88, offset[0] + 10 + 80, offset[1] + 140 + 84, "Title Owner", function () {
				renderCharacter(titleOwner, offset, renderStack, targetCanvas, helperCanvases);
			}));
		}
	}

	// -------------------------------------- Heir --------------------------------------
	if (myCharacter.heir > 0 && characterMap.has(myCharacter.heir))
	{
		var heir = characterMap.get(myCharacter.heir);

		elements.push( renderCharacterPortrait(heir, [0,0,0], helperCanvases[helperCanvasIterator], false, false) );
		elements.push( new RenderedImage(69, 210, 700, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
		helperCanvasIterator++;

		mouseOverAreas.push( new MouseOverShape(offset[0] + 75, offset[1] + 215, offset[0] + 75 + 60, offset[1] + 215 + 60, getFullName(heir)) );
		clickableAreas.push( new ClickableShape(offset[0] + 75, offset[1] + 215, offset[0] + 75 + 60, offset[1] + 215 + 60, "Heir", function () {
			renderCharacter(heir, offset, renderStack, targetCanvas, helperCanvases);
		}));

		elements[0].push( new Shape(offset[0] + 76, offset[1] + 215, offset[2] + 800, "profile/frame_heir.png", 59, 49, targetCanvas));
		elements[0].push( new Shape(offset[0] + 61, offset[1] + 259, offset[2] + 801, "profile/scroll_heir.png", 88, 30, targetCanvas));

		elements[0].push( new TextLabel(offset[0] + 105, offset[1] + 277, 810, 170, 16, "Heir", "center", "black", true, targetCanvas) );
	}

	// -------------------------------------- Regent --------------------------------------
	if (myCharacter.regent > 0 && characterMap.has(myCharacter.regent))
	{
		var regent = characterMap.get(myCharacter.regent);

		elements.push( renderCharacterPortrait(regent, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
		elements.push( new RenderedImage(153, 210, 750, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
		helperCanvasIterator++;

		mouseOverAreas.push( new MouseOverShape(offset[0] + 158, offset[1] + 215, offset[0] + 158 + 60, offset[1] + 215 + 60, getFullName(regent)) );
		clickableAreas.push( new ClickableShape(offset[0] + 158, offset[1] + 215, offset[0] + 158 + 60, offset[1] + 215 + 60, "Regent", function () {
			renderCharacter(regent, offset, renderStack, targetCanvas, helperCanvases);
		}));

		elements[0].push( new Shape(offset[0] + 145, offset[1] + 259, offset[2] + 803, "profile/scroll_heir.png", 88, 30, targetCanvas));

		elements[0].push( new TextLabel(offset[0] + 189, offset[1] + 277, 810, 170, 16, "Regent", "center", "black", true, targetCanvas) );
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
			if (title.owner > 0 && title.owner != myCharacter.id)
			{
				var titleOwner = characterMap.get(title.owner);

				clickableAreas.push( new ClickableShape(xPos, yPos - 20, xPos + mouseOverWidth, yPos + 51, "Title Owner", function () {
					renderCharacter(titleOwner, offset, renderStack, targetCanvas, helperCanvases);
				}));
			}			
		}
	}

	// -------------------------------------- Council -------------------------------------------
	if (myCharacter.council.exists())
	{
		// 344,262,87,24
		elements[0].push( new Shape(offset[0] + 344, offset[1] + 262, offset[2] + 610, "profile/has_council.png", 87, 24, targetCanvas));
		mouseOverAreas.push( new MouseOverShape(offset[0] + 344, offset[1] + 262, offset[0] + 344 + 87, offset[1] + 262 + 24, "View council") );
		clickableAreas.push( new ClickableShape(offset[0] + 344, offset[1] + 262, offset[0] + 344 + 87, offset[1] + 262 + 24, "Council Button", function () {
			drawCouncil();
		}));
	}


	// -------------------------------------- Pacts --------------------------------------
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

			mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + mouseOverWidth, yPos + 17 + 24, pact.getDescription()) );
			clickableAreas.push( new ClickableShape(xPos, yPos, xPos + mouseOverWidth, yPos + 17 + 24, "Pact Partner", function () {
				renderCharacter(otherCharacter, offset, renderStack, targetCanvas, helperCanvases);
			}));

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

		var grandParentPositions = [[[220,426], [290,426]],[[360,426],[430,426]]];
		var pOuter = 0; // Whether the first set of grandparents exists
		var pInner = 0; // Whether the father exists

		// Render First
		if (fatherId > 0)
		{
			var xPos = offset[0] + parentPositions[pit][0];
			var yPos = offset[1] + parentPositions[pit][1];

			var father = characterMap.get(fatherId);
			elements.push( renderCharacterPortrait(father, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(xPos, yPos, offset[2] + 1100, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;

			mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + 70, yPos + 70, getFullName(father)) );
			clickableAreas.push( new ClickableShape(xPos, yPos, xPos + 70, yPos + 70, "Father", function () {
				renderCharacter(father, offset, renderStack, targetCanvas, helperCanvases);
			}));

			if (!father.alive)
			{
				elements.push( new Shape(offset[0] + parentPositions[pit][0] + 9, offset[1] + parentPositions[pit][1] + 40, offset[2] + 1300, "portrait/skull.png", 28, 28, targetCanvas));
			}

			// -------------------------------------- Grandparents Father Side --------------------------------------
			var grandfatherId = father.getFather();
			var grandmotherId = father.getMother();

			if (grandfatherId > 0)
			{
				var xPos = offset[0] + grandParentPositions[pOuter][pInner][0];
				var yPos = offset[1] + grandParentPositions[pOuter][pInner][1];

				var grandfather = characterMap.get(grandfatherId);
				elements.push( renderCharacterPortrait(grandfather, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
				elements.push( new RenderedImage(xPos, yPos, offset[2] + 1200, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
				helperCanvasIterator++;	

				if (!grandfather.alive)
				{
					elements.push( new Shape(xPos + 9, yPos + 40, offset[2] + 1310, "portrait/skull.png", 28, 28, targetCanvas));
				}

				mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + 70, yPos + 70, getFullName(grandfather)) );
				clickableAreas.push( new ClickableShape(xPos, yPos, xPos + 70, yPos + 70, "Grandfather", function () {
					renderCharacter(grandfather, offset, renderStack, targetCanvas, helperCanvases);
				}));

				pInner = 1;
			}

			if (grandmotherId > 0)
			{
				var xPos = offset[0] + grandParentPositions[pOuter][pInner][0];
				var yPos = offset[1] + grandParentPositions[pOuter][pInner][1];

				var grandmother = characterMap.get(grandmotherId);
				elements.push( renderCharacterPortrait(grandmother, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
				elements.push( new RenderedImage(xPos, yPos, offset[2] + 1250, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
				helperCanvasIterator++;	

				if (!grandmother.alive)
				{
					elements.push( new Shape(xPos + 9, yPos + 40, offset[2] + 1320, "portrait/skull.png", 28, 28, targetCanvas));
				}

				mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + 70, yPos + 70, getFullName(grandmother)) );
				clickableAreas.push( new ClickableShape(xPos, yPos, xPos + 70, yPos + 70, "Grandmother", function () {
					renderCharacter(grandmother, offset, renderStack, targetCanvas, helperCanvases);
				}));

				pInner = 1;
			}

			if (pInner > 0)
			{
				pOuter = 1;
				pInner = 0;
			}

			pit++;
		}

		if (motherId > 0)
		{
			var xPos = offset[0] + parentPositions[pit][0];
			var yPos = offset[1] + parentPositions[pit][1];

			var mother = characterMap.get(motherId);
			elements.push( renderCharacterPortrait(mother, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(xPos, yPos, 1200, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;

			if (!mother.alive)
			{
				elements.push( new Shape(xPos + 9, yPos + 40, offset[2] + 1300, "portrait/skull.png", 28, 28, targetCanvas));
			}

			mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + 70, yPos + 70, getFullName(mother)) );
			clickableAreas.push( new ClickableShape(xPos, yPos, xPos + 70, yPos + 70, "Mother", function () {
				renderCharacter(mother, offset, renderStack, targetCanvas, helperCanvases);
			}));

			// -------------------------------------- Grandparents Mother Side --------------------------------------
			var grandfatherId = mother.getFather();
			var grandmotherId = mother.getMother();

			if (grandfatherId > 0)
			{
				var xPos = offset[0] + grandParentPositions[pOuter][pInner][0];
				var yPos = offset[1] + grandParentPositions[pOuter][pInner][1];

				var grandfather = characterMap.get(grandfatherId);
				elements.push( renderCharacterPortrait(grandfather, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
				elements.push( new RenderedImage(xPos, yPos, offset[2] + 1400, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
				helperCanvasIterator++;	

				if (!grandfather.alive)
				{
					elements.push( new Shape(xPos + 9, yPos + 40, offset[2] + 1510, "portrait/skull.png", 28, 28, targetCanvas));
				}

				mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + 70, yPos + 70, getFullName(grandfather)) );
				clickableAreas.push( new ClickableShape(xPos, yPos, xPos + 70, yPos + 70, "Grandfather", function () {
					renderCharacter(grandfather, offset, renderStack, targetCanvas, helperCanvases);
				}));

				pInner = 1;
			}

			if (grandmotherId > 0)
			{
				var xPos = offset[0] + grandParentPositions[pOuter][pInner][0];
				var yPos = offset[1] + grandParentPositions[pOuter][pInner][1];

				var grandmother = characterMap.get(grandmotherId);
				elements.push( renderCharacterPortrait(grandmother, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
				elements.push( new RenderedImage(xPos, yPos, offset[2] + 1450, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
				helperCanvasIterator++;

				if (!grandmother.alive)
				{
					elements.push( new Shape(xPos + 9, yPos + 40, offset[2] + 1520, "portrait/skull.png", 28, 28, targetCanvas));
				}

				mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + 70, yPos + 70, getFullName(grandmother)) );
				clickableAreas.push( new ClickableShape(xPos, yPos, xPos + 70, yPos + 70, "Grandmother", function () {
					renderCharacter(grandmother, offset, renderStack, targetCanvas, helperCanvases);
				}));

				pInner = 1;
			}
		}
	}

	// -------------------------------------- Children --------------------------------------
	if (myCharacter.children.length > 0)
	{
		myCharacter.children.sort(function (a,b) {
			return characterMap.get(b).age - characterMap.get(a).age;
		});

		var idealDistance = 2;
		var iconWidth = 55;
		var widthOffset = iconWidth + idealDistance;
		var availableSpace = 240;
		var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

		if (myCharacter.children.length > maxNumberWithoutOverlay)
		{
			widthOffset = Math.floor(availableSpace / myCharacter.children.length);
		}

		// If widthOffset is less than 24 we get overlap
		var mouseOverWidth = iconWidth;
		if (widthOffset < iconWidth)
		{
			mouseOverWidth = widthOffset;
		}

		for (var childIterator = 0; childIterator < myCharacter.children.length; childIterator++)
		{
			var childId = myCharacter.children[childIterator];
			var child = characterMap.get(childId);

			var xOffset = 30 + (widthOffset * childIterator);
			var xPos = offset[0] + xOffset;
			var yPos = offset[1] + 518;
			var zPos = offset[2] + 1600 + (100 * childIterator);

			elements.push( renderCharacterPortrait(child, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(xPos, yPos, zPos, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;

			if (!child.alive)
			{
				elements.push( new Shape(xPos + 9, yPos + 40, zPos + 50, "portrait/skull.png", 28, 28, targetCanvas));
			}

			mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + mouseOverWidth, yPos + 70, getFullName(child)) );
			clickableAreas.push( new ClickableShape(xPos, yPos, xPos + mouseOverWidth, yPos + 70, "Child", function () {
				renderCharacter(child, offset, renderStack, targetCanvas, helperCanvases);
			}));
		}
	}

	// -------------------------------------- Siblings --------------------------------------
	var siblings = myCharacter.getSiblings();

	if (siblings.length > 0)
	{
		siblings.sort(function (a,b) {
			return characterMap.get(b).age - characterMap.get(a).age;
		});

		var idealDistance = 2;
		var iconWidth = 55;
		var widthOffset = iconWidth + idealDistance;
		var availableSpace = 130;
		var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

		if (siblings.length > maxNumberWithoutOverlay)
		{
			widthOffset = Math.floor(availableSpace / siblings.length);
		}

		// If widthOffset is less than 24 we get overlap
		var mouseOverWidth = iconWidth;
		if (widthOffset < iconWidth)
		{
			mouseOverWidth = widthOffset;
		}

		for (var siblingIterator = 0; siblingIterator < siblings.length; siblingIterator++)
		{
			var siblingId = siblings[siblingIterator];
			var sibling = characterMap.get(siblingId);

			var xOffset = 334 + (widthOffset * siblingIterator);
			var xPos = offset[0] + xOffset;
			var yPos = offset[1] + 518;
			var zPos = offset[2] + 2600 + (100 * siblingIterator);

			elements.push( renderCharacterPortrait(sibling, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(xPos, yPos, zPos, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;

			if (!sibling.alive)
			{
				elements.push( new Shape(xPos + 9, yPos + 40, zPos + 50, "portrait/skull.png", 28, 28, targetCanvas));
			}

			mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + mouseOverWidth, yPos + 70, getFullName(sibling)) );
			clickableAreas.push( new ClickableShape(xPos, yPos, xPos + mouseOverWidth, yPos + 70, "Sibling", function () {
				renderCharacter(sibling, offset, renderStack, targetCanvas, helperCanvases);
			}));
		}
	}

	if (myCharacter.vassals.length > 0)
	{
		myCharacter.vassals.sort(function (a,b) {
			return characterMap.get(b).getImportance() - characterMap.get(a).getImportance();
		});

		var idealDistance = 5;
		var iconWidth = 55;
		var widthOffset = iconWidth + idealDistance;
		var availableSpace = 450;
		var maxNumberWithoutOverlay = Math.floor(availableSpace / widthOffset);

		if (myCharacter.vassals.length > maxNumberWithoutOverlay)
		{
			widthOffset = Math.floor(availableSpace / myCharacter.vassals.length);
		}

		// If widthOffset is less than 24 we get overlap
		var mouseOverWidth = iconWidth;
		if (widthOffset < iconWidth)
		{
			mouseOverWidth = widthOffset;
		}

		for (var vassalIterator = 0; vassalIterator < myCharacter.vassals.length; vassalIterator++)
		{
			var vassalId = myCharacter.vassals[vassalIterator];
			var vassal = characterMap.get(vassalId);

			var xOffset = 30 + (widthOffset * vassalIterator);
			var xPos = offset[0] + xOffset;
			var yPos = offset[1] + 610;
			var zPos = offset[2] + 3600 + (100 * vassalIterator);

			elements.push( renderCharacterPortrait(vassal, [0,0,0], helperCanvases[helperCanvasIterator], false, true) );
			elements.push( new RenderedImage(xPos, yPos, zPos, 70, 70, helperCanvases[helperCanvasIterator], targetCanvas) );
			helperCanvasIterator++;

			if (!vassal.alive)
			{
				elements.push( new Shape(xPos + 9, yPos + 40, zPos + 50, "portrait/skull.png", 28, 28, targetCanvas));
			}

			mouseOverAreas.push( new MouseOverShape(xPos, yPos, xPos + mouseOverWidth, yPos + 70, getFullName(vassal)) );
			clickableAreas.push( new ClickableShape(xPos, yPos, xPos + mouseOverWidth, yPos + 70, "Vassal", function () {
				renderCharacter(vassal, offset, renderStack, targetCanvas, helperCanvases);
			}));
		}
	}

	for (var i = 0; i < elements.length; i++)
	{
		renderStack.addElements(elements[i]);
	}

	loadRenderStack(renderStack);

	//return elements;
}

var councilVisible = false;

function drawCouncil ()
{
	if (councilVisible)
	{
		clearCanvasFromPoint("profile", 549, 0);
		councilVisible = false;
		return;
	}

	councilVisible = true;
	var renderStack = new RenderStack();
	renderStack.addElement(new Shape(549, 0, 0, "council/bg.png", 260, 540, "profile"));
	loadRenderStack(renderStack);
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