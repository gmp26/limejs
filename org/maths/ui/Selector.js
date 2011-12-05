/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 11:20
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.Selector');

goog.require('lime.RoundedRect');
goog.require('org.maths.ui.Scroller');
goog.require('org.maths.ui.interfaces.ItemRendererFactory');
goog.require('org.maths.ui.interfaces.ItemRenderer');

/**
 * @param {Array} dataProvider
 * @param {org.maths.ui.interfaces.ItemRendererFactory} itemRendererFactory
 * @constructor
 */
org.maths.ui.Selector = function(dataProvider, itemRendererFactory) {
    goog.base(this);

    /** {Array} */
    this.dataProvider = dataProvider;

    /** org.maths.ui.interfaces.ItemRendererFactory */
    this.itemRendererFactory = itemRendererFactory;

    /** {number} */
    this.itemsShowing = 3;

    // Create scrolling region
    this.scroll = new org.maths.ui.Scroller()
        .setStroke(2, '#000')
        .setDirection(org.maths.ui.Scroller.Direction.HORIZONTAL)
        .setSize(100, 100);
    this.appendChild(this.scroll);

    // Create items according to the data in the dataProvider
    this.items = [];
    this.itemSize = new goog.math.Size(0,0);
    for(var i=0; i < dataProvider.length; i++) {
        var itemRenderer = itemRendererFactory.createInstance();
        var data = dataProvider[i];
        itemRenderer.setData(data);

        var item = this.items[i] = itemRenderer.getItem();
        this.itemSize.width = Math.max(this.itemSize.width, item.getSize().width)
        this.itemSize.height = Math.max(this.itemSize.height, item.getSize().height)
        this.scroll.appendChild(item);
    }
    this.update();
};
goog.inherits(org.maths.ui.Selector, lime.RoundedRect);


org.maths.ui.Selector.prototype.update = function() {
    var w,h;
    if(this.scroll.getDirection() == org.maths.ui.Scroller.Direction.HORIZONTAL) {
        w = this.itemSize.width * this.itemsShowing;
        h = this.itemSize.height;
    }
    else {
        w = this.itemSize.width;
        h = this.itemSize.height * this.itemsShowing;
    }
    this.scroll.setSize(w,h);
};

/**
 * get items showing
 * @return {org.maths.ui.Scroller.Direction}
 */
org.maths.ui.Selector.prototype.getItemsShowing = function() {
    return this.itemsShowing;
};

/**
 * set items showing
 * @param {number} n
 */
org.maths.ui.Selector.prototype.setItemsShowing = function(n) {
    this.itemsShowing = n;
    this.update();
    return this;
};

/**
 * get scroll direction
 * @return {org.maths.ui.Scroller.Direction}
 */
org.maths.ui.Selector.prototype.getDirection = function() {
    return this.scroll.getDirection();
};

/**
 * set direction of scroller - horizontal or vertical
 * @param {org.maths.ui.Scroller.Direction} direction
 */
org.maths.ui.Selector.prototype.setDirection = function(direction) {
    this.scroll.setDirection(direction);
    if(direction === org.maths.ui.Scroller.Direction.HORIZONTAL) {
        this.scroll.setAnchorPoint(0, 0.5);
    }
    else {
        this.scroll.setAnchorPoint(0.5, 0);
    }
    this.update();
    return this;
};