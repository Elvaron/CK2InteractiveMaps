var npcClasses = new Map();
var npcClassIterator = 1;

function NpcClass(name, id) {
	this.name = name;
	this.id = id;
	this.strength = 10;
	this.dexterity = 10;
	this.constitution = 10;
	this.intelligence = 10;
	this.wisdom = 10;
	this.charisma = 10;
	this.armorClass = 10;
}

// Commoner
var commoner = new NpcClass("Commoner", npcClassIterator++);
commoner.strength = 10;
commoner.dexterity = 10;
commoner.constitution = 10;
commoner.intelligence  = 10;
commoner.wisdom = 10;
commoner.charisma = 10;
commoner.armorClass = 10;
npcClasses.set(commoner.id, commoner);

// Acolyte
var acolyte = new NpcClass("Acolyte", npcClassIterator++);
acolyte.strength = 10;
acolyte.dexterity = 10;
acolyte.constitution = 10;
acolyte.intelligence  = 10;
acolyte.wisdom = 14;
acolyte.charisma = 11;
acolyte.armorClass = 10;
npcClasses.set(acolyte.id, acolyte);

// Archer
var archer = new NpcClass("Archer", npcClassIterator++);
archer.strength = 11;
archer.dexterity = 18;
archer.constitution = 16;
archer.intelligence  = 11;
archer.wisdom = 13;
archer.charisma = 10;
archer.armorClass = 16;
npcClasses.set(archer.id, archer);

// Assassin
var assassin = new NpcClass("Assassin", npcClassIterator++);
assassin.strength = 11;
assassin.dexterity = 16;
assassin.constitution = 14;
assassin.intelligence  = 13;
assassin.wisdom = 11;
assassin.charisma = 10;
assassin.armorClass = 15;
npcClasses.set(assassin.id, assassin);

// Bandit
var bandit = new NpcClass("Bandit", npcClassIterator++);
bandit.strength = 11;
bandit.dexterity = 12;
bandit.constitution = 12;
bandit.intelligence  = 10;
bandit.wisdom = 10;
bandit.charisma = 10;
bandit.armorClass = 12;
npcClasses.set(bandit.id, bandit);

// Bandit Captain
var bdcp = new NpcClass("Bandit Captain", npcClassIterator++);
bdcp.strength = 15;
bdcp.dexterity = 16;
bdcp.constitution = 14;
bdcp.intelligence  = 14;
bdcp.wisdom = 11;
bdcp.charisma = 14;
bdcp.armorClass = 15;
npcClasses.set(bdcp.id, bdcp);

// Bard
var bard = new NpcClass("Bard", npcClassIterator++);
bard.strength = 11;
bard.dexterity = 14;
bard.constitution = 12;
bard.intelligence  = 10;
bard.wisdom = 13;
bard.charisma = 14;
bard.armorClass = 15;
npcClasses.set(bard.id, bard);

// Berserker
var berserker = new NpcClass("Berserker", npcClassIterator++);
berserker.strength = 16;
berserker.dexterity = 12;
berserker.constitution = 17;
berserker.intelligence  = 9;
berserker.wisdom = 11;
berserker.charisma = 9;
berserker.armorClass = 13;
npcClasses.set(berserker.id, berserker);

// Blackguard
var blackguard = new NpcClass("Blackguard", npcClassIterator++);
blackguard.strength = 18;
blackguard.dexterity = 11;
blackguard.constitution = 18;
blackguard.intelligence  = 11;
blackguard.wisdom = 14;
blackguard.charisma = 15;
blackguard.armorClass = 18;
npcClasses.set(blackguard.id, blackguard);

// Champion
var chmp = new NpcClass("Champion", npcClassIterator++);
chmp.strength = 20;
chmp.dexterity = 15;
chmp.constitution = 14;
chmp.intelligence  = 10;
chmp.wisdom = 14;
chmp.charisma = 12;
chmp.armorClass = 18;
npcClasses.set(chmp.id, chmp);

