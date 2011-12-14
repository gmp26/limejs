/**
 * User: gmp26
 * Date: 31/10/2011
 * Time: 22:47
 * Copyright University of Cambridge
 */
goog.provide('racer.views.Editor');
goog.require('lime.RoundedRect');
//goog.require('lime.ui.Scroller');
goog.require('org.maths.ui.ColumnVector');
goog.require('org.maths.ui.Scroller');
goog.require('lime.Sprite');
goog.require('lime.Button');
goog.require('lime.GlossyButton');
goog.require('lime.fill.LinearGradient');
goog.require('org.maths.signals');
goog.require('racer.model.Context');
goog.require('racer.model.CourseInfo');
goog.require('racer.model.Track');
goog.require('goog.math.Vec2');

/**
 * @constructor
 * @param {racer.model.Context} context
 */
racer.views.Editor = function(context) {

    // super
    goog.base(this);

    this.context = context;

    /** {racer.CourseInfo} */
    var courseInfo = racer.model.Courses[context.courseIndex];

    /** {racer.ColourInfo} */
    var colourInfo = courseInfo.colours[context.colourIndex];

    /** {number} */
    this.scrollIndex = 1;

    /** {string} */
    var colour = colourInfo.colour;


    this.setFill(colour);

    this.track = new racer.model.Track(colourInfo.start, new goog.math.Vec2(0,0));

    this.fill = new lime.fill.LinearGradient()
        .setDirection(0,0,1,0.01)
        .addColorStop(0,'#444')
        .addColorStop(0.05,'#EEE')
        .addColorStop(0.5,'#FFF')
        .addColorStop(0.95,'#EEE')
        .addColorStop(1,'#444');

    // Create region of scrolling vectors
    this.scroll = new org.maths.ui.Scroller()//new org.maths.ui.Scroller()
        .setStroke(2, '#000')
        .setAnchorPoint(0, 0.5)
        .setPosition(-80+(160-90)/2,0)
        .setSize(90, 44)
        .setFill(this.fill);
    this.appendChild(this.scroll);

    // create array of columnVectors
    this.vectors = [];

    this.touchedSignal = new org.maths.signals.Signal();
    this.touchedSignal.add(this.toggleEdit, this);

    // initially create two dummy vectors to make sure first one is central
    this.makePadVector(0);

    // create first vector in tracks
    var vector = this.appendVector(0, this.touchedSignal);
    this.toggleEdit(vector);

    // Create inc and dec buttons for the selected vector
    for(var row=-1; row <= 1; row+=2) {
        for(var inc=-1; inc<=1; inc+=2) {
            var button = new lime.GlossyButton((inc >= 0 ? "+" : "-") )
                .setPosition(25*inc,44*row)
                .setColor('#44CC00')
                .setSize(44,44);
            button.upstate.label.setFontSize(36);
            button.downstate.label.setFontSize(36);
            button.row = row;
            button.delta = row < 0 ? new goog.math.Vec2(inc, 0) : new goog.math.Vec2(0, inc);
            this.appendChild(button);
            goog.events.listen(button, ["mousedown", "touchstart"], this.changeHandler, false, this);
        }
    }

    // Create left scroller button
    var leftUp = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/leftUp.png');
    var leftDown = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/leftDown.png');
    var leftButton = new lime.Button(leftUp, leftDown)
        .setPosition(-80+20, 0);
    this.appendChild(leftButton);

    // Create right scroller button
    var rightUp = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/rightUp.png');
    var rightDown = new lime.Sprite()
        .setScale(0.5)
        .setFill('assets/rightDown.png');
    var rightButton = new lime.Button(rightUp, rightDown)
        .setPosition(80-20, 0);
    this.appendChild(rightButton);

    this.scrollTo(1, 2);

    goog.events.listen(leftButton, ["mousedown","touchstart"], this.scrollLeft, true, this);
    goog.events.listen(rightButton, ["mousedown","touchstart"], this.scrollRight, true, this);
};
goog.inherits(racer.views.Editor, lime.RoundedRect);

/**
 * appends an empty vector to the path, and selects it
 * @param {number} index of vector in panel
 */
racer.views.Editor.prototype.makePadVector = function(index) {
    var vector = new org.maths.ui.ColumnVector(0, 0, null)
        .setPosition(30*(index), 0)
        .setOpacity(0.5) //index == 0 ? 0 : 0.5)
        .setScale(0.5,0.5);
    this.scroll.appendChild(vector);

    return vector;
};

/**
 * appends an empty editable vector to the path
 * @param {number} index of vector in panel
 * @param {org.maths.signals.Signal} touchedSignal or null - the signal to dispatch when touched
 */
