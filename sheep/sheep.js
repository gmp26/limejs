/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 14:35
 * To change this template use File | Settings | File Templates.
 */
// set main namespace
goog.provide('sheep');

// get requirements
goog.require('org.maths.Stage');
goog.require('sheep.scene.Layout');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.scheduleManager');

// utils
goog.require('goog.math.Size');

// signals
goog.require('org.maths.signals');

// entry point
sheep.start = function() {

    sheep.stage = new org.maths.Stage(document.body,320,480);

    sheep.stage.setDisplayFPS(false);

    // create the signal handling screen switching
    //sheep.nextSceneSignal = new org.maths.signals.Signal();
    //sheep.nextSceneSignal.add(sheep.gotoNextScene);

    // create the model and set its updated signal
    //sheep.modelUpdated = new org.maths.signals.Signal();
    //sheep.model = new sheep.Model(sheep.modelUpdated);

    // create the scenes
    sheep.scene.Layout = new sheep.scene.Layout();
    //.setSize(320,480);

	lime.scheduleManager.setDisplayRate(1000 / 60);

	sheep.stage.makeMobileWebAppCapable();

	// set current scene active
	sheep.stage.replaceScene(sheep.scene.Layout);

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('sheep.start', sheep.start);
