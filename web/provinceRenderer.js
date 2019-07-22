function initSampleProvince(myCharacter) {

	var anotherCharacter = new Character("Otto", characterIterator++);
	characterMap.set(anotherCharacter.id, anotherCharacter);
	anotherCharacter.liege = myCharacter.id;
	myCharacter.vassals.push(anotherCharacter.id);

	var myProvince = new County("", titleIterator++);
	titles.set(myProvince.id, myProvince);
	myCharacter.titles.push(myProvince.id);

	var someDuchy = new Duchy("Kielingen", titleIterator++);
	someDuchy.counties.push(myProvince.id);
	someDuchy.owner = myCharacter;
	myCharacter.primaryTitle = someDuchy.id;
	myCharacter.origin = myProvince.id;
	titles.set(someDuchy.id, someDuchy);

	// Primary Holding
	var holding1 = new Holding("Ilex", titleIterator++, holdingtypes.CASTLE);
	holding1.parent = myProvince.id;
	holding1.owner = myCharacter.id;
	myCharacter.titles.push(holding1.id);
	titles.set(holding1.id, holding1);
	myProvince.holdings.push(holding1.id);
	myProvince.primaryHolding = holding1.id;

	// Holding 2
	var holding2 = new Holding("Bad Ilex", titleIterator++, holdingtypes.CITY);
	holding2.parent = myProvince.id;
	holding2.owner = anotherCharacter.id;
	anotherCharacter.titles.push(holding2.id);
	anotherCharacter.primaryHolding = holding2.id;
	titles.set(holding2.id, holding2);
	myProvince.holdings.push(holding2.id);

	// Holding 3
	var holding3 = new Holding("Sankt Gulian", titleIterator++, holdingtypes.TEMPLE);
	holding3.parent = myProvince.id;
	holding3.owner = anotherCharacter.id;
	anotherCharacter.titles.push(holding3.id);
	titles.set(holding3.id, holding3);
	myProvince.holdings.push(holding3.id);

	// Holding 4
	var holding4 = new Holding("Donnerfeste", titleIterator++, holdingtypes.CASTLE);
	holding4.parent = myProvince.id;
	holding4.owner = anotherCharacter.id;
	anotherCharacter.titles.push(holding4.id);
	titles.set(holding4.id, holding4);
	myProvince.holdings.push(holding4.id);

	// Holding 5
	var holding5 = new Holding("Dämmerfort", titleIterator++, holdingtypes.FORT);
	holding5.parent = myProvince.id;
	titles.set(holding5.id, holding5);
	myProvince.holdings.push(holding5.id);

	// Holding 6
	var holding6 = new Holding("placeholder", titleIterator++, holdingtypes.EMPTY);
	holding6.parent = myProvince.id;
	titles.set(holding6.id, holding6);
	myProvince.holdings.push(holding6.id);

	// Holding 7
	var holding7 = new Holding("placeholder", titleIterator++, holdingtypes.EMPTY);
	holding7.parent = myProvince.id;
	titles.set(holding7.id, holding7);
	myProvince.holdings.push(holding7.id);

	return myProvince;
}

