function MapData(name, titleId) {
	this.name = name;
	this.title = titleId;
	this.position = [0,0];
	this.boundaryShape = [];
	this.strokeOpacity = 1.0;
	this.strokeColor = "white";
	this.fillOpacity = 0.4;
	this.fillColor = "black";
	this.group = "";
	this.stackSize = 1;
	this.imageUrl = "";
}

MapData.prototype.IsMarker = function () {
	return this.position[0] != 0 || this.position[1] != 0;
}

MapData.prototype.GetMarkerPosition = function () {
	return getPos(this.position[0], this.position[1]);
}

MapData.prototype.IsPolygon = function () {
	return this.boundaryShape.length > 0;
}

MapData.prototype.GetImageUrl = function () {
	if (this.hasOwnProperty('imageUrl'))
	{
		return this.imageUrl;
	}

	return "";
}

MapData.prototype.GetBoundaryPositions = function () {
	if (this.hasOwnProperty('stackSize') && this.stackSize > 1)
	{
		var result = [];

		for (var it = 0; it < this.boundaryShape.length; it++)
		{
			result.push( this.GetBoundaryPositionsFromPositionArray(this.boundaryShape[it]) );
		}

		return result;
	}

	return this.GetBoundaryPositionsFromPositionArray(this.boundaryShape);	
}

MapData.prototype.GetBoundaryPositionsFromPositionArray = function (array) {
	var result = [];
	for (var it = 0; it < array.length; it++)
	{
		result.push(getPos(array[it][0], array[it][1]));
	}
	return result;
}