// Cult Fanatic
var cltfntc = new NpcClass("Cult Fanatic", npcClassIterator++);
cltfntc.strength = 11;
cltfntc.dexterity = 14;
cltfntc.constitution = 12;
cltfntc.intelligence  = 10;
cltfntc.wisdom = 13;
cltfntc.charisma = 14;
cltfntc.armorClass = 13;
npcClasses.set(cltfntc.id, cltfntc);

// Cultist
var clt = new NpcClass("Cultist", npcClassIterator++);
clt.strength = 11;
clt.dexterity = 12;
clt.constitution = 10;
clt.intelligence  = 10;
clt.wisdom = 11;
clt.charisma = 10;
clt.armorClass = 12;
npcClasses.set(clt.id, clt);

// Druid
var drd = new NpcClass("Druid", npcClassIterator++);
drd.strength = 10;
drd.dexterity = 12;
drd.constitution = 13;
drd.intelligence  = 12;
drd.wisdom = 15;
drd.charisma = 11;
drd.armorClass = 11;
npcClasses.set(drd.id, drd);

// Gladiator
var glad = new NpcClass("Gladiator", npcClassIterator++);
glad.strength = 18;
glad.dexterity = 15;
glad.constitution = 16;
glad.intelligence  = 10;
glad.wisdom = 12;
glad.charisma = 15;
glad.armorClass = 16;
npcClasses.set(glad.id, glad);

// Guard
var grd = new NpcClass("Guard", npcClassIterator++);
grd.strength = 13;
grd.dexterity = 12;
grd.constitution = 12;
grd.intelligence  = 10;
grd.wisdom = 11;
grd.charisma = 10;
grd.armorClass = 16;
npcClasses.set(grd.id, grd);

// Knight
var knight = new NpcClass("Knight", npcClassIterator++);
knight.strength = 16;
knight.dexterity = 11;
knight.constitution = 14;
knight.intelligence  = 11;
knight.wisdom = 11;
knight.charisma = 15;
knight.armorClass = 18;
npcClasses.set(knight.id, knight);

// Mage
var mage = new NpcClass("Mage", npcClassIterator++);
mage.strength = 9;
mage.dexterity = 14;
mage.constitution = 11;
mage.intelligence  = 17;
mage.wisdom = 12;
mage.charisma = 11;
mage.armorClass = 12;
npcClasses.set(mage.id, mage);

// Noble
var noble = new NpcClass("Noble", npcClassIterator++);
noble.strength = 11;
noble.dexterity = 12;
noble.constitution = 11;
noble.intelligence  = 12;
noble.wisdom = 14;
noble.charisma = 16;
noble.armorClass = 15;
npcClasses.set(noble.id, noble);

// Priest
var priest = new NpcClass("Priest", npcClassIterator++);
priest.strength = 10;
priest.dexterity = 10;
priest.constitution = 12;
priest.intelligence  = 13;
priest.wisdom = 16;
priest.charisma = 13;
priest.armorClass = 13;
npcClasses.set(priest.id, priest);

// Spy
var spy = new NpcClass("Spy", npcClassIterator++);
spy.strength = 10;
spy.dexterity = 15;
spy.constitution = 10;
spy.intelligence  = 12;
spy.wisdom = 14;
spy.charisma = 16;
spy.armorClass = 12;
npcClasses.set(spy.id, spy);

// Thug
var thug = new NpcClass("Thug", npcClassIterator++);
thug.strength = 15;
thug.dexterity = 11;
thug.constitution = 14;
thug.intelligence  = 10;
thug.wisdom = 10;
thug.charisma = 11;
thug.armorClass = 11;
npcClasses.set(thug.id, thug);

// Tribal Warrior
var trb = new NpcClass("Tribal Warrior", npcClassIterator++);
trb.strength = 13;
trb.dexterity = 11;
trb.constitution = 12;
trb.intelligence  = 8;
trb.wisdom = 11;
trb.charisma = 8;
trb.armorClass = 12;
npcClasses.set(trb.id, trb);

// Veteran
var vtrn = new NpcClass("Veteran", npcClassIterator++);
vtrn.strength = 16;
vtrn.dexterity = 13;
vtrn.constitution = 14;
vtrn.intelligence  = 10;
vtrn.wisdom = 11;
vtrn.charisma = 10;
vtrn.armorClass = 17;
npcClasses.set(vtrn.id, vtrn);