function renderProvince(province, targetCanvas)
{
	var elements = [
		new Shape(0, 0, 0, 'province/bg.png', 343, 446, targetCanvas)
	];

	var liegeTitle = null;

	/*var primaryLiegeCrowns = new Map();
	primaryLiegeCrowns.set(2, [275, 9, 34, 20, "province/crownCounty.png"]);
	primaryLiegeCrowns.set(3, [274, 7, 36, 22, "province/crownDuchy.png"]);
	primaryLiegeCrowns.set(4, [275, 3, 34, 26, "province/crownKingdom.png"]);
	primaryLiegeCrowns.set(5, [269, 2, 45, 24, "province/crownEmpire.png"]);*/

	// Primary Holding Background
	if (province.primaryHolding && titles.has(province.primaryHolding))
	{
		var primaryHolding = titles.get(province.primaryHolding);

		if (primaryHolding.owner > 0 && characterMap.has(primaryHolding.owner))
		{
			// Get title chain
			var owner = characterMap.get(primaryHolding.owner);
			elements.push( new TextLabel(112, 203, 100, 160, 16, getFullName(owner), "center", "white", false, targetCanvas) );
			var titleChain = getTitleChainUp(owner);

			// Get realm icon
			if (titleChain.length > 0)
			{
				var liegeTitleId = titleChain[titleChain.length - 1][1];
				if (titles.has(liegeTitleId))
				{
					liegeTitle = titles.get(liegeTitleId);
					var liegeTitleImages = getTitleImages(liegeTitle);
					elements.push( new Shape(269, 27, 3, liegeTitleImages[0], 44, 46, targetCanvas));
					elements.push( new Shape(269, 27, 4, liegeTitleImages[1], 44, 46, targetCanvas));

					elements.push( new Shape(284, 96, 3, liegeTitleImages[0], 32, 34, targetCanvas));
					elements.push( new Shape(284, 96, 4, liegeTitleImages[1], 32, 34, targetCanvas));

					var crownImages = getCrownImages(liegeTitle);
					elements.push( new Shape(273, -5, 5, crownImages[0], 38, 39, targetCanvas));
					elements.push( new Shape(273, -5, 6, crownImages[1], 38, 39, targetCanvas));
				}
			}

			if (owner.strongholdType != strongholdType.NONE)
			{
				var icon = getStrongholdTypeIcon(owner.strongholdType);

				elements.push( new Shape( 203, 190, 5, icon, 24, 24, targetCanvas) );
			}

			if (owner.strongholdClass != classType.NONE)
			{
				var icon = getStrongholdClassIcon(owner.strongholdClass);

				elements.push( new Shape( 292, 191, 5, icon, 24, 24, targetCanvas) );
			}
		}

		elements.push( new TextLabel(85, 28, 100, 170, 16, primaryHolding.name, "left", "white", false, targetCanvas) );

		var bgUrl = getHoldingBackgroundImageLarge(primaryHolding.holdingType);
		elements.push( new Shape(205, 100, 1, bgUrl, 108, 112, targetCanvas));

		var url = getHoldingTypeLargeImage(primaryHolding.holdingType);
		elements.push( new Shape(213, 108, 2, url, 92, 96, targetCanvas));

		var holdingTitleImages = getHoldingTitleImages(primaryHolding);
		if (holdingTitleImages.length > 0)
		{
			// Top Left - County Title
			elements.push( new Shape(10, 27, 3, holdingTitleImages[0], 44, 46, targetCanvas));
			elements.push( new Shape(10, 27, 4, holdingTitleImages[1], 44, 46, targetCanvas));

			// Primary Holding
			elements.push( new Shape(203, 96, 3, holdingTitleImages[0], 32, 34, targetCanvas));
			elements.push( new Shape(203, 96, 4, holdingTitleImages[1], 32, 34, targetCanvas));

			// Crown
			//shapes.push( new Shape(14, 7, 4, 'province/crownCounty.png', 36, 23));
		}
	}

	var holdingPositionIterator = 0;
	var holdingFramePositions = [];
	holdingFramePositions.push([20, 233]);
	holdingFramePositions.push([129, 233]);
	holdingFramePositions.push([238, 233]);
	holdingFramePositions.push([20, 340]);
	holdingFramePositions.push([129, 340]);
	holdingFramePositions.push([238, 340]);

	var holdingBgPositions = [];
	holdingBgPositions.push([28, 241]);
	holdingBgPositions.push([137, 241]);
	holdingBgPositions.push([246, 241]);
	holdingBgPositions.push([28, 348]);
	holdingBgPositions.push([137, 348]);
	holdingBgPositions.push([246, 348]);

	var holdingTitlePositions = [];
	holdingTitlePositions.push([13, 227]);
	holdingTitlePositions.push([122, 227]);
	holdingTitlePositions.push([231, 227]);
	holdingTitlePositions.push([13, 334]);
	holdingTitlePositions.push([122, 334]);
	holdingTitlePositions.push([231, 334]);

	var realmPositions = [];
	realmPositions.push([82, 227]);
	realmPositions.push([191, 227]);
	realmPositions.push([300, 227]);
	realmPositions.push([82, 334]);
	realmPositions.push([191, 334]);
	realmPositions.push([300, 334]);


	for (var i = 0; i < province.holdings.length; i++)
	{
		var holdingId = province.holdings[i];
		if (province.primaryHolding && province.primaryHolding == holdingId)
		{
			// Already done
			continue;
		}

		if (!titles.has(holdingId))
		{
			// Unknown
			continue;
		}

		var holding = titles.get(holdingId);

		var frameUrl = getHoldingBackgroundImageSmall(holding.holdingType);
		var centerImage = getHoldingTypeSmallImage(holding.holdingType);

		elements.push( new Shape(holdingFramePositions[holdingPositionIterator][0], holdingFramePositions[holdingPositionIterator][1], 1, frameUrl, 85, 88, targetCanvas));
		elements.push( new Shape(holdingBgPositions[holdingPositionIterator][0], holdingBgPositions[holdingPositionIterator][1], 2, centerImage, 69, 72, targetCanvas));

		var holdingTitleImageBlas = getHoldingTitleImages(holding);
		if (holdingTitleImageBlas && holdingTitleImageBlas.length > 0)
		{
			elements.push( new Shape(holdingTitlePositions[holdingPositionIterator][0], holdingTitlePositions[holdingPositionIterator][1], 3, holdingTitleImageBlas[0], 32, 34, targetCanvas));
			elements.push( new Shape(holdingTitlePositions[holdingPositionIterator][0], holdingTitlePositions[holdingPositionIterator][1], 4, holdingTitleImageBlas[1], 32, 34, targetCanvas));
		}

		if (holding.owner > 0 && characterMap.has(holding.owner))
		{
			var owner = characterMap.get(holding.owner);

			var titleChain = getTitleChainUp(owner);

			if (titleChain.length > 0)
			{
				var liegeTitleId = titleChain[titleChain.length - 1][1];
				if (titles.has(liegeTitleId))
				{
					liegeTitle = titles.get(liegeTitleId);
					var liegeTitleImages = getTitleImages(liegeTitle);

					elements.push( new Shape(realmPositions[holdingPositionIterator][0], realmPositions[holdingPositionIterator][1], 5, liegeTitleImages[0], 32, 34, targetCanvas));
					elements.push( new Shape(realmPositions[holdingPositionIterator][0], realmPositions[holdingPositionIterator][1], 6, liegeTitleImages[1], 32, 34, targetCanvas));
				}
			}
		}

		holdingPositionIterator++;
	}

	return elements;
}