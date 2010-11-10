mooRainbow
==========

mooRainbow is a Color-Picker which was originally written by [Djamil Legato (w00fz)](http://moorainbow.woolly-sheep.net).  
You can attach mooRainbow to any DOM Element. mooRainbow will be opened by clicking on this element.

![Screenshot](http://dev.cbeloch.de/mooRainbow/mooRainbow.png)

How to use
----------

Add the mooRainbow JS and CSS File to your website

	#HTML
	<link rel="stylesheet" href="Assets/mooRainbow.css" type="text/css" />
	
	<script src="js/mooRainbow.js" type="text/javascript"></script>

Now you have an input field somewhere on your website, the code could look like this:

	#HTML
	<strong>Color:</strong>
	<input type="text" id="titleColor" name="titleColor" />

To attach a mooRainbow instance to this input field, you simply use the following code:

	#JS
	var r = new MooRainbow('titleColor', {
		imgPath: 'Assets/images/', // if this value is not set, mooRainbow will search for images in images/ 
		onChange: function(color) {
			this.element.value = color.hex;
		}
	});

Thats it!

Detailed Documentation
----------------------

### Syntax:

	var myMooRainbow = new MooRainbow(element, options);

### Arguments:

1. element - *the element where you want to attach mooRainbow*
2. options - *options, see below for more details*

### Options

- id - *the id of mooRainbow (default: 'mooRainbow')  
	**Note**: every object must have an unique id.*
- prefix - *the prefix for your CSS classnames (default: 'moor-')  
	i.e.: prefix: 'moor-' => in your CSS: .moor-okButton { color: #fff; }*
- imgPath - *the path where the slider and the overlay images are contained (default: 'images/')  
	**Note**: always put the '/' at the end*
- startColor - *an array. the color you want MooRainbow starts with (default: [255, 0, 0])  
	**Note**: it must be an RGB color given as array [RED, GREEN, BLUE]*
- onChange - *a function to fire when the color change*