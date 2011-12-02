/**
 * User: gmp26
 * Date: 30/11/2011
 * Time: 13:12
 * Copyright University of Cambridge
 */
goog.provide('racer.views.Course');
goog.require('racer.model.CourseInfo');
goog.require('lime.RoundedRect');
goog.require('racer.views.TrackView');
goog.require('racer.model.Track');
goog.require('org.maths.signals');



/**
 * @constructor
 * @param {number} courseIndex - the course or arena info.
 * @param {org.maths.signals.Signal}
 */
racer.views.Course = function(courseIndex, trackUpdated) {

    // super
    goog.base(this);

    /** {racer.CourseInfo} */
    var courseInfo = racer.model.Courses[courseIndex];

    this.setFill(courseInfo.mapUrl);

    /** {org.maths.signals.Signal} */
    this.trackUpdated = trackUpdated;
    trackUpdated.add(this.updateView, this);

    // make all the trackViews
    this.trackViews = [];
    for(var i=0; i < courseInfo.colours.length; i++) {
        var trackView = new racer.views.TrackView(0, 2, null)
            .setSize(320,320);
        this.trackViews[i] = trackView;
        this.appendChild(trackView);
    }

}
goog.inherits(racer.views.Course, lime.RoundedRect);

/**
 * update view
 * @param {number} courseIndex
 * @param {number?} colourIndex
 * @param {racer.model.Track} track
 */
racer.views.Course.prototype.updateView = function(courseIndex, colourIndex, track) {
    console.log("redraw course: ", courseIndex);

    if(goog.isDefAndNotNull(colourIndex)) {
        console.log("colour: ", colourIndex);

        var trackView = this.trackViews[colourIndex];
        this.removeChild(trackView);

        trackView = new racer.views.TrackView(courseIndex, colourIndex, track)
                    .setSize(320,320);
        this.trackViews[colourIndex] = trackView;
        this.appendChild(trackView);
    }
}


