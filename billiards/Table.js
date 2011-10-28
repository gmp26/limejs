/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 30/09/2011
 * Time: 21:54
 */
goog.provide('billiards.Table');

goog.require('lime.Sprite');
goog.require('goog.math.Size');

/**
 * Create the billiards table sprite
 * @constructor
 * @param {*} fill Fill.
 * @param {?number} opt_cushion Width of the cushion
 * @extends lime.Sprite
 */
billiards.Table = function(fill, opt_cushion) {

    // call super
    lime.Sprite.call(this);
    this.cushionWidth = opt_cushion || 27;
    this.fill = fill;

};
goog.inherits(billiards.Table, lime.Sprite);

/**
 * Sets new position for element. Also accepts 2 numbers(x and y value)
 * @param {(goog.math.Coordinate|number)} value Position coordinate.
 * @param {number=} opt_y Optionally set position using x,y.
 * @return {billiards.Table} the table Sprite.
 */
billiards.Table.prototype.initWithPosition = function(position, opt_y) {
    this.setFill(this.fill);
    return this.setPosition(position, opt_y);
};

/**
 * gets inner dimensions of table
 * @return {goog.math.Size} inner size
 */
billiards.Table.prototype.getInnerSize = function() {
    var size = this.getSize();
    var inset = 2*this.cushionWidth;
    return new goog.math.Size(size.width - inset, size.height - inset);
}
