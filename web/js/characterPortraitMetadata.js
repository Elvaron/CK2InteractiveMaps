function RacePortraitMetaData(name) {
	this.name = name;
	this.male = new RacePortraitData(name, gender.MALE);
	this.female = new RacePortraitData(name, gender.FEMALE);
}

RacePortraitMetaData.prototype.RandomPortrait = function (character) {
	if (character.gender == gender.MALE)
	{
		return this.male.RandomPortrait();
	} else {
		return this.female.RandomPortrait();
	}
}

RacePortraitMetaData.prototype.getGenderedElement = function (character) {
	return (character.gender == gender.MALE) ? this.male : this.female;
}

RacePortraitMetaData.prototype.getBackgroundUrl = function (character) {
	return this.getGenderedElement(character).getBackgroundUrl(character);
}

RacePortraitMetaData.prototype.getFaceUrl = function (character) {
	return this.getGenderedElement(character).getFaceUrl(character);
}

RacePortraitMetaData.prototype.getCheekUrl = function (character) {
	return this.getGenderedElement(character).getCheekUrl(character);
}

RacePortraitMetaData.prototype.getChinUrl = function (character) {
	return this.getGenderedElement(character).getChinUrl(character);
}

RacePortraitMetaData.prototype.getNeckUrl = function (character) {
	return this.getGenderedElement(character).getNeckUrl(character);
}

RacePortraitMetaData.prototype.getEarUrl = function (character) {
	return this.getGenderedElement(character).getEarUrl(character);
}

RacePortraitMetaData.prototype.getNoseUrl = function (character) {
	return this.getGenderedElement(character).getNoseUrl(character);
}

RacePortraitMetaData.prototype.getMouthUrl = function (character) {
	return this.getGenderedElement(character).getMouthUrl(character);
}

RacePortraitMetaData.prototype.getEyeUrl = function (character) {
	return this.getGenderedElement(character).getEyeUrl(character);
}

RacePortraitMetaData.prototype.getEyeColorUrl = function (character) {
	return this.getGenderedElement(character).getEyeColorUrl(character);
}

RacePortraitMetaData.prototype.getHairUrl = function(character, behind) {
	return this.getGenderedElement(character).getHairUrl(character, behind);
}

RacePortraitMetaData.prototype.getBeardUrl = function(character, behind) {
	return this.getGenderedElement(character).getBeardUrl(character, behind);
}

RacePortraitMetaData.prototype.getClothesUrl = function(character, behind) {
	return this.getGenderedElement(character).getClothesUrl(character, behind);
}

RacePortraitMetaData.prototype.getCrownUrl = function (character, behind) {
	return this.getGenderedElement(character).getCrownUrl(character, behind);
}

function RacePortraitData(name, gender)
{
	this.name = name;
	this.gender = gender;

	this.childAge = 0;
	this.childDefaultUrl = "";

	this.ages = [];

	this.backgrounds = 0;
	this.hairs = 0;
	this.hairColors = 0;
	this.clothes = 0;
	this.cheeks = 0;
	this.chins = 0;
	this.eyes = 0;
	this.eyeColors = 0;
	this.mouths = 0;
	this.noses = 0;
	this.necks = 0;
	this.ears = 0;
	this.beards = 0;

	this.backgroundUrl = "";
	this.clothesUrl = "";
	this.clothesBehindUrl = "";
	this.headgearUrl = "";
	this.headgearBehindUrl = "";
	this.faceUrls = [];
	this.cheekUrls = [];
	this.chinUrls = [];
	this.neckUrls = [];
	this.earUrls = [];
	this.noseUrls = [];
	this.mouthUrls = [];
	this.hairUrls = [];
	this.hairBehindUrls = [];
	this.eyeUrls = [];
	this.eyeColorUrls = [];

	this.beardUrls = [];
	this.beardBehindUrls = [];
}

RacePortraitData.prototype.getAgeIndex = function (character) {

	var result = 0;

	for (var i = 0; i < this.ages.length; i++)
	{
		if (this.ages[i] >= character.age)
		{
			break;
		}

		result = i;
	}

	return result;
}

RacePortraitData.prototype.getBackgroundUrl = function (character) {
	return this.backgroundUrl;
}

RacePortraitData.prototype.getFaceUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.faceUrls[ageIndex];
}

RacePortraitData.prototype.getCheekUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.cheekUrls[ageIndex];
}

RacePortraitData.prototype.getChinUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.chinUrls[ageIndex];
}

RacePortraitData.prototype.getNeckUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.neckUrls[ageIndex];
}

RacePortraitData.prototype.getEarUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.earUrls[ageIndex];
}

RacePortraitData.prototype.getNoseUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.noseUrls[ageIndex];
}

RacePortraitData.prototype.getMouthUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.mouthUrls[ageIndex];
}

