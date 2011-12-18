/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */
goog.provide('racer.scene.Layout')

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.animation.MoveTo');

goog.require('org.maths.signals');
goog.require('org.maths.Panel');
goog.require('org.maths.signals');

goog.require('racer.model.Context');
goog.require('racer.views.Settings');
goog.require('racer.views.ColourSelectorsView');
goog.require('racer.views.CoursesView');
goog.require('goog.math.Vec2');


/**
 * @constructor
 */
racer.scene.Layout = function() {

    // super
    goog.base(this);

    this.context = new racer.model.Context();

    var layer = new lime.Layer();
    this.appendChild(layer);

    this.main = new racer.views.CoursesView(this.context)
        .setSize(320,320)
        .setRadius(5);
    layer.appendChild(this.main);

    this.settings = new racer.views.Settings(this.context)
        .setSize(160,160)
        .setRadius(5);
    layer.appendChild(this.settings);

    //TODO: Work out why we get -moz-transform errors


    this.colourSelectors = new racer.views.ColourSelectorsView(this.context)
        .setSize(160,160)
        .setRadius(5);
    layer.appendChild(this.colourSelectors);

};
goog.inherits(racer.scene.Layout, lime.Scene);


/**
 * Set the scene size and layout content
 * @param {(goog.math.Size|number)} value Elements new size.
 * @param {number=} opt_height Optionaly use widht,height as parameter.
 * @return {racer.scene.Layout} this scene
 */
racer.scene.Layout.prototype.setSize = function(value, opt_height) {

    var oldSize = this.getSize();
    var size;
    if (arguments.length == 2) {
        size = new goog.math.Size(arguments[0], arguments[1]);
    }
    else {
        size = value;
    }

    // super.setSize(size) 
    goog.base(this, "setSize", size);


    // setSize gets called before the constructor has finished, so need to check
    // that children exist before laying them out.
    if(goog.isDefAndNotNull(this.main)) {

        this.main.setPosition(160,160);

        var portrait = (size.height >= size.width);

        if(portrait) {
            // Portrait
            this.settings.setPosition(80,400);
            this.colourSelectors.setPosition(240,400);

        }
        else {
            // Landscape
            this.settings.setPosition(400,80);
            this.colourSelectors.setPosition(400,240);
        }

    }
    return this;
};

/**
 * Respond to a track changed signal
 * @param {number} selectedIndex
 * @param {object} selectedItem
 */
racer.scene.Layout.prototype.trackChangeStarted = function() {
    console.log("track change started ");
}

/**
  * Respond to a track changed signal
  * @param {number} selectedIndex
  * @param {object} selectedItem
  */
 racer.scene.Layout.prototype.trackChangeStopped = function() {
     console.log("track change stopped ");
 }