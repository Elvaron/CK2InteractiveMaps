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

function initSampleCharacter(randomizeTitle)
{
	console.log("Initializing Sample Character");
	var female = coinFlip();

	var randomName = female ? femaleNames[getRandomNumber(0, femaleNames.length)] : maleNames[getRandomNumber(0, maleNames.length)];

	var myCharacter = new Character(randomName, characterIterator++);

	myCharacter.gender = female ? gender.FEMALE : gender.MALE;
	myCharacter.age = getRandomNumber(6, 90);
	//myCharacter.epithet = "the Brave";

	myCharacter.dndattributes.strength = getRandomStat();
	myCharacter.dndattributes.dexterity = getRandomStat();
	myCharacter.dndattributes.constitution = getRandomStat();
	myCharacter.dndattributes.intelligence = getRandomStat();
	myCharacter.dndattributes.wisdom = getRandomStat();
	myCharacter.dndattributes.charisma = getRandomStat();

	var originCounty = new Holding("Gywndon", titleIterator++);
	titles.set(originCounty.id, originCounty);

	myCharacter.origin = originCounty.id;

	var shtypes = [strongholdType.ESTABLISHMENT, strongholdType.KEEP, strongholdType.TOWER, strongholdType.TEMPLE];
	var shclasses = [classType.BARBARIAN, classType.BARD, classType.CLERIC, classType.DRUID, classType.FIGHTER, classType.MONK, classType.PALADIN, classType.RANGER, classType.ROGUE, classType.SORCERER, classType.WARLOCK, classType.WIZARD];

	myCharacter.strongholdType = shtypes[getRandomNumber(1, 3)];
	myCharacter.strongholdClass = shclasses[getRandomNumber(0, 12)];;

	initSampleHouses();

	if (getRandomNumber(0,2) > 0)
	{
		console.log("Grabbing random house... ");
		var randomEntry = Array.from(houses.keys())[getRandomNumber(0, houses.size)];
		myCharacter.house = randomEntry;
		console.log("Getting house " + randomEntry + ": " + houses.get(randomEntry).name);
	} else {
		console.log("Lowborn");
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

		myCharacter.addTitle(myTitle.id, makePrimary);
		titles.set(myTitle.id, myTitle);
	} else {
		myCharacter.primaryTitle = 0;
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
	var female = myCharacter.gender == gender.FEMALE;
	myCharacter.portraitData.backgroundIndex = getRandomNumber(0, 32);
	myCharacter.portraitData.hairIndex = getRandomNumber(1, female ? 13 : 14);
	myCharacter.portraitData.hairColor = getRandomNumber(0, 3);
	myCharacter.portraitData.clothes = getRandomNumber(0, 12);
	myCharacter.portraitData.cheeks = getRandomNumber(0, 11);
	myCharacter.portraitData.chin = getRandomNumber(0, 13);
	myCharacter.portraitData.eyes = getRandomNumber(0, 13);
	myCharacter.portraitData.eyeColor = getRandomNumber(0, 3);
	myCharacter.portraitData.mouth = getRandomNumber(0, 13);
	myCharacter.portraitData.nose = getRandomNumber(0, 13);
	myCharacter.portraitData.neck = getRandomNumber(0, 4);
	myCharacter.portraitData.ear = female ? getRandomNumber(0, 13) : getRandomNumber(0, 10);
	myCharacter.portraitData.beard = female ? 0 : getRandomNumber(0, 15); // 0-8
	if (myCharacter.portraitData.beard > 7)
	{
		myCharacter.portraitData.beard = myCharacter.portraitData.beard - 7;
	}
}

function getBackground(character, offset, targetCanvas)
{
	var backgroundIndex = character.portraitData.backgroundIndex;

	var url = "portrait/backgrounds.png";
	var index = backgroundIndex;

	if (backgroundIndex >= 25)
	{
		url = "portrait/western_backgrounds.png";
		index = index - 25;
	}

	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 10, url, 152, 152, targetCanvas );

	result.partial = true;
	result.partialX = index * 152;
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
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var genderPart = character.gender == gender.MALE ? "male" : "female";
	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_base_" + ageIndex + ".png";
	return new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 40, path, 152, 152, targetCanvas);
}

