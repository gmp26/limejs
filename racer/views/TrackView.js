/**
 * User: gmp26
 * Date: 01/12/2011
 * Time: 12:13
 * Copyright University of Cambridge
 */
goog.provide('racer.views.TrackView');
goog.require('racer.model.CourseInfo');
goog.require('racer.model.Track');
goog.require('lime.CanvasContext');

/**
 *
 * @param {number} courseIndex
 * @param {number} colourIndex
 * @param {racer.model.Track} track
 * @constructor
 */
racer.views.TrackView = function(courseIndex, colourIndex, track) {

    // super
    goog.base(this);

    this.courseIndex = courseIndex;
    this.colourIndex = colourIndex;
    this.track = track;
    this.raceStep = null;

} ;
goog.inherits(racer.views.TrackView, lime.CanvasContext);


racer.views.TrackView.prototype.setTrack = function(track) {
    this.track = track;
    this.setDirty(lime.Dirty.CONTENT);
};

racer.views.TrackView.prototype.setCourseIndex = function(courseIndex) {
    this.courseIndex = courseIndex;
    this.setDirty(lime.Dirty.CONTENT);
};

racer.views.TrackView.prototype.setColourIndex = function(colourIndex) {
    this.colourIndex = colourIndex;
    this.setDirty(lime.Dirty.CONTENT);
};

/**
 *
 * @param {number?} opt_raceStep 0 (or null) means draw the whole track
 */
racer.views.TrackView.prototype.updateView = function(opt_raceStep) {
    this.raceStep = opt_raceStep;
    this.setDirty(lime.Dirty.CONTENT);
};

/**
 * Draw a single track draw
 */
racer.views.TrackView.prototype.draw = function(ctx) {
    //console.log("trackView draw");

    if(goog.isNull(this.track)) {
        return;
    }
    var courseInfo = racer.model.Courses[this.courseIndex];
    var colourInfo = courseInfo.colours[this.colourIndex];
    var gx = courseInfo.gridSize;
    var gy = -gx;
    var originX = colourInfo.start.x*gx;
    var originY = colourInfo.start.y*gy;

    var wayPoints = this.track.wayPoints();
    var selectedIndex = this.track.selected;
    //console.log("selectedIndex = " + selectedIndex);

    //sample code from https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
    ctx.clearRect(0,0,320,320);
	ctx.strokeStyle = colourInfo.colour;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
	ctx.beginPath();

    var steps = wayPoints.length;
    if(goog.isDefAndNotNull(this.raceStep)) {
        steps = Math.min(steps,this.raceStep);
    }

    for(var i=0; i < steps; i++) {
        var wp = wayPoints[i];
        var pos = wp.position;
        var v = wp.velocity;
        if(i === (selectedIndex+1)) {
            ctx.stroke();
            ctx.lineWidth = 4;
            ctx.strokeStyle = colourInfo.highlight;
            ctx.beginPath();
            ctx.moveTo(pos.x*gx, pos.y*gy);
            ctx.lineTo((pos.x+v.x)*gx, (pos.y+v.y)*gy);
            ctx.stroke();
            ctx.strokeStyle = colourInfo.colour;
            ctx.lineWidth = 2;
            ctx.beginPath();
        }
        else {
            ctx.moveTo(pos.x*gx, pos.y*gy);
            ctx.lineTo((pos.x+v.x)*gx, (pos.y+v.y)*gy);
        }
    }


    ctx.stroke();

    //this.testImageData(ctx);
};

/*
racer.views.TrackView.prototype.testImageData = function(ctx) {
    // test for getpixeldata
    var imageData = ctx.getImageData(100,100,10,10);
    console.log('imageData');
};
*/