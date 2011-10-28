/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 16:26
 * To change this template use File | Settings | File Templates.
 */
goog.provide('org.maths.Panel')

goog.require('lime.RoundedRect')
goog.require('lime.Label')

/**
 * @constructor
 * @param {String} title
 */
org.maths.Panel = function(title) {

    lime.RoundedRect.call(this);

    this.label = new lime.Label(title);
    this.appendChild(this.label);

    /*
     * Following code 'works' but doesn't do what we want!
     */
    /*
    var orientationChange = goog.partial(function(self, event) {
        switch(goog.global.orientation) {
            case 0:
                // Portrait
                self.setRotation(0);
                break;

            case 180:
                // Upside-down Portrait
                self.setRotation(-180);
                break;

            case -90:
                // Landscape: turned 90 degrees counter-clockwise
                self.setRotation(90);
                break;

            case 90:
                // Landscape: turned 90 degrees clockwise
                self.setRotation(-90);
                break;
        }
    }, this);

    goog.events.listen(goog.global, "orientationchange", orientationChange);
    */
    
}
goog.inherits(org.maths.Panel, lime.RoundedRect);


/**
 *
 * @param {goog.events.Event} event
 */
org.maths.Panel.prototype.orientationChange = function(event) {
    alert(event.type);
    switch(goog.global.orientation) {
        case 0:   // Portrait
        case 180: // Upside-down Portrait
            // Javascript to setup Portrait view
            break;
        case -90: // Landscape: turned 90 degrees counter-clockwise
        case 90:  // Landscape: turned 90 degrees clockwise
            // Javascript to setup Landscape view
            break;
    }
}