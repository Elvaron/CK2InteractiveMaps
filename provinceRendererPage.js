var characterIterator = 1;
var characterMap = null;

window.onload = function() {

	if (characterMap == null)
	{
		characterMap = new Map();
	}

	var myCharacter = initSampleCharacter(false);

	var myProvince = initSampleProvince(myCharacter);
	
	var taskOne = renderProvince(myProvince, "province");
	var taskTwo = renderCharacterPortrait(myCharacter, [0,0,1000], "helper", true, true);
	var taskThree = new RenderedImage(49, 49, 2000, 130, 130, "helper", "province");

	var renderStack = new RenderStack();
	renderStack.addElements(taskOne);
	renderStack.addElements(taskTwo);
	renderStack.addElement(taskThree);
	renderStack.callback = function () {
		document.getElementById("loadingScreen").style.display = "none";
		document.getElementById("province").style.display = "block";
	};

	loadRenderStack(renderStack);
};