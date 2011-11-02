/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 16:26
 * To change this template use File | Settings | File Templates.
 */
goog.provide('org.maths.Panel')

goog.require('lime.RoundedRect')
goog.require('org.maths.ui.LabelInput')

/**
 * @constructor
 * @param {String} title
 */
org.maths.Panel = function(title) {

    lime.RoundedRect.call(this);

    this.label = new org.maths.ui.LabelInput(title)
        .setEditable(true);
    this.appendChild(this.label);

}
goog.inherits(org.maths.Panel, lime.RoundedRect);

