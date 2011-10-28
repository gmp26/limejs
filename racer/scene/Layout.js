/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */
goog.provide('racer.scene.Layout')

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.scheduleManager');

goog.require('goog.events');
goog.require('goog.dom');
goog.require('goog.dom.ViewportSizeMonitor');

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

    this.orientation = 0;

    goog.events.listen(this, ["mousedown"], this.orientationChange_);

    var vsm = new goog.dom.ViewportSizeMonitor();
    goog.events.listen(vsm, goog.events.EventType.RESIZE,
        this.resizeHandler, false, this);

    goog.events.listen(goog.global, 'orientationchange',
        this.orientationChange_, false, this);


};
goog.inherits(racer.scene.Layout, lime.Scene);

racer.scene.Layout.prototype.orientationChange_ = function(event) {

    var stage = this.getDirector();

    if(goog.isNull(stage)) {
        return;
    }

    //alert("Hi");
    /*
    this.orientation += 90;
    if (this.orientation > 180) this.orientation -= 360;
    if (this.orientation < -180) this.orientation += 360;
    */

    if(goog.isDefAndNotNull(goog.global.orientation)) {
        var orientation = goog.global.orientation;

        if(orientation === 0 || orientation === 180) {
            // Portrait
            //stage.setSize(320,480);
            this.setSize(320,480);
            this.goPortrait(stage);
        }
        else {
            // Landscape
            //stage.setSize(480,320);
            this.setSize(480,320);
            this.goLandscape(stage);
        }
    }
}


/**
 *
 * @param {lime.Director} stage
 */
racer.scene.Layout.prototype.goLandscape = function(stage) {
    // Landscape
    //alert("" + this.getDirector().getSize().width + " " + this.getDirector().getSize().height);
    this.main.setPosition(160,160);
    this.control1.setPosition(400,80);
    this.control2.setPosition(400,240);
    stage.invalidateSize_();
};

/**
 *
 * @param {lime.Director} stage
 */
racer.scene.Layout.prototype.goPortrait = function(stage) {
    //alert("" + this.getDirector().getSize().width + " " + this.getDirector().getSize().height);
    this.main.setPosition(160,160);
    this.control1.setPosition(80,400);
    this.control2.setPosition(240,400);
    stage.invalidateSize_();
};

racer.scene.Layout.prototype.resizeHandler = function(event) {

    var stage = this.getDirector();

    if(goog.isNull(stage)) {
        return;
    }

    var stageSize = goog.style.getSize(this.domElement.parentNode);

    if (this.domElement.parentNode == document.body) {
        window.scrollTo(0, 0);
        if (goog.isNumber(window.innerHeight)) {
            stageSize.height = window.innerHeight;
        }
    }

    var portrait = stageSize.height >= stageSize.width;
    var size = this.getSize();
    if(portrait && size.width > size.height) {
        // Portrait
        //stage.setSize(320,480);
        this.setSize(320,480);
        this.goPortrait(stage);
    }
    else {
        // Landscape
        //stage.setSize(480,320);
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

