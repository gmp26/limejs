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

    // clear all existing tracks
    // this.clearTracks(context);
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
 * clear existing drawn tracks
 * @param context
 */
racer.views.CourseView.prototype.clearTracks = function(context) {
    /*
    var len = this.trackViews.length;
    for(var i=0; i < len; i++) {
        this.removeChild(this.trackViews[i]);
    }
    this.trackViews = [];
    */
}



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

/**
 * draws one track by adding its TrackView
 * @param {number} courseIndex
 * @param {number} colourIndex
 * @param {racer.model.Track} opt_track
 */
/*
racer.views.CourseView.prototype.drawTrack = function(courseIndex, colourIndex, opt_track) {

    var trackView;

    if(goog.isDefAndNotNull(opt_track)) {

        console.log("creating TrackView:", courseIndex, colourIndex);

        // create new track
        trackView = new racer.views.TrackView(courseIndex, colourIndex, opt_track)
                .setSize(640,640);

        // save this new TrackView
        this.trackViews[colourIndex] = trackView;
    }
    else {
        // draw any existing track at colourIndex
        if(colourIndex < this.trackViews.length) {
            trackView = this.trackViews[colourIndex];
        }
    }

    if(goog.isDefAndNotNull(trackView)) {
        this.appendChild(trackView);
    }
};

*/

