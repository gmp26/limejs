/**
 * User: gmp26
 * Date: 15/12/2011
 * Time: 13:30
 * Copyright University of Cambridge
 */
goog.provide('racer.views.ColourSelector');
goog.require('lime.RoundedRect');
goog.require('lime.fill.LinearGradient');
goog.require('org.maths.ui.ArrowSelector');
goog.require('org.maths.signals');
goog.require('racer.views.renderers.ColourRendererFactory');
goog.require('racer.views.Editor');

goog.require('lime.animation.actionManager');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Easing');

/**
 * A panel for changing team colour while editing team tracks
 * @param {racer.model.Context} context
 * @param {number?} opt_courseIndex
 */
racer.views.ColourSelector = function(context, courseIndex) {
    // super
    goog.base(this);

    this.context = context;

    this.courseIndex = courseIndex;

    /** {racer.CourseInfo} */
    var courseInfo = racer.model.Courses[courseIndex];

    /** {racer.ColourInfo} */
    var colourInfo = null;
    if(!goog.isDefAndNotNull(courseInfo.colours)) {
        return;
    }

    this.colourIndex = (context.colourIndex < courseInfo.colours.length) ? context.colourIndex : 0;
    colourInfo = courseInfo.colours[this.colourIndex];

    // Create all the track editors
    this.editors = [];

    for(var i = 0; i < courseInfo.colours.length; i++) {
        var editor = new racer.views.Editor(this.context, courseIndex, i)
                .setPosition(0,-10)
                .setScale(0.9,0.9);
        this.editors[i] = editor;
        if(i === this.colourIndex) {
            this.editor = editor;
            this.appendChild(editor);
        }
    }

    // Define actions for ColourSelector
    var colourChangeStarted = new org.maths.signals.Signal();
    var colourChangeEnded = new org.maths.signals.Signal();

    // Create Team Colour Selector
    var colourNames = this.getCourseColours(courseIndex);
    var colourRenderer = new racer.views.renderers.ColourRendererFactory;
    this.colourCombo = new org.maths.ui.ArrowSelector(
        colourNames,
        colourRenderer,
        1,
        org.maths.ui.Scroller.Direction.HORIZONTAL,
        colourChangeStarted,
        colourChangeEnded
    ).setItemsShowing(1)
     .setPosition(0,-60);
    this.appendChild(this.colourCombo);

    colourChangeStarted.add(this.startColourChange, this);
    colourChangeEnded.add(this.finishColourChange, this);


};
goog.inherits(racer.views.ColourSelector, lime.RoundedRect);

/**
 * get the team colours for a course
 * @param {number} courseIndex
 * @return {Array.<string>} colours in use
 */
racer.views.ColourSelector.prototype.getCourseColours = function(courseIndex) {
    var course = racer.model.Courses[courseIndex];
    var colours = [];
    for(var i=0; i < course.colours.length; i++) {
        colours[i] = course.colours[i].colour;
    }
    return colours;
};


/**
 * colour selector has started to move
 */
racer.views.ColourSelector.prototype.startColourChange = function() {

    var anim = new lime.animation.FadeTo(0).setDuration(1);
    this.editor.runAction(anim);

    this.context.colourChangeStarted.dispatch();
};

/**
 * colour selector has come to rest at this index
 * @param {number} index
 */
racer.views.ColourSelector.prototype.finishColourChange = function(index) {

    anim = new lime.animation.FadeTo(1).setDuration(0.3);

    var editor = this.editors[index];
    lime.animation.actionManager.stopAll(this.editor);
    if(this.editor === editor) {
        editor.setOpacity(1);
        return;
    }

    this.removeChild(this.editor);

    this.editor = editor;
    editor.setOpacity(0);
    this.appendChild(editor)

    editor.runAction(anim);

    this.context.colourChangeEnded.dispatch(index);
};