// Warlord
/*var wrlrd = new NpcClass("Warlord", npcClassIterator++);
wrlrd.strength = 20;
wrlrd.dexterity = 16;
wrlrd.constitution = 18;
wrlrd.intelligence  = 12;
wrlrd.wisdom = 12;
wrlrd.charisma = 18;
wrlrd.armorClass = 18;
npcClasses.set(wrlrd.id, wrlrd);*/

// ------------- Retainers --------------------
// Ability Checks: +3 (16), +4 for Primary Ability (18)
// Armor Class: light 13, medium 15, heavy 18

// Reaver
var reaver = new NpcClass("Reaver", npcClassIterator++);
reaver.strength = 18;
reaver.dexterity = 16;
reaver.constitution = 16;
reaver.intelligence  = 16;
reaver.wisdom = 16;
reaver.charisma = 16;
reaver.armorClass = 15;
npcClasses.set(reaver.id, reaver);

// Spirit Warden
var spiritWarden = new NpcClass("Spirit Warden", npcClassIterator++);
spiritWarden.strength = 18;
spiritWarden.dexterity = 16;
spiritWarden.constitution = 16;
spiritWarden.intelligence  = 16;
spiritWarden.wisdom = 16;
spiritWarden.charisma = 16;
spiritWarden.armorClass = 15;
npcClasses.set(spiritWarden.id, spiritWarden);

// Loremaster
var loremaster = new NpcClass("Loremaster", npcClassIterator++);
loremaster.strength = 16;
loremaster.dexterity = 16;
loremaster.constitution = 16;
loremaster.intelligence  = 16;
loremaster.wisdom = 16;
loremaster.charisma = 18;
loremaster.armorClass = 13;
npcClasses.set(loremaster.id, loremaster);

// Troubadour-warrior
var troubadour = new NpcClass("Troubadour-warrior", npcClassIterator++);
troubadour.strength = 16;
troubadour.dexterity = 16;
troubadour.constitution = 16;
troubadour.intelligence  = 16;
troubadour.wisdom = 16;
troubadour.charisma = 18;
troubadour.armorClass = 13;
npcClasses.set(troubadour.id, troubadour);

// Curate
var curate = new NpcClass("Curate", npcClassIterator++);
curate.strength = 16;
curate.dexterity = 16;
curate.constitution = 16;
curate.intelligence  = 16;
curate.wisdom = 18;
curate.charisma = 16;
curate.armorClass = 15;
npcClasses.set(curate.id, curate);

// Exorcist
var exorcist = new NpcClass("Exorcist", npcClassIterator++);
exorcist.strength = 16;
exorcist.dexterity = 16;
exorcist.constitution = 16;
exorcist.intelligence  = 16;
exorcist.wisdom = 18;
exorcist.charisma = 16;
exorcist.armorClass = 15;
npcClasses.set(exorcist.id, exorcist);

// Healer
var healer = new NpcClass("Healer", npcClassIterator++);
healer.strength = 16;
healer.dexterity = 16;
healer.constitution = 16;
healer.intelligence  = 16;
healer.wisdom = 18;
healer.charisma = 16;
healer.armorClass = 18;
npcClasses.set(healer.id, healer);

// Shadow Priest
var shadowPriest = new NpcClass("Shadow Priest", npcClassIterator++);
shadowPriest.strength = 16;
shadowPriest.dexterity = 16;
shadowPriest.constitution = 16;
shadowPriest.intelligence  = 16;
shadowPriest.wisdom = 18;
shadowPriest.charisma = 16;
shadowPriest.armorClass = 15;
npcClasses.set(shadowPriest.id, shadowPriest);

// Stormspeaker
var stormspeaker = new NpcClass("Stormspeaker", npcClassIterator++);
stormspeaker.strength = 16;
stormspeaker.dexterity = 16;
stormspeaker.constitution = 16;
stormspeaker.intelligence  = 16;
stormspeaker.wisdom = 18;
stormspeaker.charisma = 16;
stormspeaker.armorClass = 18;
npcClasses.set(stormspeaker.id, stormspeaker);

