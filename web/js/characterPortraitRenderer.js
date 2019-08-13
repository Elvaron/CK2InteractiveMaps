function initSampleCharacterWithGender(randomizeTitle, charGender)
{
	var result = initSampleCharacter(randomizeTitle);
	var female = (charGender == gender.FEMALE);

	if (result.gender != charGender)
	{
		result.gender = charGender;
		result.name = female ? femaleNames[getRandomNumber(0, femaleNames.length)] : maleNames[getRandomNumber(0, maleNames.length)];		
	}

	return result;
}

function randomizeAge(character)
{
	character.age = getRandomNumber(6, 90);
}

function randomizeStronghold(character)
{
	var shtypes = [strongholdType.ESTABLISHMENT, strongholdType.KEEP, strongholdType.TOWER, strongholdType.TEMPLE];
	var shclasses = [classType.BARBARIAN, classType.BARD, classType.CLERIC, classType.DRUID, classType.FIGHTER, classType.MONK, classType.PALADIN, classType.RANGER, classType.ROGUE, classType.SORCERER, classType.WARLOCK, classType.WIZARD];

	character.strongholdType = shtypes[getRandomNumber(0, 4)];
	character.strongholdClass = shclasses[getRandomNumber(0, 13)];
}

function getRandomName(female)
{
	return female ? femaleNames[getRandomNumber(0, femaleNames.length)] : maleNames[getRandomNumber(0, maleNames.length)];
}

function initSampleCharacter(randomizeTitle, randomHouse = false, randomStronghold = false)
{
	console.log("Initializing Sample Character");
	var female = coinFlip();

	var randomName = getRandomName(female);

	var myCharacter = new Character(randomName, characterIterator++);

	myCharacter.gender = female ? gender.FEMALE : gender.MALE;
	randomizeAge(myCharacter);
	//myCharacter.epithet = "the Brave";

	myCharacter.dndattributes.strength = getRandomStat();
	myCharacter.dndattributes.dexterity = getRandomStat();
	myCharacter.dndattributes.constitution = getRandomStat();
	myCharacter.dndattributes.intelligence = getRandomStat();
	myCharacter.dndattributes.wisdom = getRandomStat();
	myCharacter.dndattributes.charisma = getRandomStat();

	/*var originCounty = new Holding("Gywndon", titleIterator++);
	titles.set(originCounty.id, originCounty);

	myCharacter.origin = originCounty.id;*/

	if (randomStronghold)
	{
		randomizeStronghold(myCharacter);
	}

	/*initSampleHouses();*/

	if (randomHouse)
	{
		if (getRandomNumber(0,2) > 0)
		{
			console.log("Grabbing random house... ");
			var randomEntry = Array.from(houses.keys())[getRandomNumber(0, houses.size)];
			myCharacter.house = randomEntry;
			console.log("Getting house " + randomEntry + ": " + houses.get(randomEntry).name);
		} else {
			console.log("Lowborn");
		}
	}

	randomizeAlignment(myCharacter);

	randomizePortraitData(myCharacter);

	randomizeNpcClass(myCharacter);

	characterMap.set(myCharacter.id, myCharacter);

	// Title Test
	if (randomizeTitle)
	{
		var importance = getRandomNumber(0, 6);

		newRandomTitle(importance, myCharacter, true);
	}

	randomizeCharacterTraits(myCharacter);

	return myCharacter;
}

function randomizeNpcClass(myCharacter) {
	if (npcClasses)
	{
		console.log("Grabbing random npcClass... ");
		var randomEntry = Array.from(npcClasses.keys())[getRandomNumber(0, npcClasses.size)];
		myCharacter.dndattributes.npcClass = randomEntry;
		console.log("Getting npcClass " + randomEntry + ": " + npcClasses.get(randomEntry).name);
	}
}

function randomizeAlignment(myCharacter) {

	var randomNumber = getRandomNumber(0, 9);

	if (randomNumber == 0)
	{
		myCharacter.dndattributes.alignment = alignments.LG;
	}

	if (randomNumber == 1)
	{
		myCharacter.dndattributes.alignment = alignments.NG;
	}

	if (randomNumber == 2)
	{
		myCharacter.dndattributes.alignment = alignments.CG;
	}

	if (randomNumber == 3)
	{
		myCharacter.dndattributes.alignment = alignments.LN;
	}

	if (randomNumber == 4)
	{
		myCharacter.dndattributes.alignment = alignments.N;
	}

	if (randomNumber == 5)
	{
		myCharacter.dndattributes.alignment = alignments.CN;
	}

	if (randomNumber == 6)
	{
		myCharacter.dndattributes.alignment = alignments.LE;
	}

	if (randomNumber == 7)
	{
		myCharacter.dndattributes.alignment = alignments.NE;
	}

	if (randomNumber == 8)
	{
		myCharacter.dndattributes.alignment = alignments.CE;
	}
}

