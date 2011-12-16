//set main namespace
goog.provide('helloworld');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('Svg2Lime');
goog.require('goog.net.XhrIo');


// entrypoint
helloworld.start = function(){
	
	var director = new lime.Director(document.body,720,1004);
	var loading = new lime.Scene();
	var loadingSprite = new lime.Sprite().setFill("loading.png").setPosition(360, 502);
	loading.appendChild(loadingSprite);
	director.replaceScene(loading);

	goog.net.XhrIo.send("test.svg?df", function(event) {
		var svgDocument = event.target.getResponseXml();
		var scene = new Svg2Lime(svgDocument);
		director.replaceScene(scene);
	});

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('helloworld.start', helloworld.start);
