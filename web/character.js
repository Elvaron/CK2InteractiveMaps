function Character(name, id) {
	this.name = name;
	this.id = id;
	this.house = 0;
	this.vassals = []; // Direct Vassals
	this.council = new Council(this.id);
	this.titles = []; // Titles held
	this.claims = []; // Title claims
	this.primaryTitle = 0;
	this.modifiers = [];
	this.traits = [];
	this.ck2attributes = new CK2Attributes();
	this.dndattributes = new DNDAttributes();
	this.alive = true; // Alive or Dead
	this.gender = gender.OTHER;
	this.age = 1;
	this.epithet = "";
	this.origin = 0;

	this.pacts = [];

	this.strongholdType = strongholdType.NONE;
	this.strongholdClass = classType.NONE;

	// Family
	this.spouse = 0;
	this.heir = 0;
	this.children = [];
	this.parents = [];

	this.liege = 0; // Parent object
	this.regent = 0; // Infant ruler or such

	this.portraitData = new PortraitData();
}

function PortraitData() {
	this.backgroundIndex = 0;
	this.skinLight = true;
	this.hairIndex = 0;
	this.hairColor = 0;
	this.clothes = 0;
	this.cheeks = 0;
	this.chin = 0;
	this.eyes = 0;
	this.eyeColor = 0;
	this.ear = 0;
	this.neck = 0;
	this.mouth = 0;
	this.nose = 0;
	this.beard = 0;
}

function coinFlip()
{
	return getRandomNumber(0,2) > 0;
}

function getRandomNumber(min, max)
{
	return Math.floor( Math.random() * (+max - +min)) + +min;
}

Character.prototype.getSiblings = function() {
	var result = [];

	var fatherId = this.getFather();
	if (fatherId > 0)
	{
		var father = characterMap.get(fatherId);
		for (var i = 0; i < father.children.length; i++)
		{
			var child = father.children[i];
			if (child != this.id && !result.includes(child))
			{
				result.push(child);
			}
		}
	}

	var motherId = this.getMother();
	if (motherId > 0)
	{
		var mother = characterMap.get(motherId);
		for (var i = 0; i < mother.children.length; i++)
		{
			var child = mother.children[i];
			if (child != this.id && !result.includes(child))
			{
				result.push(child);
			}
		}
	}

	return result;
}

Character.prototype.getMother = function () {
	for (var i = 0; i < this.parents.length; i++)
	{
		if (characterMap.has(this.parents[i]))
		{
			if (characterMap.get(this.parents[i]).gender == gender.FEMALE)
			{
				return this.parents[i];
			}
		}
	}

	return 0;
}

Character.prototype.getFather = function () {
	for (var i = 0; i < this.parents.length; i++)
	{
		if (characterMap.has(this.parents[i]))
		{
			if (characterMap.get(this.parents[i]).gender == gender.MALE)
			{
				return this.parents[i];
			}
		}
	}

	return 0;
}

Character.prototype.addTitle = function (id, makePrimaryTitle) {
	if (!this.titles.includes(id))
	{
		this.titles.push(id);
	}

	if (makePrimaryTitle)
	{
		this.primaryTitle = id;
	}
}

Character.prototype.addTitleClaim = function (name, importance) {

	var id = getTitleByName(name);
	if (id == 0)
	{
		var it = titleIterator++;
		var myTitle = (importance == 1 ? (new Holding(name, it)) : (
			importance == 2 ? (new County(name, it)) : (
				importance == 3 ? (new Duchy(name, it)) : (
					importance == 4 ? (new Kingdom(name, it)) : (new Empire(name, it))
					)
				)
			)
		);
		titles.set(myTitle.id, myTitle);
		id = myTitle.id;
	}

	this.claims.push(id);
}

