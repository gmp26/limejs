/**
 * User: gmp26
 * Date: 09/12/2011
 * Time: 22:47
 * Copyright University of Cambridge
 */
goog.provide('racer.views.CoursesView');

goog.require('lime.RoundedRect');
goog.require('racer.views.CourseView');
goog.require('racer.model.Context');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');

/**
 * @constructor
 * @param {racer.model.Context} context
 */
racer.views.CoursesView = function(context) {
    goog.base(this);

    this.context = context;
    this.coursesView = [];

    // make the initial screen
    var view = new racer.views.CourseView(context)
        .setScale(0.5)
        .setOpacity(1);
    this.coursesView[context.courseIndex]  = view;
    this.appendChild(view);

    // add signals to change Course
    context.trackChangeStarted.add(this.startCourseSwitch, this);
    context.trackChangeEnded.add(this.finishCourseSwitch, this);

};
goog.inherits(racer.views.CoursesView, lime.RoundedRect);

/**
 * fade out the old view
 */
racer.views.CoursesView.prototype.startCourseSwitch = function() {
    anim = new lime.animation.FadeTo(0)
        .setDuration(0.3);
    this.coursesView[this.context.courseIndex].runAction(anim);
};

/**
 * fade in the new view, creating it first if need be
 * @param {number} index of course to fade in
 */
racer.views.CoursesView.prototype.finishCourseSwitch = function(index) {

    this.context.courseIndex = index;

    var view = this.coursesView[index];
    if(!goog.isDefAndNotNull(view)) {
        view = new racer.views.CourseView(this.context)
            .setScale(0.5)
            .setOpacity(0);
        this.coursesView[index]= view;
        this.appendChild(view);
    }

    anim = new lime.animation.Sequence(
        new lime.animation.Delay().setDuration(0.1),
        new lime.animation.FadeTo(1).setDuration(0.5)
    );

    view.runAction(anim);
/*
    goog.events.listen(anim,lime.animation.Event.STOP,function(){
        view.setOpacity(1);
        view.setHidden(false);
        console.log("boo");
    })
*/
}