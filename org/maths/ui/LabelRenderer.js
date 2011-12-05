/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 16:42
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.LabelRenderer');
goog.require('org.maths.ui.interfaces.ItemRenderer');
goog.require('lime.Label');

/**
 * create a label that implements ItemRenderer
 * @constructor
 * @implements org.maths.ui.interfaces.ItemRenderer
 */
org.maths.ui.LabelRenderer = function() {
    this.text_="undef";
    //goog.base(this);
};
//goog.inherits(org.maths.ui.LabelRenderer, lime.Label);

/**
 * get the data value
 * @return {*} data
 */
org.maths.ui.LabelRenderer.prototype.getData = function() {
    return this.text_;
};

/**
 * set the data value
 * @param {*}
 */
org.maths.ui.LabelRenderer.prototype.setData = function(data) {
    this.text_ = data;
};

/**
 * @return lime.Label
 */
org.maths.ui.LabelRenderer.prototype.getItem = function() {
    return new lime.Label(this.text_);
}