Character.prototype.getStateAttributes = function () {

	var attributes = this.getCK2Stats();

	var usedCharacters = [];

	// If you have a regent, his stats count
	if (this.regent > 0)
	{
		var regent = characterMap.get(this.regent);
		attributes = regent.getCK2Stats();
		usedCharacters.push(this.regent);
	}

	if (this.council)
	{
		// Each council member contibutes full, unless they are also regent
		if (this.council.chancellor > 0 && this.council.chancellor != this.regent)
		{
			var chancellor = characterMap.get(this.council.chancellor);
			usedCharacters.push(this.council.chancellor);
			var councilAttributes = chancellor.getCK2Stats();
			attributes[0] = attributes[0] + councilAttributes[0];
		}

		if (this.council.marshal > 0 && this.council.marshal != this.regent)
		{
			var marshal = characterMap.get(this.council.marshal);
			usedCharacters.push(this.council.marshal);
			var councilAttributes = marshal.getCK2Stats();
			attributes[1] = attributes[1] + councilAttributes[1];
		}

		if (this.council.steward > 0 && this.council.steward != this.regent)
		{
			var steward = characterMap.get(this.council.steward);
			usedCharacters.push(this.council.steward);
			var councilAttributes = steward.getCK2Stats();
			attributes[2] = attributes[2] + councilAttributes[2];
		}

		if (this.council.spymaster > 0 && this.council.spymaster != this.regent)
		{
			var spymaster = characterMap.get(this.council.spymaster);
			usedCharacters.push(this.council.spymaster);
			var councilAttributes = spymaster.getCK2Stats();
			attributes[3] = attributes[3] + councilAttributes[3];
		}

		if (this.council.chaplain > 0 && this.council.chaplain != this.regent)
		{
			var chaplain = characterMap.get(this.council.chaplain);
			usedCharacters.push(this.council.chaplain);
			var councilAttributes = chaplain.getCK2Stats();
			attributes[4] = attributes[4] + councilAttributes[4];
		}
	}

	if (this.spouse > 0 && !usedCharacters.includes(this.spouse))
	{
		var spouse = characterMap.get(this.spouse);
		var spouseAttributes = spouse.getCK2Stats();
		attributes[0] = attributes[0] + Math.floor(spouseAttributes[0] * 0.5);
		attributes[1] = attributes[1] + Math.floor(spouseAttributes[1] * 0.5);
		attributes[2] = attributes[2] + Math.floor(spouseAttributes[2] * 0.5);
		attributes[3] = attributes[3] + Math.floor(spouseAttributes[3] * 0.5);
		attributes[4] = attributes[4] + Math.floor(spouseAttributes[4] * 0.5);
	}

	return attributes;
}

Character.prototype.addTrait = function (id) {
	if (!this.traits.includes(id))
	{
		this.traits.push(id);
	}
}

Character.prototype.addVassal = function (id) {
	if (!this.vassals.includes(id))
	{
		this.vassals.push(id);
	}
}

Character.prototype.getImportance = function () {
	if (!this.hasPrimaryTitle())
	{
		return 0;
	}

	return titles.get(this.primaryTitle).titleImportance;
}

Character.prototype.hasPrimaryTitle = function () {
	return this.primaryTitle > 0 && titles.has(this.primaryTitle);
}

Character.prototype.getDndModifier = function (stat) {
	var val = Math.floor((stat - 10) / 2);
	if (val >= 0)
	{
		return "+" + val;
	}
	return val;
}

Character.prototype.getDndStats = function () {
	var result = [];
	result.push(this.dndattributes.strength);
	result.push(this.dndattributes.dexterity);
	result.push(this.dndattributes.constitution);
	result.push(this.dndattributes.intelligence);
	result.push(this.dndattributes.wisdom);
	result.push(this.dndattributes.charisma);
	result.push(this.getDndModifier(this.dndattributes.strength));
	result.push(this.getDndModifier(this.dndattributes.dexterity));
	result.push(this.getDndModifier(this.dndattributes.constitution));
	result.push(this.getDndModifier(this.dndattributes.intelligence));
	result.push(this.getDndModifier(this.dndattributes.wisdom));
	result.push(this.getDndModifier(this.dndattributes.charisma));

	return result;
}

Character.prototype.getCK2Stats = function () {

	var diplomacy = this.ck2attributes.diplomacy;
	var martial = this.ck2attributes.martial;
	var stewardship = this.ck2attributes.stewardship;
	var intrigue = this.ck2attributes.intrigue;
	var learning = this.ck2attributes.learning;
	var combat = this.ck2attributes.combat;

	var traits = GetTraits();

	for (var i = 0; i < this.traits.length; i++)
	{
		var traitId = this.traits[i];

		if (traits.has(traitId))
		{
			var trait = traits.get(traitId);

			diplomacy += trait.diplomacy;
			martial += trait.martial;
			stewardship += trait.stewardship;
			intrigue += trait.intrigue;
			learning += trait.learning;
			combat += trait.combat;
		}
	}

	return [diplomacy, martial, stewardship, intrigue, learning, combat];
}

