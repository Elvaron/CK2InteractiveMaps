const holdingtypes = {
	CASTLE: 'Castle',
	TEMPLE: 'Temple',
	CITY: 'City',
	FORT: 'Fort',
	TRADE: 'Trade Post',
	EMPTY: 'Empty'
}

const titleTypes = {
	COUNTY: 'County',
	DUCHY: 'Duchy',
	KINGDOM: 'Kingdom',
	EMPIRE: 'Empire',
	HOLDING: 'Holding'
}

const alignments = {
	CG: 'Chaotic Good',
	NG: 'Neutral Good',
	LG: 'Lawful Good',
	CN: 'Chaotic Neutral',
	N: 'Neutral',
	LN: 'Lawful Neutral',
	CE: 'Chaotic Evil',
	NE: 'Neutral Evil',
	LE: 'Lawful Evil'
}

const gender = {
	MALE: 'Male',
	FEMALE: 'Female',
	OTHER: 'Other'
}

const strongholdType = {
	NONE: 'None',
	ESTABLISHMENT: 'Establishment',
	KEEP: 'Keep',
	TEMPLE: 'Temple',
	TOWER: 'Tower'
}

const classType = {
	NONE: 'None',
	BARBARIAN: 'Barbarian',
	BARD: 'Bard',
	CLERIC: 'Cleric',
	DRUID: 'Druid',
	FIGHTER: 'Fighter',
	MONK: 'Monk',
	PALADIN: 'Paladin',
	RANGER: 'Ranger',
	ROGUE: 'Rogue',
	SORCERER: 'Sorcerer',
	WARLOCK: 'Warlock',
	WIZARD: 'Wizard'
}

const pactType = {
	NAP: 'Non-Aggression Pact', /* d8 */
	ALLIANCE: 'Alliance', /* d1 */
	DEFP: 'Defensive Pact', /* d5 */
	TRUCE: 'Truce', /* d2 */
	EMBARGO: 'Embargo', /* d6 */
	TRADE: 'Trade Agreement', /* d7 */
	PEACE: 'Peace Treaty' /* d4 */
}

var pactTypes = [pactType.NAP, pactType.ALLIANCE, pactType.DEFP, pactType.TRUCE, pactType.EMBARGO, pactType.TRADE, pactType.PEACE];

const race = {
	HUMAN: 'Human',
	HALFELF: 'Half-Elf',
	ELFHIGH: 'High Elf',
	ELFWOOD: 'Wood Elf',
	ELFSHADARKAI: 'Shadar-Kai',
	HALFLINGSTOUT: 'Stout Halfling',
	HALFLINGLIGHTFOOT: 'Lightfoot Halfling',
	GNOMEFOREST: 'Forest Gnome',
	GNOMEDEEP: 'Deep Gnome',
	GNOMEROCK: 'Rock Gnome',
	DWARFMOUNTAIN: 'Mountain Dwarf',
	DWARFHILL: 'Hill Dwarf',
	DUERGAR: 'Duergar',
	HALFORC: 'Half-Orc',
	DRAGONBORN: 'Dragonborn',
	TIEFLING: 'Tiefling',
	ORC: 'Orc',
	KOBOLD: 'Kobold',
	LIZARDFOLK: 'Lizardfolk',
	GOBLIN: 'Goblin',
	HOBGOBLIN: 'Hobgoblin',
	FIRBOLG: 'Firbolg',
	BUGBEAR: 'Bugbear',
	TABAXI: 'Tabaxi',
	DROW: 'Drow',
	TRITON: 'Triton',
	AARAKOCRA: 'Aarakocra',
	//TORTLE: 'Tortle',
	GENASIAIR: 'Air Genasi',
	GENASIEARTH: 'Earth Genasi',
	GENASIWATER: 'Water Genasi',
	GENASIFIRE: 'Fire Genasi',
	GOLIATH: 'Goliath',
	ELADRIN: 'Eladrin',
	KENKU: 'Kenku',
	AASIMARFALLEN: 'Fallen Aasimar',
	AASIMARPROTECTOR: 'Protector Aasimar',
	AASIMARSCOURGE: 'Scourge Aasimar',
	YUANTI: 'Yuan-Ti Pureblood',
	GITHYANKI: 'Githyanki',
	GITHZERAI: 'Githzerai'
}