How to slice:
Take your map at your maximum available resolution and scale it to a multiple of 256 (so e.g. 9984 for a 10000px wide map).
For each smaller zoom level you need to make the image size exactly half (so 4992 for a 9984 wide max zoom level) then pad it to the next full multiple of 256.
E.g. 4992 divided by 256 is 19.5, next full integer is 20, 20 * 256 = 5120. Make sure you only add padding to the right and bottom of your map, your topleft position should stay as it is.
In most cases, you're just adding transparent pixels to the right and bottom. Don't let this step rescale your map.

Save your map before you continue.

The slicer.jsx is a script for photoshop (goes into Photoshop installation folder/Presets/Scripts or in your documents if you have a scripts folder there, when in doubt use a search engine of choice).
It expects the layer you want to be sliced to be named "Background" and no other layer to exist with the name "Background". It will split the image into tiles 256x256 in size, just like leaflet wants it.
0_0.png will be the topleft, with the way it's currently configured you don't have to rename any files.
Make sure you don't overwrite things though, and don't save the state of the map once the slicer has run (it takes a few minutes) since it'll fuck up your document.