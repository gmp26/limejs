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

/**
 * A panel for changing team colour while editing team tracks
 * @param {racer.model.Context} context
 * @param {number?} opt_courseIndex
 */
racer.views.ColourSelector = function(context, opt_courseIndex) {
    // super
    goog.base(this);

    this.context = context;

    this.courseIndex = opt_courseIndex | context.courseIndex;

    /** {racer.CourseInfo} */
    var courseInfo = racer.model.Courses[this.courseIndex];

    /** {racer.ColourInfo} */
    var colourInfo = null;
    if(goog.isDefAndNotNull(courseInfo.colours) && context.colourIndex < courseInfo.colours.length) {
        colourInfo = courseInfo.colours[context.colourIndex];
    }
    else {
        return;
    }



    // Define actions for ColourSelector
    var colourChangeStarted = new org.maths.signals.Signal();
    var colourChangeEnded = new org.maths.signals.Signal();
    colourChangeStarted.add(this.startColourChange, this);
    colourChangeEnded.add(this.finishColourChange, this);

    // Create Team Colour Selector
    var colourNames = this.getCourseColours(0);
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

    // Add a track editor
    this.editor = new racer.views.Editor(this.context, this.courseIndex)
        .setPosition(0,-10)
        .setScale(0.9,0.9);
    this.appendChild(this.editor);
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
    this.context.colourChangeStarted.dispatch();
};

/**
 * colour selector has come to rest at this index
 * @param {number} index
 */
racer.views.ColourSelector.prototype.finishColourChange = function(index) {

    // TODO: create or switch the track editor
    // this.editor.changeTrack(index);

    this.context.colourChangeEnded.dispatch(index);
};