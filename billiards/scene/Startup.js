/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 02/10/2011
 * Time: 18:07
 */
goog.provide('billiards.scene.Startup');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Label');

//uses signals
goog.require('org.maths.signals');

goog.require('billiards.Plan');

/**
 * Create the Welcome screen, and start loading resources
 * @constructor
 * @param {org.maths.signals} nextSceneSignal
 * @extends lime.Scene
 */
billiards.scene.Startup = function(nextSceneSignal) {

    this.name = "Startup";

    // call super
    lime.Scene.call(this);

    layer = new lime.Layer()


    var title = new lime.Label('The Bayes Billiard Table Problem')
        .setSize(200,2)
        .setAnchorPoint(0,0)
        .setFontSize(20)
        .setPosition(20,20);

    var backdrop = new lime.Sprite()
        .setFill('assets/startupScene.jpg')
        .setAnchorPoint(0,0);
        //.setSize(size.width, size.height)
        //.setPosition(0,0);

    var startButton = new lime.Sprite()
        .setAnchorPoint(0,0)
        .setPosition(235,-100)
        .setScale(1.33,1.33)
        .setFill('assets/bellpull/pullPull.png');

    var plan = new billiards.Plan()
        .setAnchorPoint(0,0)
        .setPosition(30, 100);

    var instruction = new lime.Label('Select or Pull')
        .setSize(200,1)
        .setAnchorPoint(0,0)
        .setFontSize(20)
        .setPosition(20,400);

    var self = this;

    goog.events.listen(startButton, ['mousedown','touchstart'], function() {
        //alert('dispatching');
        nextSceneSignal.dispatch(self.name);
    });
    
    layer.appendChild(backdrop);
    layer.appendChild(title);
    layer.appendChild(startButton);
    layer.appendChild(plan);
    layer.appendChild(instruction);

    this.appendChild(layer);


};
goog.inherits(billiards.scene.Startup, lime.Scene);



