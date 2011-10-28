/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 06/10/2011
 * Time: 15:12
 * To change this template use File | Settings | File Templates.
 */
goog.provide('billiards.Bell');

goog.require('lime.scheduleManager');

goog.require('lime.animation.Animation');
goog.require('lime.animation.Easing');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.RotateTo');
goog.require('lime.animation.Delay');

goog.require('lime.audio.Audio');

/**
 * @constructor
 * @param {lime.Sprite} note Label attached to the bell
 */
billiards.Bell = function(note) {

    // super init
    lime.Sprite.call(this);

    this.bell1 = new lime.Sprite().setFill('assets/bell2.png')
        .setSize(38,31)
        .setAnchorPoint(0.65, 0.35)
        .setScale(1, 1)
        .setPosition(0, 0)
        .setRotation(0)
        .setOpacity(1);

    if(goog.isDef(note)) {
        note.bell = this;
        goog.events.listen(note, ['mousedown','touchstart'], this.remoteRing);
        goog.events.listen(this.bell1, ['mousedown','touchstart'], this.remoteRing);
    }
    this.bell1.name="Bell1";
    this.name = "Bell";


    this.appendChild(this.bell1);

    this.bellSound = new lime.audio.Audio('assets/bell.mp3');
    this.remoteBellSound = new lime.audio.Audio('assets/remoteBell.mp3');

    this.easing = lime.animation.Easing.EASEINOUT;

    //lime.scheduleManager.callAfter(this.animateRing, this, 3000);
};
goog.inherits(billiards.Bell, lime.Sprite);

/*
billiards.Bell.prototype.init = function() {
    goog.events.listen(this.bell1, ['mousedown','touchstart'], this.animateRing);
    return this;
}
*/

billiards.Bell.prototype.remoteRing = function(event) {
    var bell;
    var anim;
    if(goog.isDef(event) && goog.isDef(event.target)) {
        if(goog.isDef(event.target.bell)) {
            bell = event.target.bell;
        }
        else {
            bell = event.target.getParent();
        }
    }
    else {
        bell = this
    }
    bell.remoteBellSound.play();
}

billiards.Bell.prototype.animateRing = function(event) {
    var bell;
    var anim;
    if(goog.isDef(event) && goog.isDef(event.target)) {
        if(goog.isDef(event.target.bell)) {
            bell = event.target.bell;
        }
        else {
            bell = event.target.getParent();
        }
    }
    else {
        bell = this
    }
    bell.bellSound.play();
    if(!goog.isNull(bell.getParent())) {
        anim = new lime.animation.Sequence(
            new lime.animation.Delay().setDuration(0.5),
            new lime.animation.RotateTo(30).setDuration(.2).setEasing(bell.easing),
            new lime.animation.RotateTo(-30).setDuration(.2).setEasing(bell.easing),
            new lime.animation.RotateTo(20).setDuration(.1).setEasing(bell.easing),
            new lime.animation.RotateTo(-20).setDuration(.1).setEasing(bell.easing),
            new lime.animation.RotateTo(10).setDuration(.1).setEasing(bell.easing),
            new lime.animation.RotateTo(-10).setDuration(.1).setEasing(bell.easing),
            new lime.animation.RotateTo(0).setDuration(.05).setEasing(bell.easing)
        );
        bell.bell1.runAction(anim);
    }
}
