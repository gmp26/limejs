goog.provide('Svg2Lime');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('goog.net.XhrIo');
goog.require('goog.json');

Svg2Lime = function(svgDocument) {
	var scene = new lime.Scene();
	var height = Math.floor(parseFloat(svgDocument.documentElement.attributes.getNamedItem("height").textContent,10));
	var width = Math.floor(parseFloat(svgDocument.documentElement.attributes.getNamedItem("width").textContent,10));
	scene.setSize(height, width);
	for (var i = 0; i < svgDocument.documentElement.childNodes.length; i++) {
		var child = svgDocument.documentElement.childNodes.item(i);
		if (child.localName !== "g") continue;
		var layer = new lime.Layer();
		for (var j = 0; j < child.childNodes.length; j++) {
			var grandchild = child.childNodes.item(j);
			if (grandchild.localName !== "image") continue;
			var sprite = new lime.Sprite();
			var x = Math.floor(parseFloat(grandchild.attributes.getNamedItem("x").textContent,10));
			var y = Math.floor(parseFloat(grandchild.attributes.getNamedItem("y").textContent,10));
			sprite.setPosition(x, y);
			sprite.setAnchorPoint(0, 0);
			var fill = grandchild.attributes.getNamedItem("xlink:href").textContent;
			fill = fill.substring(fill.lastIndexOf("/")+1, fill.length);
			sprite.setFill(fill);
			for (var k = 0; k < grandchild.childNodes.length; k++) {
				var greatgrandchild = grandchild.childNodes.item(k);
				if (greatgrandchild.localName !== "desc") continue;	
				sprite.data = goog.json.parse(greatgrandchild.textContent);
			}
			layer.appendChild(sprite);
		}
		scene.appendChild(layer);
	}
	return scene;
}