RacePortraitData.prototype.getHairUrl = function (character, behind) {
	var ageIndex = this.getAgeIndex(character);

	var hairColor = character.portraitData.hairColor;
	if (hairColor >= this.hairColors)
	{
		hairColor = 0;
	}

	return behind ? this.hairBehindUrls[ageIndex][hairColor] : this.hairUrls[ageIndex][hairColor];
}

RacePortraitData.prototype.getClothesUrl = function (character, behind) {
	return behind ? this.clothesBehindUrl : this.clothesUrl;
}

RacePortraitData.prototype.getCrownUrl = function (character, behind) {
	return behind ? this.headgearBehindUrl : this.headgearUrl;
}

RacePortraitData.prototype.getEyeUrl = function (character) {
	var ageIndex = this.getAgeIndex(character);
	return this.eyeUrls[ageIndex];
}

RacePortraitData.prototype.getEyeColorUrl = function (character) {
	var eyeColor = character.portraitData.eyeColor;
	if (eyeColor < this.eyeColorUrls.length)
	{
		return this.eyeColorUrls[eyeColor];
	}

	return "";
}

RacePortraitData.prototype.getBeardUrl = function (character, behind) {
	var ageIndex = this.getAgeIndex(character);

	if (behind && this.beardBehindUrls.length == 0)
	{
		return "";
	}

	if (!behind && this.beardUrls.length == 0)
	{
		return "";
	}

	var hairColor = character.portraitData.hairColor;
	if (hairColor >= this.hairColors)
	{
		hairColor = 0;
	}

	return behind ? this.beardBehindUrls[ageIndex][hairColor] : this.beardUrls[ageIndex][hairColor];
}

RacePortraitData.prototype.RandomPortrait = function (gender) {
	var portraitData = new PortraitData();
	portraitData.backgroundIndex = getRandomNumber(0, this.backgrounds);
	portraitData.hairIndex = getRandomNumber(0, this.hairs);
	portraitData.hairColor = getRandomNumber(0, this.hairColors);
	portraitData.clothes = getRandomNumber(0, this.clothes);
	portraitData.cheeks = getRandomNumber(0, this.cheeks);
	portraitData.chin = getRandomNumber(0, this.chins);
	portraitData.eyes = getRandomNumber(0, this.eyes);
	portraitData.eyeColor = getRandomNumber(0, this.eyeColors);
	portraitData.mouth = getRandomNumber(0, this.mouths);
	portraitData.nose = getRandomNumber(0, this.noses);
	portraitData.neck = getRandomNumber(0, this.necks);
	portraitData.ear = getRandomNumber(0, this.ears);
	portraitData.beard = getRandomNumber(0, this.beards);
	return portraitData;
}

var portraitRaces = new Map();

// HUMAN
var western = new RacePortraitMetaData(race.HUMAN);
western.male.backgrounds = 32;
western.male.hairs = 14;
western.male.hairColors = 3;
western.male.clothes = 12;
western.male.cheeks = 11;
western.male.chins = 13;
western.male.eyes = 13;
western.male.eyeColors = 3;
western.male.mouths = 13;
western.male.noses = 13;
western.male.necks = 4;
western.male.ears = 10;
western.male.beards = 8;
western.male.childAge = 16;
western.male.childDefaultUrl = "portrait/default_son.png";
western.male.ages = [16, 50, 70];
western.male.backgroundUrl = "portrait/human_backgrounds.png";
western.male.clothesUrl = "portrait/western_male/western_male_clothes.png"
western.male.clothesBehindUrl = "portrait/western_male/western_male_clothes_behind.png"
western.male.headgearUrl = "portrait/western_male/western_male_headgear.png"
western.male.headgearBehindUrl = "portrait/western_male/western_male_headgear_behind.png"
western.male.faceUrls = ["portrait/western_male/western_male_base_1.png", "portrait/western_male/western_male_base_2.png", "portrait/western_male/western_male_base_3.png"];
western.male.cheekUrls = ["portrait/western_male/western_male_cheeks_1.png", "portrait/western_male/western_male_cheeks_2.png", "portrait/western_male/western_male_cheeks_3.png"];
western.male.chinUrls = ["portrait/western_male/western_male_chin_1.png", "portrait/western_male/western_male_chin_2.png", "portrait/western_male/western_male_chin_3.png"];
western.male.neckUrls = ["portrait/western_male/western_male_neck_1.png", "portrait/western_male/western_male_neck_2.png", "portrait/western_male/western_male_neck_3.png"];
western.male.earUrls = ["portrait/western_male/western_male_ear_fixed_1.png", "portrait/western_male/western_male_ear_fixed_2.png", "portrait/western_male/western_male_ear_fixed_3.png"];
western.male.eyeUrls = ["portrait/western_male/western_male_eyes_fixed_1.png", "portrait/western_male/western_male_eyes_fixed_2.png", "portrait/western_male/western_male_eyes_fixed_3.png"];
western.male.eyeColorUrls = ["", "portrait/western_male/western_male_eyes_blue_fixed_1.png", "portrait/western_male/western_male_eyes_brown_fixed_1.png"];
western.male.noseUrls = ["portrait/western_male/western_male_nose_fixed_1.png", "portrait/western_male/western_male_nose_fixed_2.png", "portrait/western_male/western_male_nose_fixed_3.png"];
western.male.mouthUrls = ["portrait/western_male/western_male_mouth_fixed_1.png", "portrait/western_male/western_male_mouth_fixed_2.png", "portrait/western_male/western_male_mouth_fixed_3.png"];
western.male.hairUrls = [
	["portrait/western_male/western_male_hair_1.png", "portrait/western_male/western_male_hair_brown_1.png",	"portrait/western_male/western_male_hair_blond_1.png"],
	["portrait/western_male/western_male_hair_2.png", "portrait/western_male/western_male_hair_brown_2.png",	"portrait/western_male/western_male_hair_blond_2.png"],
	["portrait/western_male/western_male_hair_3.png", "portrait/western_male/western_male_hair_3.png",			"portrait/western_male/western_male_hair_3.png"]];
