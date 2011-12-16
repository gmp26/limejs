/**
 * User: gmp26
 * Date: 09/12/2011
 * Time: 11:42
 * Copyright University of Cambridge
 */
goog.provide('racer.model.Context');
goog.require('racer.model.CourseInfo');
goog.require('racer.model.CourseData');
goog.require('org.maths.signals');


/**
 * provides a shared context for the application
 * @constructor
 */
racer.model.Context = function() {

    /** {org.maths.signals.Signal}  */
    this.trackCreated = new org.maths.signals.Signal();

    /** {org.maths.signals.Signal} indicates the track view needs refreshing */
    this.trackUpdated = new org.maths.signals.Signal();

    /** {org.maths.signals.Signal} animated track change should start */
    this.trackChangeStarted = new org.maths.signals.Signal();

    /** {org.maths.signals.Signal} animated track change should end */
    this.trackChangeEnded = new org.maths.signals.Signal();

    /** {org.maths.signals.Signal} animated colour change should start */
    this.colourChangeStarted = new org.maths.signals.Signal();

    /** {org.maths.signals.Signal} animated colour change should end */
    this.colourChangeEnded = new org.maths.signals.Signal();

    /** {boolean} true if we are editing, false if racing */
    this.editing = true;

    /** {number} where we are when racing */
    this.raceStep = 0;

    /** {number} */
    this.courseIndex = 0;

    /** {number} */
    this.colourIndex = 0;  // -1 indicates all colours should be drawn

    /** {Array.<racer.model.CourseData>} run-time course data store */
    this.coursesData = [];
    var len = racer.model.CourseData.length;
    for(var i=0; i < len; i++) {
        this.coursesData[i] = new racer.model.CourseData(racer.model.Courses[i]);
    }

};
