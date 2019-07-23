function randomizeCharacterTraits(character) {
	character.traits = [];
	var traits = GetTraits();

	var female = character.gender == gender.FEMALE;

	// Education
	if (character.age >= 16)
	{
		var category = getRandomNumber(0, 5);

		if (category == 0)
		{
			// Diplomacy
			var available = getNumbersForChances([[5,3 - 0],[6, 8 - 3],[7, 14 - 8],[8,2]]);
			var val = getRandomNumber(0, available.length);
			character.addTrait(available[val]);
		}
		else if (category == 1)
		{
			// Martial
			var available = getNumbersForChances([[13,7 - 0],[14, 12 - 7],[15, 17 - 12],[16,2]]);
			var val = getRandomNumber(0, available.length);
			character.addTrait(available[val]);
		}
		else if (category == 2)
		{
			// Stewardship
			var available = getNumbersForChances([[9,3 - 0],[10, 9 - 3],[11, 15 - 9],[12,2]]);
			var val = getRandomNumber(0, available.length);
			character.addTrait(available[val]);
		}
		else if (category == 3)
		{
			// Intrigue
			var available = getNumbersForChances([[1,2 - 0],[2, 7 - 2],[3, 12 - 7],[4,2]]);
			var val = getRandomNumber(0, available.length);
			character.addTrait(available[val]);
		}
		else
		{
			// Learning
			var available = getNumbersForChances([[17,2 - 0],[18, 6 - 2],[19, 11 - 6],[20,2]]);
			var val = getRandomNumber(0, available.length);
			character.addTrait(available[val]);
		}
	}

	// Virtues & Sins
	/*
		0 virtues: very rare 5%
		1 virtue: common 30%
		2 virtues: common 20%
		3 virtues: rare 10%
		4 virtues: very rare %

		0 sins: very rare 5%
		1 sin: common 30%
		2 sins: common 20%
		3 sins: rare 10%
		4 sins: very rare 5%
		5 sins: super rare 1%
		6 sins: super rare 1%

		0 quirks: 0%
		1 quirk: 30%
		2 quirks: 30%
		3 quirks: 30%
		4 quirks: 5%
		5 quirks: 1%

	*/
	var virtues = [74,76,78,80,82,84,86];
	var numberOfVirtuesProbabilities = getNumbersForChances([[0,10],[1,40],[2,30],[3,20],[4,5]]);
	var numberOfVirtues = numberOfVirtuesProbabilities[getRandomNumber(0, numberOfVirtuesProbabilities.length)];
	for (var i = 0; i < numberOfVirtues; i++)
	{
		// Pick random virtue
		var randomVirtue = virtues[getRandomNumber(0, virtues.length)];
		// Remove selected virtue from list of virtues
		virtues = virtues.filter(function (e) { return e !== randomVirtue});
		// Add selected virtue to character
		character.addTrait(randomVirtue);
	}

	var sins = [73,75,77,79,81,83,85];
	var numberOfSinsProbabilities = getNumbersForChances([[0,5],[1,30],[2,20],[3,10],[4,5],[5,1],[6,1]]);
	var numberOfSins = numberOfSinsProbabilities[getRandomNumber(0, numberOfSinsProbabilities.length)];
	for (var i = 0; i < numberOfSins; i++)
	{
		// Pick random sin
		var randomSin = sins[getRandomNumber(0, sins.length)];
		// Remove selected sin from list of sins
		sins = sins.filter(function (e) { return e !== randomSin});
		// Add selected sin to character
		character.addTrait(randomSin);
	}

	var quirks = [93, 95, 90, 94, 89, 101, 97, 87, 188, 92, 88, 96, 99, 91, 189, 100, 98];
	var numberOfQuirksProbabilities = getNumbersForChances([[1,30],[2,30],[3,30],[4,5],[5,1]]);
	var numberOfQuirks = numberOfQuirksProbabilities[getRandomNumber(0, numberOfQuirksProbabilities.length)];
	for (var i = 0; i < numberOfQuirks; i++)
	{
		// Pick random quirk
		var randomQuirk = quirks[getRandomNumber(0, quirks.length)];
		// Remove selected sin from list of sins
		quirks = quirks.filter(function (e) { return e !== randomQuirk});
		// Add selected sin to character
		character.addTrait(randomQuirk);
	}

	// GENETIC TRAITS
	// 0-2
	var geneticTraits = getTraitGroup(traits, traitGroup.GENETIC);
	var numberOfGeneticTraitsProbabilities = getNumbersForChances([[0,33],[1,33],[2,33],[3,1]]);
	var numberOfGeneticTraits = numberOfGeneticTraitsProbabilities[getRandomNumber(0, numberOfGeneticTraitsProbabilities.length)];
	for (var i = 0; i < numberOfGeneticTraits; i++)
	{
		// Pick random genetic trait
		var randomGeneticTrait = geneticTraits[getRandomNumber(0, geneticTraits.length)];

		// Check for special cases
		if (randomGeneticTrait == 203)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 204 && e !== 339});
		}
		if (randomGeneticTrait == 204)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 203 && e !== 339});
		}
		if (randomGeneticTrait == 339)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 203 && e !== 204});
		}
		if (randomGeneticTrait == 205)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 206});
		}
		if (randomGeneticTrait == 206)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 205});
		}
		if (randomGeneticTrait == 404)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 405});
		}
		if (randomGeneticTrait == 405)
		{
			// Remove opposite value
			character.traits = character.traits.filter(function (e) { return e !== 404});
		}

		geneticTraits = geneticTraits.filter(function (e) { return e !== randomGeneticTrait });
		character.addTrait(randomGeneticTrait);
	}

	// Lifestyle
	// 0-2 usual
	var lifestyleTraits = getTraitGroup(traits, traitGroup.LIFESTYLE);
	if (female)
	{
		lifestyleTraits = lifestyleTraits.filter(function (e) { return e !== 178 });
	} else {
		lifestyleTraits = lifestyleTraits.filter(function (e) { return e !== 179 });
	}

	var numberOfLifestyleProbabilities = getNumbersForChances([[0,33],[1,33],[2,33],[3,1]]);
	var numberOfLifestyleTraits = numberOfLifestyleProbabilities[getRandomNumber(0, numberOfLifestyleProbabilities.length)];
	for (var i = 0; i < numberOfLifestyleTraits; i++)
	{
		// Pick random genetic trait
		var randomLifestyle = lifestyleTraits[getRandomNumber(0, lifestyleTraits.length)];
		lifestyleTraits = lifestyleTraits.filter(function (e) { return e !== randomLifestyle });
		character.addTrait(randomLifestyle);
	}

	// Health
	// Depression: children titles makes it harder
	var depressionChance = 5 + character.titles.length + character.children.length;
	var depressionRoll = getRandomNumber(0, 1000);
	if (depressionRoll < depressionChance)
	{
		// Depressed
		character.addTrait(22);
	}
	else if (depressionRoll < (2 * depressionChance))
	{
		// Stressed
		character.addTrait(29);
	}

	// Drunkard:
	// Plus: 405 (Uncouth) 64 (Hedonist) 75 (Gluttony) 79 (Sloth) 340 (fat) 9 (wastrel) 73 (lustful)
	// Minus: 341 (malnourished) 56 (genius) 57 (quick) 205 (shrewd) 404 (groomed) 180 (administrator) 66 (gardener) 63 (celibate) 71 (poet) 72 (falconer) 74 (chaste) 80 (diligent) 76 (temperate)
	var pluses = [405,64,75,79,340,9,73];
	var minuses = [341,56,57,205,404,180,66,63,71,72,74,80,76];
	var odds = getOdds(character, 5, pluses, minuses);
	if (getRandomNumber(0, 1000) < odds)
	{
		character.addTrait(33);
	}

	// Age based factors
	if (character.age > 70)
	{
		var ageBased = getRandomNumber(0, 100);
		var ageFactor = (5 + (character.age - 70));
		if (ageBased < ageFactor)
		{
			// Incapable
			character.addTrait(32);	
		}
		else if (ageBased < (ageFactor * 2))
		{
			// Infirm
			character.addTrait(31);
		}
	}
}

function getOdds(character, baseOdds, plus, minus)
{
	var result = baseOdds;
	for (var i = 0; i < plus.length; i++)
	{
		if (character.traits.includes(plus[i]))
		{
			result = result + 10;
		}
	}

	for (var i = 0; i < minus.length; i++)
	{
		if (character.traits.includes(minus[i]))
		{
			result = result - 10;
		}
	}
	return result;
}

function getNumbersForChances(stuff)
{
	var result = [];
	for (var i = 0; i < stuff.length; i++)
	{
		for (var j = 0; j < stuff[i][1]; j++)
		{
			result.push(stuff[i][0]);
		}
	}

	return result;
}

function getTraitGroup(traitMap, group)
{
	var result = [];

	for (var [key, value] of traitMap.entries()) {
		if (value.group == group)
		{
			result.push(value.id);
		}
	}

	return result;
}