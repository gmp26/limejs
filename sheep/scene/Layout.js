/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */
goog.provide('sheep.scene.Layout');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.Polygon');

goog.require('org.maths.signals');
goog.require('org.maths.ui.Panel');

//goog.require('sheep.model.Context');

goog.require('lime.RoundedRect');

/**
 * @constructor
 * @extends {lime.Scene}
 */
sheep.scene.Layout = function() {

    // super
    lime.Scene.call(this);
    //goog.base(this);

    //this.context = new sheep.model.Context();

    var layer = new lime.Layer();
    this.appendChild(layer);

    this.main = new org.maths.ui.Panel()
        .setFill('#8BCB8B')
//        .setStroke(0,'#000')
        .setSize(320,320);
    layer.appendChild(this.main);

    var sheep1 = new lime.Sprite()
        .setSize(320,320)
        .setFill('assets/sheep1.png');
    this.main.appendChild(sheep1);

    this.panel1 = new org.maths.ui.Panel()
        .setFill('#6AF')
//        .setStroke(0,'#000')
        .setSize(160,160);

    var q = new lime.Label('How many sheep?')
        .setSize(120,120)
        .setFontColor('#FFF')
        .setFontSize(32);
    this.panel1.appendChild(q);

    layer.appendChild(this.panel1);

    this.panel2 = new org.maths.ui.Panel()
        .setFill('#B8D663')
//        .setStroke(0,'#000')
        .setSize(160,160);
    layer.appendChild(this.panel2);

    var nextButton = new lime.Polygon(40,0,-30,43,-30,-43)
        .setStroke(3,'#000')
        .setFill('#FFF');
    this.panel2.appendChild(nextButton);

};
goog.inherits(sheep.scene.Layout, lime.Scene);


/**
 * Set the scene size and layout content
 * @param {(goog.math.Size|number)} value Elements new size.
 * @param {number=} opt_height Optionaly use widht,height as parameter.
 * @return {sheep.scene.Layout} this scene
 */
sheep.scene.Layout.prototype.setSize = function(value, opt_height) {


    var oldSize = this.getSize();
    var size;
    if (arguments.length == 2) {
        size = new goog.math.Size(arguments[0], arguments[1]);
    }
    else {
        size = value;
    }

    // super.setSize(size)
    lime.Scene.prototype.setSize.call(this, size);
    //goog.base(this, "setSize", size);

    // setSize gets called before the constructor has finished, so need to check
    // that children exist before laying them out.
    if(goog.isDefAndNotNull(this.main)) {

        this.main.setPosition(160,160);

        var portrait = (size.height >= size.width);

        if(portrait) {
            // Portrait
            this.panel1.setPosition(80,400);
            this.panel2.setPosition(240,400);

        }
        else {
            // Landscape
            this.panel1.setPosition(400,80);
            this.panel2.setPosition(400,240);
        }

    }
    return this;
};
