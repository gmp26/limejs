/**
 * User: gmp26
 * Date: 30/11/2011
 * Time: 13:12
 * Copyright University of Cambridge
 */
goog.provide('racer.views.CourseView');
goog.require('racer.model.Context');
goog.require('racer.model.CourseInfo');
goog.require('lime.RoundedRect');
goog.require('lime.scheduleManager');
goog.require('racer.views.TrackView');
goog.require('racer.model.Track');
goog.require('org.maths.signals');


/**
 * ViewController for a Race Course on the screen.
 * @constructor
 * @param {racer.model.Context} context
 */
racer.views.CourseView = function(context, opt_courseIndex) {

    // super
    goog.base(this);

    this.courseIndex = opt_courseIndex || context.courseIndex;

    /** {racer.model.Context} */
    this.context = context;

    /** {racer.CourseInfo} */
    this.courseInfo = racer.model.Courses[this.courseIndex];

    this.setFill(this.courseInfo.mapUrl);

    // create TrackViews when necessary
    context.trackCreated.add(this.createTrackView, this);

    // update the course view when the track needs refreshing
    context.trackUpdated.add(this.updateView, this);

    this.trackViews = [];

    context.colourChangeEnded.add(this.updateView, this);

    context.raceStarted.add(this.raceStarted, this);

    context.raceEnded.add(this.raceEnded, this);

}
goog.inherits(racer.views.CourseView, lime.RoundedRect);


/**
 * Create a new track view
 * @param {number} courseIndex
 * @param {number} colourIndex
 * @param {racer.model.Track} track
 */
racer.views.CourseView.prototype.createTrackView = function(courseIndex, colourIndex, track) {

    if(this.courseIndex != courseIndex)
        return;

    // Check we haven't already created this trackView
    console.log("createTrackView: ", courseIndex, colourIndex, track.trackIndex);

    if(colourIndex < this.trackViews.length && goog.isDefAndNotNull(this.trackViews[colourIndex])) {
        return;
    }

    // Create the track
    var trackView = new racer.views.TrackView(courseIndex, colourIndex, track)
            .setSize(640,640);

    // save this new TrackView
    this.trackViews[colourIndex] = trackView;

    // add to stage
    this.appendChild(trackView);

}


/**
 * update view
 * @param {racer.model.Context} context
 * @param {racer.model.Track} track
 */
racer.views.CourseView.prototype.updateView = function(context, track) {

    // Update this course view only if this is the currently displayed course
    if(context.courseIndex != this.courseIndex) {
        return;
    }

    console.log("redraw course: ", this.courseIndex);

    /** number */
    var i,len;

    if(context.editing) {
        // draw only the current track
        /** {number} */
        len = this.trackViews.length;
        for(i = 0; i < len; i++) {
            this.trackViews[i].setHidden(i != context.getColourIndex());
        }
        this.drawTrack(this.courseIndex, context.getColourIndex());
    }
    else {
        // update all existing tracks
        len = this.trackViews.length;
        for(var i = 0; i < len; i++) {
            this.drawRace(this.courseIndex, i, context.raceStep);
        }
    }

};


/**
 * draws one track by adding its TrackView
 * @param {number} courseIndex
 * @param {number} colourIndex
 * @param {racer.model.Track} opt_track
 */
racer.views.CourseView.prototype.drawTrack = function(courseIndex, colourIndex) {


    var trackView = null;
    if(colourIndex < this.trackViews.length) {
        trackView = this.trackViews[colourIndex];
    }

    if(goog.isDefAndNotNull(trackView)) {
        trackView.updateView(null);
    }
};

/**
 * draws a track up to the current raceStep
 * @param {number} courseIndex
 * @param {number} colourIndex
 * @param {number} raceStep
 */
racer.views.CourseView.prototype.drawRace = function(courseIndex, colourIndex, raceStep) {

    var trackView = this.trackViews[colourIndex];

    if(goog.isDefAndNotNull(trackView)) {
        trackView.updateView(raceStep);
    }
};

racer.views.CourseView.prototype.raceStarted = function() {
    //todo
    this.raceIndex = 0;
    lime.scheduleManager.scheduleWithDelay(this.raceStep, this, 500);
}

racer.views.CourseView.prototype.raceEnded = function() {
    //todo
    if(this.context.courseIndex != this.courseIndex)
        return;

    console.log('raceEnded')
}


racer.views.CourseView.prototype.raceStep = function() {
    if(this.context.courseIndex != this.courseIndex)
        return;

    var allDone = true;
    var tracks = this.trackViews.length;
    for(var colourIndex = 0; colourIndex < tracks; colourIndex++) {
        var trackView = this.trackViews[colourIndex];
        trackView.setHidden(false);
        var trackLen = trackView.track.getTrackLength();
        if(this.raceIndex <= trackLen) {
            allDone = false;
            console.log("racing course:",this.courseIndex, "colour:", colourIndex, "step:", this.raceIndex);
            this.drawRace(this.courseIndex, colourIndex, this.raceIndex);
        }
    }
    this.raceIndex++;

    if(allDone) {
        lime.scheduleManager.unschedule(racer.views.CourseView.prototype.raceStep, this);
        this.context.raceEnded.dispatch();
    }
}