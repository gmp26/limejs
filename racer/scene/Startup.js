/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 14:39
 * To change this template use File | Settings | File Templates.
 */

goog.provide('racer.scene.Startup');
goog.require('racer.scene.Layout');

//goog.require('racer')

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Label');

//uses signals
goog.require('org.maths.signals');


/**
 * Create the Welcome screen, and start loading resources
 * @constructor
 * @param {org.maths.signals.Signal} nextSceneSignal
 * @extends lime.Scene
 */
racer.scene.Startup = function(nextSceneSignal) {

    this.name = "Startup";

    // call super
    lime.Scene.call(this);

    layer = new lime.Layer();

    var background = new lime.Sprite()
        .setFill('#EEA')
        .setPosition(160,240)
        .setSize(480,480);
    layer.appendChild(background);

    var title = new lime.Label('Racer')
        .setFontSize(24)
        .setPosition(160,130);
    layer.appendChild(title);

    var startButton = new lime.GlossyButton("Start")
        .setSize(200,50)
        .setPosition(160, 190)
        .setColor('#88AA00');
    startButton.upstate.label.setFontColor('#FFF');
    startButton.downstate.label.setFontColor('#FFF');
    layer.appendChild(startButton);

    this.appendChild(layer);

    goog.events.listen(startButton, ["click", "touchstart"], this.gotoLayout)


};
goog.inherits(racer.scene.Startup, lime.Scene);


racer.scene.Startup.prototype.gotoLayout = function(event) {
    racer.stage.replaceScene(new racer.scene.Layout());
}
