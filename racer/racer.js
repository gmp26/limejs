/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 14:35
 * To change this template use File | Settings | File Templates.
 */
// set main namespace
goog.provide('racer');

// get requirements
goog.require('org.maths.Stage');

// app requirements
//goog.require('racer.Model');

// app scenes
goog.require('racer.scene.Startup');


goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
goog.require('lime.scheduleManager');

goog.require('lime.GlossyButton')

// animations
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Animation');
goog.require('lime.animation.Easing');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.ColorTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.Event');

// transitions
goog.require('lime.transitions.SlideInUp');
//goog.require('lime.transitions.SlideInDown');
//goog.require('lime.transitions.SlideInLeft');
goog.require('lime.transitions.Dissolve');


// utils
goog.require('goog.debug');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.math.Size');


// signals
goog.require('org.maths.signals');

// entry point
racer.start = function() {

    racer.stage = new org.maths.Stage(document.body,320,480);//, 320, 480);

    racer.stage.setDisplayFPS(false);

    // create the signal handling screen switching
    racer.nextSceneSignal = new org.maths.signals.Signal();
    racer.nextSceneSignal.add(racer.gotoNextScene);

    // create the model and set its updated signal
    racer.modelUpdated = new org.maths.signals.Signal();
    //racer.model = new racer.Model(racer.modelUpdated);

    // create the scenes
    racer.scene1 = new racer.scene.Startup(racer.nextSceneSignal);

    //racer.scene2 = new racer.scene.BilliardTable(racer.nextSceneSignal, racer.modelUpdated);
    //racer.scene3 = new racer.scene.BackRoom(racer.nextSceneSignal, racer.modelUpdated);

	lime.scheduleManager.setDisplayRate(1000 / 60);

	racer.stage.makeMobileWebAppCapable();

	// set current scene active
	racer.stage.replaceScene(racer.scene1);
    racer.scene1.setup();

}

/**
 * Go to next scene
 * @param {string} lastScene name
 */
racer.gotoNextScene = function(lastScene) {
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('racer.start', racer.start);
