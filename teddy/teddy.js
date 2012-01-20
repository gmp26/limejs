/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 14:35
 * To change this template use File | Settings | File Templates.
 */
// set main namespace
goog.provide('teddy');

// get requirements
goog.require('org.maths.Stage');
goog.require('teddy.scene.Layout');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.scheduleManager');

// utils
goog.require('goog.math.Size');

// signals
goog.require('org.maths.signals');

// entry point
teddy.start = function() {

    teddy.stage = new org.maths.Stage(document.body,320,480);

    teddy.stage.setDisplayFPS(false);

    // create the signal handling screen switching
    //teddy.nextSceneSignal = new org.maths.signals.Signal();
    //teddy.nextSceneSignal.add(teddy.gotoNextScene);

    // create the model and set its updated signal
    teddy.modelUpdated = new org.maths.signals.Signal();
    //teddy.model = new teddy.Model(teddy.modelUpdated);

    // create the scenes
    teddy.scene = new teddy.scene.Layout();
    //.setSize(320,480);

	lime.scheduleManager.setDisplayRate(1000 / 60);

	teddy.stage.makeMobileWebAppCapable();

	// set current scene active
	teddy.stage.replaceScene(teddy.scene);

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('teddy.start', teddy.start);
