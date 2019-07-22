var Shape = function (x, y, z, url, width, height) {
	this.x = x;
	this.y = y;
	this.zIndex = z;
	this.width = width;
	this.height = height;
	this.image = new Image();
	this.image.src = url;
};

Shape.prototype.draw = function (ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

function loadShapes (shapes) {
	var imageCount = shapes.length;
	var imagesLoaded = 0;
	for (var i = 0; i < imageCount; i++)
	{
		shapes[i].image.onload = function() {
			imagesLoaded++;
			if (imagesLoaded == imageCount) {
				renderCanvas(shapes);
			}
		}
	}
}

function renderCanvas(shapes) {

	var c = document.getElementById("province");
	var ctx = c.getContext("2d");
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
		sortedObjects[i].draw(ctx);
	}

	setTimeout(function() { ctx.clearRect(0,0,550,695) }, 5000);
}

window.onload = function() {  

	var traits = GetTraits();

	var shapes = [
		new Shape(0, 0, 0, 'largeRectangle.png', 550, 695),
		new Shape(100, 100, 1, 'medCircle.png', 128, 128)
	];

	loadShapes(shapes);
}; 