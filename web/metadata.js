function DataSaver(houses, titles, characters) {
	this.houses = [...houses];
	this.titles = [...titles];
	this.characters = [...characters];
}

function DataLoader() {
	this.houses = new Map();
	this.titles = new Map();
	this.characters = new Map();
}

function LandedTitle(name, id) {
	this.name = name;
	this.id = id;

	this.mapData = null;
}

function County(name, id) {
	LandedTitle.call(this, name, id);

	this.primaryHolding = 0;
	this.holdings = [];
	this.parent = 0;
	this.titleImportance = 2;
}

County.prototype = Object.create(LandedTitle.prototype);

function Holding(name, id, holdingType) {
	LandedTitle.call(this, name, id);
	this.holdingType = holdingType; // castle, city, etc.
	this.parent = 0; // province
	this.owner = 0; // title holder/ruler
	this.titleImportance = 1;
}

function Duchy(name, id) {
	LandedTitle.call(this, name, id);
	this.parent = 0; // kingdom
	this.owner = 0; // title holder/ruler
	this.counties = []; // counties within that duchy
	this.titleImportance = 3;
}

Duchy.prototype = Object.create(LandedTitle.prototype);

function Kingdom(name, id) {
	LandedTitle.call(this, name, id);
	this.parent = 0; // empire
	this.owner = 0; // title holder / ruler
	this.duchies = []; // contained duchy titles
	this.counties = []; // contained county titles
	this.titleImportance = 4;
}

Kingdom.prototype = Object.create(LandedTitle.prototype);

function Empire(name, id) {
	LandedTitle.call(this, name, id);
	this.parent = 0; // This is just to have the property
	this.owner = 0;
	this.kingdoms = []; // contained kingdoms
	this.duchies = []; // contained duchy titles
	this.counties = []; // contained county titles
	this.titleImportance = 5;
}

Empire.prototype = Object.create(LandedTitle.prototype);

function Council(liege) {
	this.liege = liege;
	this.chancellor = 0;
	this.marshal = 0;
	this.steward = 0;
	this.spymaster = 0;
	this.chaplain = 0;
}

Council.prototype.exists = function () {
	return this.chancellor > 0 || this.marshal > 0 || this.steward > 0 || this.spymaster > 0 || this.chaplain > 0;
}

function House(name, id) {
	this.id = id;
	this.name = name;
	this.members = [];
	this.emblem = 0;
}

function Pact(id, type, characters) {
	this.id = id;
	this.type = type;
	this.characters = characters;
}

Pact.prototype.getOtherCharacter = function (fromCharacterId) {
	for (var i = 0; i < this.characters.length; i++)
	{
		if (this.characters[i] != fromCharacterId)
		{
			return this.characters[i];
		}
	}

	return 0;
}

Pact.prototype.getTypeIndex = function () {
	if (this.type == pactType.NAP)
	{
		return 7;
	}

	if (this.type == pactType.ALLIANCE)
	{
		return 0;
	}

	if (this.type == pactType.DEFP)
	{
		return 4;
	}

	if (this.type == pactType.TRUCE)
	{
		return 1;
	}

	if (this.type == pactType.EMBARGO)
	{
		return 5;
	}

	if (this.type == pactType.TRADE)
	{
		return 6;
	}

	return 3;
}

Pact.prototype.getDescription = function () {
	if (this.characters.length > 1)
	{
		return this.type + " between " + getFullName(characterMap.get(this.characters[0])) + " and " + getFullName(characterMap.get(this.characters[1]));
	}

	return this.type;
}

Pact.prototype.getImageUrl = function () {
	var base = "profile/diplomacy/";
	if (this.type == pactType.NAP)
	{
		return base + "d8.png";
	}

	if (this.type == pactType.ALLIANCE)
	{
		return base + "d1.png";
	}

	if (this.type == pactType.DEFP)
	{
		return base + "d5.png";
	}

	if (this.type == pactType.TRUCE)
	{
		return base + "d2.png";
	}

	if (this.type == pactType.EMBARGO)
	{
		return base + "d6.png";
	}

	if (this.type == pactType.TRADE)
	{
		return base + "d7.png";
	}

	return base + "d4.png";
}

function getTitleByName(name) {
	for (var [key, value] of titles.entries()) {
		if (value.name == name)
		{
			return key;
		}
	}

	return 0;
}

function getTitleType(landedTitle) {
	if (landedTitle.titleImportance == 5)
	{
		return titleTypes.EMPIRE;
	}

	if (landedTitle.titleImportance == 4)
	{
		return titleTypes.KINGDOM;
	}

	if (landedTitle.titleImportance == 3)
	{
		return titleTypes.DUCHY;
	}

	if (landedTitle.titleImportance == 2)
	{
		return titleTypes.COUNTY;
	}

	return titleTypes.HOLDING;
}

function getCrownImages(landedTitle) {
	var base = "profile/crowns/";
	if (landedTitle.titleImportance == 5)
	{
		return [base + "emperor_bg.png", base + "emperor.png"];
	}

	if (landedTitle.titleImportance == 4)
	{
		return [base + "king_bg.png", base + "king.png"];
	}

	if (landedTitle.titleImportance == 3)
	{
		return [base + "duke_bg.png", base + "duke.png"];
	}

	if (landedTitle.titleImportance == 2)
	{
		return [base + "count_bg.png", base + "count.png"];
		return base + "count.png";
	}

	return [base + "baron_bg.png", base + "baron.png"];
}

