/**
 * User: gmp26
 * Date: 04/12/2011
 * Time: 20:59
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.Scroller');

goog.require('lime.RoundedRect');
goog.require('lime.animation.MoveTo');

/**
 * @constructor
 * @extends lime.Sprite
 */
org.maths.ui.Scroller = function() {

    goog.base(this);

    //need default size for autoresize
    this.setSize(100, 100);

    this.clipper = new lime.Sprite().setFill('#c00').setSize(100, 100).
        setAutoResize(lime.AutoResize.ALL);
    this.appendChild(this.clipper);
    this.setMask(this.clipper);

    this.moving_ = new lime.Layer();
    lime.Node.prototype.appendChild.call(this, this.moving_);

    goog.events.listen(this, ['mousedown', 'touchstart'],
        this.downHandler_, false, this);


    this.setDirection(org.maths.ui.Scroller.Direction.HORIZONTAL);

};
goog.inherits(org.maths.ui.Scroller, lime.RoundedRect);

/**
 * Offset that can be dragged over the edge
 * @const
 * @type number
 */
org.maths.ui.Scroller.OFFSET = 250;

/**
 * Factor to slow down if over the edge
 * @const
 * @type number
 */
org.maths.ui.Scroller.OFFSET_LAG = .4;

/**
 * How fast to slow down
 * @const
 * @type number
 */
org.maths.ui.Scroller.FRICTION = .95;

/**
 * Directions of the scroller.
 * @enum number
 */
org.maths.ui.Scroller.Direction = {
  HORIZONTAL: 0,
  VERTICAL: 1
};

/**
 * Returns the direction of the scroller (horizontal/vertical)
 * @return {org.maths.ui.Scroller.Direction} Scroll direction.
 */
org.maths.ui.Scroller.prototype.getDirection = function() {
    return this.direction_;
};

/**
 * Set the direction of the scroller (horizontal/vertical)
 * @param {org.maths.ui.Scroller.Direction} direction Direction.
 * @return {org.maths.ui.Scroller} object itself.
 */
org.maths.ui.Scroller.prototype.setDirection = function(direction) {
    this.direction_ = direction;
    return this;
};

/**
 * @inheritDoc
 * @see lime.Node#setAnchorPoint
 */
org.maths.ui.Scroller.prototype.setAnchorPoint = function() {
    if (this.clipper) {
        this.clipper.setAnchorPoint.apply(this.clipper, arguments);
    }
    return lime.Node.prototype.setAnchorPoint.apply(this, arguments);
};

/**
 * @inheritDoc
 * @see lime.Node#appendChild
 */
org.maths.ui.Scroller.prototype.appendChild = function() {
    if (this.moving_) return this.moving_.appendChild.apply(
        this.moving_, arguments);
    return lime.Node.prototype.appendChild.apply(this, arguments);
};

/**
 * @inheritDoc
 * @see lime.Node#removeChild
 */
org.maths.ui.Scroller.prototype.removeChild = function() {
    if (this.moving_) return this.moving_.removeChild.apply(
        this.moving_, arguments);
    return lime.Node.prototype.removeChild.apply(this, arguments);
};

/**
 * Measure the contents of the scroller and set
 * up high and low limits.
 */
org.maths.ui.Scroller.prototype.measureLimits = function() {

    var measure = this.moving_.measureContents();
    if (this.getDirection() == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        this.downy = this.moving_.getPosition().y;
        var max = this.getSize().width;

        this.LOW = -measure.left;
        this.HIGH = Math.min(max - measure.right, -measure.left);
        var diff = (measure.right - measure.left) - max;
    }
    else {
        this.downx = this.moving_.getPosition().x;
        max = this.getSize().height;

        this.LOW = -measure.top;
        this.HIGH = Math.min(max - measure.bottom, -measure.top);
        diff = (measure.bottom - measure.top) - max;
    }

    if (diff > 0) {
        this.LOW -= diff;
        this.HIGH += diff;
    }
};

/**
 * Scroll to specific offset in pixels
 * @param {number} offset Offset in pixels.
 * @param {number=} opt_duration Animation duration.
 */
org.maths.ui.Scroller.prototype.scrollTo = function(offset, opt_duration) {
    var pos = this.moving_.getPosition().clone();
    var duration = opt_duration || 0;

    this.measureLimits();

    if (offset < 0) offset = 0;

    if (this.getDirection() == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        pos.x = this.HIGH - offset;
        if (pos.x < this.LOW) pos.x = this.LOW;
    }
    else {
        pos.y = this.HIGH - offset;
        if (pos.y < this.LOW) pos.y = this.LOW;
    }

    if (duration) {
        this.moving_.runAction(new lime.animation.MoveTo(pos.x, pos.y).
            setDuration(duration).enableOptimizations().
            setEasing(lime.animation.getEasingFunction(.19, .6, .35, .97)));
    }
    else this.moving_.setPosition(pos);
};