racer.views.Editor.prototype.appendVector = function(index, touchedSignal) {
    console.log("append "+index);
    var vector = new org.maths.ui.ColumnVector("", "", touchedSignal)
        .setPosition(30*(index+1), 0)
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

    if(vector.getEditable()) {
        vector.setEditable(false);
        this.track.selected = null;
        this.cursor = null;
        return;
    }

    if(goog.isDefAndNotNull(this.cursor)) {
        this.cursor.setEditable(false);
    }
    if(vector.x === "" || vector.y === "") {

/*
        if(this.maxEmpty < vector.getData()+1)
            this.maxEmpty = vector.getData()+1;
        else {
            console.log("weird");
        }
*/
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

         // save delta in track
         // TODO: understand why a possibly void index is better than vector.getData() here
         this.track.setDeltaAt(new goog.math.Vec2(0,0), index);

        this.scrollTo(index, 2);
    }
    vector.setEditable(true);
    this.cursor = vector;
    this.track.selected = vector.getData();


    // ripple changes downstream
    this.updateTrackView();

    //console.log(vector.getPosition().x);
    //this.scroll.scrollTo(10*vector.getPosition().x, 1);

};

/**
 * deselects current selection
 */
racer.views.Editor.prototype.deselect = function() {

    if(goog.isDefAndNotNull(this.cursor)) {
        console.log("deselect "+this.cursor.getData());
        this.cursor.setEditable(false);
        this.cursor = null;
        this.track.selected = null;
    }
};

/**
 * selects given index
 */
racer.views.Editor.prototype.select = function(index) {
    this.deselect();
    console.log("select "+index);
    this.cursor = this.vectors[index];
    this.cursor.setEditable(true);
    this.track.selected = index;
}

racer.maxDelta = 2;

racer.views.Editor.prototype.changeHandler = function(event) {

    if(!goog.isDefAndNotNull(this.cursor))
        return;

    var index = this.cursor.getData();

    /** {goog.math.Vec2} */
    var old = new goog.math.Vec2(0, 0);
    if(index > 0) {
        var oldv = this.vectors[index-1];
        old.x = oldv.x;
        old.y = oldv.y;
    }

    if(event.target.row < 0) {
        var newx = this.cursor.x + event.target.delta.x;
        if(Math.abs(newx-old.x) > racer.maxDelta)
            return;
        this.cursor.setX(newx);
    }
    else {
        var newy = this.cursor.y + event.target.delta.y;
        if(Math.abs(newy-old.y) > racer.maxDelta)
            return;
        this.cursor.setY(newy);
    };

    // save delta in track
    /** {goog.math.Vec2} */
    var delta = new goog.math.Vec2(this.cursor.x, this.cursor.y)
            .subtract(old);
    this.track.setDeltaAt(delta, index);

    // ripple changes downstream
    this.updateTrackView();

    return;

};

racer.views.Editor.prototype.updateTrackView = function() {

    /** {racer.WayPoints} */
    var wayPoints = this.track.wayPoints();

    var len = wayPoints.length;
    for(var i=1; i < len; i++) {
        var v = this.vectors[i-1];

        /** {racer.WayPoint} */
        var wp = wayPoints[i];
        v.setX(wp.velocity.x);
        v.setY(wp.velocity.y);
    }

    this.context.trackUpdated.dispatch(this.context, this.track);
};

racer.views.Editor.prototype.scrollLeft = function(e) {
    if (e.type == 'mousedown' || e.type == 'touchstart') {
        e.event.stopPropagation();
        e.swallow(['mouseup', 'touchend'], this.scrollLeftComplete);
    }
};

racer.views.Editor.prototype.scrollRight = function(e) {
    if (e.type == 'mousedown' || e.type == 'touchstart') {
        e.event.stopPropagation();
        e.swallow(['mouseup', 'touchend'], this.scrollRightComplete);
    }
};

racer.views.Editor.prototype.scrollLeftComplete = function(e) {
    e.event.stopPropagation();
    e.release();

    var editor = this.getParent();
    if(editor.scrollIndex > 0)
        --editor.scrollIndex;

    editor.scroll.scrollTo(editor.scrollIndex);
    editor.select(editor.scrollIndex);

    console.log("scrollTo "+editor.scrollIndex);
};

racer.views.Editor.prototype.scrollRightComplete = function(e) {
    e.event.stopPropagation();
    e.release();

    var editor = this.getParent();
    if(editor.scrollIndex < editor.vectors.length-1)
        ++editor.scrollIndex;

    editor.scrollTo(editor.scrollIndex-1);
    editor.select(editor.scrollIndex-1);

    console.log("scrollTo "+(editor.scrollIndex-1));
};

/**
 * scroll to a vector index
 * @param index of the columnVector to scroll to
 * @opt_duration optional duration of scroll in seconds
 */
racer.views.Editor.prototype.scrollTo = function(index, opt_duration) {
    var duration = opt_duration || 0;
    this.scroll.scrollTo(index*30, duration);
}