western.male.hairBehindUrls = [
	["portrait/western_male/western_male_hair_behind_1.png", "portrait/western_male/western_male_hair_behind_brown_1.png",	"portrait/western_male/western_male_hair_behind_blond_1.png"],
	["portrait/western_male/western_male_hair_behind_2.png", "portrait/western_male/western_male_hair_behind_brown_2.png",	"portrait/western_male/western_male_hair_behind_blond_2.png"],
	["portrait/western_male/western_male_hair_behind_3.png", "portrait/western_male/western_male_hair_behind_3.png",		"portrait/western_male/western_male_hair_behind_3.png"]];
western.male.beardUrls = [
	["portrait/western_male/western_male_beard_1.png", "portrait/western_male/western_male_beard_brown_1.png",	"portrait/western_male/western_male_beard_blond_1.png"],
	["portrait/western_male/western_male_beard_2.png", "portrait/western_male/western_male_beard_brown_2.png",	"portrait/western_male/western_male_beard_blond_2.png"],
	["portrait/western_male/western_male_beard_3.png", "portrait/western_male/western_male_beard_3.png",		"portrait/western_male/western_male_beard_3.png"]];
western.male.beardBehindUrls = [
	["portrait/western_male/western_male_beard_behind_1.png", "portrait/western_male/western_male_beard_behind_brown_1.png",	"portrait/western_male/western_male_beard_behind_blond_1.png"],
	["portrait/western_male/western_male_beard_behind_2.png", "portrait/western_male/western_male_beard_behind_brown_2.png",	"portrait/western_male/western_male_beard_behind_blond_2.png"],
	["portrait/western_male/western_male_beard_behind_3.png", "portrait/western_male/western_male_beard_behind_3.png",			"portrait/western_male/western_male_beard_behind_3.png"]];

western.female.backgrounds = 32;
western.female.hairs = 13;
western.female.hairColors = 3;
western.female.clothes = 12;
western.female.cheeks = 11;
western.female.chins = 13;
western.female.eyes = 13;
western.female.eyeColors = 3;
western.female.mouths = 13;
western.female.noses = 13;
western.female.necks = 4;
western.female.ears = 13;
western.female.beards = 0;
western.female.childAge = 16;
western.female.childDefaultUrl = "portrait/default_daughter.png";
western.female.ages = [16, 50, 70];
western.female.backgroundUrl = "portrait/human_backgrounds.png";
western.female.clothesUrl = "portrait/western_female/western_female_clothes.png"
western.female.clothesBehindUrl = "portrait/western_female/western_female_clothes_behind.png"
western.female.headgearUrl = "portrait/western_female/western_female_headgear.png"
western.female.headgearBehindUrl = "portrait/western_female/western_female_headgear_behind.png"
western.female.faceUrls = ["portrait/western_female/western_female_base_1.png", "portrait/western_female/western_female_base_2.png", "portrait/western_female/western_female_base_3.png"];
western.female.cheekUrls = ["portrait/western_female/western_female_cheeks_1.png", "portrait/western_female/western_female_cheeks_2.png", "portrait/western_female/western_female_cheeks_3.png"];
western.female.chinUrls = ["portrait/western_female/western_female_chin_1.png", "portrait/western_female/western_female_chin_2.png", "portrait/western_female/western_female_chin_3.png"];
western.female.neckUrls = ["portrait/western_female/western_female_neck_1.png", "portrait/western_female/western_female_neck_2.png", "portrait/western_female/western_female_neck_3.png"];
western.female.earUrls = ["portrait/western_female/western_female_ear_fixed_1.png", "portrait/western_female/western_female_ear_fixed_2.png", "portrait/western_female/western_female_ear_fixed_3.png"];
western.female.eyeUrls = ["portrait/western_female/western_female_eyes_fixed_1.png", "portrait/western_female/western_female_eyes_fixed_2.png", "portrait/western_female/western_female_eyes_fixed_3.png"];
western.female.eyeColorUrls = ["", "portrait/western_female/western_female_eyes_blue_fixed_1.png", "portrait/western_female/western_female_eyes_brown_fixed_1.png"];
western.female.noseUrls = ["portrait/western_female/western_female_nose_fixed_1.png", "portrait/western_female/western_female_nose_fixed_2.png", "portrait/western_female/western_female_nose_fixed_3.png"];
western.female.mouthUrls = ["portrait/western_female/western_female_mouth_fixed_1.png", "portrait/western_female/western_female_mouth_fixed_2.png", "portrait/western_female/western_female_mouth_fixed_3.png"];
western.female.hairUrls = [
	["portrait/western_female/western_female_hair_1.png", "portrait/western_female/western_female_hair_brown_1.png",	"portrait/western_female/western_female_hair_blond_1.png"],
	["portrait/western_female/western_female_hair_2.png", "portrait/western_female/western_female_hair_brown_2.png",	"portrait/western_female/western_female_hair_blond_2.png"],
	["portrait/western_female/western_female_hair_3.png", "portrait/western_female/western_female_hair_3.png",			"portrait/western_female/western_female_hair_3.png"]];