// Warden
var warden = new NpcClass("Warden", npcClassIterator++);
warden.strength = 16;
warden.dexterity = 16;
warden.constitution = 16;
warden.intelligence  = 16;
warden.wisdom = 18;
warden.charisma = 16;
warden.armorClass = 15;
npcClasses.set(warden.id, warden);

// Battle Priest
var battlePriest = new NpcClass("Battle Priest", npcClassIterator++);
battlePriest.strength = 16;
battlePriest.dexterity = 16;
battlePriest.constitution = 16;
battlePriest.intelligence  = 16;
battlePriest.wisdom = 18;
battlePriest.charisma = 16;
battlePriest.armorClass = 18;
npcClasses.set(battlePriest.id, battlePriest);

// Mystic
var mystic = new NpcClass("Mystic", npcClassIterator++);
mystic.strength = 16;
mystic.dexterity = 16;
mystic.constitution = 16;
mystic.intelligence  = 16;
mystic.wisdom = 18;
mystic.charisma = 16;
mystic.armorClass = 15;
npcClasses.set(mystic.id, mystic);

// Skinwalker
var skinwalker = new NpcClass("Skinwalker", npcClassIterator++);
skinwalker.strength = 16;
skinwalker.dexterity = 16;
skinwalker.constitution = 16;
skinwalker.intelligence  = 16;
skinwalker.wisdom = 18;
skinwalker.charisma = 16;
skinwalker.armorClass = 15;
npcClasses.set(skinwalker.id, skinwalker);

// Knight-Sorcerer
var knightSorcerer = new NpcClass("Knight-Sorcerer", npcClassIterator++);
knightSorcerer.strength = 18;
knightSorcerer.dexterity = 16;
knightSorcerer.constitution = 16;
knightSorcerer.intelligence  = 16;
knightSorcerer.wisdom = 16;
knightSorcerer.charisma = 16;
knightSorcerer.armorClass = 18;
npcClasses.set(knightSorcerer.id, knightSorcerer);

// Swordmaster
var swordmaster = new NpcClass("Swordmaster", npcClassIterator++);
swordmaster.strength = 18;
swordmaster.dexterity = 16;
swordmaster.constitution = 16;
swordmaster.intelligence  = 16;
swordmaster.wisdom = 16;
swordmaster.charisma = 16;
swordmaster.armorClass = 18;
npcClasses.set(swordmaster.id, swordmaster);

// Warlord
var warlord = new NpcClass("Warlord", npcClassIterator++);
warlord.strength = 18;
warlord.dexterity = 16;
warlord.constitution = 16;
warlord.intelligence  = 16;
warlord.wisdom = 16;
warlord.charisma = 16;
warlord.armorClass = 18;
npcClasses.set(warlord.id, warlord);

// Acolyte of the Way
var acolyteWay = new NpcClass("Acolyte of the Way", npcClassIterator++);
acolyteWay.strength = 16;
acolyteWay.dexterity = 18;
acolyteWay.constitution = 16;
acolyteWay.intelligence  = 16;
acolyteWay.wisdom = 18;
acolyteWay.charisma = 16;
acolyteWay.armorClass = 15;
npcClasses.set(acolyteWay.id, acolyteWay);

// Acolyte of Darkness
var acolyteDarkness = new NpcClass("Acolyte of Darkness", npcClassIterator++);
acolyteDarkness.strength = 16;
acolyteDarkness.dexterity = 18;
acolyteDarkness.constitution = 16;
acolyteDarkness.intelligence  = 16;
acolyteDarkness.wisdom = 18;
acolyteDarkness.charisma = 16;
acolyteDarkness.armorClass = 15;
npcClasses.set(acolyteDarkness.id, acolyteDarkness);

// Elemental Acolyte
var elementalAcolyte = new NpcClass("Elemental Acolyte", npcClassIterator++);
elementalAcolyte.strength = 16;
elementalAcolyte.dexterity = 18;
elementalAcolyte.constitution = 16;
elementalAcolyte.intelligence  = 16;
elementalAcolyte.wisdom = 18;
elementalAcolyte.charisma = 16;
elementalAcolyte.armorClass = 15;
npcClasses.set(elementalAcolyte.id, elementalAcolyte);