var sampleTitles = [];
var sampleTitleClaims = [];

function initSampleTitles()
{
	if (sampleTitles.length == 0)
	{
		sampleTitles.push("Attenweiler");
		sampleTitles.push("Bad Ilex");
		sampleTitles.push("Donnerfeste");
		sampleTitles.push("Dronenmarsch");
		sampleTitles.push("Ehrenstein");
		sampleTitles.push("Fronsmal");
		sampleTitles.push("Frostforst");
		sampleTitles.push("Gilead");
		sampleTitles.push("Grubenschatten");
		sampleTitles.push("Gwindalia");
		sampleTitles.push("Hopfenpfahl");
		sampleTitles.push("Ilex");
		sampleTitles.push("Kielingen");
		sampleTitles.push("Mistwatch");
		sampleTitles.push("Norvall");
		sampleTitles.push("Obergau");
		sampleTitles.push("Oztroja");
		sampleTitles.push("Phandelver");
		sampleTitles.push("Rottenstrand");
		sampleTitles.push("Sankt Gulian");
		sampleTitles.push("Vogelfrei");
		sampleTitles.push("Weizenstrand");
		sampleTitles.push("Zankbräu");
		
		sampleTitleClaims.push("Attenweiler");
		sampleTitleClaims.push("Bad Ilex");
		sampleTitleClaims.push("Donnerfeste");
		sampleTitleClaims.push("Dronenmarsch");
		sampleTitleClaims.push("Ehrenstein");
		sampleTitleClaims.push("Fronsmal");
		sampleTitleClaims.push("Frostforst");
		sampleTitleClaims.push("Gilead");
		sampleTitleClaims.push("Grubenschatten");
		sampleTitleClaims.push("Gwindalia");
		sampleTitleClaims.push("Hopfenpfahl");
		sampleTitleClaims.push("Ilex");
		sampleTitleClaims.push("Kielingen");
		sampleTitleClaims.push("Mistwatch");
		sampleTitleClaims.push("Norvall");
		sampleTitleClaims.push("Obergau");
		sampleTitleClaims.push("Oztroja");
		sampleTitleClaims.push("Phandelver");
		sampleTitleClaims.push("Rottenstrand");
		sampleTitleClaims.push("Sankt Gulian");
		sampleTitleClaims.push("Vogelfrei");
		sampleTitleClaims.push("Weizenstrand");
		sampleTitleClaims.push("Zankbräu");

		for (var i = 1; i < 162; i++)
		{
			sampleTitles.push(i.toString());
			sampleTitleClaims.push(i.toString());
		}
	}
}

function initSampleHouses()
{
	if (houses.size == 0)
	{
		var aaa = new House("Agilolf", houseIterator++);
		houses.set(aaa.id, aaa);

		var bbb = new House("Amorias", houseIterator++);
		houses.set(bbb.id, bbb);

		var ccc = new House("Corrino", houseIterator++);
		houses.set(ccc.id, ccc);

		var ddd = new House("De Conteville", houseIterator++);
		houses.set(ddd.id, ddd);

		var eee = new House("Draculesti", houseIterator++);
		houses.set(eee.id, eee);

		var fff = new House("Dunois", houseIterator++);
		houses.set(fff.id, fff);

		var ggg = new House("Flitzing", houseIterator++);
		houses.set(ggg.id, ggg);

		var hhh = new House("Hawking", houseIterator++);
		houses.set(hhh.id, hhh);

		var iii = new House("Izyaslavich", houseIterator++);
		houses.set(iii.id, iii);

		var jjj = new House("Leon", houseIterator++);
		houses.set(jjj.id, jjj);

		var kkk = new House("Pensec", houseIterator++);
		houses.set(kkk.id, kkk);

		var lll = new House("Ravensgar", houseIterator++);
		houses.set(lll.id, lll);

		var mmm = new House("Rothirsch", houseIterator++);
		houses.set(mmm.id, mmm);

		var nnn = new House("Troja", houseIterator++);
		houses.set(nnn.id, nnn);

		var ooo = new House("Vanderfel", houseIterator++);
		houses.set(ooo.id, ooo);

		var ppp = new House("Zelking", houseIterator++);
		houses.set(ppp.id, ppp);
	}
}