Character.prototype.getRaceImage = function () {

	var base = "profile/race/";

	if (this.dndattributes.race == race.DRAGONBORN)
	{
		return base + "dragonborn.png";
	}

	if (this.dndattributes.race == race.DWARFMOUNTAIN || this.dndattributes.race == race.DWARFHILL)
	{
		return base + "dwarf.png";
	}

	if (this.dndattributes.race == race.ELFHIGH || this.dndattributes.race == race.ELFWOOD || this.dndattributes.race == race.DROW)
	{
		return base + "elf.png";
	}

	if (this.dndattributes.race == race.HALFELF)
	{
		return base + "halfelf.png";
	}

	if (this.dndattributes.race == race.HALFLINGSTOUT || this.dndattributes.race == race.HALFLINGLIGHTFOOT)
	{
		return base + "halfling.png";
	}

	if (this.dndattributes.race == race.HALFORC)
	{
		return base + "halforc.png";
	}

	if (this.dndattributes.race == race.ORC)
	{
		return base + "orc.png";
	}

	if (this.dndattributes.race == race.TIEFLING)
	{
		return base + "tiefling.png";
	}

	return base + "human.png";
}

Character.prototype.getAlignmentText = function () {
	if (this.dndattributes.alignment == alignments.CN)
	{
		return "Chaotic Neutral";
	}

	if (this.dndattributes.alignment == alignments.LN)
	{
		return "Lawful Neutral";
	}

	if (this.dndattributes.alignment == alignments.NG)
	{
		return "Neutral Good";
	}

	if (this.dndattributes.alignment == alignments.CG)
	{
		return "Chaotic Good";
	}

	if (this.dndattributes.alignment == alignments.LG)
	{
		return "Lawful Good";
	}

	if (this.dndattributes.alignment == alignments.NE)
	{
		return "Neutral Evil";
	}

	if (this.dndattributes.alignment == alignments.LE)
	{
		return "Lawful Evil";
	}

	if (this.dndattributes.alignment == alignments.CE)
	{
		return "Chaotic Evil";
	}

	return "Neutral";
}

Character.prototype.getAlignmentImage = function () {

	var base = "profile/alignment/";

	if (this.dndattributes.alignment == alignments.CN)
	{
		return base + "chaotic_neutral.png";
	}

	if (this.dndattributes.alignment == alignments.LN)
	{
		return base + "lawful_neutral.png";
	}

	if (this.dndattributes.alignment == alignments.NG)
	{
		return base + "good.png";
	}

	if (this.dndattributes.alignment == alignments.CG)
	{
		return base + "chaotic_good.png";
	}

	if (this.dndattributes.alignment == alignments.LG)
	{
		return base + "lawful_good.png";
	}

	if (this.dndattributes.alignment == alignments.NE)
	{
		return base + "evil.png";
	}

	if (this.dndattributes.alignment == alignments.LE)
	{
		return base + "lawful_evil.png";
	}

	if (this.dndattributes.alignment == alignments.CE)
	{
		return base + "chaotic_evil.png";
	}

	return base + "neutral.png";
}

Character.prototype.GetSeed = function () {
	return this.portraitData.backgroundIndex + "-" + this.portraitData.hairIndex + "-" + this.portraitData.hairColor + "-" + this.portraitData.clothes + "-" + this.portraitData.cheeks + "-" + this.portraitData.chin + "-" + this.portraitData.eyes + "-" + this.portraitData.eyeColor + "-" + this.portraitData.ear + "-" + this.portraitData.neck + "-" + this.portraitData.mouth + "-" + this.portraitData.nose + "-" + this.portraitData.beard;
}

