const traitGroup = {
	EDUCATION: 'Education',
	HEALTH: 'Health',
	BIRTH: 'Birth',
	GENETIC: 'Genetic',
	LIFESTYLE: 'Lifestyle',
	PERSONALITY: 'Personality',
	KINSLAYER: 'Kinslayer',
	SPECIAL: 'Special'
}

function Trait(name, id, internal_name, group, diplomacy, martial, stewardship, intrigue, learning, combat, description) {
	this.name = name;
	this.id = id;
	this.internal_name = internal_name;
	this.group = group;

	this.diplomacy = diplomacy;
	this.martial = martial;
	this.stewardship = stewardship;
	this.intrigue = intrigue;
	this.learning = learning;
	this.combat = combat;

	this.description = description;
}

Trait.prototype.getMouseOverText = function() {
	var text = this.description.length > 0 ? (this.name + "\n" + this.description) : this.name;
	
	if (this.diplomacy != 0)
	{
		text = text + "\nDiplomacy: " + (this.diplomacy >= 0 ? ("+" + this.diplomacy) : this.diplomacy);
	}

	if (this.martial != 0)
	{
		text = text + "\nMartial: " + (this.martial > 0 ? ("+" + this.martial) : this.martial);
	}

	if (this.stewardship != 0)
	{
		text = text + "\nStewardship: " + (this.stewardship > 0 ? ("+" + this.stewardship) : this.stewardship);
	}

	if (this.intrigue != 0)
	{
		text = text + "\nIntrigue: " + (this.intrigue > 0 ? ("+" + this.intrigue) : this.intrigue);
	}

	if (this.learning != 0)
	{
		text = text + "\nLearning: " + (this.learning > 0 ? ("+" + this.learning) : this.learning);
	}

	if (this.combat != 0)
	{
		text = text + "\nPersonal Combat Modifier: " + (this.combat > 0 ? ("+" + this.combat) : this.combat);
	}

	return text;
}

Trait.prototype.getImageUrl = function() {
	return "profile/traits/" + this.getGroupName() + "/" + this.id + ".png";
}

Trait.prototype.getGroupName = function() {
	if (this.group == traitGroup.BIRTH)
	{
		return "birth";
	}

	if (this.group == traitGroup.EDUCATION)
	{
		return "education";
	}

	if (this.group == traitGroup.GENETIC)
	{
		return "genetic";
	}

	if (this.group == traitGroup.HEALTH)
	{
		return "health";
	}

	if (this.group == traitGroup.KINSLAYER)
	{
		return "kinslayer";
	}

	if (this.group == traitGroup.LIFESTYLE)
	{
		return "lifestyle";
	}

	if (this.group == traitGroup.PERSONALITY)
	{
		return "personality";
	}

	return "special";
}

var traitMap = new Map();

