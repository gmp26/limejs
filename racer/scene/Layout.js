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

goog.require('org.maths.Panel');


/**
 * @constructor
 */
racer.scene.Layout = function() {

    // super
    goog.base(this);
//    lime.Scene.call(this);

    var layer = new lime.Layer();
    this.appendChild(layer);

    this.main = new org.maths.Panel("MAIN")
        .setSize(320,320)
        .setFill('#C04')
//        .setPosition(160,160)
        .setRadius(10);
    layer.appendChild(this.main);

    this.control1 = new org.maths.Panel("CTRL1")
        .setSize(160,160)
        .setFill('#4C0')
//        .setPosition(80,400)
        .setRadius(10);
    layer.appendChild(this.control1);

    this.control2 = new org.maths.Panel("CTRL2")
        .setSize(160,160)
        .setFill('#06E')
//        .setPosition(240,400)
        .setRadius(10);
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
            this.control1.runAction(new lime.animation.MoveTo(80,400));
            this.control2.runAction(new lime.animation.MoveTo(240,400));
            /*
            this.control1.setPosition(80,400);
            this.control2.setPosition(240,400);
            */
        }
        else {
            // Landscape
            this.control1.runAction(new lime.animation.MoveTo(400,80));
            this.control2.runAction(new lime.animation.MoveTo(400,240));
            //this.control1.setPosition(400,80);
            //this.control2.setPosition(400,240);
        }
    }
    return this;
}


/**
 * this code has move to org.maths.Stage
 *
 * @param {lime.Director} stage
 *
racer.scene.Layout.prototype.goLandscape = function() {
    // Landscape
    //alert("" + this.getDirector().getSize().width + " " + this.getDirector().getSize().height);
    this.main.setPosition(160,160);
    this.control1.setPosition(400,80);
    this.control2.setPosition(400,240);
};

/**
 *
 * @param {lime.Director} stage
 *

racer.scene.Layout.prototype.goPortrait = function() {
    //alert("" + this.getDirector().getSize().width + " " + this.getDirector().getSize().height);
    this.main.setPosition(160,160);
    this.control1.setPosition(80,400);
    this.control2.setPosition(240,400);
};


racer.scene.Layout.prototype.orientationChange_ = function(event) {

    var stage = this.getDirector();

    if(goog.isNull(stage)) {
        return;
    }

    if(goog.isDefAndNotNull(goog.global.orientation)) {
        var orientation = goog.global.orientation;

        if(orientation === 0 || orientation === 180) {
            // Portrait
            stage.setSize(320,480);
            this.setSize(320,480);
            this.goPortrait(stage);
        }
        else {
            // Landscape
            stage.setSize(480,320);
            this.setSize(480,320);
            this.goLandscape(stage);
        }
    }
}

racer.scene.Layout.prototype.resizeHandler = function(event) {

    var stage = this.getDirector();

    //alert("resizeHandler");

    if(goog.isNull(stage)) {
        return;
    }

    var stageSize = goog.style.getSize(stage.domElement.parentNode);

    if (this.domElement.parentNode == document.body) {
        window.scrollTo(0, 0);
        if (goog.isNumber(window.innerHeight)) {
            stageSize.height = window.innerHeight;
        }
    }

    var portrait = (stageSize.height >= stageSize.width);
    var size = stage.getSize();
    if(portrait && size.height < size.width) {
        // Portrait
        stage.setSize(320,480);
        this.setSize(320,480);
        this.goPortrait(stage);
    }
    else if(!portrait && size.height >= size.width) {
        // Landscape
        stage.setSize(480,320);
        this.setSize(480,320);
        this.goLandscape(stage);
    }

}

racer.scene.Layout.prototype.wasAddedToTree = function() {
    // call super
    goog.base(this, 'wasAddedToTree');

    // setup for current orientation
    if(goog.isDefAndNotNull(goog.global.orientation)) {
        this.orientationChange_();
    }
    else {
        this.resizeHandler();
    }
}
*/