Character.prototype.ParseSeed = function (seed) {
	var parts = seed.split("-");

	var female = this.gender == gender.FEMALE;

	if (parts.length > 0)
	{
		var value = parseInt(parts[0]);
		if (value >= 0 && value < 32)
		{
			this.portraitData.backgroundIndex = value;
		}
	}

	if (parts.length > 1)
	{
		var value = parseInt(parts[1]);
		if (value >= 0 && value < (female ? 13 : 14))
		{
			this.portraitData.hairIndex = value;
		}
	}

	if (parts.length > 2)
	{
		var value = parseInt(parts[2]);
		if (value >= 0 && value < 3)
		{
			this.portraitData.hairColor = value;
		}
	}

	if (parts.length > 3)
	{
		var value = parseInt(parts[3]);
		if (value >= 0 && value < 12)
		{
			this.portraitData.clothes = value;
		}
	}

	if (parts.length > 4)
	{
		var value = parseInt(parts[4]);
		if (value >= 0 && value < 11)
		{
			this.portraitData.cheeks = value;
		}
	}

	if (parts.length > 5)
	{
		var value = parseInt(parts[5]);
		if (value >= 0 && value < 13)
		{
			this.portraitData.chin = value;
		}
	}

	if (parts.length > 6)
	{
		var value = parseInt(parts[6]);
		if (value >= 0 && value < 13)
		{
			this.portraitData.eyes = value;
		}
	}

	if (parts.length > 7)
	{
		var value = parseInt(parts[7]);
		if (value >= 0 && value < 3)
		{
			this.portraitData.eyeColor = value;
		}
	}

	if (parts.length > 8)
	{
		var value = parseInt(parts[8]);
		if (value >= 0 && value < 13)
		{
			this.portraitData.mouth = value;
		}
	}

	if (parts.length > 9)
	{
		var value = parseInt(parts[9]);
		if (value >= 0 && value < 13)
		{
			this.portraitData.nose = value;
		}
	}

	if (parts.length > 10)
	{
		var value = parseInt(parts[10]);
		if (value >= 0 && value < 4)
		{
			this.portraitData.neck = value;
		}
	}

	if (parts.length > 11)
	{
		var value = parseInt(parts[11]);
		if (value >= 0 && value < (female ? 13 : 10))
		{
			this.portraitData.ear = value;
		}
	}

	if (parts.length > 12)
	{
		if (female) {
			this.portraitData.beard = 0;
		} else {
			var value = parseInt(parts[12]);
			if (value >= 0 && value < 8)
			{
				this.portraitData.beard = value;
			}
		}
	}
}

Character.prototype.IsIndependent = function() {
	return this.regent == 0;
}

Character.prototype.calculateTitles = function(landedTitleMap) {
	var result = [];

	for (var [key, value] of landedTitleMap.entries()) {
		if (value instanceof Empire)
		{
			if (value.owner == this.id)
			{
				result.push(key);
			}
		}
		else if (value instanceof Kingdom)
		{
			if (value.owner == this.id)
			{
				result.push(key);
			}
		}
		else if (value instanceof Duchy)
		{
			if (value.owner == this.id)
			{
				result.push(key);
			}
		}
		else if (value instanceof County)
		{
			// Primary holding gives Count title
			if (value.holdings.size > 0)
			{
				if (value.holdings[0].owner == this.id)
				{
					result.push(key);
				}
			}
		}
		else if (value instanceof Holding)
		{
			if (value.owner == this.id)
			{
				result.push(key);
			}
		}
	}
	
	return result;
}

function getOriginName(character) {
	if (character.origin > 0)
	{
		if (titles.has(character.origin))
		{
			var title = titles.get(character.origin);

			if (title.titleImportance == 2)
			{
				if (titles.has(title.primaryHolding))
				{
					return "of " + titles.get(title.primaryHolding).name;
				}
			}

			return "of " + title.name;
		}
	}

	return "";
}

function getTitleName(character) {
	if (character.primaryTitle == 0)
	{
		return "";
	}

	var female = character.gender == gender.FEMALE;

	if (titles.has(character.primaryTitle))
	{
		var title = titles.get(character.primaryTitle);

		if (title.titleImportance == 1)
		{
			if (title.holdingType == holdingtypes.CASTLE)
			{
				return female ? "Baroness" : "Baron";
			}
			else if (title.holdingType == holdingtypes.CITY)
			{
				return "Mayor";
			}
			else if (title.holdingType == holdingtypes.TEMPLE)
			{
				return "Bishop";
			}

			return "";
		}
		else if (title.titleImportance == 2)
		{
			return female ? "Countess" : "Count";
		}
		else if (title.titleImportance == 3)
		{
			return female ? "Duchess" : "Duke";
		}
		else if (title.titleImportance == 4)
		{
			return female ? "Queen" : "King";
		}
		else if (title.titleImportance == 5)
		{
			return female ? "Empress" : "Emperor";
		}
	}

	return "";
}

function getFullName(character) {
	var result = "";

	var titleName = getTitleName(character);

	if (titleName)
	{
		result = titleName + " ";
	}

	result = result + character.name;

	if (character.epithet)
	{
		result = result + " '" + character.epithet + "'";
	}

	var origin = getOriginName(character);

	if (origin)
	{
		result = result + " " + origin;
	}

	return result;
}

