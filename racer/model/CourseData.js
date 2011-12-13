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
    this.info = courseInfo;

    /** {Array.<racer.model.Track>} stored tracks */
    this.tracks = [];
    var len = courseInfo.colours.length;
    for(var i=0; i < len; i++) {
        this.tracks[i] = new racer.model.Track(courseInfo.colours[i].start, new goog.math.Vec2(0,0));
    }
};

