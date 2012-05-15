mooRainbow
==========

![Screenshot](https://github.com/CBeloch/mooRainbow/blob/master/mooRainbow.png?raw=true)

mooRainbow is a Color-Picker which was originally written by [Djamil Legato (w00fz)](http://moorainbow.woolly-sheep.net).  
You can attach mooRainbow to any DOM Element. mooRainbow will be opened by clicking on this element.
Works with mooTools 1.3 and 1.4 (tested up to 1.4.5).

![Screenshot](https://github.com/CBeloch/mooRainbow/blob/master/screenshot.png?raw=true)

How to use
----------

Add the mooRainbow JS and CSS files to your website

	#HTML
	<link rel="stylesheet" href="Assets/mooRainbow.css" type="text/css" />
	
	<script src="Source/mooRainbow.js" type="text/javascript"></script>

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

That's it!

If you'd like to have an input with an icon to click on then you can use this type of markup (there are 2 icons: rainbow and palette included for your use)

	#HTML
	<label for="colour">Colour</label>
	<input size="7" type="text" name="colour" value="" id="colour"> 
	<img src="Assets/images/rainbow.png" alt="" width="16" height="16" class="rain" id="mooRainbow_colour">
  
	#JS
	var r = new MooRainbow('mooRainbow_colour', {
		imgPath: 'Assets/images/',
		onChange: function(color) {
			$('colour').value = color.hex;
		}
	});

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
- wheel - *allow the mousewheel to control the slider - default: false*
- startColor - *the color you want MooRainbow to start with (default: [255, 0, 0])  
	**Note**: it must be an RGB color given as array [RED, GREEN, BLUE]*
- onChange - *a function to fire when the color change*
- onComplete - *a function to fire when the color change is complete - clicked on Select*

_Credit: Palette and Rainbow icons from FamFamFam Silk icon set - http://www.famfamfam.com/lab/icons/silk/_