/**
 * Handle down events
 * @private
 * @param {lime.events.Event} e Event.
 */
org.maths.ui.Scroller.prototype.downHandler_ = function(e) {
    if (this.ismove) return;

    e.position = this.localToNode(e.position, this.moving_);
    this.downx = e.position.x;
    this.downy = e.position.y;

    this.v = 0;
    this.ismove = 1;

    if (this.getDirection() == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        this.oldvalue = this.posvalue = this.moving_.getPosition().x;
    }
    else {
        this.oldvalue = this.posvalue = this.moving_.getPosition().y;
    }

    this.measureLimits();

    lime.animation.actionManager.stopAll(this.moving_);
    //this.moving_.setPosition(p);

    lime.scheduleManager.schedule(this.captureVelocity_, this);

    e.swallow(['touchmove', 'mousemove'], this.moveHandler_);

    e.swallow(['touchend', 'mouseup', 'touchcancel'], this.upHandler_);

    this.event = e.clone();
};

/**
 * Capture the scrolling velocity to get some throwing
 * motion after release.
 * @private
 */
org.maths.ui.Scroller.prototype.captureVelocity_ = function() {
    if (this.ismove) {
        this.v = (this.posvalue - this.oldvalue) * 1.05;
        this.oldvalue = this.posvalue;
    }
    this.v *= org.maths.ui.Scroller.FRICTION;
};

/**
 * Cancel all current movement events.
 */
org.maths.ui.Scroller.prototype.cancelEvents = function() {
    if (this.event) {
        this.event.release();
    }
    this.ismove = 0;
};

/**
 * Handle move events.
 * @private
 * @param {lime.events.Event} e Event.
 */
org.maths.ui.Scroller.prototype.moveHandler_ = function(e) {
    var pos = e.position.clone(), dir = this.getDirection(), activeval;
    if (dir == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        pos.x -= this.downx;
        pos.y = this.downy;
        activeval = pos.x;
    }
    else {
        pos.x = this.downx;
        pos.y -= this.downy;
        activeval = pos.y;
    }


    if (activeval < this.LOW) {
        var diff = this.LOW - activeval;

        if (diff > org.maths.ui.Scroller.OFFSET) diff = org.maths.ui.Scroller.OFFSET;
        activeval = this.LOW - diff * org.maths.ui.Scroller.OFFSET_LAG;
    }
    if (activeval > this.HIGH) {
        diff = activeval - this.HIGH;

        if (diff > org.maths.ui.Scroller.OFFSET) diff = org.maths.ui.Scroller.OFFSET;
        activeval = this.HIGH + diff * org.maths.ui.Scroller.OFFSET_LAG;
    }

    this.posvalue = activeval;

    if (dir == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        pos.x = activeval;
    }
    else {
        pos.y = activeval;
    }

    this.moving_.setPosition(pos);


};

/**
 * Handle release(up) events.
 * @private
 * @param {lime.events.Event} e Event.
 */
org.maths.ui.Scroller.prototype.upHandler_ = function(e) {
    var pos = e.position.clone(), dir = this.getDirection(), activeval;

    if (dir == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        pos.x -= this.downx;
        pos.y = this.downy;
        activeval = pos.x;
    }
    else {
        pos.x = this.downx;
        pos.y -= this.downy;
        activeval = pos.y;
    }

    lime.scheduleManager.unschedule(this.captureVelocity_, this);
    var k = Math.log(0.5 / Math.abs(this.v)) /
            Math.log(org.maths.ui.Scroller.FRICTION),
        duration = k / 30,
        endpos = (Math.abs(this.v) *
            (Math.pow(org.maths.ui.Scroller.FRICTION, k) - 1)) /
            (org.maths.ui.Scroller.FRICTION - 1) * (this.v > 0 ? 1 : -1);

    activeval += endpos;
    this.ismove = 0;

    if (this.v != 0) {

        var diff = endpos;

        if (activeval < this.LOW) {
            diff = this.LOW - (activeval - endpos);
            activeval = this.LOW;
        }
        if (activeval > this.HIGH) {
            diff = this.HIGH - (activeval - endpos);
            activeval = this.HIGH;
        }
        //console.log(diff,endpos);
        duration *= (diff / endpos);

    }

    if (this.oldvalue < this.LOW) {
        activeval = this.LOW;
        duration = .3;
    }
    if (this.oldvalue > this.HIGH) {
        activeval = this.HIGH;
        duration = .3;
    }

    if (dir == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        pos.x = activeval;
    }
    else {
        pos.y = activeval;
    }

    if (Math.abs(duration) < 10) {
         this.moving_.runAction(new lime.animation.MoveTo(pos.x, pos.y).
            setDuration(duration).enableOptimizations().
            setEasing(lime.animation.getEasingFunction(.19, .6, .35, .97)));
    }


};
