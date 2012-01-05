/**
 * User: gmp26
 * Date: 27/12/2011
 * Time: 21:35
 * Copyright University of Cambridge
 */

goog.provide('racer.views.RacePanel');
goog.require('lime.Layer');
goog.require('lime.Label');
goog.require('lime.Polygon');
goog.require('lime.Button');
goog.require('racer.model.Context');


/**
 * @param {racer.model.Context} application context
 * @constructor
 * @extends {lime.Layer}
 */
racer.views.RacePanel = function(context) {
    goog.base(this);

    this.context = context;

    this.buttons = new lime.Layer();
    var bSize = 30;
    var c = bSize*Math.cos(2*Math.PI/3);
    var s = bSize*Math.sin(2*Math.PI/3);

    var playUp = new lime.Polygon(bSize,0, c,s, c,-s)
        .setFill('#000')
        .setOpacity(0.5);
    var playDown = new lime.Polygon(bSize,0, c,s, c,-s)
        .setFill('#000')
        .setOpacity(1);
    this.playButton = new lime.Button(playUp, playDown)
        .setSize(30,30);
    this.buttons.appendChild(this.playButton);

    this.editFirst = new lime.Label('Edit tracks first and then race')
        .setSize(120,100);

    goog.events.listen(
        this.playButton,
        ["mousedown","touchstart"],
        function(e) {
            if (e.type == 'mousedown' || e.type == 'touchstart') {
                e.swallow(
                    ['mouseup', 'touchend'], goog.partial(
                        function(self) {
                            self.context.raceStarted.dispatch();
                        },
                        this
                    ),
                    true
                );
            }
        },
        true,
        this
    );
};
goog.inherits(racer.views.RacePanel, lime.Layer);

/**
 * Panel activated
 */
racer.views.RacePanel.prototype.wasAddedToTree = function() {
    goog.base(this, "wasAddedToTree");

    var count = this.context.countEditedTracks(5);
    this.removeAllChildren();
    if(count > 0) {
        this.appendChild(this.buttons);
    }
    else {
        this.appendChild(this.editFirst);
    }

    console.log("Racer added");
}