// Cavalier
var cavalier = new NpcClass("Cavalier", npcClassIterator++);
cavalier.strength = 18;
cavalier.dexterity = 16;
cavalier.constitution = 16;
cavalier.intelligence  = 16;
cavalier.wisdom = 16;
cavalier.charisma = 18;
cavalier.armorClass = 18;
npcClasses.set(cavalier.id, cavalier);

// Justicar
var justicar = new NpcClass("Justicar", npcClassIterator++);
justicar.strength = 18;
justicar.dexterity = 16;
justicar.constitution = 16;
justicar.intelligence  = 16;
justicar.wisdom = 16;
justicar.charisma = 18;
justicar.armorClass = 18;
npcClasses.set(justicar.id, justicar);

// Knight of the Green Order
var greenOrderKnight = new NpcClass("Knight of the Green Order", npcClassIterator++);
greenOrderKnight.strength = 18;
greenOrderKnight.dexterity = 16;
greenOrderKnight.constitution = 16;
greenOrderKnight.intelligence  = 16;
greenOrderKnight.wisdom = 16;
greenOrderKnight.charisma = 18;
greenOrderKnight.armorClass = 18;
npcClasses.set(greenOrderKnight.id, greenOrderKnight);

// Beast Lord
var beastLord = new NpcClass("Beast Lord", npcClassIterator++);
beastLord.strength = 16;
beastLord.dexterity = 18;
beastLord.constitution = 16;
beastLord.intelligence  = 16;
beastLord.wisdom = 18;
beastLord.charisma = 16;
beastLord.armorClass = 15;
npcClasses.set(beastLord.id, beastLord);

// Tracker
var tracker = new NpcClass("Tracker", npcClassIterator++);
tracker.strength = 16;
tracker.dexterity = 18;
tracker.constitution = 16;
tracker.intelligence  = 16;
tracker.wisdom = 18;
tracker.charisma = 16;
tracker.armorClass = 15;
npcClasses.set(tracker.id, tracker);

// Executioner
var executioner = new NpcClass("Executioner", npcClassIterator++);
executioner.strength = 16;
executioner.dexterity = 18;
executioner.constitution = 16;
executioner.intelligence  = 16;
executioner.wisdom = 16;
executioner.charisma = 16;
executioner.armorClass = 13;
npcClasses.set(executioner.id, executioner);

// Guild Adept
var guildAdept = new NpcClass("Guild Adept", npcClassIterator++);
guildAdept.strength = 16;
guildAdept.dexterity = 18;
guildAdept.constitution = 16;
guildAdept.intelligence  = 16;
guildAdept.wisdom = 16;
guildAdept.charisma = 16;
guildAdept.armorClass = 13;
npcClasses.set(guildAdept.id, guildAdept);

// Cutpurse
var cutpurse = new NpcClass("Cutpurse", npcClassIterator++);
cutpurse.strength = 16;
cutpurse.dexterity = 18;
cutpurse.constitution = 16;
cutpurse.intelligence  = 16;
cutpurse.wisdom = 16;
cutpurse.charisma = 16;
cutpurse.armorClass = 13;
npcClasses.set(cutpurse.id, cutpurse);

// Thaumaturgist
var thaumaturgist = new NpcClass("Thaumaturgist", npcClassIterator++);
thaumaturgist.strength = 16;
thaumaturgist.dexterity = 16;
thaumaturgist.constitution = 16;
thaumaturgist.intelligence  = 16;
thaumaturgist.wisdom = 16;
thaumaturgist.charisma = 18;
thaumaturgist.armorClass = 13;
npcClasses.set(thaumaturgist.id, thaumaturgist);

// Chaos Mage
var chaosMage = new NpcClass("Chaos Mage", npcClassIterator++);
chaosMage.strength = 16;
chaosMage.dexterity = 16;
chaosMage.constitution = 16;
chaosMage.intelligence  = 16;
chaosMage.wisdom = 16;
chaosMage.charisma = 18;
chaosMage.armorClass = 13;
npcClasses.set(chaosMage.id, chaosMage);