function getTitleChainUp(character) {
	var charRef = character;

	var result = [];

	while (charRef)
	{
		if (charRef.primaryTitle > 0 && titles.has(charRef.primaryTitle))
		{
			var title = titles.get(charRef.primaryTitle);
			result.push([charRef.id, title.id]);
		}

		if (charRef.liege > 0 && characterMap.has(charRef.liege))
		{
			charRef = characterMap.get(charRef.liege);
		} else {
			charRef = null;
		}
	}

	return result;	
}

function getStrongholdTypeIcon(type)
{
	var basePath = "stronghold/";

	if (type == strongholdType.ESTABLISHMENT)
	{
		return basePath + "establishment.png";
	}

	if (type == strongholdType.KEEP)
	{
		return basePath + "keep.png";
	}

	if (type == strongholdType.TEMPLE)
	{
		return basePath + "temple.png";
	}

	if (type == strongholdType.TOWER)
	{
		return basePath + "tower.png";
	}


	return "";
}

function getStrongholdClassIcon(strongholdClass)
{
	var basePath = "stronghold/";

	if (strongholdClass == classType.BARBARIAN)
	{
		return basePath + "barbarian.png";
	}

	if (strongholdClass == classType.BARD)
	{
		return basePath + "bard.png";
	}

	if (strongholdClass == classType.CLERIC)
	{
		return basePath + "cleric.png";
	}

	if (strongholdClass == classType.DRUID)
	{
		return basePath + "druid.png";
	}

	if (strongholdClass == classType.FIGHTER)
	{
		return basePath + "fighter.png";
	}

	if (strongholdClass == classType.MONK)
	{
		return basePath + "monk.png";
	}

	if (strongholdClass == classType.PALADIN)
	{
		return basePath + "paladin.png";
	}

	if (strongholdClass == classType.RANGER)
	{
		return basePath + "ranger.png";
	}

	if (strongholdClass == classType.ROGUE)
	{
		return basePath + "rogue.png";
	}

	if (strongholdClass == classType.SORCERER)
	{
		return basePath + "sorcerer.png";
	}

	if (strongholdClass == classType.WARLOCK)
	{
		return basePath + "warlock.png";
	}

	if (strongholdClass == classType.WIZARD)
	{
		return basePath + "wizard.png";
	}

	return "";
}

function CK2Attributes() {
	this.diplomacy = 0;
	this.stewardship = 0;
	this.intrigue = 0;
	this.martial = 0;
	this.learning = 0;
	this.combat = 0;
}

function DNDAttributes() {
	this.strength = 10;
	this.dexterity = 10;
	this.constitution = 10;
	this.intelligence = 10;
	this.wisdom = 10;
	this.charisma = 10;

	this.armorClass = 10;
	this.race = race.HUMAN;
	this.alignment = alignments.N;
	this.npcClass = 0;
}

var maleNames = ["Abel"," Alan"," Alberto"," Alexis"," Amos"," Angel"," Angelo"," Anibal"," Anthony"," Antone"," Aurelio"," Barrett"," Basil"," Bennett"," Bernard"," Blair"," Bob",
"Brad"," Bradford"," Bradley"," Brandon"," Brendan"," Brendon"," Bryan"," Bryce"," Bud"," Carl"," Carlo"," Carmine"," Carol"," Carroll"," Cedric"," Cesar"," Chance"," Chang"," Chase",
"Christopher","Cliff","Coleman","Colton","Courtney","Cristopher","Curt","Curtis","Damian","Damien","Dana","Danny","Daron","Dave","Davis","Dennis","Dion","Donnie","Donovan","Dorsey",
"Douglass","Dwight","Earnest","Ed","Eduardo","Edward","Elbert","Ellsworth","Erasmo","Eric","Erick","Erik","Erin","Errol","Eugenio","Evan","Fidel","Floyd","Forest","Francis","Franklin","Fred",
"Fredrick","Gabriel","Galen","Gary","Gaston","Gilberto","Gordon","Grant","Greg","Guadalupe","Guy","Hal","Harland","Harold","Harris","Harvey","Hector","Heriberto","Horacio","Hoyt","Hubert",
"Hyman","Ira","Irwin","Isidro","Ismael","Isreal","Ivan","Jacinto","Jackson","Jame","James","Jarred","Jean","Jerold","Jerome","Jeromy","Jim","Joaquin","Jody","Joel","Johnson","Jon","Jonah",
"Jonathon","Josue","Judson","Julian","Julius","Junior","Justin","Kristopher","Lanny","Larry","Laurence","Lawerence","Lawrence","Lazaro","Leandro","Lemuel","Lenard","Leon",
"Leonard","Linwood","Lonnie","Louis","Luke","Margarito","Marquis","Mathew","Matt","Melvin","Michal","Millard","Monroe","Moshe","Myron","Ned","Newton","Noble","Noe",
"Norbert","Normand","Numbers","Octavio","Oren","Orval","Oscar","Osvaldo","Oswaldo","Perry","Phillip","Quintin","Raul","Raymon","Refugio","Reinaldo","Reynaldo",
"Ricardo","Richard","Roderick","Rodger","Rolf","Roosevelt","Rory","Rosendo","Roy","Royal","Ruben","Russ","Ryan","Sammy","Scott","Sebastian","Seth","Shawn",
"Silas","Simon","Stephen","Stuart","Tanner","Taylor","Ted","Teddy","Terrence","Terry","Thad","Toby","Tommy","Tony","Tory","Trent","Troy","Valentin","Valentine","Victor",
"Vince","Vito","Walker","Waylon","Willard","William","Winford","Winfred","Xavier","Yong","Zack"];