western.female.hairBehindUrls = [
	["portrait/western_female/western_female_hair_behind_1.png", "portrait/western_female/western_female_hair_behind_brown_1.png",	"portrait/western_female/western_female_hair_behind_blond_1.png"],
	["portrait/western_female/western_female_hair_behind_2.png", "portrait/western_female/western_female_hair_behind_brown_2.png",	"portrait/western_female/western_female_hair_behind_blond_2.png"],
	["portrait/western_female/western_female_hair_behind_3.png", "portrait/western_female/western_female_hair_behind_3.png",		"portrait/western_female/western_female_hair_behind_3.png"]];

portraitRaces.set(race.HUMAN, western);

// DWARF
var dwarf = new RacePortraitMetaData(race.DWARFHILL);
dwarf.male.backgrounds = 21;
dwarf.male.hairs = 14;
dwarf.male.hairColors = 1;
dwarf.male.clothes = 15;
dwarf.male.cheeks = 11;
dwarf.male.chins = 13;
dwarf.male.eyes = 13;
dwarf.male.eyeColors = 1;
dwarf.male.mouths = 13;
dwarf.male.noses = 13;
dwarf.male.necks = 4;
dwarf.male.ears = 6;
dwarf.male.beards = 17;
dwarf.male.childAge = 16;
dwarf.male.childDefaultUrl = "portrait/default_son.png";
dwarf.male.ages = [16, 50, 280];
dwarf.male.backgroundUrl = "portrait/goblin_backgrounds.png";
dwarf.male.clothesUrl = "portrait/dwarf_male/dwarf_male_clothes.png"
dwarf.male.clothesBehindUrl = "portrait/dwarf_male/dwarf_male_clothes_behind.png"
dwarf.male.headgearUrl = "portrait/dwarf_male/dwarf_male_headgear.png"
dwarf.male.headgearBehindUrl = "portrait/dwarf_male/dwarf_male_headgear_behind.png"
dwarf.male.faceUrls = ["portrait/dwarf_male/dwarf_male_base_1.png", "portrait/dwarf_male/dwarf_male_base_2.png", "portrait/dwarf_male/dwarf_male_base_3.png"];
dwarf.male.cheekUrls = ["portrait/dwarf_male/dwarf_male_cheeks_1.png", "portrait/dwarf_male/dwarf_male_cheeks_2.png", "portrait/dwarf_male/dwarf_male_cheeks_3.png"];
dwarf.male.chinUrls = ["portrait/dwarf_male/dwarf_male_chin_1.png", "portrait/dwarf_male/dwarf_male_chin_2.png", "portrait/dwarf_male/dwarf_male_chin_3.png"];
dwarf.male.neckUrls = ["portrait/dwarf_male/dwarf_male_neck_1.png", "portrait/dwarf_male/dwarf_male_neck_2.png", "portrait/dwarf_male/dwarf_male_neck_3.png"];
dwarf.male.earUrls = ["portrait/dwarf_male/dwarf_male_ear_1.png", "portrait/dwarf_male/dwarf_male_ear_2.png", "portrait/dwarf_male/dwarf_male_ear_3.png"];
dwarf.male.eyeUrls = ["portrait/dwarf_male/dwarf_male_eyes_1.png", "portrait/dwarf_male/dwarf_male_eyes_2.png", "portrait/dwarf_male/dwarf_male_eyes_3.png"];
dwarf.male.eyeColorUrls = [""];
dwarf.male.noseUrls = ["portrait/dwarf_male/dwarf_male_nose_1.png", "portrait/dwarf_male/dwarf_male_nose_2.png", "portrait/dwarf_male/dwarf_male_nose_3.png"];
dwarf.male.mouthUrls = ["portrait/dwarf_male/dwarf_male_mouth_1.png", "portrait/dwarf_male/dwarf_male_mouth_2.png", "portrait/dwarf_male/dwarf_male_mouth_3.png"];
dwarf.male.hairUrls = [
	["portrait/dwarf_male/dwarf_male_hair_1.png"],
	["portrait/dwarf_male/dwarf_male_hair_2.png"],
	["portrait/dwarf_male/dwarf_male_hair_3.png"]];
