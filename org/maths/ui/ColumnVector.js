/**
 * User: gmp26
 * Date: 01/11/2011
 * Time: 15:01
 * Copyright University of Cambridge
 */
goog.provide('org.maths.ui.ColumnVector');

goog.require('lime.Sprite');
goog.require('org.maths.ui.LabelInput');
goog.require('org.maths.signals');

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {org.maths.signals.Signal} touchedSignal
 * @constructor
 *
 */
org.maths.ui.ColumnVector = function(x,y, touchedSignal) {

    goog.base(this);
    
    this.x = x;
    this.y = y;
    this.touchedSignal = touchedSignal;


    this.highlight = new lime.RoundedRect()
        .setFill('#44CC00')
        .setSize(57, 80)
        .setOpacity(0);
    this.appendChild(this.highlight);

    this.leftPar = new lime.Label('(')
        .setFontSize(36)
        .setPosition(-23,-5)
        .setScale(1,2)
    this.appendChild(this.leftPar);

    this.rightPar = new lime.Label(')')
        .setFontSize(36)
        .setPosition(22,-5)
        .setScale(1,2);
    this.appendChild(this.rightPar);
    
    this.topLabel = new org.maths.ui.LabelInput(x.toString())
        .setAlign('center')
        .setFontSize(26)
        .setPosition(0,-17);
    this.appendChild(this.topLabel);

    this.bottomLabel = new org.maths.ui.LabelInput(y.toString())
        .setAlign('center')
        .setFontSize(26)
        .setPosition(0,23);
    this.appendChild(this.bottomLabel);

    this.setSize(57,80);

    if(goog.isDefAndNotNull(this.touchedSignal)) {
        goog.events.listen(this, ["mousedown", "touchstart"], this.touched, false, this);
    }

};
goog.inherits(org.maths.ui.ColumnVector, lime.Sprite);

/**
 * makes the ColumnVector Editable and Highlighted
 * @param {Boolean} isEditable
 * @return {org.maths.ui.ColumnVector} this
 */
org.maths.ui.ColumnVector.prototype.setEditable = function(isEditable) {
    this.highlight.setOpacity(isEditable ? 1 : 0);
    return this;
};

/**
 * @return {Boolean} true if editable
 */
org.maths.ui.ColumnVector.prototype.getEditable = function() {
    return this.highlight.getOpacity() !== 0;
};

org.maths.ui.ColumnVector.prototype.toggleEdit = function(event) {
    this.setEditable(!this.getEditable());
};

org.maths.ui.ColumnVector.prototype.touched = function(e) {
    if(goog.isDefAndNotNull(this.touchedSignal)) {
        if (e.type == 'mousedown' || e.type == 'touchstart') {
             e.swallow(['mouseup', 'touchend'], this.touchComplete);
        }
    }
};

org.maths.ui.ColumnVector.prototype.touchComplete = function(e) {
    e.release();
    this.touchedSignal.dispatch(this);
}

/**
 *
 * @param {Number} val
 * @return {org.maths.ui.ColumnVector} this
 */
org.maths.ui.ColumnVector.prototype.setX = function(val) {
    this.x = val;
    this.topLabel.setText(val.toString());
    return this;
}

/**
 * @return {Number}
 */
org.maths.ui.ColumnVector.prototype.getX = function() {
    return this.x;
}

/**
 *
 * @param {Number} val
 * @return {org.maths.ui.ColumnVector} this
 */
org.maths.ui.ColumnVector.prototype.setY = function(val) {
    this.y = val;
    this.bottomLabel.setText(val.toString());
    return this;
}

/**
 * @return {Number}
 */
org.maths.ui.ColumnVector.prototype.getY = function() {
    return this.y;
}

/**
 *
 * @param {Number} val
 * @return {org.maths.ui.ColumnVector} this
 */
org.maths.ui.ColumnVector.prototype.setData = function(val) {
    this.data_ = val;
    return this;
}

/**
 * @return {Number}
 */
org.maths.ui.ColumnVector.prototype.getData = function() {
    return this.data_;
}