function newRandomTitle(importance, myCharacter, makePrimary) {
	if (importance > 0) {

		var randomTitleName = "";
		if (sampleTitles.length > 0)
		{
			randomTitleName = sampleTitles[getRandomNumber(0,sampleTitles.length)];
			var index = sampleTitles.indexOf(randomTitleName);
			if (index !== -1) {
			    sampleTitles.splice(index, 1);
			}
		}

		var it = titleIterator++;
		var myTitle = (importance == 1 ? (new Holding(randomTitleName, it)) : (
			importance == 2 ? (new County(randomTitleName, it)) : (
				importance == 3 ? (new Duchy(randomTitleName, it)) : (
					importance == 4 ? (new Kingdom(randomTitleName, it)) : (new Empire(randomTitleName, it))
					)
				)
			)
		);

		if (myCharacter != null)
		{
			myCharacter.addTitle(myTitle.id, makePrimary);
		}
		
		titles.set(myTitle.id, myTitle);
	} else {
		if (myCharacter != null)
		{
			myCharacter.primaryTitle = 0;
		}
	}
}

function getRandomStat() {
	// Roll 4 D6
	var numbers = [getRandomNumber(1, 7), getRandomNumber(1, 7), getRandomNumber(1, 7), getRandomNumber(1, 7)];
	
	// Take highest 3
	var slice = numbers.sort(function(a, b) { return a - b; }).slice(-3);

	// Get sum
	var sum = slice.reduce((a,b) => a + b, 0);

	return sum;
}

function randomizePortraitData(myCharacter) {

	var racialPortraitData = portraitRaces.has(myCharacter.dndattributes.race) ? portraitRaces.get(myCharacter.dndattributes.race) : portraitRaces.get(race.HUMAN);

	myCharacter.portraitData = racialPortraitData.RandomPortrait(myCharacter);
}

function getBackground(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getBackgroundUrl(character);
	var backgroundIndex = character.portraitData.backgroundIndex;

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 10, url, 152, 152, targetCanvas );

	result.partial = true;
	result.partialX = backgroundIndex * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getAgeIndex(character)
{
	return character.age >= 70 ? 3 : (character.age >= 50 ? 2 : 1);
}

function getFace(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getFaceUrl(character);

	return new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 40, url, 152, 152, targetCanvas);
}

