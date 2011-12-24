/**
 * User: gmp26
 * Date: 07/12/2011
 * Time: 21:03
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.ArrowSelector');
goog.require('goog.events.Event');
goog.require('lime.Node');
goog.require('org.maths.ui.Scroller');
goog.require('org.maths.ui.Scroller.Direction');
goog.require('org.maths.ui.Selector');
goog.require('org.maths.signals');

/**
 * A selector with up/down or left right arrows
 * @param {Array} dataProvider
 * @param {org.maths.ui.interfaces.ItemRendererFactory} itemRendererFactory
 * @param {number} items showing in menu
 * @param {org.maths.ui.Scroller.Direction} direction
 * @param {org.maths.signals.Signal}
 * @param {org.maths.signals.Signal}
 * @constructor
 * @extends {lime.Node}
 */

org.maths.ui.ArrowSelector = function(dataProvider,
                                      itemRendererFactory,
                                      itemsShowing,
                                      direction,
                                      changeStartedSignal,
                                      changeStoppedSignal) {
    goog.base(this);

    this.id="ArrowSelector";

    // Create the selector
    this.selector = new org.maths.ui.Selector(
        dataProvider,
        itemRendererFactory,
        itemsShowing,
        direction,
        changeStartedSignal,
        changeStoppedSignal);

    this.appendChild(this.selector);

    var scrollSize = this.selector.scroll.getSize();
    console.log("w=",scrollSize.width,"h=",scrollSize.height);

    // Create two arrow buttons
    var upState1 = new lime.Sprite()
        .setScale(0.7)
        .setFill('assets/leftUp.png');
    var downState1 = new lime.Sprite()
        .setScale(0.7)
        .setFill('assets/leftDown.png');

    var upState2 = new lime.Sprite()
        .setScale(0.7)
        .setFill('assets/leftUp.png');
    var downState2 = new lime.Sprite()
        .setScale(0.7)
        .setFill('assets/leftDown.png');

    this.arrow1 = new lime.Button(upState1, downState1)
    this.arrow1.delta = -1;
    this.arrow2 = new lime.Button(upState2, downState2)
    this.arrow2.delta = 1;
    this.appendChild(this.arrow1);
    this.appendChild(this.arrow2);

    var offset = 13+scrollSize.width/2;
    if(direction === org.maths.ui.Scroller.Direction.HORIZONTAL) {
        this.arrow1.setPosition(-offset,0).setRotation(0);
        this.arrow2.setPosition(offset,0).setRotation(180);
    }
    else {
        offset = 13+scrollSize.height/2;
        this.arrow1.setPosition(0,-offset).setRotation(-90);
        this.arrow2.setPosition(0,offset).setRotation(90);
    }

    goog.events.listen(this.arrow1, ["mousedown","touchstart"], this.buttonHandler, true, this);
    goog.events.listen(this.arrow2, ["mousedown","touchstart"], this.buttonHandler, true, this);

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

/**
 * @return {number} the selected index
 */
org.maths.ui.ArrowSelector.prototype.getSelectedIndex = function() {
    return this.selector.getSelectedIndex();
};

/**
 * set the selected index
 * @param {number} n
 */
org.maths.ui.ArrowSelector.prototype.setSelectedIndex = function(n) {
    this.selector.setSelectedIndex(n);
    return this;
};


/**
 *
 * @param {goog.events.Event} e button event
 */
org.maths.ui.ArrowSelector.prototype.buttonHandler = function(e) {
    if (e.type == 'mousedown' || e.type == 'touchstart') {
        console.log(this.id);
        e.swallow(['mouseup', 'touchend'], this.buttonHandlingComplete, true);
    }
 };


/**
 *
 * @param {goog.events.Event} e button event
 */
org.maths.ui.ArrowSelector.prototype.buttonHandlingComplete = function(e) {
    var delta = e.targetObject.delta;
    var self = e.targetObject.getParent();
    var selectedIndex = self.getSelectedIndex();
    console.log("selectedndex=", selectedIndex, "delta=",delta);
    self.setSelectedIndex(selectedIndex + delta);
    e.release();
};