function getHair(character, offset, targetCanvas, behind)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var genderPart = character.gender == gender.MALE ? "male" : "female";

	var colorPart = "";

	if (ageIndex < 3 && character.portraitData.hairColor != 0)
	{
		colorPart = character.portraitData.hairColor == 1 ? "brown_" : "blond_";
	}

	var identifier = behind ? "_hair_behind_" : "_hair_";
	var zIndex = behind ? 20 : 50;

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + identifier + colorPart + ageIndex + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + zIndex, path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.hairIndex * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getBeard(character, offset, targetCanvas, behind)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var genderPart = character.gender == gender.MALE ? "male" : "female";

	var colorPart = "";

	if (ageIndex < 3 && character.portraitData.hairColor != 0)
	{
		colorPart = character.portraitData.hairColor == 1 ? "brown_" : "blond_";
	}

	var identifier = behind ? "_beard_behind_" : "_beard_";
	var zIndex = behind ? 38 : 62;

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + identifier + colorPart + ageIndex + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + zIndex, path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.beard * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getCheeks(character, offset, targetCanvas)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var genderPart = character.gender == gender.MALE ? "male" : "female";

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_cheeks_" + ageIndex + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 42, path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.cheeks * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getChin(character, offset, targetCanvas)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var genderPart = character.gender == gender.MALE ? "male" : "female";

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_chin_" + ageIndex + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 44, path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.chin * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getNeck(character, offset, targetCanvas)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var genderPart = character.gender == gender.MALE ? "male" : "female";

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_neck_" + ageIndex + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + 41, path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.neck * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getEar(character, offset, targetCanvas)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var female = character.gender == gender.FEMALE;
	var genderPart = female ? "female" : "male";

	var h = female ? 60 : (ageIndex == 1 ? 60 : 64);
	var w = female ? 32 : (ageIndex == 1 ? 28 : 32);
	var x = female ? 51 : 51;
	var y = female ? (ageIndex == 1 ? 64 : 60) : 64;

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_ear_" + ageIndex + ".png";
	var result = new Shape( offset[0] + x, offset[1] + y, offset[2] + 46, path, w, h, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.ear * w;
	result.partialY = 0;
	result.partialHeight = h;
	result.partialWidth = w;

	return result;
}

