/**
 * User: gmp26
 * Date: 07/12/2011
 * Time: 21:03
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.ArrowSelector');
goog.require('lime.Node');
goog.require('org.maths.ui.Scroller');
goog.require('org.maths.ui.Scroller.Direction');
goog.require('org.maths.ui.Selector');

/**
 * A selector with up/down or left right arrows
 * @param {Array} dataProvider
 * @param {org.maths.ui.interfaces.ItemRendererFactory} itemRendererFactory
 * @param {org.maths.ui.Scroller.Direction} direction
 * @constructor
 */

org.maths.ui.ArrowSelector = function(dataProvider, itemRendererFactory, direction) {
    goog.base(this);

    // Create the selector
    this.selector = new org.maths.ui.Selector(dataProvider, itemRendererFactory)
        .setDirection(direction);
    this.selector.update();             // like as3 validateNow();

    this.appendChild(this.selector);

    var scrollSize = this.selector.scroll.getSize();
    console.log("w=",scrollSize.width,"h=",scrollSize.height);

    // Create two arrow buttons
    var upState1 = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/leftUp.png');
    var downState1 = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/leftDown.png');

    var upState2 = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/leftUp.png');
    var downState2 = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/leftDown.png');

    this.arrow1 = new lime.Button(upState1, downState1);
    this.arrow2 = new lime.Button(upState2, downState2);
    this.appendChild(this.arrow1);
    this.appendChild(this.arrow2);

    if(direction === org.maths.ui.Scroller.Direction.HORIZONTAL) {
        this.arrow1.setPosition(-10,0).setRotation(0);
        this.arrow2.setPosition(10+scrollSize.width,0).setRotation(180);    }
    else {
        this.arrow1.setPosition(0,-10).setRotation(-90);
        this.arrow2.setPosition(0,10+scrollSize.height).setRotation(90);
    }

};
goog.inherits(org.maths.ui.ArrowSelector, lime.Node);

/**
 * get items showing
 * @return {org.maths.ui.Scroller.Direction}
 */
org.maths.ui.ArrowSelector.prototype.getItemsShowing = function() {
    return this.selector.getItemsShowing();
};

/**
 * set items showing
 * @param {number} n
 */
org.maths.ui.ArrowSelector.prototype.setItemsShowing = function(n) {
    this.selector.setItemsShowing(n);
    return this;
};
