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
goog.require('racer.views.Editor');
goog.require('racer.views.Course');
goog.require('goog.math.Vec2');


/**
 * @constructor
 */
racer.scene.Layout = function() {

    // super
    goog.base(this);

    /** {org.maths.signals.Signal} */
    this.trackUpdated = new org.maths.signals.Signal();

    var layer = new lime.Layer();
    this.appendChild(layer);

    this.main = new racer.views.Course(0, this.trackUpdated)
        .setSize(320,320)
        .setRadius(5);
    layer.appendChild(this.main);

    this.control1 = new org.maths.Panel("CTRL1")
        .setSize(160,160)
        .setFill('#4C0')
        .setRadius(5);
    layer.appendChild(this.control1);

    this.control2 = new racer.views.Editor(0,2, this.trackUpdated)
        .setSize(160,160)
        .setRadius(5);
    layer.appendChild(this.control2);

//    this.orientation = 0;

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
            //this.control1.runAction(new lime.animation.MoveTo(80,400));
            //this.control2.runAction(new lime.animation.MoveTo(240,400));

            this.control1.setPosition(80,400);
            this.control2.setPosition(240,400);

        }
        else {
            // Landscape
            //this.control1.runAction(new lime.animation.MoveTo(400,80));
            //this.control2.runAction(new lime.animation.MoveTo(400,240));
            this.control1.setPosition(400,80);
            this.control2.setPosition(400,240);
        }
    }
    return this;
}