dwarf.male.hairBehindUrls = [
	["portrait/dwarf_male/dwarf_male_hair_behind_1.png"],
	["portrait/dwarf_male/dwarf_male_hair_behind_2.png"],
	["portrait/dwarf_male/dwarf_male_hair_behind_3.png"]];
dwarf.male.beardUrls = [
	["portrait/dwarf_male/dwarf_male_beard_1.png"],
	["portrait/dwarf_male/dwarf_male_beard_2.png"],
	["portrait/dwarf_male/dwarf_male_beard_3.png"]];
dwarf.male.beardBehindUrls = [
	["portrait/dwarf_male/dwarf_male_beard_behind_1.png"],
	["portrait/dwarf_male/dwarf_male_beard_behind_2.png"],
	["portrait/dwarf_male/dwarf_male_beard_behind_3.png"]];

dwarf.female.backgrounds = 21;
dwarf.female.hairs = 13;
dwarf.female.hairColors = 1;
dwarf.female.clothes = 15;
dwarf.female.cheeks = 11;
dwarf.female.chins = 13;
dwarf.female.eyes = 13;
dwarf.female.eyeColors = 1;
dwarf.female.mouths = 13;
dwarf.female.noses = 13;
dwarf.female.necks = 0;
dwarf.female.ears = 6;
dwarf.female.beards = 10;
dwarf.female.childAge = 16;
dwarf.female.childDefaultUrl = "portrait/default_daughter.png";
dwarf.female.ages = [16, 50, 280];
dwarf.female.backgroundUrl = "portrait/goblin_backgrounds.png";
dwarf.female.clothesUrl = "portrait/dwarf_female/dwarf_female_clothes.png"
dwarf.female.clothesBehindUrl = "portrait/dwarf_female/dwarf_female_clothes_behind.png"
dwarf.female.headgearUrl = "portrait/dwarf_female/dwarf_female_headgear.png"
dwarf.female.headgearBehindUrl = "portrait/dwarf_female/dwarf_female_headgear_behind.png"
dwarf.female.faceUrls = ["portrait/dwarf_female/dwarf_female_base_1.png", "portrait/dwarf_female/dwarf_female_base_2.png", "portrait/dwarf_female/dwarf_female_base_3.png"];
dwarf.female.cheekUrls = ["portrait/dwarf_female/dwarf_female_cheeks_1.png", "portrait/dwarf_female/dwarf_female_cheeks_2.png", "portrait/dwarf_female/dwarf_female_cheeks_3.png"];
dwarf.female.chinUrls = ["portrait/dwarf_female/dwarf_female_chin_1.png", "portrait/dwarf_female/dwarf_female_chin_2.png", "portrait/dwarf_female/dwarf_female_chin_3.png"];
dwarf.female.neckUrls = ["", "", ""];
dwarf.female.earUrls = ["portrait/dwarf_female/dwarf_female_ear_1.png", "portrait/dwarf_female/dwarf_female_ear_2.png", "portrait/dwarf_female/dwarf_female_ear_3.png"];
dwarf.female.eyeUrls = ["portrait/dwarf_female/dwarf_female_eyes_1.png", "portrait/dwarf_female/dwarf_female_eyes_2.png", "portrait/dwarf_female/dwarf_female_eyes_3.png"];
dwarf.female.eyeColorUrls = [""];
dwarf.female.noseUrls = ["portrait/dwarf_female/dwarf_female_nose_1.png", "portrait/dwarf_female/dwarf_female_nose_2.png", "portrait/dwarf_female/dwarf_female_nose_3.png"];
dwarf.female.mouthUrls = ["portrait/dwarf_female/dwarf_female_mouth_1.png", "portrait/dwarf_female/dwarf_female_mouth_2.png", "portrait/dwarf_female/dwarf_female_mouth_3.png"];
dwarf.female.hairUrls = [
	["portrait/dwarf_female/dwarf_female_hair_1.png"],
	["portrait/dwarf_female/dwarf_female_hair_2.png"],
	["portrait/dwarf_female/dwarf_female_hair_3.png"]];
dwarf.female.hairBehindUrls = [
	["portrait/dwarf_female/dwarf_female_hair_behind_1.png"],
	["portrait/dwarf_female/dwarf_female_hair_behind_2.png"],
	["portrait/dwarf_female/dwarf_female_hair_behind_3.png"]];

portraitRaces.set(race.DWARFMOUNTAIN, dwarf);
portraitRaces.set(race.DWARFHILL, dwarf);

