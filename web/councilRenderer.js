var councilVisible = false;

function drawCouncil (council, hide, offset, mainRenderStack, targetCanvas, helperCanvases)
{
	if (councilVisible || hide)
	{
		clearCanvasFromPoint(targetCanvas, 549, 0);
		councilVisible = false;

		// Remove all clickable areas
		var newClickableAreas = [];
		for (var i = 0; i < clickableAreas.length; i++)
		{
			if (clickableAreas[i].description != "CouncilMember")
			{
				newClickableAreas.push(clickableAreas[i]);
			}
		}
		clickableAreas = newClickableAreas;

		// Remove all mouseover areas
		var newMouseOver = [];
		for (var i = 0; i < mouseOverAreas.length; i++)
		{
			if (mouseOverAreas[i].minX < 549)
			{
				newMouseOver.push(mouseOverAreas[i]);
			}
		}
		mouseOverAreas = newMouseOver;

		return;
	}

	var councilPositions = [0,128,256,384,512];
	positionIterator = 0;

	councilVisible = true;
	var renderStack = new RenderStack();

	if (council.chancellor > 0)
	{
		var chancellor = characterMap.get(council.chancellor);
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 0, "council/frame.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator] + 2, 1000, "council/banner.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 500, "council/bg_number.png", 126, 128, targetCanvas));

		var attributes = chancellor.getCK2Stats();

		renderStack.addElement( new TextLabel(660, councilPositions[positionIterator] + 22, 1500, 100, 18, attributes[0], "right", "white", true, targetCanvas, true));

		clearCanvas("council1");

		renderStack.addElements( renderCharacterPortrait(chancellor, [0,0,0], "council1", false, true) );
		renderStack.addElement( new RenderedImage(552, councilPositions[positionIterator] + 3, 300, 120, 120, "council1", targetCanvas) );

		renderStack.addElement( new TextLabel(615, councilPositions[positionIterator] + 110, 1600, 110, 18, "Chancellor", "center", "black", true, targetCanvas, true));

		mouseOverAreas.push( new MouseOverShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, getFullName(chancellor)) );

		clickableAreas.push( new ClickableShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, "CouncilMember", function () {
			renderCharacter(chancellor, offset, mainRenderStack, targetCanvas, helperCanvases);
		}));

		positionIterator++;
	}

	if (council.marshal > 0)
	{
		var marshal = characterMap.get(council.marshal);
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 0, "council/frame.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator] + 2, 1000, "council/banner.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 500, "council/bg_number.png", 126, 128, targetCanvas));

		var attributes = marshal.getCK2Stats();

		renderStack.addElement( new TextLabel(660, councilPositions[positionIterator] + 22, 1500, 100, 18, attributes[1], "right", "white", true, targetCanvas, true));

		clearCanvas("council2");

		renderStack.addElements( renderCharacterPortrait(marshal, [0,0,0], "council2", false, true) );
		renderStack.addElement( new RenderedImage(552, councilPositions[positionIterator] + 3, 300, 120, 120, "council2", targetCanvas) );

		renderStack.addElement( new TextLabel(615, councilPositions[positionIterator] + 110, 1600, 110, 18, "Marshal", "center", "black", true, targetCanvas, true));

		mouseOverAreas.push( new MouseOverShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, getFullName(marshal)) );

		clickableAreas.push( new ClickableShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, "CouncilMember", function () {
			renderCharacter(marshal, offset, mainRenderStack, targetCanvas, helperCanvases);
		}));

		positionIterator++;
	}

	if (council.steward > 0)
	{
		var steward = characterMap.get(council.steward);
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 0, "council/frame.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator] + 2, 1000, "council/banner.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 500, "council/bg_number.png", 126, 128, targetCanvas));

		var attributes = steward.getCK2Stats();

		renderStack.addElement( new TextLabel(660, councilPositions[positionIterator] + 22, 1500, 100, 18, attributes[2], "right", "white", true, targetCanvas, true));

		clearCanvas("council3");

		renderStack.addElements( renderCharacterPortrait(steward, [0,0,0], "council3", false, true) );
		renderStack.addElement( new RenderedImage(552, councilPositions[positionIterator] + 3, 300, 120, 120, "council3", targetCanvas) );

		renderStack.addElement( new TextLabel(615, councilPositions[positionIterator] + 110, 1600, 110, 18, "Steward", "center", "black", true, targetCanvas, true));

		mouseOverAreas.push( new MouseOverShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, getFullName(steward)) );

		clickableAreas.push( new ClickableShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, "CouncilMember", function () {
			renderCharacter(steward, offset, mainRenderStack, targetCanvas, helperCanvases);
		}));

		positionIterator++;
	}

	if (council.spymaster > 0)
	{
		var spymaster = characterMap.get(council.spymaster);
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 0, "council/frame.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator] + 2, 1000, "council/banner.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 500, "council/bg_number.png", 126, 128, targetCanvas));

		var attributes = spymaster.getCK2Stats();

		renderStack.addElement( new TextLabel(660, councilPositions[positionIterator] + 22, 1500, 100, 18, attributes[3], "right", "white", true, targetCanvas, true));

		clearCanvas("council4");

		renderStack.addElements( renderCharacterPortrait(spymaster, [0,0,0], "council4", false, true) );
		renderStack.addElement( new RenderedImage(552, councilPositions[positionIterator] + 3, 300, 120, 120, "council4", targetCanvas) );

		renderStack.addElement( new TextLabel(615, councilPositions[positionIterator] + 110, 1600, 110, 18, "Spymaster", "center", "black", true, targetCanvas, true));

		mouseOverAreas.push( new MouseOverShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, getFullName(spymaster)) );

		clickableAreas.push( new ClickableShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, "CouncilMember", function () {
			renderCharacter(spymaster, offset, mainRenderStack, targetCanvas, helperCanvases);
		}));

		positionIterator++;
	}

	if (council.chaplain > 0)
	{
		var chaplain = characterMap.get(council.chaplain);
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 0, "council/frame.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator] + 2, 1000, "council/banner.png", 126, 128, targetCanvas));
		renderStack.addElement(new Shape(549, councilPositions[positionIterator], 500, "council/bg_number.png", 126, 128, targetCanvas));

		var attributes = chaplain.getCK2Stats();

		renderStack.addElement( new TextLabel(660, councilPositions[positionIterator] + 22, 1500, 100, 18, attributes[4], "right", "white", true, targetCanvas, true));

		clearCanvas("council5");

		renderStack.addElements( renderCharacterPortrait(chaplain, [0,0,0], "council5", false, true) );
		renderStack.addElement( new RenderedImage(552, councilPositions[positionIterator] + 3, 300, 120, 120, "council5", targetCanvas) );

		renderStack.addElement( new TextLabel(615, councilPositions[positionIterator] + 110, 1600, 110, 18, "Court Chaplain", "center", "black", true, targetCanvas, true));

		mouseOverAreas.push( new MouseOverShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, getFullName(chaplain)) );

		clickableAreas.push( new ClickableShape(549, councilPositions[positionIterator], 549 + 126, councilPositions[positionIterator] + 128, "CouncilMember", function () {
			renderCharacter(chaplain, offset, mainRenderStack, targetCanvas, helperCanvases);
		}));

		positionIterator++;
	}

	minMaxClickableBounds = getMinMaxBounds(clickableAreas);
	minMaxBounds = getMinMaxBounds(mouseOverAreas);

	loadRenderStack(renderStack);
}