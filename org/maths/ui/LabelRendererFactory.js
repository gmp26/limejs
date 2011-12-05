/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 16:32
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.LabelRendererFactory');
goog.require('org.maths.ui.interfaces.ItemRendererFactory');
goog.require('org.maths.ui.interfaces.ItemRenderer');
goog.require('org.maths.ui.LabelRenderer');

/**
 * @constructor
 * @implements {org.maths.ui.interfaces.ItemRendererFactory}
 */
org.maths.ui.LabelRendererFactory = function() {
};

/**
 * set the font size
 * @param {number} n
 */
org.maths.ui.LabelRendererFactory.prototype.createInstance = function() {
    var label = new org.maths.ui.LabelRenderer();
    return label;
};