// Half-Elf
var halfelf = new RacePortraitMetaData(race.HALFELF);
halfelf.male.backgrounds = 32;
halfelf.male.hairs = 13;
halfelf.male.hairColors = 1;
halfelf.male.clothes = 12;
halfelf.male.cheeks = 13;
halfelf.male.chins = 13;
halfelf.male.eyes = 13;
halfelf.male.eyeColors = 1;
halfelf.male.mouths = 13;
halfelf.male.noses = 13;
halfelf.male.necks = 4;
halfelf.male.ears = 5;
halfelf.male.beards = 13;
halfelf.male.childAge = 16;
halfelf.male.childDefaultUrl = "portrait/reiklander_son.png";
halfelf.male.ages = [16, 50, 150];
halfelf.male.backgroundUrl = "portrait/human_backgrounds.png";
halfelf.male.clothesUrl = "portrait/halfelf_male/reiklander_male_clothes.png"
halfelf.male.clothesBehindUrl = "portrait/halfelf_male/reiklander_male_clothes_behind.png"
halfelf.male.headgearUrl = "portrait/halfelf_male/reiklander_male_headgear.png"
halfelf.male.headgearBehindUrl = "portrait/halfelf_male/reiklander_male_headgear_behind.png"
halfelf.male.faceUrls = ["portrait/halfelf_male/reiklander_male_base_1.png", "portrait/halfelf_male/reiklander_male_base_2.png", "portrait/halfelf_male/reiklander_male_base_3.png"];
halfelf.male.cheekUrls = ["portrait/halfelf_male/reiklander_male_cheeks_1.png", "portrait/halfelf_male/reiklander_male_cheeks_2.png", "portrait/halfelf_male/reiklander_male_cheeks_3.png"];
halfelf.male.chinUrls = ["portrait/halfelf_male/reiklander_male_chin_1.png", "portrait/halfelf_male/reiklander_male_chin_2.png", "portrait/halfelf_male/reiklander_male_chin_3.png"];
halfelf.male.neckUrls = ["portrait/halfelf_male/reiklander_male_neck_1.png", "portrait/halfelf_male/reiklander_male_neck_2.png", "portrait/halfelf_male/reiklander_male_neck_3.png"];
halfelf.male.earUrls = ["portrait/halfelf_male/reiklander_male_ear_1.png", "portrait/halfelf_male/reiklander_male_ear_2.png", "portrait/halfelf_male/reiklander_male_ear_3.png"];
halfelf.male.eyeUrls = ["portrait/halfelf_male/reiklander_male_eyes_1.png", "portrait/halfelf_male/reiklander_male_eyes_2.png", "portrait/halfelf_male/reiklander_male_eyes_3.png"];
halfelf.male.eyeColorUrls = [""];
halfelf.male.noseUrls = ["portrait/halfelf_male/reiklander_male_nose_1.png", "portrait/halfelf_male/reiklander_male_nose_2.png", "portrait/halfelf_male/reiklander_male_nose_3.png"];
halfelf.male.mouthUrls = ["portrait/halfelf_male/reiklander_male_mouth_1.png", "portrait/halfelf_male/reiklander_male_mouth_2.png", "portrait/halfelf_male/reiklander_male_mouth_3.png"];
halfelf.male.hairUrls = [
	["portrait/halfelf_male/reiklander_male_hair_1.png"],
	["portrait/halfelf_male/reiklander_male_hair_2.png"],
	["portrait/halfelf_male/reiklander_male_hair_3.png"]];
halfelf.male.hairBehindUrls = [
	["portrait/halfelf_male/reiklander_male_hair_behind_1.png"],
	["portrait/halfelf_male/reiklander_male_hair_behind_2.png"],
	["portrait/halfelf_male/reiklander_male_hair_behind_3.png"]];
halfelf.male.beardUrls = [
	["portrait/halfelf_male/reiklander_male_beard_1.png"],
	["portrait/halfelf_male/reiklander_male_beard_2.png"],
	["portrait/halfelf_male/reiklander_male_beard_3.png"]];
halfelf.male.beardBehindUrls = [
	["portrait/halfelf_male/reiklander_male_beard_behind_1.png"],
	["portrait/halfelf_male/reiklander_male_beard_behind_2.png"],
	["portrait/halfelf_male/reiklander_male_beard_behind_3.png"]];

