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
racer.views.CourseView = function(context) {

    // super
    goog.base(this);

    /** {number} */
    this.courseIndex = context.courseIndex;

    /** {racer.model.Context} */
    this.context = context;

    /** {racer.CourseInfo} */
    this.courseInfo = racer.model.Courses[this.courseIndex];

    this.setFill(this.courseInfo.mapUrl);

    // update the course view when the track needs refreshing
    context.trackUpdated.add(this.updateView, this);

    // make all the trackViews
    this.trackViews = [];
    var len = this.courseInfo.colours.length;
    for(var i=0; i < len; i++) {
        var trackView = new racer.views.TrackView(0, 2, null)
            .setSize(320,320);
        this.trackViews[i] = trackView;
        this.appendChild(trackView);
    }

}
goog.inherits(racer.views.CourseView, lime.RoundedRect);

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

    // clear all existing tracks
    this.clearTracks(context);

    if(context.colourIndex >= 0) {
        // draw one track only
        console.log("colour: ", context.colourIndex);
        this.drawTrack(this.courseIndex, context.colourIndex, track);
    }
    else {
        // draw all existing tracks
        var len = this.trackViews.length;
        for(var i = 0; i < len; i++) {
            this.drawTrack(this.courseIndex, i);
        }
    }
};

/**
 * clear existing drawn tracks
 * @param context
 */
racer.views.CourseView.prototype.clearTracks = function(context) {
    var len = this.trackViews.length;
    for(var i=0; i < len; i++) {
        this.removeChild(this.trackViews[i]);
    }
    this.trackViews = [];
}


/**
 * draws one track by adding its TrackView
 * @param {number} courseIndex
 * @param {number} colourIndex
 * @param {racer.model.Track} opt_track
 */
racer.views.CourseView.prototype.drawTrack = function(courseIndex, colourIndex, opt_track) {

    var trackView;

    if(goog.isDefAndNotNull(opt_track)) {

        // create new track
        trackView = new racer.views.TrackView(courseIndex, colourIndex, opt_track)
                .setSize(320,320);

        // save this new TrackView
        this.trackViews[colourIndex] = trackView;
    }
    else {
        // draw existing track at colourIndex
        trackView = this.trackViews[colourIndex];
    }

    this.appendChild(trackView);
};




