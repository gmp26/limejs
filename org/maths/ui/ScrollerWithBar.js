/**
 * User: gmp26
 * Date: 03/12/2011
 * Time: 21:34
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.ScrollerWithBar');
goog.require('lime.ui.Scroller');


/**
 * @constructor
 * @extends lime.ui.scroller
 */
org.maths.ui.ScrollerWithBar = function() {

    goog.base(this);

    this.scrollBar_ = new lime.RoundedRect()
        .setOpacity(0.3)
        .setFill('#000')
        .setAnchorPoint(0, 0.5)
        .setSize(this.getSize().width, 10);

    lime.Node.prototype.appendChild.call(this, this.scrollBar_);

};
goog.inherits(org.maths.ui.ScrollerWithBar, lime.ui.Scroller);

/**
 * Measure the contents of the scroller and set
 * up high and low limits.
 */
org.maths.ui.ScrollerWithBar.prototype.measureLimits = function() {

    // super.measureLimits()
    goog.base(this,'measureLimits');

    // adjust size
    var measure = this.moving_.measureContents();
    var movingWidth = measure.right - measure.left;
    var barSize = this.scrollBar_.getSize();
    var size = this.getSize();
    if(movingWidth < size.width) {
        this.scrollBar_.setSize(size.width, barSize.height);
    }
    else {
        this.scrollBar_.setSize(size.width*size.width/movingWidth, barSize.height);
    }
};


org.maths.ui.ScrollerWithBar.prototype.scrollTo = function(offset, opt_duration) {

    var pos = this.moving_.getPosition().clone();
    var barPos = this.scrollBar_.getPosition().clone();

    var duration = opt_duration || 0;

    this.measureLimits();

    if (offset < 0) offset = 0;

    var barFactor = this.scrollBar_.getSize().width/this.getSize().width;

    if (this.getDirection() == lime.ui.Scroller.Direction.HORIZONTAL) {
        pos.x = this.HIGH - offset;
        if (pos.x < this.LOW) pos.x = this.LOW;

        barPos.x = pos.x*barFactor;
    }
    else {
        pos.y = this.HIGH - offset;
        if (pos.y < this.LOW) pos.y = this.LOW;
    }

    if (duration) {
        this.moving_.runAction(new lime.animation.MoveTo(pos.x, pos.y).
            setDuration(duration).enableOptimizations().
            setEasing(lime.animation.getEasingFunction(.19, .6, .35, .97)));
        this.scrollBar_.runAction(new lime.animation.MoveTo(barPos.x, barPos.y).
            setDuration(duration).enableOptimizations().
            setEasing(lime.animation.getEasingFunction(.19, .6, .35, .97)));

    }
    else this.moving_.setPosition(pos);
}

