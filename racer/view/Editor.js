/**
 * User: gmp26
 * Date: 31/10/2011
 * Time: 22:47
 * Copyright University of Cambridge
 */
goog.provide('racer.views.Editor');
goog.require('lime.RoundedRect');
goog.require('org.maths.ui.ColumnVector');
goog.require('lime.ui.Scroller');
goog.require('lime.GlossyButton');
goog.require('org.maths.signals');
goog.require('racer.model.Track');
goog.require('goog.math.Vec2');

/**
 * @constructor
 * @param {string} colour
 * @param {goog.math.Vec2} initialPosition
 * @param {goog.math.Vec2} initialVelocity
 */
racer.views.Editor = function(colour, initialPosition, initialVelocity) {

    lime.RoundedRect.call(this);

    this.maxEmpty = 0;

    // Create region of scrolling vectors
    this.scroll = new lime.ui.Scroller()
        .setFill(colour)
        .setAnchorPoint(0, 0.5)
        .setPosition(-70,0)
        .setSize(140, 100);
    this.appendChild(this.scroll);

    // create array of columnVectors
    this.vectors = [];

    this.touchedSignal = new org.maths.signals.Signal();
    this.touchedSignal.add(this.toggleEdit, this);

    // initially create two dummy vectors to make sure first one is central
    this.makePadVector(0);
    this.makePadVector(1);

    // create first vector in track
    var vector = this.appendVector(0, this.touchedSignal);

    this.track = new racer.model.Track(initialPosition, initialVelocity);

    this.scroll.scrollTo(76*30);

    // Create inc and dec buttons for the selected vector
    for(var row=-1; row <= 1; row+=2) {
        for(var inc=-1; inc<=1; inc++) {
            var button = new lime.GlossyButton((inc >= 0 ? "+" : "") + inc)
                .setPosition(50*inc,44*row)
                .setColor('#44CC00')
                .setSize(44,44);
            button.row = row;
            button.delta = row < 0 ? new goog.math.Vec2(inc, 0) : new goog.math.Vec2(0, inc);
            this.appendChild(button);
            goog.events.listen(button, ["mousedown", "touchstart"], this.changeHandler, false, this);
        }
    }
};
goog.inherits(racer.views.Editor, lime.RoundedRect);

/**
 * appends an empty vector to the path, and selects it
 * @param {number} index of vector in panel
 */
racer.views.Editor.prototype.makePadVector = function(index) {
    var vector = new org.maths.ui.ColumnVector(0, 0, null)
        .setPosition(30*(index), 0)
        .setOpacity(index == 0 ? 0 : 0.5)
        .setScale(0.5,0.5);
    this.scroll.appendChild(vector);

    return vector;
};

/**
 * appends an empty vector to the path, and selects it
 * @param {number} index of vector in panel
 * @param {org.maths.signals.Signal} touchedSignal or null - the signal to dispatch when touched
 */
racer.views.Editor.prototype.appendVector = function(index, touchedSignal) {
    console.log("append "+index);
    var vector = new org.maths.ui.ColumnVector("", "", touchedSignal)
        .setPosition(30*(index+2), 0)
        .setData(index)
        .setScale(0.5,0.5);
    this.scroll.appendChild(vector);
    this.vectors.push(vector);

    return vector;
};

/**
 * Determines whether the ColumnVector id highlighted and editable
 *
 * @param {org.maths.ui.ColumnVector} vector
 */
racer.views.Editor.prototype.toggleEdit = function(vector) {
    var isEditable = vector.getEditable();
    if(isEditable) {
        vector.setEditable(false);
        this.cursor = null;
    }
    else {
        if(goog.isDefAndNotNull(this.cursor)) {
            this.cursor.setEditable(false);
        }
        if(vector.x === "" || vector.y === "") {

            if(this.maxEmpty < vector.getData()+1)
                this.maxEmpty = vector.getData()+1;
            else {
                console.log("weird");
            }

            // first time we have set up this vector. Append another
            var index = vector.getData();
            var prev = this.vectors[index-1];
            if(index > 0) {
                vector.setX(prev.x);
                vector.setY(prev.y);
            }
            else {
                vector.setX(this.track.initialVelocity.x);
                vector.setY(this.track.initialVelocity.y);
            }

            this.appendVector(vector.getData()+1, this.touchedSignal);
        }
        vector.setEditable(true);
        this.cursor = vector;
        console.log(vector.getPosition().x);
        this.scroll.scrollTo(10*vector.getPosition().x, 1);

    }
}

racer.views.Editor.prototype.changeHandler = function(event) {

    if(!goog.isDefAndNotNull(this.cursor))
        return;

    var index = this.cursor.getData();

    if(index == 0) {
        if(event.target.row < 0)
            this.cursor.setX(event.target.delta.x);
        else
            this.cursor.setY(event.target.delta.y);
    }
    else {
        var old = this.vectors[index-1];
        if(event.target.row < 0)
            this.cursor.setX(event.target.delta.x+old.x);
        else
            this.cursor.setY(event.target.delta.y+old.y);
    }
    return;

};

