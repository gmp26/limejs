/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 16:01
 * Copyright University of Cambridge
 */
goog.provide('racer.views.Settings');
goog.require('racer.model.CourseInfo');
goog.require('lime.RoundedRect');
goog.require('org.maths.ui.Scroller');
goog.require('org.maths.ui.Scroller.Direction');
goog.require('org.maths.ui.ArrowSelector');
goog.require('org.maths.ui.LabelRendererFactory');
goog.require('goog.events');
goog.require('goog.ui.ComboBox');

/**
 * @constructor
 */
racer.views.Settings = function() {
    goog.base(this);

    this.setFill('#CCC');
    this.setSize(160,160);

    var courseNames = this.getCourseNames();
    var labelRenderer = new org.maths.ui.LabelRendererFactory;

    this.courseCombo = new org.maths.ui.ArrowSelector(
        this.getCourseNames(),
        labelRenderer,
        org.maths.ui.Scroller.Direction.HORIZONTAL)
        .setItemsShowing(1);
/*
    this.courseCombo = new org.maths.ui.Selector(this.getCourseNames(), labelRenderer)
        .setDirection(org.maths.ui.Scroller.Direction.VERTICAL)
        .setItemsShowing(1);
*/
    this.appendChild(this.courseCombo);
};
goog.inherits(racer.views.Settings, lime.RoundedRect);

racer.views.Settings.prototype.getCourseNames = function() {
    var info = racer.model.Courses;
    var names = [];
    for(var i=0; i < info.length; i++) {
        names[i] = info[i].name;
    }
    return names;
}