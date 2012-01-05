/**
 * User: gmp26
 * Date: 09/12/2011
 * Time: 21:54
 * Copyright University of Cambridge
 */
goog.provide('racer.model.CourseData');

goog.require('goog.object');
goog.require('goog.math.Vec2');
goog.require('racer.model.CourseInfo');
goog.require('racer.model.Track');


/**
 * Represents all courses at run-time
 * @constructor
 * @param {racer.model.CourseInfo} courseInfo
 */
racer.model.CourseData = function(courseInfo) {

    // reference to course configuration info
    /** {racer.model.CourseInfo} */
    this.info = courseInfo;

    /** {Array.<racer.model.Track>} */
    this.tracks = [];

    // currently selected course colour
    this.colourIndex = 0;

};

racer.model.CourseData.prototype.appendTrack = function(track) {
    this.tracks[this.tracks.length] = track;
};


