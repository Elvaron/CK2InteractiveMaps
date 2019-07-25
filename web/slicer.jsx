// Alter these as needed
var cellWidth         = 256; // The width, in px, of your image cell
var cellHeight        = 256; // The height, in px, of your image cell
var xOffset           = 0; // The space, in px, between each cell in a row
var yOffset           = 0; // The space, in px, between each row. Set to 0 for traditional checker board effect
var options           = new ExportOptionsSaveForWeb();
    options.format    = SaveDocumentType.PNG;
    options.quality   = 100;

// Don't change these unless you know why you should! :)
var doc               = app.activeDocument;
var dname             = doc.name.substr(0,doc.name.length-4);
var dir               = doc.path.toString()+"/";
var rowShift          = true;
var imageWidth        = activeDocument.width.as('px');
var imageHeight       = activeDocument.height.as('px');

// Store the current rulerUnits for later. We're going to change
// it to pixels for now, and we want to change it back later.
var myRulerUnits = app.preferences.rulerUnits;

// Set rulerUnits to pixels
app.preferences.rulerUnits = Units.PIXELS;

// Find the "Background"
var layerRef = doc.artLayers.getByName("Background");

// Set our "Background" to be a Layer
layerRef.isBackgroundLayer = false;

// Reduce the Canvas size to our cell size
doc.resizeCanvas(cellWidth, cellHeight, AnchorPosition.TOPLEFT);

var totalOffset = 0;
var xMovement = 0;

// Do the magic
for (var y = 0; y < numberOfRows(); y++)
{
    totalOffset = 0;

    for (var x = 0; x < numberOfCells(); x++)
    {
        if (x == 0)
        {
            xMovement = (rowShift) ? xOffset : 0;
        }
        else
        {
            xMovement = cellWidth + xOffset;
        }

        totalOffset += xMovement;

        // Offset the layer into our Canvas "window"
        layerRef.applyOffset(-(xMovement), 0, OffsetUndefinedAreas.WRAPAROUND);

        saveCell(x,y);
    };

    // Offset the layer back to the left and down one row
    layerRef.applyOffset(totalOffset, -(cellHeight + yOffset), OffsetUndefinedAreas.WRAPAROUND);

    // Flip the rowShift. If it was true, make it false and vice versa.
    rowShift = !rowShift;
};

// Calculate number of cells per row. May change depending in rowShift, etc
function numberOfCells()
{
    var theWidth = imageWidth;

    if (rowShift == true)
    {
        var theWidth = theWidth - xOffset; 
    }
    return Math.floor((theWidth + xOffset) / (cellWidth + xOffset));
}

// Calculate number of rows
function numberOfRows()
{
    return Math.floor((imageHeight + yOffset) / (cellHeight + yOffset));
}

// Pad the cell x and y numbers for proper sorting
function pad(num, size)
{
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

// Actually save, or really "Save For Web" the cell
function saveCell(x, y)
{
    var nname = dname + "_" + (x + 0) + "_" + (y + 0);

    doc.exportDocument (new File(dir + "/" + nname + ".png"), ExportType.SAVEFORWEB, options);
}

// Reset the ruler units
app.preferences.rulerUnits = myRulerUnits;