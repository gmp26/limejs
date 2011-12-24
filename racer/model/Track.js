/**
 * User: gmp26
 * Date: 27/11/2011
 * Time: 10:55
 * Copyright University of Cambridge
 */
goog.provide('racer.model.Track');

goog.require('goog.math.Vec2');

racer.model.trackCount = 0;

/**
 *
 * Tracks define a named player's track through the course starting
 * at the given position with given initial velocity
 *
 * @param {goog.math.Vec2} initialPosition
 * @param {goog.math.Vec2} initialVelocity
 * @constructor
 */
racer.model.Track = function(initialPosition, initialVelocity) {

    this.trackIndex = racer.model.trackCount++;

    /** goog.math.Vec2 */
    this.initialPosition = initialPosition;

    /** goog.math.Vec2 */
    this.initialVelocity = initialVelocity;

    this.deltas = [];

    this.selected = null;

 };

/**
 * set the delta velocity at this point in the track
 * @param {goog.math.Vec2} delta deltaVelocity
 * @param {number} index
 * @return {racer.model.Track} this track
 */
racer.model.Track.prototype.setDeltaAt = function(delta, index) {

    var len = this.deltas.length;

    if(index <= len)
        this.deltas[index] = delta;

    return this;
};

/** @typedef {{position: goog.math.Vec2, velocity: goog.math.Vec2}} */
racer.WayPoint;

/** @typedef {Array.<racer.WayPoint>} */
racer.WayPoints;


/**
 * fetch the track way points
 *
 * @return {racer.WayPoints} the wayPoints on the track
 */
racer.model.Track.prototype.wayPoints = function() {

    /** {racer.WayPoints} */
    var points = [{position:this.initialPosition, velocity: this.initialVelocity}];

    /** {number} */
    var len = this.deltas.length;
    for(var i = 0; i < len; i++) {

        /** {goog.math.Vec2} */
        var delta = this.deltas[i];

        points[i+1] = {
            position: goog.math.Vec2.sum(points[i].position, points[i].velocity),
            velocity: goog.math.Vec2.sum(points[i].velocity, delta)
        }
    }

    return points;
};

/**
 * @return the number of waypoints in the track
 */
racer.model.Track.prototype.getTrackLength = function() {
    return this.deltas.length + 1;
}


