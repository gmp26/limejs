/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 16:01
 * Copyright University of Cambridge
 */
goog.provide('racer.views.Settings');
goog.require('racer.model.Context');
goog.require('racer.model.CourseInfo');
goog.require('lime.RoundedRect');
goog.require('org.maths.ui.Scroller');
goog.require('org.maths.ui.Scroller.Direction');
goog.require('org.maths.ui.ArrowSelector');
goog.require('org.maths.ui.LabelRendererFactory');
goog.require('racer.views.renderers.ColourRendererFactory');
goog.require('org.maths.signals');
goog.require('goog.events');

/**
 * @param {racer.model.Context} context
 * @constructor
 */
racer.views.Settings = function(context) {
    goog.base(this);

    this.setFill('#CCC');
    this.setSize(160,160);

    // Create Course Selector
    var courseNames = this.getCourseNames();
    var labelRenderer = new org.maths.ui.LabelRendererFactory;

    this.courseCombo = new org.maths.ui.ArrowSelector(
            courseNames,
            labelRenderer,
            1,
            org.maths.ui.Scroller.Direction.HORIZONTAL,
            context.trackChangeStarted,
            context.trackChangeEnded
    ).setItemsShowing(1)
     .setPosition(0,-12);

    this.appendChild(this.courseCombo);

    // Create Team Colour Selector
    var colourNames = this.getCourseColours(0);
    var colourRenderer = new racer.views.renderers.ColourRendererFactory;
    this.colourCombo = new org.maths.ui.ArrowSelector(
        colourNames,
        colourRenderer,
        1,
        org.maths.ui.Scroller.Direction.HORIZONTAL,
        context.colourChangeStarted,
        context.colourChangeEnded
    ).setItemsShowing(1)
     .setPosition(0,13);
    this.appendChild(this.colourCombo);
};
goog.inherits(racer.views.Settings, lime.RoundedRect);

/**
 * @return Array.<string>
 */
racer.views.Settings.prototype.getCourseNames = function() {
    var info = racer.model.Courses;
    var names = [];
    for(var i=0; i < info.length; i++) {
        names[i] = info[i].name;
    }
    return names;
};

/**
 * get the team colours for a course
 * @param {number} courseIndex
 * @return {Array.<string>} colours in use
 */
racer.views.Settings.prototype.getCourseColours = function(courseIndex) {
    var course = racer.model.Courses[courseIndex];
    var colours = [];
    for(var i=0; i < course.colours.length; i++) {
        colours[i] = course.colours[i].colour;
    }
    return colours;
}