halfelf.female.backgrounds = 21;
halfelf.female.hairs = 13;
halfelf.female.hairColors = 1;
halfelf.female.clothes = 12;
halfelf.female.cheeks = 13;
halfelf.female.chins = 13;
halfelf.female.eyes = 13;
halfelf.female.eyeColors = 1;
halfelf.female.mouths = 13;
halfelf.female.noses = 13;
halfelf.female.necks = 3;
halfelf.female.ears = 5;
halfelf.female.beards = 0;
halfelf.female.childAge = 16;
halfelf.female.childDefaultUrl = "portrait/reiklander_daughter.png";
halfelf.female.ages = [16, 50, 150];
halfelf.female.backgroundUrl = "portrait/human_backgrounds.png";
halfelf.female.clothesUrl = "portrait/halfelf_female/reiklander_female_clothes.png"
halfelf.female.clothesBehindUrl = "portrait/halfelf_female/reiklander_female_clothes_behind.png"
halfelf.female.headgearUrl = "portrait/halfelf_female/reiklander_female_headgear.png"
halfelf.female.headgearBehindUrl = "portrait/halfelf_female/reiklander_female_headgear_behind.png"
halfelf.female.faceUrls = ["portrait/halfelf_female/reiklander_female_base_1.png", "portrait/halfelf_female/reiklander_female_base_2.png", "portrait/halfelf_female/reiklander_female_base_3.png"];
halfelf.female.cheekUrls = ["portrait/halfelf_female/reiklander_female_cheeks_1.png", "portrait/halfelf_female/reiklander_female_cheeks_2.png", "portrait/halfelf_female/reiklander_female_cheeks_3.png"];
halfelf.female.chinUrls = ["portrait/halfelf_female/reiklander_female_chin_1.png", "portrait/halfelf_female/reiklander_female_chin_2.png", "portrait/halfelf_female/reiklander_female_chin_3.png"];
halfelf.female.neckUrls = ["", "", ""];
halfelf.female.earUrls = ["portrait/halfelf_female/reiklander_female_ear_1.png", "portrait/halfelf_female/reiklander_female_ear_2.png", "portrait/halfelf_female/reiklander_female_ear_3.png"];
halfelf.female.eyeUrls = ["portrait/halfelf_female/reiklander_female_eyes_1.png", "portrait/halfelf_female/reiklander_female_eyes_2.png", "portrait/halfelf_female/reiklander_female_eyes_3.png"];
halfelf.female.eyeColorUrls = [""];
halfelf.female.noseUrls = ["portrait/halfelf_female/reiklander_female_nose_1.png", "portrait/halfelf_female/reiklander_female_nose_2.png", "portrait/halfelf_female/reiklander_female_nose_3.png"];
halfelf.female.mouthUrls = ["portrait/halfelf_female/reiklander_female_mouth_1.png", "portrait/halfelf_female/reiklander_female_mouth_2.png", "portrait/halfelf_female/reiklander_female_mouth_3.png"];
halfelf.female.hairUrls = [
	["portrait/halfelf_female/reiklander_female_hair_1.png"],
	["portrait/halfelf_female/reiklander_female_hair_2.png"],
	["portrait/halfelf_female/reiklander_female_hair_3.png"]];
halfelf.female.hairBehindUrls = [
	["portrait/halfelf_female/reiklander_female_hair_behind_1.png"],
	["portrait/halfelf_female/reiklander_female_hair_behind_2.png"],
	["portrait/halfelf_female/reiklander_female_hair_behind_3.png"]];

portraitRaces.set(race.HALFELF, halfelf);


// Half-Orc
var halforc = new RacePortraitMetaData(race.HALFORC);
halforc.male.backgrounds = 32;
halforc.male.hairs = 13;
halforc.male.hairColors = 1;
halforc.male.clothes = 12;
halforc.male.cheeks = 13;
halforc.male.chins = 13;
halforc.male.eyes = 13;
halforc.male.eyeColors = 1;
halforc.male.mouths = 13;
halforc.male.noses = 13;
halforc.male.necks = 4;
halforc.male.ears = 5;
halforc.male.beards = 13;
halforc.male.childAge = 16;
halforc.male.childDefaultUrl = "portrait/strigany_son.png";
halforc.male.ages = [16, 50, 150];
halforc.male.backgroundUrl = "portrait/human_backgrounds.png";
halforc.male.clothesUrl = "portrait/halforc_male/strigany_male_clothes.png"
halforc.male.clothesBehindUrl = "portrait/halforc_male/strigany_male_clothes_behind.png"
halforc.male.headgearUrl = "portrait/halforc_male/strigany_male_headgear.png"
halforc.male.headgearBehindUrl = "portrait/halforc_male/strigany_male_headgear_behind.png"
halforc.male.faceUrls = ["portrait/halforc_male/strigany_male_base_1.png", "portrait/halforc_male/strigany_male_base_2.png", "portrait/halforc_male/strigany_male_base_3.png"];
halforc.male.cheekUrls = ["portrait/halforc_male/strigany_male_cheeks_1.png", "portrait/halforc_male/strigany_male_cheeks_2.png", "portrait/halforc_male/strigany_male_cheeks_3.png"];
halforc.male.chinUrls = ["portrait/halforc_male/strigany_male_chin_1.png", "portrait/halforc_male/strigany_male_chin_2.png", "portrait/halforc_male/strigany_male_chin_3.png"];
halforc.male.neckUrls = ["portrait/halforc_male/strigany_male_neck_1.png", "portrait/halforc_male/strigany_male_neck_2.png", "portrait/halforc_male/strigany_male_neck_3.png"];
halforc.male.earUrls = ["portrait/halforc_male/strigany_male_ear_1.png", "portrait/halforc_male/strigany_male_ear_2.png", "portrait/halforc_male/strigany_male_ear_3.png"];
halforc.male.eyeUrls = ["portrait/halforc_male/strigany_male_eyes_1.png", "portrait/halforc_male/strigany_male_eyes_2.png", "portrait/halforc_male/strigany_male_eyes_3.png"];
halforc.male.eyeColorUrls = [""];
halforc.male.noseUrls = ["portrait/halforc_male/strigany_male_nose_1.png", "portrait/halforc_male/strigany_male_nose_2.png", "portrait/halforc_male/strigany_male_nose_3.png"];
halforc.male.mouthUrls = ["portrait/halforc_male/strigany_male_mouth_1.png", "portrait/halforc_male/strigany_male_mouth_2.png", "portrait/halforc_male/strigany_male_mouth_3.png"];
halforc.male.hairUrls = [
	["portrait/halforc_male/strigany_male_hair_1.png"],
	["portrait/halforc_male/strigany_male_hair_2.png"],
	["portrait/halforc_male/strigany_male_hair_3.png"]];
