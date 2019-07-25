var ClickableShape = function (minX, minY, maxX, maxY, description, action) {
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
	this.description = description;
	this.action = action;
}

ClickableShape.prototype.isInShape = function (x, y) {
	return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
}

var MouseOverShape = function (minX, minY, maxX, maxY, description) {
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
	this.description = description;
}

MouseOverShape.prototype.isInShape = function (x, y) {
	return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
}

function getMinMaxClickableBounds() {
	if (!clickableAreas || clickableAreas.length == 0)
	{
		return new ClickableShape(0,0,1,1,"", null);
	}

	var minX = clickableAreas[0].minX;
	var minY = clickableAreas[0].minY;
	var maxX = clickableAreas[0].maxX;
	var maxY = clickableAreas[0].maxY;

	for (var i = 1; i < clickableAreas.length; i++)
	{
		var shape = clickableAreas[i];
		if (shape.minX < minX)
		{
			minX = shape.minX;
		}

		if (shape.minY < minY)
		{
			minY = shape.minY;
		}

		if (shape.maxX > maxX)
		{
			maxX = shape.maxX;
		}

		if (shape.maxY > maxY)
		{
			maxY = shape.maxY;
		}
	}

	return new ClickableShape(minX,minY,maxX,maxY,"", null);
}

function getMinMaxBounds() {
	if (!mouseOverAreas || mouseOverAreas.length == 0)
	{
		return new MouseOverShape(0,0,1,1,"");
	}

	var minX = mouseOverAreas[0].minX;
	var minY = mouseOverAreas[0].minY;
	var maxX = mouseOverAreas[0].maxX;
	var maxY = mouseOverAreas[0].maxY;

	for (var i = 1; i < mouseOverAreas.length; i++)
	{
		var mouseOverShape = mouseOverAreas[i];
		if (mouseOverShape.minX < minX)
		{
			minX = mouseOverShape.minX;
		}

		if (mouseOverShape.minY < minY)
		{
			minY = mouseOverShape.minY;
		}

		if (mouseOverShape.maxX > maxX)
		{
			maxX = mouseOverShape.maxX;
		}

		if (mouseOverShape.maxY > maxY)
		{
			maxY = mouseOverShape.maxY;
		}
	}

	return new MouseOverShape(minX, minY, maxX, maxY, "");
}


var Shape = function (x, y, z, url, width, height, targetId) {
	this.x = x;
	this.y = y;
	this.zIndex = z;
	this.width = width;
	this.height = height;
	this.image = new Image();
	this.image.src = url;
	this.partial = false;
	this.partialX = 0;
	this.partialY = 0;
	this.partialWidth = 0;
	this.partialHeight = 0;
	this.targetId = targetId;
	this.targetCanvas = null;
	this.targetContext = null;
};