function getEyes(character, offset, targetCanvas)
{
	var results = [];
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var female = character.gender == gender.FEMALE;
	var genderPart = female ? "female" : "male";

	var h = female ? (ageIndex == 1 ? 64 : 68) : (ageIndex == 1 ? 68 : (ageIndex == 2 ? 60 : 64));
	var w = female ? (ageIndex == 1 ? 68 : 72) : 72;

	var x = female ? (ageIndex == 1 ? 73 : 70) : (ageIndex == 1 ? 70 : (ageIndex == 2 ? 69 : 69));
	var y = female ? (ageIndex == 1 ? 33 : 32) : (ageIndex == 1 ? 34 : (ageIndex == 2 ? 42 : 39));

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_eyes_" + ageIndex + ".png";
	var result = new Shape( offset[0] + x, offset[1] + y, offset[2] + 48, path, w, h, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.eyes * w;
	result.partialY = 0;
	result.partialHeight = h;
	result.partialWidth = w;

	results.push(result);

	if (character.portraitData.eyeColor > 0)
	{
		var eyeColorPart = character.portraitData.eyeColor == 1 ? "_blue_" : "_brown_";
		var secondpath = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_eyes" + eyeColorPart + "2.png";

		x = female ? (x + (ageIndex == 1 ? 23 : 25)) : (x + 27);
		y = female ? (33 + (ageIndex < 3 ? 43 : 42)) : (34 + 42);
		var eh = female ? 12 : 8;
		var ew = female ? 40 : 36;

		var secondresult = new Shape( offset[0] + x, offset[1] + y, offset[2] + 49, secondpath, ew, eh, targetCanvas);

		secondresult.partial = true;
		secondresult.partialX = character.portraitData.eyes * ew;
		secondresult.partialY = 0;
		secondresult.partialHeight = eh;
		secondresult.partialWidth = ew;

		results.push(secondresult);
	}

	return results;
}

function getMouth(character, offset, targetCanvas)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var female = character.gender == gender.FEMALE;
	var genderPart = female ? "female" : "male";

	var h = female ? (ageIndex == 1 ? 32 : 28) : (ageIndex == 1 ? 28 : (ageIndex == 2 ? 25 : 24));
	var w = female ? 40 : (ageIndex == 1 ? 36 : (ageIndex == 2 ? 33 : 35));

	var x = female ? (96) : (ageIndex == 1 ? 100 : (ageIndex == 2 ? 100 : 100));
	var y = female ? (ageIndex == 1 ? 96 :99) : (ageIndex == 1 ? 100 : (ageIndex == 2 ? 100 : 100));

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_mouth_" + ageIndex + ".png";
	var result = new Shape(offset[0] + x, offset[1] +  y, offset[2] + 48, path, w, h, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.mouth * w;
	result.partialY = 0;
	result.partialHeight = h;
	result.partialWidth = w;

	return result;
}

function getNose(character, offset, targetCanvas)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var ageIndex = getAgeIndex(character);
	var female = character.gender == gender.FEMALE;
	var genderPart = female ? "female" : "male";

	var h = female ? 40 : (ageIndex == 1 ? 40 : (ageIndex == 2 ? 40 : 38));
	var w = female ? (ageIndex < 3 ? 28 : 32) : (ageIndex == 1 ? 32 : (ageIndex == 2 ? 29 : 31));

	var x = female ? 104 : 103;//ageIndex == 1 ? 100 : (ageIndex == 2 ? 100 : 100);
	var y = female ? 71 : 70;//ageIndex == 1 ? 100 : (ageIndex == 2 ? 100 : 100);

	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + "_nose_" + ageIndex + ".png";
	var result = new Shape( offset[0] +  x, offset[1] +  y, offset[2] +  49, path, w, h, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.nose * w;
	result.partialY = 0;
	result.partialHeight = h;
	result.partialWidth = w;

	return result;
}

function getClothes(character, offset, targetCanvas, behind)
{
	var culture = character.portraitData.skinLight ? "western" : "muslim";
	var genderPart = character.gender == gender.MALE ? "male" : "female";
	var identifier = behind ? "_clothes_behind" : "_clothes";
	var path = "portrait/" + culture + "_" + genderPart + "/" + culture + "_" + genderPart + identifier + ".png";
	var result = new Shape( offset[0] + 24, offset[1] + 24, offset[2] + (behind ? 30 : 60), path, 152, 152, targetCanvas);

	result.partial = true;
	result.partialX = character.portraitData.clothes * 152;
	result.partialY = 0;
	result.partialHeight = 152;
	result.partialWidth = 152;

	return result;
}

function getCrown(character, offset, targetCanvas, behind)
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

	if (renderTitleFrame)
	{
		if (crowned)
		{
			var feudalFrames = new Map();
			feudalFrames.set(1, "portrait/Baron_Feudal.png");
			feudalFrames.set(2, "portrait/Count_Feudal.png");
			feudalFrames.set(3, "portrait/Duke_Feudal.png");
			feudalFrames.set(4, "portrait/King_Feudal.png");
			feudalFrames.set(5, "portrait/Emperor_Feudal.png");

			var primaryTitle = titles.get(myCharacter.primaryTitle);

			if (feudalFrames.has(primaryTitle.titleImportance))
			{
				var frame = feudalFrames.get(primaryTitle.titleImportance);

				elements.push( new Shape(offset[0] + 12, offset[1] + 12, offset[2] + 300, frame, 176, 176, targetCanvas));
			}
		} else {
			elements.push( new Shape(offset[0] + 12, offset[1] + 12, offset[2] + 300, "portrait/Lowborn_Feudal.png", 176, 176, targetCanvas));
		}
	}

	return elements;
}