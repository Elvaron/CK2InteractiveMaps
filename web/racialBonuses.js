function getRacialSTRBonus(selectedRace) {
	
	if (selectedRace == race.HUMAN)
	{
		return 1;
	}

	if (selectedRace == race.DRAGONBORN)
	{
		return 2;
	}

	if (selectedRace == race.DUERGAR)
	{
		return 1;
	}

	if (selectedRace == race.DWARFMOUNTAIN)
	{
		return 2;
	}

	if (selectedRace == race.HALFORC || selectedRace == race.GOLIATH)
	{
		return 2;
	}

	if (selectedRace == race.BUGBEAR)
	{
		return 2;
	}

	if (selectedRace == race.GENASIEARTH)
	{
		return 1;
	}

	if (selectedRace == race.AASIMARFALLEN)
	{
		return 1;
	}

	if (selectedRace == race.FIRBOLG)
	{
		return 1;
	}

	if (selectedRace == race.GOBLIN)
	{
		return 1;
	}

	if (selectedRace == race.KOBOLD)
	{
		return -2;
	}

	if (selectedRace == race.ORC)
	{
		return 2;
	}

	if (selectedRace == race.TRITON)
	{
		return 1;
	}

	if (selectedRace == race.GITHYANKI)
	{
		return 2;
	}

	return 0;
}

function getRacialDEXBonus(selectedRace) {

	if (selectedRace == race.HUMAN)
	{
		return 1;
	}

	if (selectedRace == race.DROW || selectedRace == race.ELADRIN || selectedRace == race.ELFHIGH || selectedRace == race.ELFSHADARKAI)
	{
		return 2;
	}

	if (selectedRace == race.GENASIAIR)
	{
		return 1;
	}

	if (selectedRace == race.BUGBEAR)
	{
		return 1;
	}

	if (selectedRace == race.GNOMEDEEP || selectedRace == race.GNOMEFOREST)
	{
		return 1;
	}

	if (selectedRace == race.HALFLINGSTOUT || selectedRace == race.HALFLINGLIGHTFOOT)
	{
		return 2;
	}

	if (selectedRace == race.HALFELF)
	{
		return 1;
	}

	if (selectedRace == race.AARAKOCRA)
	{
		return 2;
	}

	if (selectedRace == race.GOBLIN)
	{
		return 2;
	}

	if (selectedRace == race.KOBOLD)
	{
		return 2;
	}

	if (selectedRace == race.KENKU)
	{
		return 2;
	}

	if (selectedRace == race.TABAXI)
	{
		return 2;
	}

	return 0;
}

function getRacialCONBonus(selectedRace) {

	if (selectedRace == race.HUMAN)
	{
		return 1;
	}

	if (selectedRace == race.DUERGAR || selectedRace == race.DWARFHILL || selectedRace == race.DWARFMOUNTAIN)
	{
		return 1;
	}

	if (selectedRace == race.HALFORC || selectedRace == race.GOLIATH)
	{
		return 1;
	}

	if (selectedRace == race.ELFSHADARKAI)
	{
		return 1;
	}

	if (selectedRace == race.GNOMEROCK)
	{
		return 1;
	}

	if (selectedRace == race.HALFLINGSTOUT)
	{
		return 1;
	}

	if (selectedRace == race.GENASIAIR || selectedRace == race.GENASIFIRE || selectedRace == race.GENASIWATER || selectedRace == race.GENASIEARTH)
	{
		return 2;
	}

	if (selectedRace == race.AASIMARSCOURGE)
	{
		return 1;
	}

	if (selectedRace == race.HOBGOBLIN)
	{
		return 2;
	}

	if (selectedRace == race.LIZARDFOLK)
	{
		return 2;
	}

	if (selectedRace == race.ORC)
	{
		return 1;
	}

	if (selectedRace == race.TRITON)
	{
		return 1;
	}

	return 0;
}

function getRacialINTBonus(selectedRace) {

	if (selectedRace == race.HUMAN)
	{
		return 1;
	}

	if (selectedRace == race.ELFHIGH)
	{
		return 1;
	}

	if (selectedRace == race.GNOMEDEEP || selectedRace == race.GNOMEFOREST || selectedRace == race.GNOMEROCK)
	{
		return 2;
	}

	if (selectedRace == race.HALFELF)
	{
		return 1;
	}

	if (selectedRace == race.TIEFLING)
	{
		return 1;
	}

	if (selectedRace == race.GENASIFIRE)
	{
		return 1;
	}

	if (selectedRace == race.HOBGOBLIN)
	{
		return 1;
	}

	if (selectedRace == race.ORC)
	{
		return -2;
	}

	if (selectedRace == race.YUANTI)
	{
		return 1;
	}

	if (selectedRace == race.GITHYANKI || selectedRace == race.GITHZERAI)
	{
		return 1;
	}

	return 0;
}

function getRacialWISBonus(selectedRace) {

	if (selectedRace == race.HUMAN)
	{
		return 1;
	}

	if (selectedRace == race.DWARFHILL)
	{
		return 1;
	}

	if (selectedRace == race.ELFWOOD)
	{
		return 1;
	}

	if (selectedRace == race.AARAKOCRA)
	{
		return 1;
	}

	if (selectedRace == race.GENASIWATER)
	{
		return 2;
	}

	if (selectedRace == race.AASIMARPROTECTOR)
	{
		return 1;
	}

	if (selectedRace == race.FIRBOLG)
	{
		return 2;
	}

	if (selectedRace == race.KENKU)
	{
		return 1;
	}

	if (selectedRace == race.LIZARDFOLK)
	{
		return 1;
	}

	if (selectedRace == race.GITHZERAI)
	{
		return 2;
	}

	return 0;
}

function getRacialCHABonus(selectedRace) {

	if (selectedRace == race.HUMAN)
	{
		return 1;
	}

	if (selectedRace == race.DRAGONBORN)
	{
		return 1;
	}

	if (selectedRace == race.DROW || selectedRace == race.ELADRIN)
	{
		return 1;
	}

	if (selectedRace == race.HALFLINGLIGHTFOOT)
	{
		return 1;
	}

	if (selectedRace == race.HALFELF)
	{
		return 2;
	}

	if (selectedRace == race.TIEFLING)
	{
		return 2;
	}

	if (selectedRace == race.AASIMARPROTECTOR || selectedRace == race.AASIMARFALLEN || selectedRace == race.AASIMARSCOURGE)
	{
		return 2;
	}

	if (selectedRace == race.TABAXI)
	{
		return 1;
	}

	if (selectedRace == race.TRITON)
	{
		return 1;
	}

	if (selectedRace == race.YUANTI)
	{
		return 2;
	}

	return 0;
}