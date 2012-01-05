/**
 * User: gmp26
 * Date: 09/12/2011
 * Time: 22:47
 * Copyright University of Cambridge
 */
goog.provide('racer.views.CoursesView');

goog.require('lime.RoundedRect');
goog.require('racer.views.CourseView');
goog.require('racer.model.CourseInfo');
goog.require('racer.model.Context');
goog.require('lime.animation.actionManager');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Easing');

/**
 * @constructor
 * @param {racer.model.Context} context
 */
racer.views.CoursesView = function(context) {
    goog.base(this);
    this.context = context;
    this.coursesView = [];

    //this.setFill('#F00');
    //this.setStroke(4,'#888');

    this.viewContainer = new lime.Layer();
    this.appendChild(this.viewContainer);

    // make all the courses
    for(var i = 0; i < racer.model.Courses.length; i++) {
        view = new racer.views.CourseView(context, i)
            .setScale(0.5)
            .setPosition(i*320,0);
        this.coursesView[i] = view;
        this.viewContainer.appendChild(view);
    }

    // add signals to change Course
    context.trackChangeStarted.add(this.startCourseSwitch, this);
    context.trackChangeEnded.add(this.finishCourseSwitch, this);

};
goog.inherits(racer.views.CoursesView, lime.RoundedRect);

/**
 * fade out the old view
 */
racer.views.CoursesView.prototype.startCourseSwitch = function() {

    var x = this.context.courseIndex*320;
    var count = this.context.coursesData.length;

    this.context.raceEnded.dispatch();

    anim = new lime.animation.Spawn(
        new lime.animation.MoveTo(-count*320/2,0).setDuration(2).setEasing(lime.animation.Easing.EASEINOUT),
        new lime.animation.ScaleTo(0.5,0.5).setDuration(2).setEasing(lime.animation.Easing.EASEINOUT)
    );

    this.viewContainer.runAction(anim);
};

/**
 * pan to the new view, creating it first if need be
 * @param {number} index of course to fade in
 */
racer.views.CoursesView.prototype.finishCourseSwitch = function(index) {

    this.context.courseIndex = index;
//    this.context.colourIndex = 0;

    var view = this.coursesView[index];
    if(!goog.isDefAndNotNull(view)) {
        console.log("BAD COURSE INDEX");
    }

    // it may be possible to delete this?
    view.updateView(this.context);

    lime.animation.actionManager.stopAll(this.viewContainer) ;

    anim = new lime.animation.Sequence(
        new lime.animation.Delay().setDuration(0.1),
        new lime.animation.Spawn(
            new lime.animation.MoveTo(-index*320,0).setDuration(0.3),
            new lime.animation.ScaleTo(1,1).setDuration(0.3).setEasing(lime.animation.Easing.EASEINOUT)
        )
//        new lime.animation.FadeTo(1).setDuration(0.5)
    );

    this.viewContainer.runAction(anim);

}