function getHair(character, offset, targetCanvas, behind)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getHairUrl(character, behind);

	var zIndex = behind ? 20 : 50;
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + zIndex, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.hairIndex * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getBeard(character, offset, targetCanvas, behind)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getBeardUrl(character, behind);

	if (url == "")
	{
		return null;
	}

	var zIndex = behind ? 38 : 62;

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + zIndex, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.beard * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getCheeks(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getCheekUrl(character);
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 42, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.cheeks * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getChin(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getChinUrl(character);
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 44, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.chin * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getNeck(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getNeckUrl(character);

	if (url == "")
	{
		return null;
	}

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 41, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.neck * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getEar(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getEarUrl(character);

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 46, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.ear * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getEyes(character, offset, targetCanvas)
{
	var results = [];
	
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getEyeUrl(character);
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 48, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.eyes * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	results.push(result);

	var eyeColorUrl = racialPortraitData.getEyeColorUrl(character);
	if (eyeColorUrl != "")
	{
		var secondresult = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 49, eyeColorUrl, 152, 152, targetCanvas);

		secondresult.partial = true;
		secondresult.partialX = character.portraitData.eyes * 152;
		secondresult.partialY = 0;
		secondresult.partialHeight = 152;
		secondresult.partialWidth = 152;

		results.push(secondresult);
	}

	return results;
}

function getMouth(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getMouthUrl(character);

	var result = new Shape(offset[0] + 24, offset[1] +  24, offset[2] + 48, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.mouth * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getNose(character, offset, targetCanvas)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getNoseUrl(character);

	var result = new Shape( offset[0] +  24, offset[1] +  24, offset[2] +  49, url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.nose * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getClothes(character, offset, targetCanvas, behind)
{
	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getClothesUrl(character, behind);
	var clothes = character.portraitData.clothes;

	if (character.getRulerType() >= 3)
	{
		url = "portrait/religious_" + ((character.gender == gender.FEMALE) ? "female_" : "male_") + (behind ? "clothes_behind.png" : "clothes.png");
		clothes = character.getRulerType() == 4 ? 0 : 1;
	}

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + (behind ? 30 : 60), url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = clothes * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getCrown(character, offset, targetCanvas, behind)
{
	var title = titles.get(character.primaryTitle);
	var crown = 5 - title.titleImportance;

	var racialPortraitData = portraitRaces.has(character.dndattributes.race) ? portraitRaces.get(character.dndattributes.race) : portraitRaces.get(race.HUMAN);
	var url = racialPortraitData.getCrownUrl(character, behind);

	if (character.getRulerType() >= 3)
	{
		url = "portrait/religious_" + ((character.gender == gender.FEMALE) ? "female_" : "male_") + (behind ? "headgear_behind.png" : "headgear.png");
		crown = character.getRulerType() == 4 ? 0 : 1;
	}

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] +  (behind ? 25 : 65), url, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = crown * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function renderCharacterPortrait(myCharacter, offset, targetCanvas, renderBackground, renderTitleFrame)
{
	var elements = [];

	// Background: society_symbol_bg_stone.ong
	// Male child: portrait/default_son.png
	// Female child: portrait/default_daughter.png
	// Other child: portrait/duck_son.png

	var crowned = myCharacter.hasPrimaryTitle();
	var bearded = (myCharacter.gender == gender.MALE) && (myCharacter.age >= 20);

	if (renderBackground)
	{
		elements.push( new Shape(-1, 2, offset[2] + 1, "portrait/society_symbol_bg_stone.png", 200, 201, targetCanvas));
	}

	if (myCharacter.age < 16)
	{
		if (myCharacter.gender == gender.OTHER)
		{
			elements.push( new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 2, "portrait/duck_son.png", 152, 152, targetCanvas));
		}
		else if (myCharacter.gender == gender.MALE)
		{
			elements.push( new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 2, "portrait/default_son.png", 152, 152, targetCanvas));
		}
		else if (myCharacter.gender == gender.FEMALE)
		{
			elements.push( new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 2, "portrait/default_daughter.png", 152, 152, targetCanvas));
		}
	} else {
		elements.push( getBackground(myCharacter, offset, targetCanvas) );

		elements.push( getHair(myCharacter, offset, targetCanvas, true) );

		if (crowned)
		{
			elements.push( getCrown(myCharacter, offset, targetCanvas, true) );
		}

		elements.push( getClothes(myCharacter, offset, targetCanvas, true) );

		var beardBack = getBeard(myCharacter, offset, targetCanvas, true );
		if (beardBack != null)
		{
			elements.push( beardBack );
		}

		// Facial Features
		elements.push( getFace(myCharacter, offset, targetCanvas) );

		var neck = getNeck(myCharacter, offset, targetCanvas);
		if (neck != null)
		{
			elements.push( neck );
		}
		
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


		var beardFront = getBeard(myCharacter, offset, targetCanvas, false );
		if (beardFront != null)
		{
			elements.push( beardFront );
		}

		if (crowned)
		{
			elements.push( getCrown(myCharacter, offset, targetCanvas, false) );
		}
	}

	if (renderTitleFrame)
	{
		if (crowned)
		{
			var feudalFrames = new Map();
			feudalFrames.set(1, ["portrait/Baron_Feudal.png", "portrait/Baron_Republic.png", "portrait/Baron_Theological.png", "portrait/King_Theological.png"]);
			feudalFrames.set(2, ["portrait/Count_Feudal.png", "portrait/Count_Republic.png", "portrait/Count_Theological.png", "portrait/King_Theological.png"]);
			feudalFrames.set(3, ["portrait/Duke_Feudal.png", "portrait/Duke_Republic.png", "portrait/Duke_Theological.png", "portrait/King_Theological.png"]);
			feudalFrames.set(4, ["portrait/King_Feudal.png", "portrait/King_Republic.png", "portrait/King_Theological.png", "portrait/King_Theological.png"]);
			feudalFrames.set(5, ["portrait/Emperor_Feudal.png", "portrait/Emperor_Republic.png", "portrait/Emperor_Theological.png", "portrait/King_Theological.png"]);

			var primaryTitle = titles.get(myCharacter.primaryTitle);

			if (feudalFrames.has(primaryTitle.titleImportance))
			{
				var frames = feudalFrames.get(primaryTitle.titleImportance);
				var rulerType = myCharacter.getRulerType();
				var frame = frames[Math.max(0, rulerType - 1)];

				elements.push( new Shape(offset[0] + 12, offset[1] + 12, offset[2] + 300, frame, 176, 176, targetCanvas));
			}
		} else {
			elements.push( new Shape(offset[0] + 12, offset[1] + 12, offset[2] + 300, "portrait/Lowborn_Feudal.png", 176, 176, targetCanvas));
		}
	}

	return elements;
}