// Alienist
var alienist = new NpcClass("Alienist", npcClassIterator++);
alienist.strength = 16;
alienist.dexterity = 16;
alienist.constitution = 16;
alienist.intelligence  = 16;
alienist.wisdom = 16;
alienist.charisma = 18;
alienist.armorClass = 13;
npcClasses.set(alienist.id, alienist);

// Diabolist
var diabolist = new NpcClass("Diabolist", npcClassIterator++);
diabolist.strength = 16;
diabolist.dexterity = 16;
diabolist.constitution = 16;
diabolist.intelligence  = 16;
diabolist.wisdom = 16;
diabolist.charisma = 18;
diabolist.armorClass = 13;
npcClasses.set(diabolist.id, diabolist);

// Exarch
var exarch = new NpcClass("Exarch", npcClassIterator++);
exarch.strength = 16;
exarch.dexterity = 16;
exarch.constitution = 16;
exarch.intelligence  = 16;
exarch.wisdom = 16;
exarch.charisma = 18;
exarch.armorClass = 13;
npcClasses.set(exarch.id, exarch);

// Conjurer
var conjurer = new NpcClass("Conjurer", npcClassIterator++);
conjurer.strength = 16;
conjurer.dexterity = 16;
conjurer.constitution = 16;
conjurer.intelligence  = 18;
conjurer.wisdom = 16;
conjurer.charisma = 16;
conjurer.armorClass = 13;
npcClasses.set(conjurer.id, conjurer);

// Enchanter
var enchanter = new NpcClass("Enchanter", npcClassIterator++);
enchanter.strength = 16;
enchanter.dexterity = 16;
enchanter.constitution = 16;
enchanter.intelligence  = 18;
enchanter.wisdom = 16;
enchanter.charisma = 16;
enchanter.armorClass = 13;
npcClasses.set(enchanter.id, enchanter);

// Evoker
var evoker = new NpcClass("Evoker", npcClassIterator++);
evoker.strength = 16;
evoker.dexterity = 16;
evoker.constitution = 16;
evoker.intelligence  = 18;
evoker.wisdom = 16;
evoker.charisma = 16;
evoker.armorClass = 13;
npcClasses.set(evoker.id, evoker);

// Illusionist
var illusionist = new NpcClass("Illusionist", npcClassIterator++);
illusionist.strength = 16;
illusionist.dexterity = 16;
illusionist.constitution = 16;
illusionist.intelligence  = 18;
illusionist.wisdom = 16;
illusionist.charisma = 16;
illusionist.armorClass = 13;
npcClasses.set(illusionist.id, illusionist);

// Necromancer
var necromancer = new NpcClass("Necromancer", npcClassIterator++);
necromancer.strength = 16;
necromancer.dexterity = 16;
necromancer.constitution = 16;
necromancer.intelligence  = 18;
necromancer.wisdom = 16;
necromancer.charisma = 16;
necromancer.armorClass = 13;
npcClasses.set(necromancer.id, necromancer);

// Seer
var seer = new NpcClass("Seer", npcClassIterator++);
seer.strength = 16;
seer.dexterity = 16;
seer.constitution = 16;
seer.intelligence  = 18;
seer.wisdom = 16;
seer.charisma = 16;
seer.armorClass = 13;
npcClasses.set(seer.id, seer);

// Shaper
var shaper = new NpcClass("Shaper", npcClassIterator++);
shaper.strength = 16;
shaper.dexterity = 16;
shaper.constitution = 16;
shaper.intelligence  = 18;
shaper.wisdom = 16;
shaper.charisma = 16;
shaper.armorClass = 13;
npcClasses.set(shaper.id, shaper);

// Theurgist
var theurgist = new NpcClass("Theurgist", npcClassIterator++);
theurgist.strength = 16;
theurgist.dexterity = 16;
theurgist.constitution = 16;
theurgist.intelligence  = 18;
theurgist.wisdom = 16;
theurgist.charisma = 16;
theurgist.armorClass = 13;
npcClasses.set(theurgist.id, theurgist);
