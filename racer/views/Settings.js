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
goog.require('lime.Label');
goog.require('lime.fill.LinearGradient');
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

    this.context = context;

    var fill = new lime.fill.LinearGradient()
        .setDirection(0,0,1,1)
        .addColorStop(0,'#CCC')
        .addColorStop(0.2,'#EEE')
        .addColorStop(0.4,'#EEE')
        .addColorStop(0.6,'#CCC')
        .addColorStop(0.7,'#BBB');

    this.setFill(fill);
    this.setStroke(2, '#888');
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

    var label = new lime.Label('Select game')
        .setPosition(0,-50)
        .setFontSize(12)
    this.appendChild(label);

    var editButton = new lime.GlossyButton('Edit')
        .setSize(44,44)
        .setPosition(-50,50);
    this.appendChild(editButton);

    var raceButton = new lime.GlossyButton('Race')
        .setSize(44,44)
        .setPosition(50,50);
    this.appendChild(raceButton);

    goog.events.listen(raceButton, ["mousedown","touchstart"], this.raceTouched, true, this);
    goog.events.listen(editButton, ["mousedown","touchstart"], this.editTouched, true, this);


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
 *
 * @param {goog.events.Event} e button event
 */
racer.views.Settings.prototype.raceTouched = function(e) {
    if (e.type == 'mousedown' || e.type == 'touchstart') {
        e.swallow(['mouseup', 'touchend'], goog.partial(this.startRace,e,this), true);
    }
 };

/**
 *
 * @param {goog.events.Event} e button event
 */
racer.views.Settings.prototype.editTouched = function(e) {
    if (e.type == 'mousedown' || e.type == 'touchstart') {
        e.swallow(['mouseup', 'touchend'], goog.partial(this.startEdit, e, this), true);
    }
 };

racer.views.Settings.prototype.startRace = function(e, self) {
    self.context.editing = false;
    self.context.raceStep = 0;
    self.context.modeSignal.dispatch(self);
};

racer.views.Settings.prototype.startEdit = function(e, self) {
    self.context.editing = true;
    self.context.raceStep = 0;
    self.context.modeSignal.dispatch(self);
};