function getTitleImages(landedTitle) {
	var result = [];
	result.push("profile/shield_bg.png");
	if (landedTitle.titleImportance == 2)
	{
		if (landedTitle.primaryHolding && titles.has(landedTitle.primaryHolding))
		{
			var primaryHolding = titles.get(landedTitle.primaryHolding);

			var name = primaryHolding.name != "" ? primaryHolding.name.toLowerCase().replace(" ", "_") : primaryHolding.id;

			result.push("provinces/" + name + ".png");
			return result;
		}
	}

	var name = landedTitle.name != "" ? landedTitle.name.toLowerCase().replace(" ", "_") : landedTitle.id;

	result.push("provinces/" + name + ".png");
	return result;
}

function getTitleMouseOverText(landedTitle) {
	if (landedTitle.titleImportance == 5)
	{
		return "Empire of " + landedTitle.name;
	}

	if (landedTitle.titleImportance == 4)
	{
		return "Kingdom of " + landedTitle.name;
	}

	if (landedTitle.titleImportance == 3)
	{
		return "Duchy of " + landedTitle.name;
	}

	if (landedTitle.titleImportance == 2)
	{
		return "County of " + landedTitle.name;
	}

	return "Barony of " + landedTitle.name;
}

function getHoldingTitleImages(holding) {
	if (holding.holdingType == holdingtypes.EMPTY || holding.holdingType == holdingtypes.FORT || holding.holdingType == holdingtypes.TRADE)
	{
		return null;
	}

	return getTitleImages(holding);
}

function getHouseImage(house) {
	return "houses/" + house.name.toLowerCase().replace(" ", "_") + ".png";
}

function getHoldingTypePreviewImage(holdingType) {

	var type = "empty";

	if (holdingType == holdingtypes.CASTLE)
	{
		type = "castle";
	}
	else if (holdingType == holdingtypes.CITY)
	{
		type = "city";
	}
	else if (holdingType == holdingtypes.TEMPLE)
	{
		type = "temple";
	}
	else if (holdingType == holdingtypes.FORT)
	{
		type = "fort";
	}
	else if (holdingType == holdingtypes.TRADE)
	{
		type = "trade";
	}

	return "holdingTypes/" + type + ".png";	
}

function getHoldingTypeLargeImage(holdingType) {

	var type = "Empty";

	if (holdingType == holdingtypes.CASTLE)
	{
		type = "Castle";
	}
	else if (holdingType == holdingtypes.CITY)
	{
		type = "City";
	}
	else if (holdingType == holdingtypes.TEMPLE)
	{
		type = "Temple";
	}
	else if (holdingType == holdingtypes.FORT)
	{
		type = "Fort";
	}
	else if (holdingType == holdingtypes.TRADE)
	{
		type = "TradePost";
	}

	return "province/holding" + type + "Large.png";	
}

function getHoldingBackgroundImageLarge(holdingType) {
	var type = "Empty";

	if (holdingType == holdingtypes.CASTLE)
	{
		type = "Castle";
	}
	else if (holdingType == holdingtypes.CITY)
	{
		type = "City";
	}
	else if (holdingType == holdingtypes.TEMPLE)
	{
		type = "Temple";
	}
	else if (holdingType == holdingtypes.FORT)
	{
		type = "Fort";
	}
	else if (holdingType == holdingtypes.TRADE)
	{
		type = "TradePost";
	}

	return "province/holdingBgLarge" + type + ".png";	
}

function getHoldingBackgroundImageSmall(holdingType) {
	var type = "Empty";

	if (holdingType == holdingtypes.CASTLE)
	{
		type = "Castle";
	}
	else if (holdingType == holdingtypes.CITY)
	{
		type = "City";
	}
	else if (holdingType == holdingtypes.TEMPLE)
	{
		type = "Temple";
	}
	else if (holdingType == holdingtypes.FORT)
	{
		type = "Fort";
	}
	else if (holdingType == holdingtypes.TRADE)
	{
		type = "TradePost";
	}

	return "province/holdingBgSmall" + type + ".png";	
}

function getHoldingTypeSmallImage(holdingType) {

	var type = "Empty";

	if (holdingType == holdingtypes.CASTLE)
	{
		type = "Castle";
	}
	else if (holdingType == holdingtypes.CITY)
	{
		type = "City";
	}
	else if (holdingType == holdingtypes.TEMPLE)
	{
		type = "Temple";
	}
	else if (holdingType == holdingtypes.FORT)
	{
		type = "Fort";
	}
	else if (holdingType == holdingtypes.TRADE)
	{
		type = "TradePost";
	}

	return "province/holding" + type + "Small.png";	
}


/*
	PACTS
*/
var pactIterator = 1;
var pacts = new Map();

/*
	DYNASTIES
	Houses, their members and emblems
*/
var houseIterator = 1;
var houses = new Map();

/*
	LANDS
	Holdings, Provinces, Duchies, Kingdoms and Empires
*/
var titleIterator = 1;
var titles = new Map();

var currentTitle = 0;

/*
	CHARACTERS
*/

var characterIterator = 1;
var characterMap = new Map();

var currentCharacter = 0;