halforc.male.hairBehindUrls = [
	["portrait/halforc_male/strigany_male_hair_behind_1.png"],
	["portrait/halforc_male/strigany_male_hair_behind_2.png"],
	["portrait/halforc_male/strigany_male_hair_behind_3.png"]];
halforc.male.beardUrls = [
	["portrait/halforc_male/strigany_male_beard_1.png"],
	["portrait/halforc_male/strigany_male_beard_2.png"],
	["portrait/halforc_male/strigany_male_beard_3.png"]];
halforc.male.beardBehindUrls = [
	[""],
	[""],
	[""]];

halforc.female.backgrounds = 21;
halforc.female.hairs = 13;
halforc.female.hairColors = 1;
halforc.female.clothes = 12;
halforc.female.cheeks = 13;
halforc.female.chins = 13;
halforc.female.eyes = 13;
halforc.female.eyeColors = 1;
halforc.female.mouths = 13;
halforc.female.noses = 13;
halforc.female.necks = 3;
halforc.female.ears = 5;
halforc.female.beards = 0;
halforc.female.childAge = 16;
halforc.female.childDefaultUrl = "portrait/strigany_daughter.png";
halforc.female.ages = [16, 50, 150];
halforc.female.backgroundUrl = "portrait/human_backgrounds.png";
halforc.female.clothesUrl = "portrait/halforc_female/strigany_female_clothes.png"
halforc.female.clothesBehindUrl = "portrait/halforc_female/strigany_female_clothes_behind.png"
halforc.female.headgearUrl = "portrait/halforc_female/strigany_female_headgear.png"
halforc.female.headgearBehindUrl = "portrait/halforc_female/strigany_female_headgear_behind.png"
halforc.female.faceUrls = ["portrait/halforc_female/strigany_female_base_1.png", "portrait/halforc_female/strigany_female_base_2.png", "portrait/halforc_female/strigany_female_base_3.png"];
halforc.female.cheekUrls = ["portrait/halforc_female/strigany_female_cheeks_1.png", "portrait/halforc_female/strigany_female_cheeks_2.png", "portrait/halforc_female/strigany_female_cheeks_3.png"];
halforc.female.chinUrls = ["portrait/halforc_female/strigany_female_chin_1.png", "portrait/halforc_female/strigany_female_chin_2.png", "portrait/halforc_female/strigany_female_chin_3.png"];
halforc.female.neckUrls = ["", "", ""];
halforc.female.earUrls = ["portrait/halforc_female/strigany_female_ear_1.png", "portrait/halforc_female/strigany_female_ear_2.png", "portrait/halforc_female/strigany_female_ear_3.png"];
halforc.female.eyeUrls = ["portrait/halforc_female/strigany_female_eyes_1.png", "portrait/halforc_female/strigany_female_eyes_2.png", "portrait/halforc_female/strigany_female_eyes_3.png"];
halforc.female.eyeColorUrls = [""];
halforc.female.noseUrls = ["portrait/halforc_female/strigany_female_nose_1.png", "portrait/halforc_female/strigany_female_nose_2.png", "portrait/halforc_female/strigany_female_nose_3.png"];
halforc.female.mouthUrls = ["portrait/halforc_female/strigany_female_mouth_1.png", "portrait/halforc_female/strigany_female_mouth_2.png", "portrait/halforc_female/strigany_female_mouth_3.png"];
halforc.female.hairUrls = [
	["portrait/halforc_female/strigany_female_hair_1.png"],
	["portrait/halforc_female/strigany_female_hair_2.png"],
	["portrait/halforc_female/strigany_female_hair_3.png"]];
halforc.female.hairBehindUrls = [
	["portrait/halforc_female/strigany_female_hair_behind_1.png"],
	["portrait/halforc_female/strigany_female_hair_behind_2.png"],
	["portrait/halforc_female/strigany_female_hair_behind_3.png"]];

portraitRaces.set(race.HALFORC, halforc);