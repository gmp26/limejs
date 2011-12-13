/**
 * User: gmp26
 * Date: 13/12/2011
 * Time: 21:10
 * Copyright University of Cambridge
 */
goog.provide('racer.views.renderers.ColourRenderer');
goog.require('org.maths.ui.interfaces.ItemRenderer');
goog.require('lime.RoundedRect');

/**
 * @constructor
 * @implements org.maths.ui.interfaces.ItemRenderer
 */
racer.views.renderers.ColourRenderer = function() {
    this.colour_ = null;
};

/**
 * get the data value
 * @return {*} data
 */
racer.views.renderers.ColourRenderer.prototype.getData = function() {
    return this.colour_;
};

/**
 * set the data value
 * @param {*}
 */
racer.views.renderers.ColourRenderer.prototype.setData = function(data) {
    this.colour_ = data;
};

/**
 * @return {lime.RoundedRect}
 */
racer.views.renderers.ColourRenderer.prototype.getItem = function() {

    var rect = new lime.RoundedRect()
            .setSize(56,27);
    var spot = new lime.RoundedRect()
            .setFill(this.colour_)
            .setSize(20,20)
            .setRadius(10);
    rect.appendChild(spot);

    return rect;
};

