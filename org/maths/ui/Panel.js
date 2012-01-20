/**
 * User: gmp26
 * Date: 07/01/2012
 * Time: 22:53
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.Panel');
goog.require('lime.RoundedRect');

/**
 * @constructor
 * @extends lime.RoundedRect
 */
org.maths.ui.Panel = function() {

    goog.base(this);

    this.setRadius(0);
    this.setFill('#CCCCCC');
    //this.setStroke(3, '#888888');

};
goog.inherits(org.maths.ui.Panel, lime.RoundedRect);
