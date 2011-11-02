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
goog.require('org.maths.signals');

/**
 * @constructor
 * @param {String} title
 */
racer.views.Editor = function(title) {

    lime.RoundedRect.call(this);

    var scroll = new lime.ui.Scroller()
        .setFill('#fff')
        .setAnchorPoint(0, 0.5)
        .setPosition(-70,0)
        .setSize(140, 100);
    this.appendChild(scroll);

    /*
    var box = new lime.Sprite().setFill('#00c').setSize(10, 20);
    scroll.appendChild(box);

    box = new lime.Sprite().setFill('#00c').setSize(100, 20).setPosition(120,0);
    scroll.appendChild(box);

    box = new lime.Sprite().setFill('#00c').setSize(100, 20).setPosition(240,0);
    scroll.appendChild(box);

    box = new lime.Sprite().setFill('#00c').setSize(100, 20).setPosition(360,0);
    scroll.appendChild(box);
    */

    this.touchedSignal = new org.maths.signals.Signal();
    this.touchedSignal.add(this.toggleEdit);

    for(var i=0; i < 99; i++) {
        var vector = new org.maths.ui.ColumnVector(i,i+1, this.touchedSignal)
            .setPosition(30*i, 0)
            .setData(i)
            .setScale(0.5,0.5);
        scroll.appendChild(vector);
    }

    scroll.scrollTo(77*30);

}
goog.inherits(racer.views.Editor, lime.RoundedRect);

racer.views.Editor.prototype.toggleEdit = function(vector) {
    vector.setEditable(!vector.getEditable());
}

