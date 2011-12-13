/**
 * User: gmp26
 * Date: 13/12/2011
 * Time: 21:24
 * Copyright University of Cambridge
 */
goog.provide('racer.views.renderers.ColourRendererFactory');
goog.require('racer.views.renderers.ColourRenderer');

/**
 * The ColourRendererFactor interface.
 * @interface
 */
racer.views.renderers.ColourRendererFactory = function() {};

/**
 * create a ColourRenderer
 * @return {racer.views.renderers.ColourRenderer}
 */
racer.views.renderers.ColourRendererFactory.prototype.createInstance = function() {
    return new racer.views.renderers.ColourRenderer();
};