function GetTraits() {
	if (traitMap.size > 0)
	{
		return traitMap;
	}

	// Education
	traitMap.set(5, new Trait("Naive Appeaser", 5, "naive_appeaser", traitGroup.EDUCATION, 1, -1, 0, 0, 0, 0, "Naive Appeasers want to be well liked and fancy themselves diplomat. Unfortunately, everyone else just tend to bully them."));
	traitMap.set(6, new Trait("Underhanded Rogue", 6, "underhanded_rogue", traitGroup.EDUCATION, 3, -1, 0, 0, 0, 0, "The Underhanded Rogue is a rough but decently effective diplomat."));
	traitMap.set(7, new Trait("Charismatic Negotiator", 7, "charismatic_negotiator", traitGroup.EDUCATION, 6, -1, 0, 1, 1, 0, "The Charismatic Negotiator is an excellent diplomat, impressing dignitaries with elegant dress and persuasive rhetoric."));
	traitMap.set(8, new Trait("Grey Eminence", 8, "grey_eminence", traitGroup.EDUCATION, 9, -1, 0, 2, 2, 0, "The Grey Eminence is the epitome of statesmanship having fully mastered the art of diplomacy."));
	traitMap.set(13, new Trait("Misguided Warrior", 13, "misguided_warrior", traitGroup.EDUCATION, 0, 1, 0, 0, -1, 5, "The Misguided Warrior was trained in warfare and the martial arts, but sadly lacks all talent for it."));
	traitMap.set(14, new Trait("Tough Soldier", 14, "tough_soldier", traitGroup.EDUCATION, 0, 3, 0, 0, -1, 10, "The Tough Soldier is fearsome on the battlefield, but only a mediocre commander."));
	traitMap.set(15, new Trait("Skilled Tactician", 15, "skilled_tactician", traitGroup.EDUCATION, 0, 6, 1, 1, -1, 15, "The Skilled Tactician is an adept of the art of war - a valiant warrior and reliable commander."));
	traitMap.set(16, new Trait("Brilliant Strategist", 16, "brilliant_strategist", traitGroup.EDUCATION, 0, 9, 2, 2, -1, 20, "The Brilliant Strategist has an almost preternatural understanding of all things martial, having the perfect makings for a Marshal or military tutor."));
	traitMap.set(9, new Trait("Indulgent Wastrel", 9, "indulgent_wastrel", traitGroup.EDUCATION, -1, 0, 1, 0, 0, 0, "The Indulgent Wastrel was groomed to become good with money, and if good means spending it quickly, the Indulgent Wastrel certainly is."));
	traitMap.set(10, new Trait("Thrifty Clerk", 10, "thrifty_clerk", traitGroup.EDUCATION, -1, 0, 3, 0, 0, 0, "The Thrifty Clerk is a dutiful, if not particularly skilled, administrator."));
	traitMap.set(11, new Trait("Fortune Builder", 11, "fortune_builder", traitGroup.EDUCATION, -1, 1, 6, 0, 1, 0, "The Fortune Builder came out of adolescence armed with a well honed business sense, determined to live a life of luxury."));
	traitMap.set(12, new Trait("Midas Touched", 12, "midas_touched", traitGroup.EDUCATION, -1, 2, 9, 0, 2, 0, "This character is truly Midas Touched, never seemingly running out of funds - an excellent choice for Steward and mentor to children destine to become administrators."));
	traitMap.set(1, new Trait("Amateurish Plotter", 1, "amateurish_plotter", traitGroup.EDUCATION, 0, 0, -1, 1, 0, 4, "The Amateurish Plotter has received an education emphasizing intrigue skills. Unfortunately, it didn't stick."));
	traitMap.set(2, new Trait("Flamboyant Schemer", 2, "flamboyant_schemer", traitGroup.EDUCATION, 0, 0, -1, 3, 0, 8, "Flamboyant Schemers thrive on court intrigue and fancy themselves as master of the trade. However, their lack of secrecy tends to endanger even their best efforts."));
	traitMap.set(3, new Trait("Intricate Webweaver", 3, "intricate_webweaver", traitGroup.EDUCATION, 1, 1, -1, 6, 0, 12, "The Intricate Webweaver is a master manipulator, well suited to a life of intrigue."));
	traitMap.set(4, new Trait("Elusive Shadow", 4, "elusive_shadow", traitGroup.EDUCATION, 2, 2, -1, 9, 0, 16, "The Elusive Shadow has mastered the art of Intrigue and should make a perfect Spymaster - as well as an ideal mentor for prospective schemers."));
	traitMap.set(17, new Trait("Detached Priest", 17, "detached_priest", traitGroup.EDUCATION, 0, 0, 0, -1, 1, 0, "The Detached Priest received a clerical education but displays no talent beyond basic literacy."));
	traitMap.set(18, new Trait("Dutiful Cleric", 18, "martial_cleric", traitGroup.EDUCATION, 0, 0, 0, -1, 3, 0, "The Dutiful Cleric is learned and possessed of beautiful penmanship, but lacks particular interest in theology."));
	traitMap.set(19, new Trait("Scholarly Theologian", 19, "scholarly_theologian", traitGroup.EDUCATION, 1, 0, 1, -1, 6, 0, "The Scholarly Theologian is wise and well read, with a deep understanding of philosophy and theology."));
	traitMap.set(20, new Trait("Mastermind Theologian", 20, "mastermind_theologian", traitGroup.EDUCATION, 2, 0, 2, -1, 9, 0, "The Mastermind Theologian is recognized as one of the top scholars of the Faith."));

	// Health
	traitMap.set(22, new Trait("Depressed", 22, "depressed", traitGroup.HEALTH, -1, -1, -1, -1, 0, -5, "Life has lost its luster to this character."));
	traitMap.set(33, new Trait("Drunkard", 33, "drunkard", traitGroup.HEALTH, 0, 0, -2, 0, 0, -10, "This character is a drunken sot."));
	traitMap.set(231, new Trait("Immortal", 231, "immortal", traitGroup.HEALTH, 0, 0, 0, 0, 0, 0, "This character has achieved eternal life and will never succumb to the ravages of old age. The character is not invincible though, physical injury will still hurt them."));
	traitMap.set(32, new Trait("Incapable", 32, "incapable", traitGroup.HEALTH, -6, -6, -6, -6, -6, -100, "Due to advance age, head injury or other mental disabilities, this character is not fit for any kind of work. Incapable rules must employ a regent."));
	traitMap.set(31, new Trait("Infirm", 31, "infirm", traitGroup.HEALTH, -3, -3, -3, -3, -3, -50, "This character is infirm and suffers from a sickly disposition."));
	traitMap.set(23, new Trait("Lunatic", 23, "lunatic", traitGroup.HEALTH, 0, 0, 0, 0, 0, 0, "This character is stark raving mad."));
	traitMap.set(30, new Trait("Maimed", 30, "maimed", traitGroup.HEALTH, 0, -2, 0, 0, 0, -30, "This character has been maimed. It would take a true miracle to heal such an injury."));
	traitMap.set(24, new Trait("Possessed", 24, "possessed", traitGroup.HEALTH, 0, 0, 0, 0, 0, 5, "This character experiences frequent violent episodes, speaking in tongues, spitting and assaulting those nearby, as if possessed by evil spirits."));
	traitMap.set(237, new Trait("Renowned Physician", 237, "physician", traitGroup.HEALTH, 1, 0, 0, 0, 2, 0, "This character is a renowned practitioner of medicine and a sought after physician - he would be a welcome addition to the court of any ruler."));
	traitMap.set(121, new Trait("Scarred", 121, "scarred", traitGroup.HEALTH, 0, 0, 0, 0, 0, 5, "Old wounds have left this character visibly scarred."));
	traitMap.set(21, new Trait("Stressed", 21, "stressed", traitGroup.HEALTH, 0, 0, -1, -1, 0, -10, "This character finds the burden of work and life almost too much to handle."));
	traitMap.set(29, new Trait("Wounded", 29, "wounded", traitGroup.HEALTH, 0, -1, 0, 0, 0, -15, "This character has been seriously injured, but the damage should heal, given time."));

	traitMap.set(36, new Trait("Typhus", 36, "has_typhus", traitGroup.HEALTH, -1, 0, -2, -1, -2, -40, ""));
	traitMap.set(34, new Trait("Tuberculosis", 34, "has_tuberculosis", traitGroup.HEALTH, -2, 0, -1, -2, 0, -25, ""));
	traitMap.set(226, new Trait("Dysentery", 226, "dysentery", traitGroup.HEALTH, 0, -1, 0, -1, 0, -20, ""));
	traitMap.set(225, new Trait("Flu", 225, "flu", traitGroup.HEALTH, -1, -1, -1, -1, -1, -10, ""));
	traitMap.set(228, new Trait("Food Poisoning", 228, "food_poisoning", traitGroup.HEALTH, -2, -2, -2, -2, -2, -10, ""));
	traitMap.set(227, new Trait("Gout", 227, "gout", traitGroup.HEALTH, -2, -1, 0, 0, 0, -20, ""));
	traitMap.set(27, new Trait("Syphilis", 27, "syphilitic", traitGroup.HEALTH, -1, -1, -1, -1, -1, 0, ""));
	traitMap.set(25, new Trait("Ill", 25, "ill", traitGroup.HEALTH, 0, -1, 0, 0, 0, -10, ""));
	traitMap.set(28, new Trait("Leper", 28, "leper", traitGroup.HEALTH, 0, 0, 0, 0, 0, -25, ""));
	traitMap.set(38, new Trait("Measles", 38, "has_measles", traitGroup.HEALTH, 0, 0, -2, 0, -1, -30, ""));
	traitMap.set(26, new Trait("Pneumonia", 26, "pneumonic", traitGroup.HEALTH, -2, -2, -2, -2, -2, -30, ""));
	traitMap.set(229, new Trait("Rabies", 229, "rabies", traitGroup.HEALTH, -3, 0, -2, -3, -2, 30, ""));
	traitMap.set(238, new Trait("Scurvy", 238, "scurvy", traitGroup.HEALTH, -1, -1, -1, -1, -1, -20, ""));
	traitMap.set(39, new Trait("Smallpox", 39, "has_small_pox", traitGroup.HEALTH, -2, 0, -1, 0, -2, -100, ""));
	traitMap.set(37, new Trait("The Plague", 37, "has_bubonic_plague", traitGroup.HEALTH, -2, -3, -2, -3, -2, -100, ""));

	traitMap.set(222, new Trait("Disfigured", 222, "disfigured", traitGroup.HEALTH, -4, 0, 0, 0, 0, 0, "This character is disfigured - a face few could love."));
	traitMap.set(223, new Trait("Mangled", 223, "mangled", traitGroup.HEALTH, -2, -2, -2, -2, -2, -40, "This character has been horribly mangled and now lives with a mangled body."));
	traitMap.set(219, new Trait("One-Eyed", 219, "one_eyed", traitGroup.HEALTH, 0, 0, 0, 0, 0, -10, "This character is missing an eye - not something you see everyday."));
	traitMap.set(220, new Trait("One-Handed", 220, "one_handed", traitGroup.HEALTH, 0, 0, 0, 0, 1, -20, "This character is missing a hand - having only one hand causes problems in combat but makes it easier to escape chores."));
	traitMap.set(221, new Trait("One-Legged", 221, "one_legged", traitGroup.HEALTH, 0, 0, 0, 0, 1, -30, "This character is missing a leg - a real disability when it comes to the battlefield or chasing youngsters."));
	traitMap.set(224, new Trait("Severely Injured", 224, "severely_injured", traitGroup.HEALTH, 0, -2, 0, -2, 0, -20, "This character was recently maimed resulting in serious injury, a life threatening condition. Once the wounds heals their health will recover, but the damage dealt will never fully heal."));

	traitMap.set(340, new Trait("Fat", 340, "is_fat", traitGroup.HEALTH, 0, 0, 0, 0, 0, -10, "This character is extremely overweight."));
	traitMap.set(341, new Trait("Malnourished", 341, "is_malnourished", traitGroup.HEALTH, 0, 0, 0, 0, 0, -10, "This character has a very fragile health."));

	// Birth
	traitMap.set(41, new Trait("Bastard", 41, "bastard", traitGroup.BIRTH, -1, 0, 0, 0, 0, 0, "This character was born out of wedlock and has not been legitimized - and is thus disqualified from the line of succession."));
	traitMap.set(133, new Trait("Child of Concubine", 133, "child_of_consort", traitGroup.BIRTH, -1, 0, 0, 0, 0, 0, "This character was born to the concubine of a ruler. Children of concubines can inherit but are somewhat poorly regarded by others."));
	traitMap.set(387, new Trait("Child of Consort", 387, "child_of_consort_male", traitGroup.BIRTH, -1, 0, 0, 0, 0, 0, "This character was born to the concubine of a ruler. Children of concubines can inherit but are somewhat poorly regarded by others."));
	traitMap.set(43, new Trait("Legitimized Bastard", 43, "legit_bastard", traitGroup.BIRTH, -1, 0, 0, 0, 0, 0, "This character was born a bastard but was legitimized. Legitimized bastards can inherit, though the stain of bastardy can never be entirely cleansed."));
	traitMap.set(42, new Trait("Twin", 42, "twin", traitGroup.BIRTH, 0, 0, 0, 0, 0, 0, "This character had the fortune of being offered a twin. Twins like each other better."));

	// Genetic
	traitMap.set(53, new Trait("Attractive", 53, "fair", traitGroup.GENETIC, 1, 0, 0, 0, 0, 0, ""));
	traitMap.set(56, new Trait("Genius", 56, "genius", traitGroup.GENETIC, 5, 5, 5, 5, 5, 10, ""));
	traitMap.set(57, new Trait("Quick", 57, "quick", traitGroup.GENETIC, 3, 3, 3, 3, 3, 5, ""));
	traitMap.set(61, new Trait("Strong", 61, "strong", traitGroup.GENETIC, 1, 2, 0, 0, 0, 10, ""));
	traitMap.set(48, new Trait("Clubfooted", 48, "clubfooted", traitGroup.GENETIC, 0, -1, 0, 0, 0, -5, ""));
	traitMap.set(55, new Trait("Dwarf", 55, "dwarf", traitGroup.GENETIC, 0, -1, 0, 0, 0, -15, ""));
	traitMap.set(49, new Trait("Harelip", 49, "harelip", traitGroup.GENETIC, -1, 0, 0, 0, 0, 0, ""));
	traitMap.set(50, new Trait("Hunchback", 50, "hunchback", traitGroup.GENETIC, 0, -1, 0, 0, 0, 0, ""));
	traitMap.set(59, new Trait("Imbecile", 59, "imbecile", traitGroup.GENETIC, -8, -8, -8, -8, -8, -30, ""));
	traitMap.set(60, new Trait("Inbred", 60, "inbred", traitGroup.GENETIC, -5, -5, -5, -5, -5, -20, ""));
	traitMap.set(51, new Trait("Lisp", 51, "lisp", traitGroup.GENETIC, -1, 0, 0, 0, 0, 0, ""));
	traitMap.set(58, new Trait("Slow", 58, "slow", traitGroup.GENETIC, -3, -3, -3, -3, -3, -5, ""));
	traitMap.set(52, new Trait("Stutter", 52, "stutter", traitGroup.GENETIC, -1, 0, 0, 0, 0, 0, ""));
	traitMap.set(54, new Trait("Ugly", 54, "ugly", traitGroup.GENETIC, -1, 0, 0, 0, 0, 0, ""));
	traitMap.set(62, new Trait("Weak", 62, "weak", traitGroup.GENETIC, 0, -1, 0, 0, 0, -10, ""));
	traitMap.set(327, new Trait("Giant", 327, "giant", traitGroup.GENETIC, 0, 0, 0, 0, 0, 10, ""));
	traitMap.set(337, new Trait("Left-Handed", 337, "lefthanded", traitGroup.GENETIC, 0, 0, 0, 0, 0, 15, ""));
	traitMap.set(203, new Trait("Brawny", 203, "robust", traitGroup.GENETIC, 1, 2, 0, 0, 0, 10, ""));
	traitMap.set(339, new Trait("Sturdy", 339, "sturdy", traitGroup.GENETIC, 0, 0, 0, 0, 0, 2, ""));
	traitMap.set(204, new Trait("Frail", 204, "feeble", traitGroup.GENETIC, 0, -1, 0, 0, 0, -10, ""));
	traitMap.set(205, new Trait("Shrewd", 205, "shrewd", traitGroup.GENETIC, 2, 2, 2, 2, 2, 3, ""));
	traitMap.set(206, new Trait("Dull", 206, "dull", traitGroup.GENETIC, -2, -2, -2, -2, -2, -3, ""));
	traitMap.set(404, new Trait("Groomed", 404, "groomed", traitGroup.GENETIC, 0, 0, 0, 0, 0, 0, ""));
	traitMap.set(405, new Trait("Uncouth", 405, "uncouth", traitGroup.GENETIC, 0, 0, 0, 0, 0, 0, ""));

	// Lifestyle
	traitMap.set(180, new Trait("Administrator", 180, "administrator", traitGroup.LIFESTYLE, 0, 0, 3, 0, 0, 0, ""));
	traitMap.set(181, new Trait("Architect", 181, "architect", traitGroup.LIFESTYLE, 0, 1, 2, 0, 0, 0, ""));
	traitMap.set(69, new Trait("Duelist", 69, "duelist", traitGroup.LIFESTYLE, 0, 3, 0, 0, 0, 30, ""));
	traitMap.set(186, new Trait("Game Master", 186, "gamer", traitGroup.LIFESTYLE, 2, 1, 0, 0, 0, 0, ""));
	traitMap.set(66, new Trait("Gardener", 66, "gardener", traitGroup.LIFESTYLE, 0, 0, 2, 0, 1, 0, ""));
	traitMap.set(64, new Trait("Hedonist", 64, "hedonist", traitGroup.LIFESTYLE, 2, 0, 0, 1, 0, 0, ""));
	traitMap.set(70, new Trait("Hunter", 70, "hunter", traitGroup.LIFESTYLE, 1, 2, 0, 0, 0, 10, ""));
	traitMap.set(68, new Trait("Impaler", 68, "impaler", traitGroup.LIFESTYLE, 0, 0, 0, 2, 1, 10, ""));
	traitMap.set(184, new Trait("Master Schemer", 184, "schemer", traitGroup.LIFESTYLE, 0, 0, 0, 3, 0, 0, ""));
	traitMap.set(178, new Trait("Master Seducer", 178, "seducer", traitGroup.LIFESTYLE, 1, 0, 0, 2, 0, 0, ""));
	traitMap.set(179, new Trait("Master Seductress", 179, "seductress", traitGroup.LIFESTYLE, 1, 0, 0, 2, 0, 0, ""));
	traitMap.set(67, new Trait("Mystic", 67, "mystic", traitGroup.LIFESTYLE, 0, 0, 1, 0, 2, 0, ""));
	traitMap.set(65, new Trait("Scholar", 65, "scholar", traitGroup.LIFESTYLE, 0, 0, 0, 0, 3, 0, ""));
	traitMap.set(183, new Trait("Socializer", 183, "socializer", traitGroup.LIFESTYLE, 3, 0, 0, 0, 0, 0, ""));
	traitMap.set(182, new Trait("Strategist", 182, "strategist", traitGroup.LIFESTYLE, 0, 2, 1, 0, 0, 0, ""));
	traitMap.set(185, new Trait("Theologian", 185, "theologian", traitGroup.LIFESTYLE, 0, 0, 0, 1, 2, 0, ""));
	traitMap.set(63, new Trait("Celibate", 63, "celibate", traitGroup.LIFESTYLE, 0, 0, 0, 0, 0, 0, "No descendants."));
	traitMap.set(72, new Trait("Falconer", 72, "falconer", traitGroup.LIFESTYLE, 1, 0, 0, 0, 0, 0, ""));
	traitMap.set(71, new Trait("Poet", 71, "poet", traitGroup.LIFESTYLE, 1, 0, 0, 0, 0, 0, ""));

	// Personality
	traitMap.set(74, new Trait("Chaste", 74, "chaste", traitGroup.PERSONALITY, 0, 0, 0, 0, 1, 0, ""));
	traitMap.set(76, new Trait("Temperate", 76, "temperate", traitGroup.PERSONALITY, 0, 0, 2, 0, 0, 0, ""));
	traitMap.set(78, new Trait("Charitable", 78, "charitable", traitGroup.PERSONALITY, 3, 0, 0, 0, 0, -3, ""));
	traitMap.set(80, new Trait("Diligent", 80, "diligent", traitGroup.PERSONALITY, 1, 1, 1, 1, 1, 0, ""));
	traitMap.set(84, new Trait("Patient", 84, "patient", traitGroup.PERSONALITY, 1, 0, 1, 1, 1, 5, ""));
	traitMap.set(82, new Trait("Kind", 82, "kind", traitGroup.PERSONALITY, 2, 0, 0, -2, 0, -5, ""));
	traitMap.set(86, new Trait("Humble", 86, "humble", traitGroup.PERSONALITY, 0, 0, 0, 0, 0, 0, ""));
	traitMap.set(73, new Trait("Lustful", 73, "lustful", traitGroup.PERSONALITY, 0, 0, 0, 1, 0, 0, ""));
	traitMap.set(75, new Trait("Gluttonous", 75, "gluttonous", traitGroup.PERSONALITY, 0, 0, -2, 0, 0, 0, ""));
	traitMap.set(77, new Trait("Greedy", 77, "greedy", traitGroup.PERSONALITY, -1, 0, 0, 0, 0, 0, ""));
	traitMap.set(79, new Trait("Slothful", 79, "slothful", traitGroup.PERSONALITY, -1, -1, -1, -1, -1, -5, ""));
	traitMap.set(83, new Trait("Wroth", 83, "wroth", traitGroup.PERSONALITY, -1, 3, 0, -1, 0, 3, ""));
	traitMap.set(81, new Trait("Envious", 81, "envious", traitGroup.PERSONALITY, -1, 0, 0, 2, 0, 3, ""));
	traitMap.set(85, new Trait("Proud", 85, "proud", traitGroup.PERSONALITY, 0, 0, 0, 0, 0, 0, ""));

	traitMap.set(93, new Trait("Ambitious", 93, "ambitious", traitGroup.PERSONALITY, 2, 2, 2, 2, 2, 3, ""));
	traitMap.set(95, new Trait("Arbitrary", 95, "arbitrary", traitGroup.PERSONALITY, 0, 0, -2, 1, -1, 0, ""));
	traitMap.set(90, new Trait("Brave", 90, "brave", traitGroup.PERSONALITY, 0, 2, 0, 0, 0, 10, ""));
	traitMap.set(94, new Trait("Content", 94, "content", traitGroup.PERSONALITY, 0, 0, 0, -1, 0, 0, ""));
	traitMap.set(89, new Trait("Craven", 89, "craven", traitGroup.PERSONALITY, 0, -2, 0, 0, 0, -10, ""));
	traitMap.set(101, new Trait("Cruel", 101, "cruel", traitGroup.PERSONALITY, -1, 0, 0, 1, 0, 3, ""));
	traitMap.set(97, new Trait("Cynical", 97, "cynical", traitGroup.PERSONALITY, 0, 0, 0, 2, 0, 0, ""));
	traitMap.set(87, new Trait("Deceitful", 87, "deceitful", traitGroup.PERSONALITY, -2, 0, 0, 3, 0, 3, ""));
	traitMap.set(188, new Trait("Erudite", 188, "erudite", traitGroup.PERSONALITY, 0, 0, 0, 0, 2, -2, ""));
	traitMap.set(92, new Trait("Gregarious", 92, "gregarious", traitGroup.PERSONALITY, 2, 0, 0, 0, 0, 0, ""));
	traitMap.set(88, new Trait("Honest", 88, "honest", traitGroup.PERSONALITY, 3, 0, 0, -2, 0, -2, ""));
	traitMap.set(96, new Trait("Just", 96, "just", traitGroup.PERSONALITY, 0, 0, 2, 0, 1, 0, ""));
	traitMap.set(99, new Trait("Paranoid", 99, "paranoid", traitGroup.PERSONALITY, -1, 0, 0, 2, 0, 0, ""));
	traitMap.set(91, new Trait("Shy", 91, "shy", traitGroup.PERSONALITY, -2, 0, 0, 0, 0, -2, ""));
	traitMap.set(189, new Trait("Stubborn", 189, "stubborn", traitGroup.PERSONALITY, -1, 0, 1, 0, 0, 3, ""));
	traitMap.set(100, new Trait("Trusting", 100, "trusting", traitGroup.PERSONALITY, 1, 0, 0, -2, 0, -2, ""));
	traitMap.set(98, new Trait("Zealous", 98, "zealous", traitGroup.PERSONALITY, 0, 2, 0, 0, 0, 0, ""));

	traitMap.set(46, new Trait("Kinslayer", 46, "kinslayer", traitGroup.KINSLAYER, -5, 0, 0, 0, 0, 0, ""));
	traitMap.set(321, new Trait("Familial Kinslayer", 321, "familial_kinslayer", traitGroup.KINSLAYER, -4, 0, 0, 0, 0, 0, ""));
	traitMap.set(322, new Trait("Dynastic Kinslayer", 322, "dynastic_kinslayer", traitGroup.KINSLAYER, -3, 0, 0, 0, 0, 0, ""));
	traitMap.set(406, new Trait("Tribal Kinslayer", 406, "tribal_kinslayer", traitGroup.KINSLAYER, -3, 0, 0, 0, 0, 0, ""));

	traitMap.set(187, new Trait("Adventurer", 187, "adventurer", traitGroup.SPECIAL, -1, 1, 0, 0, 0, 10, ""));
	traitMap.set(123, new Trait("Blinded", 123, "blinded", traitGroup.SPECIAL, 0, -6, -2, -2, 0, -100, ""));
	traitMap.set(252, new Trait("Cannibal", 252, "cannibal_trait", traitGroup.SPECIAL, 0, 3, 0, 0, 0, 1, ""));
	traitMap.set(122, new Trait("Eunuch", 122, "eunuch", traitGroup.SPECIAL, 0, 0, 0, 0, 0, 0, "Characters with this trait cannot marry, inherit, or be granted landed titles, but can receive a honorary title."));
	traitMap.set(45, new Trait("Excommunicated", 45, "excommunicated", traitGroup.SPECIAL, -5, 0, 0, 0, 0, 0, ""));
	traitMap.set(135, new Trait("Heresiarch", 135, "heresiarch", traitGroup.SPECIAL, 0, 0, 0, 0, 0, 3, ""));
	traitMap.set(47, new Trait("Homosexual", 47, "homosexual", traitGroup.SPECIAL, 0, 0, 0, 0, 0, 0, ""));
	traitMap.set(176, new Trait("In Hiding", 176, "in_hiding", traitGroup.SPECIAL, -5, 0, 0, 0, 0, 0, ""));
	traitMap.set(173, new Trait("Reincarnation", 173, "reincarnation", traitGroup.SPECIAL, 0, 0, 0, 0, 0, 0, ""));
	traitMap.set(137, new Trait("Varangian", 137, "varangian", traitGroup.SPECIAL, 1, 2, 0, 0, 0, 10, ""));

	return traitMap;
}