var femaleNames = ["Abbie","Ailene","Aleta","Alina","Alisha","Allegra","Alona","Alvera","Alyce","Alyson","Amanda","Ana","Angela","Angelika","Angeline","Angie",
"Anisha","Annamae","Annamarie","Annita","Antonette","Antonina","Audrea","Aundrea","Beatrice","Becki","Belen","Belle","Berniece","Bernita","Beryl","Britta",
"Brook","Calandra","Candida","Carla","Carlota","Carolynn","Cassandra","Cassaundra","Chana","Chantell","Charise","Cherelle","Cherlyn","Christina",
"Cierra","Cindie","Clementina","Cordia","Corrinne","Daina","Daniela","Darleen","Deadra","Debbie","Deborah","Deeann","Deedee","Delana","Delmy",
"Demetria","Desirae","Dina","Dionna","Dolly","Donya","Dortha","Dyan","Ebonie","Elaine","Elizabet","Elli","Elsa","Elvie","Emely","Emerald",
"Esta","Ester","Eusebia","Evie","Fay","Felice","Florinda","Fredricka","Gia","Gillian","Giuseppina","Glynis","Golda","Gwen","Gwenn","Hilma","Hui","Illa","Ima","Inge","Iva","Izetta",
"Jacinda","Janessa","Jani","Jeanmarie","Jenelle","Jennine","Jesusa","Jolene","Judie","Juliana","Julienne","Junko","Karena","Karima","Karolyn","Karren","Kathe",
"Kenisha","Keva","Khalilah","Kina","Kirstin","Krystina","Ladonna","Lakia","Lakisha","Lanell","Lani","Lanora","Latonia","Laurel","Lavonia","Lawanda","Layla",
"Leanora","Lezlie","Librada","Lila","Lili","Linh","Linnie","Linsey","Loralee","Lorraine","Lourie","Lucina","Madison","Mahalia","Maire","Malka","Manie",
"Maragret","Marcell","Marcene","Margarette","Marguerita","Maribel","Marquitta","Marvella","Maude","Maurita","Melina","Merri","Mi","Milissa","Monique","Monserrate","Nada",
"Nan","Nerissa","Nevada","Nichole","Nicolette","Nila","Noelia","Ok","Oliva","Pamelia","Patience","Patti","Pattie","Paulita","Peggie","Priscilla","Prudence",
"Racquel","Regan","Regenia","Regine","Rochel","Rozanne","Salena","Salina","Sallie","Sandee","Santa","Shani","Shantae","Shantay","Shaunna","Shaunta","Shawnna",
"Shay","Shea","Sherlene","Sherry","Sheryl","Shizue","Signe","Skye","Sophie","Starr","Sylvia","Tabatha","Taneka","Tara","Tarsha","Tawna","Teressa",
"Thersa","Thresa","Tiana","Tillie","Tonette","Tran","Twanna","Ulrike","Valeria","Vanna","Vannessa","Vergie","Violet","Wanda","Waneta","Winnie","Winona",
"Yan","Yanira","Yoko","Yolanda","Yoshie","Yun","Yvone","Zita","Zulema"];