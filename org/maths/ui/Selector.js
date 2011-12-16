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
goog.require('org.maths.ui.Scroller.Direction');
goog.require('org.maths.ui.interfaces.ItemRendererFactory');
goog.require('org.maths.ui.interfaces.ItemRenderer');
goog.require('org.maths.signals');

/**
 * @param {Array} dataProvider
 * @param {org.maths.ui.interfaces.ItemRendererFactory} itemRendererFactory
 * @param {number} items showing in menu
 * @param {org.maths.ui.Scroller.Direction}
 * @param {org.maths.signals.Signal} scrollStartedSignal
 * @param {org.maths.signals.Signal} scrollStoppedSignal
 * @constructor
 */
org.maths.ui.Selector = function(dataProvider,
                                 itemRendererFactory,
                                 itemsShowing,
                                 direction,
                                 scrollStartedSignal,
                                 scrollStoppedSignal) {
    goog.base(this);

    /** {Array} */
    this.dataProvider = dataProvider;

    /** org.maths.ui.interfaces.ItemRendererFactory */
    this.itemRendererFactory = itemRendererFactory;

    /** {number} */
    this.itemsShowing = itemsShowing;

    /** {number} */
    this.selectedIndex = 0;

    /** fills */
    this.fill = new lime.fill.LinearGradient()
        .setDirection(0,1,1,1)
        .addColorStop(0,'#444')
        .addColorStop(0.3,'#EEE')
        .addColorStop(0.5,'#FFF')
        .addColorStop(0.7,'#EEE')
        .addColorStop(1,'#444');

    // intercept scroller did stop signal so we can resignal with new selectedIndex
    var scrollerDidStop = new org.maths.signals.Signal();

    scrollerDidStop.add(function(stop) {
        this.selectedIndex = stop;//this.scroll.stop;
        if(goog.isDefAndNotNull(scrollStoppedSignal))
            scrollStoppedSignal.dispatch(this.selectedIndex);
    }, this);

    // Create scrolling region
    this.scroll = new org.maths.ui.Scroller(scrollStartedSignal, scrollerDidStop)
        .setStroke(2, '#000')
        .setFill(this.fill)
        .setRadius(2)
        .setSize(100, 100);

    // Create items according to the data in the dataProvider
    this.items = [];
    this.itemSize = new goog.math.Size(1,1);
    for(var i=0; i < dataProvider.length; i++) {
        var itemRenderer = itemRendererFactory.createInstance();
        var data = dataProvider[i];
        itemRenderer.setData(data);

        var item = this.items[i] = itemRenderer.getItem();
        this.itemSize.width = Math.ceil(Math.max(this.itemSize.width, item.getSize().width));
        this.itemSize.height = Math.ceil(Math.max(this.itemSize.height, item.getSize().height));
        this.scroll.appendChild(item);
    }

    // needs items first!
    this.setDirection(direction);

    this.appendChild(this.scroll);

    // horizontal by default
    this.stepSize = this.itemSize.width;
    if(direction === org.maths.ui.Scroller.Direction.VERTICAL) {
        this.stepSize = this.itemSize.height;
    }

    //console.log("itemWidth=",this.itemSize.width,"Height=",this.itemSize.height);

    this.updateView();
};
goog.inherits(org.maths.ui.Selector, lime.RoundedRect);


/** @inheritDoc */
org.maths.ui.Selector.prototype.updateView = function() {

    //lime.Node.prototype.update.apply(this,arguments);

    //if(this.getDirty()) {

    //console.log("selector updateView");

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
        this.scroll.scrollToStop(0);

    //}

};

/**
 * get items showing
 * @return {number}
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
 * @return {org.maths.ui.Selector} this
 */
org.maths.ui.Selector.prototype.setDirection = function(direction) {
    this.scroll.setDirection(direction);
    if(direction === org.maths.ui.Scroller.Direction.HORIZONTAL) {
        this.scroll
            .setFill(this.fill.setDirection(0,0,1,0.01))
            .setStops(this.items.length);
    }
    else {
        this.scroll
            .setFill(this.fill.setDirection(1,0,1,1))
            .setStops(this.items.length);
    }
    this.setDirty(lime.Dirty.LAYOUT);
    return this;
};

/**
 * @return {number} current selectedIndex
 */
org.maths.ui.Selector.prototype.getSelectedIndex = function() {
    return this.selectedIndex;
};

/**
 * set the selected index
 * @param n
 * @return {org.maths.ui.Selector} this
 */
org.maths.ui.Selector.prototype.setSelectedIndex = function(n) {

    if(n < 0) n = 0;
    if(n > this.items.length - 1)
        n = this.items.length - 1;

    if(n === this.selectedIndex) {
         return this;
    }

    this.selectedIndex = n;
    this.scroll.scrollToStop(n, 0.5);

    return this;
};

