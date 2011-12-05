/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 11:20
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.Selector');

goog.require('lime.RoundedRect');
goog.require('lime.fill.LinearGradient');
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
    this.itemsShowing = 1;

    /** fills */
    this.fill = new lime.fill.LinearGradient()
        .setDirection(0,1,1,1)
        .addColorStop(0,'#444')
        .addColorStop(0.1,'#EEE')
        .addColorStop(0.5,'#FFF')
        .addColorStop(0.9,'#EEE')
        .addColorStop(1,'#444');

    // Create scrolling region
    this.scroll = new org.maths.ui.Scroller()
        .setStroke(1, '#000')
        .setDirection(org.maths.ui.Scroller.Direction.HORIZONTAL)
        .setFill(this.fill)
        .setSize(100, 100);
    this.appendChild(this.scroll);

    // Create items according to the data in the dataProvider
    this.items = [];
    this.itemSize = new goog.math.Size(1,1);
    for(var i=0; i < dataProvider.length; i++) {
        var itemRenderer = itemRendererFactory.createInstance();
        var data = dataProvider[i];
        itemRenderer.setData(data);

        var item = this.items[i] = itemRenderer.getItem();
        this.itemSize.width = Math.max(this.itemSize.width, item.getSize().width);
        this.itemSize.height = Math.max(this.itemSize.height, item.getSize().height);
        this.scroll.appendChild(item);
    }

};
goog.inherits(org.maths.ui.Selector, lime.RoundedRect);


/** @inheritDoc */
org.maths.ui.Selector.prototype.update = function() {

    if(this.getDirty()) {

        var i,w,h,item;
        if(this.scroll.getDirection() == org.maths.ui.Scroller.Direction.HORIZONTAL) {
            w = this.itemSize.width * this.itemsShowing;
            h = this.itemSize.height;
            for(i=0; i < this.items.length; i++) {
                item = this.items[i];
                item.setPosition(i*this.itemSize.width, 0);
            }
        }
        else {
            w = this.itemSize.width;
            h = this.itemSize.height * this.itemsShowing;
            for(i=0; i < this.items.length; i++) {
                item = this.items[i];
                item.setPosition(0, i*this.itemSize.height);
            }
        }
        this.scroll.setSize(w,h);
        this.scroll.scrollTo(0);

        lime.Node.prototype.update.apply(this,arguments);
    }

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
    this.setDirty(lime.Dirty.CONTENT);
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
        this.scroll.setAnchorPoint(0, 0.5)
            .setFill(this.fill.setDirection(0,0,1,0.01))
            .setStops(this.items.length);
    }
    else {
        this.scroll.setAnchorPoint(0.5, 0)
            .setFill(this.fill.setDirection(1,0,1,1))
            .setStops(this.items.length);
    }
    this.setDirty(lime.Dirty.LAYOUT);
    return this;
};