Shape.prototype.draw = function () {
	if (this.targetContext)
	{
		if (this.image == null)
		{
			return;
		}

		if (this.partial)
		{
			this.targetContext.drawImage(this.image, this.partialX, this.partialY, this.partialWidth, this.partialHeight, this.x, this.y, this.width, this.height);
		} else {
			this.targetContext.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	}
}

Shape.prototype.resolve = function (canvasMap) {
	if (canvasMap.has(this.targetId))
	{
		var alreadyLoaded = canvasMap.get(this.targetId);
		this.targetCanvas = alreadyLoaded[0];
		this.targetContext = alreadyLoaded[1];
	} else {
		this.targetCanvas = document.getElementById(this.targetId);
		this.targetContext = this.targetCanvas.getContext("2d");
		makeCanvasPretty(this.targetContext);
		canvasMap.set(this.targetId, [this.targetCanvas, this.targetContext]);
	}
}

var TextLabel = function (x, y, z, maxWidth, fontSize, text, textalign, color, bold, targetId, useTrajan = false) {
	this.x = x;
	this.y = y;
	this.zIndex = z;
	this.maxWidth = maxWidth;
	this.fontSize = fontSize;
	this.text = text;
	this.color = color;
	this.textalign = textalign;
	this.bold = bold;
	this.targetId = targetId;
	this.targetCanvas = null;
	this.targetContext = null;
	this.useTrajan = useTrajan;
}

TextLabel.prototype.draw = function () {
	if (this.targetContext)
	{
		if (this.useTrajan)
		{
			this.targetContext.font = this.fontSize + "px Trajan Pro 3";
		} else {
			this.targetContext.font = (this.bold ? 'bold ' : '') + this.fontSize + 'px Garamond';
		}
		
		var temporaryFillStyle = this.targetContext.fillStyle;
		var temporaryAlignment = this.targetContext.textAlign;
		this.targetContext.textAlign = this.textalign;
		this.targetContext.fillStyle = this.color;
		this.targetContext.fillText(this.text, this.x, this.y, this.maxWidth);
		this.targetContext.fillStyle = temporaryFillStyle;
		this.targetContext.textAlign = temporaryAlignment;
	}
}

TextLabel.prototype.resolve = function (canvasMap) {
	if (canvasMap.has(this.targetId))
	{
		var alreadyLoaded = canvasMap.get(this.targetId);
		this.targetCanvas = alreadyLoaded[0];
		this.targetContext = alreadyLoaded[1];
	} else {
		this.targetCanvas = document.getElementById(this.targetId);
		if (this.targetCanvas)
		{
			this.targetContext = this.targetCanvas.getContext("2d");
			makeCanvasPretty(this.targetContext);
			canvasMap.set(this.targetId, [this.targetCanvas, this.targetContext]);
		}
	}
}

var RenderedImage = function (x, y, z, width, height, sourceId, targetId)
{
	this.x = x;
	this.y = y;
	this.zIndex = z;
	this.width = width;
	this.height = height;
	this.sourceId = sourceId;
	this.targetId = targetId;
	this.targetCanvas = null;
	this.targetContext = null;
	this.sourceCanvas = null;
	this.sourceContext = null;
}

RenderedImage.prototype.draw = function () {
	if (this.targetContext && this.sourceCanvas)
	{
		this.targetContext.drawImage(this.sourceCanvas, this.x, this.y, this.width, this.height);
	}
}

RenderedImage.prototype.resolve = function (canvasMap) {
	if (canvasMap.has(this.targetId))
	{
		var alreadyLoaded = canvasMap.get(this.targetId);
		this.targetCanvas = alreadyLoaded[0];
		this.targetContext = alreadyLoaded[1];
	} else {
		this.targetCanvas = document.getElementById(this.targetId);
		this.targetContext = this.targetCanvas.getContext("2d");
		makeCanvasPretty(this.targetContext);
		canvasMap.set(this.targetId, [this.targetCanvas, this.targetContext]);
	}

	if (canvasMap.has(this.sourceId))
	{
		var alreadyLoaded = canvasMap.get(this.sourceId);
		this.sourceCanvas = alreadyLoaded[0];
		this.sourceContext = alreadyLoaded[1];
	} else {
		this.sourceCanvas = document.getElementById(this.sourceId);
		this.sourceContext = this.sourceCanvas.getContext("2d");
		makeCanvasPretty(this.sourceContext);
		canvasMap.set(this.sourceId, [this.sourceCanvas, this.sourceContext]);
	}
}

function makeCanvasPretty (context)
{
	if (typeof(context.imageSmoothingQuality) !== 'undefined')
	{
		context.imageSmoothingQuality = "high";
	}
}

var RenderStack = function ()
{
	this.elements = [];
	this.callback = null;
}

RenderStack.prototype.addElements = function (elements) {
	this.elements = this.elements.concat(elements);
}

RenderStack.prototype.addElement = function (element) {
	this.elements.push(element);
}

RenderStack.prototype.clear = function () {
	this.elements = [];
}

RenderStack.prototype.getImages = function () {
	var result = [];
	for (var i = 0; i < this.elements.length; i++)
	{
		if (this.elements[i] instanceof Shape)
		{
			result.push(this.elements[i].image);
		}
	}
	return result;
}

RenderStack.prototype.resolve = function () {
	// Resolve canvases
	var canvasMap = new Map();
	for (var i = 0; i < this.elements.length; i++)
	{
		this.elements[i].resolve(canvasMap);
	}
}

RenderStack.prototype.render = function () {

	var elements = this.elements;

	var map = elements.map(function (el, index) {
		return { index : index, value : el.zIndex };
	});

	map.sort(function (a, b) {
		return a.value - b.value;
	});

	var sortedObjects = map.map(function (el) {
		return elements[el.index];
	});

	for (var i = 0; i < sortedObjects.length; i++) {
		sortedObjects[i].draw();
	}

	if (this.callback)
	{
		this.callback();
	}
}

function loadRenderStack (renderStack) {
	var imagesToLoad = renderStack.getImages();
	var imageCount = imagesToLoad.length;
	var imagesLoaded = 0;

	renderStack.resolve();

	// Load Images
	for (var i = 0; i < imageCount; i++)
	{
		imagesToLoad[i].crossOrigin = "Anonymous";
		imagesToLoad[i].setAttribute('crossOrigin', 'anonymous');
		imagesToLoad[i].onload = function() {
			imagesLoaded++;
			if (imagesLoaded == imageCount) {
				renderStack.render();
			}
		}
	}
}

function clearCanvasFromPoint(canvasId, x, y) {
	targetCanvas = document.getElementById(canvasId);
	targetContext = targetCanvas.getContext("2d");
	targetContext.clearRect(x,y,$("#" + canvasId).width() - x,$("#" + canvasId).height() - y);
}

function clearCanvas(canvasId) {
	targetCanvas = document.getElementById(canvasId);
	targetContext = targetCanvas.getContext("2d");
	targetContext.clearRect(0,0,$("#" + canvasId).width(),$("#" + canvasId).height());
}

/*function loadShapes (shapes, texts, canvasId, callback) {
	var imageCount = shapes.length;
	var imagesLoaded = 0;
	for (var i = 0; i < imageCount; i++)
	{
		shapes[i].image.onload = function() {
			imagesLoaded++;
			if (imagesLoaded == imageCount) {
				renderCanvas(shapes, canvasId);
				renderCanvasText(texts, canvasId);
				if (callback)
				{
					callback();
				}
			}
		}
	}
}*/

/*function renderCanvas(shapes, canvas) {

	//var c = document.getElementById(canvasId);
	//var ctx = c.getContext("2d");
	//ctx.globalCompositeOperation='destination-over';

	var map = shapes.map(function (el, index) {
		return { index : index, value : el.zIndex };
	});

	map.sort(function (a, b) {
		return a.value - b.value;
	});

	var sortedObjects = map.map(function (el) {
		return shapes[el.index];
	});

	for (var i = 0; i < sortedObjects.length; i++) {
		sortedObjects[i].draw(canvas);
	}

	//setTimeout(function() { ctx.clearRect(0,0,550,695) }, 5000);
}

function renderCanvasText(textLabels, canvas)
{
	//var c = document.getElementById(canvasId);
	//var ctx = c.getContext("2d");

	var map = textLabels.map(function (el, index) {
		return { index : index, value : el.zIndex };
	});

	map.sort(function (a, b) {
		return a.value - b.value;
	});

	var sortedObjects = map.map(function (el) {
		return textLabels[el.index];
	});

	for (var i = 0; i < sortedObjects.length; i++) {
		textLabels[i].draw(canvas);
	}
}*/

/*function loadShapesUsing (shapes, texts, helperCanvas, targetCanvas, coverImage, dims) {

	var imageCountA = shapes.length;
	var imagesLoadedA = 0;
	for (var i = 0; i < imageCountA; i++)
	{
		shapes[i].image.onload = function() {
			imagesLoadedA++;
			if (imagesLoadedA == imageCountA) {				
				renderCanvas(shapes, helperCanvas);
				renderCanvasText(texts, helperCanvas);
				var c = document.getElementById(targetCanvas);
				var ctx = c.getContext("2d");
				var d = document.getElementById(helperCanvas);
				ctx.drawImage(d, dims[0], dims[1], dims[2], dims[3]);

				document.getElementById(coverImage).style.display = "none";
				c.style.display = "block";
			}
		}
	}
}*/