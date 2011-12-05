/**
 * User: gmp26
 * Date: 05/12/2011
 * Time: 12:16
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.interfaces.ItemRendererFactory');
goog.require('org.maths.ui.interfaces.ItemRenderer');

/**
 * The itemRendererFactor interface. Implementations can create instances of ItemRenderers
 * @interface
 */
org.maths.ui.interfaces.ItemRendererFactory = function() {};

/**
 * create an itemRenderer
 * @return {org.maths.ui.interfaces.ItemRenderer}
 */
org.maths.ui.interfaces.ItemRendererFactory.prototype.createInstance = function() {};

