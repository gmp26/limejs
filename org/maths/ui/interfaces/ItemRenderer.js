/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 11:42
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.interfaces.ItemRenderer');
goog.require('lime.Sprite');

/**
 * The itemRenderer interface. Implementations should change their appearance when the data element changes
 * @interface
 * @param {*} data
 */
org.maths.ui.interfaces.ItemRenderer = function(data) {};

/**
 * get the data value
 * @return {*} data
 */
org.maths.ui.interfaces.ItemRenderer.prototype.getData = function() {};

/**
 * set the data value
 * @param {*}
 */
org.maths.ui.interfaces.ItemRenderer.prototype.setData = function(data) {};

org.maths.ui.interfaces.ItemRenderer.prototype.getItem = function() {};
