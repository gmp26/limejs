/**
 * User: gmp26
 * Date: 15/12/2011
 * Time: 12:08
 * Copyright University of Cambridge
 */
goog.provide('racer.views.ColourSelectorsView');
goog.require('racer.views.ColourSelector');
goog.require('racer.views.RacePanel');
goog.require('racer.views.Editor');
goog.require('racer.model.Context');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('lime.RoundedRect');
goog.require('lime.animation.actionManager');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Easing');

/**
 * @constructor
 * @param {racer.model.Context} context
 */
racer.views.ColourSelectorsView = function(context) {
    goog.base(this);

    var fill = new lime.fill.LinearGradient()
        .setDirection(0,0,1,1)
        .addColorStop(0,'#CCC')
        .addColorStop(0.2,'#EEE')
        .addColorStop(0.4,'#EEE')
        .addColorStop(0.6,'#CCC')
        .addColorStop(0.7,'#BBB');

    this.setFill(fill);
    this.setStroke(2, '#888');

    this.context = context;
    this.colourSelectors = [];

    this.viewContainer = new lime.Layer();
    this.appendChild(this.viewContainer);

    // make the initial screen
    for(var i = 0; i < racer.model.Courses.length; i++) {
        colourSelector = new racer.views.ColourSelector(context, i);
        this.colourSelectors[i] = colourSelector;

        // enable the current one
        if(i === context.courseIndex) {
//            colourSelector.setEnabled(true);
//            colourSelector.setOpacity(1);
            this.viewContainer.appendChild(colourSelector);
        }
//        else {
//            colourSelector.setEnabled(false);
//            colourSelector.setOpacity(0);
//        }

    }

    // add signals to change Course
    context.trackChangeStarted.add(this.startCourseSwitch, this);
    context.trackChangeEnded.add(this.finishCourseSwitch, this);

    context.modeSignal.add(this.modeChange, this);

    this.raceView = new racer.views.RacePanel(context);

};
goog.inherits(racer.views.ColourSelectorsView, lime.RoundedRect);

/**
 * fade out the old view
 */
racer.views.ColourSelectorsView.prototype.startCourseSwitch = function() {

    var index = this.context.courseIndex;
    var count = this.context.coursesData.length;
    this.old = this.colourSelectors[index];
    this.name = 'A colourSelectorsView';
    var anim = new lime.animation.FadeTo(0).setDuration(1);

    this.old.runAction(anim);

};

/**
 * pan to the new view, creating it first if need be
 * @param {number} index of course to fade in
 */
racer.views.ColourSelectorsView.prototype.finishCourseSwitch = function(index) {

    lime.animation.actionManager.stopAll(this.old);

    this.viewContainer.removeChild(this.old);

    this.context.courseIndex = index;
//    this.context.colourIndex = this.context.coursesData[index]
    this.context.colourChangeEnded.dispatch(0);

    var view = this.colourSelectors[index];
    if(!goog.isDefAndNotNull(view)) {
        console.log("BAD COURSE INDEX");
    }

    // it may be possible to delete this?
    // view.updateView(this.context);

    view.setOpacity(0);
    this.viewContainer.appendChild(view);

    lime.animation.actionManager.stopAll(this.viewContainer) ;
    anim = new lime.animation.FadeTo(1).setDuration(0.3);
    view.runAction(anim);

};

racer.views.ColourSelectorsView.prototype.modeChange = function() {
    if(this.context.editing) {
        this.appendChild(this.viewContainer);
        this.removeChild(this.raceView);
    }
    else {
        this.removeChild(this.viewContainer);
        this.appendChild(this.raceView);
    }
};
