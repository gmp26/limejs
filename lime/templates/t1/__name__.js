/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 14:35
 * To change this template use File | Settings | File Templates.
 */
// set main namespace
//goog.provide('{name}');

// get requirements
goog.require('org.maths.Stage');
goog.require('{name}.scene.Layout');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.scheduleManager');

// utils
goog.require('goog.math.Size');

// signals
goog.require('org.maths.signals');

// entry point
{name}.start = function() {

    {name}.stage = new org.maths.Stage(document.body,320,480);

    {name}.stage.setDisplayFPS(false);

    // create the signal handling screen switching
    //{name}.nextSceneSignal = new org.maths.signals.Signal();
    //{name}.nextSceneSignal.add({name}.gotoNextScene);

    // create the model and set its updated signal
    {name}.modelUpdated = new org.maths.signals.Signal();
    //{name}.model = new {name}.Model({name}.modelUpdated);

    // create the scenes
    {name}.scene.Layout = new {name}.scene.Layout();
    //.setSize(320,480);

	lime.scheduleManager.setDisplayRate(1000 / 60);

	{name}.stage.makeMobileWebAppCapable();

	// set current scene active
	{name}.stage.replaceScene({name}.scene);

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('{name}.start', {name}.start);
