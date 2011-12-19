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

};
goog.inherits(racer.scene.Startup, lime.Scene);


racer.scene.Startup.prototype.setup = function() {
    var layer = new lime.Layer();

    var stage = this.getDirector();
    var stageSize = stage.getSize();

    var fill = new lime.fill.LinearGradient()
        .setDirection(0,0,1,1)
        .addColorStop(0,'#CCC')
        .addColorStop(0.2,'#EEE')
        .addColorStop(0.4,'#EEE')
        .addColorStop(0.6,'#CCC')
        .addColorStop(0.7,'#BBB');

    var background = new lime.Sprite()
        .setFill(fill)
        .setPosition(160,240)
        .setSize(480,480);
    layer.appendChild(background);

    var title = new lime.Label('Racer')
        .setFontSize(24)
        .setPosition(160,100);
    layer.appendChild(title);

    var startButton = new lime.GlossyButton("Start")
        .setSize(200,50)
        .setPosition(160, 160)
        .setColor('#88AA00');
    startButton.upstate.label.setFontColor('#FFF');
    startButton.downstate.label.setFontColor('#FFF');
    layer.appendChild(startButton);

    this.appendChild(layer);

    goog.events.listen(startButton, ["click", "touchstart"], this.gotoLayout)

}

racer.scene.Startup.prototype.gotoLayout = function(event) {
    racer.stage.replaceScene(new racer.scene.Layout());
}
