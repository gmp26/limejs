/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 04/10/2011
 * Time: 22:59
 * To change this template use File | Settings | File Templates.
 */

goog.provide('billiards.scene.BilliardTable');

goog.require('billiards.scene.Room');
goog.require('billiards.Plan');
goog.require('billiards.Bell');
goog.require('billiards.Model');

//get requirements
goog.require('lime.Node');
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.scheduleManager');
goog.require('lime.RoundedRect');
goog.require('lime.Label');

// animations
goog.require('lime.animation.Delay')
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Animation');
goog.require('lime.animation.Easing');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.ColorTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.Event');

//uses signals
goog.require('org.maths.signals');



/**
 * Create the Welcome screen, and start loading resources
 * @constructor
 * @param {org.maths.signals.Signal} nextSceneSignal
 * @param {org.maths.signals.Signal} modelUpated
 * @extends lime.Scene
 */
billiards.scene.BilliardTable = function(nextSceneSignal, modelUpdated) {


    billiards.scene.Room.call(this, "BilliardTable", nextSceneSignal, modelUpdated);

    this.pausing = false;

    layer = new lime.Layer();
    this.appendChild(layer);

    this.whitePulled = false;

    this.backdrop = new lime.Sprite()
        .setFill('assets/billiardScene.jpg')
        .setAnchorPoint(0, 0);

    layer.appendChild(this.backdrop);

    this.greenButton = new lime.Sprite()
        .setAnchorPoint(0, 0)
        .setPosition(112, -50)
        .setScale(0.5, 0.5)
        .setFill('assets/bellpull/greenPull.png');
    //this.greenButton.name = "green pull";
    this.greenBell = new billiards.Bell(this.greenButton);//.init();

    layer.appendChild(this.greenButton);

    this.redButton = new lime.Sprite()
        .setAnchorPoint(0, 0)
        .setPosition(152, -50)
        .setScale(0.5, 0.5)
        .setFill('assets/bellpull/redPull.png');
    layer.appendChild(this.redButton);
    this.redBell = new billiards.Bell(this.redButton);//.init();

    this.whiteNote = new lime.Sprite()
        .setAnchorPoint(0, 0)
        .setPosition(10, 60)
        .setScale(1, 1)
        .setFill('assets/whiteNote.png');
    layer.appendChild(this.whiteNote);

    this.whiteBell = new billiards.Bell(this.whiteNote).setPosition(30, 56);//.init();
    layer.appendChild(this.whiteBell);
    goog.events.listen(this.whiteBell, "ManualBell", this.pullWhite, false, this);

    this.blackNote = new lime.Sprite()
        .setAnchorPoint(0, 0)
        .setPosition(52, 60)
        .setScale(1, 1)
        .setFill('assets/blackNote.png');

    layer.appendChild(this.blackNote);

    this.blackBell = new billiards.Bell(this.blackNote).setPosition(73, 56);//.init();
    layer.appendChild(this.blackBell);
    goog.events.listen(this.blackBell, "ManualBell", this.manualBell, false, this);


    this.closedDoor = new lime.Sprite()
        .setAnchorPoint(0,0)
        .setPosition(210, 80)
        .setFill('assets/closedDoor.jpg')
        .setOpacity(1);
    layer.appendChild(this.closedDoor);

    /*
    this.plan = new billiards.Plan()
        .setScale(0.25)
        .setPosition(10, 100);
    layer.appendChild(this.plan);
    */
    
    this.greenRect = new lime.RoundedRect()
        .setAnchorPoint(0,0)
        .setPosition(30, 360)
        .setFill('#00CC00')
        .setRadius(1)
        .setOpacity(0);
    layer.appendChild(this.greenRect);

    this.redRect = new lime.RoundedRect()
        .setAnchorPoint(0,0)
        .setPosition(30, 360)
        .setFill('#CC0000')
        .setRadius(1)
        .setOpacity(0);
    layer.appendChild(this.redRect);

    /* use this to check anchorpoint is at tip of cue
    var cue = this.cue;
    lime.scheduleManager.scheduleWithDelay(function() {
        cue.setRotation(cue.getRotation() - 5);
    }, 200);
    */

    this.statusMessage = new lime.Label('')
        .setAnchorPoint(0.5,0)
        .setPosition(160,300)
        .setFontColor('#FFF')
        .setSize(250,2)
        .setFontSize(14)
        .setOpacity(0);
    layer.appendChild(this.statusMessage);

    this.blackMessage = new lime.Label('')
        .setAnchorPoint(0.5, 0)
        .setPosition(160, 370)
        .setFontColor('#FFF')
        .setSize(250,1)
        .setFontSize(14)
        .setOpacity(0);
    layer.appendChild(this.blackMessage);

    var ballRadius = 10;

    this.whiteBall = new lime.Circle()
        .setSize(ballRadius, ballRadius)
        .setFill(255, 255, 255)
        .setPosition(50, 350);
    layer.appendChild(this.whiteBall);

    this.blackBall = new lime.Circle()
        .setSize(ballRadius, ballRadius)
        .setFill(0, 0, 0)
        .setPosition(50, 400);
    layer.appendChild(this.blackBall);

    // set up cue
    this.cue = new lime.Sprite().setFill('assets/iCue.png')
        .setAnchorPoint(0.5, 0)
        .setPosition(-10,320)
        .setRotation(-90);
    layer.appendChild(this.cue);

    var ball = this.whiteBall; // start with the white ball


    //goog.events.listen(this.greenButton, ['mousedown', 'touchstart'], billiards.pullHandler);
    //goog.events.listen(this.redButton, ['mousedown', 'touchstart'], billiards.pullHandler);
    goog.events.listen(this.closedDoor, ['mouseover', 'mousedown', 'touchstart'], this.doorHandler);


};
goog.inherits(billiards.scene.BilliardTable, billiards.scene.Room);

/**
 * This is called whenever we enter billiards room
 */
billiards.scene.BilliardTable.prototype.wasAddedToTree = function() {
    lime.Node.prototype.wasAddedToTree.call(this);

    //alert("Welcome to the billiards room");

    this.pausing = false;

    if(!this.whitePulled) {

        lime.scheduleManager.callAfter(
            this.whiteBell.animateRing,
            this.whiteBell,
            3000);
        lime.scheduleManager.callAfter(
            this.animateWhiteCue,
            this,
            3250);

        this.whitePulled = true;
    }
    else {
        this.drawZones();
        this.placeWhiteBall();
        this.simulateBlackPull();
    }
}

/**
 * pullOn
 * @param {goog.events.Event} event
 */
billiards.pullOn = function(pull) {

    if(pull.pulling) {
        return;
    }
    else {
        pull.pulling = true;
        pull.pullStopper = function(event) {
            pull.pulling = false;
        }
    }

    //var scene = pull.getScene();

    if(!pull.anim) {
        pull.anim = new lime.animation.Sequence(
            new lime.animation.MoveBy(0, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(0.5),
            new lime.animation.MoveBy(0, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(0.5)
        );
        goog.events.listen(pull.anim, lime.animation.Event.STOP, pull.pullStopper);
    }

    //alert(event.target.name)
    pull.runAction(pull.anim);
}

/**
 * pullHandler
 * @param {goog.events.Event} event
 */
billiards.pullHandler = function(event) {

    billiards.pullOn(event.target);

}

/**
 * animate cueing of white ball
 */
billiards.scene.BilliardTable.prototype.animateWhiteCue = function() {
    this.animateCue(this.whiteBall);
    lime.scheduleManager.callAfter(this.animateWhiteBall, this, 2100);
};


/**
 *
 * @param {lime.Sprite} ball
 */
billiards.scene.BilliardTable.prototype.animateCue = function(ball) {

    var ballStartPosition = ball.getPosition();

    var anim = new lime.animation.Sequence(
        new lime.animation.MoveTo(ballStartPosition.x - 10, ballStartPosition.y),
        new lime.animation.MoveBy(-10, 0),
        new lime.animation.MoveBy(60, 0).setDuration(0.2),
        new lime.animation.MoveTo(-10, ballStartPosition.y)
    );

    this.cue.runAction(anim);

//    return anim;
};

/**
 * animate cueing of black ball
 */
billiards.scene.BilliardTable.prototype.animateBlackCue = function() {
    if(this.pausing) {
        return;
    }
    this.animateCue(this.blackBall);
    lime.scheduleManager.callAfter(this.animateBlackBall, this, 2100);
};


billiards.scene.BilliardTable.prototype.animateWhiteBall = function() {
    var anim = this.animateBall(this.whiteBall);
    var scene = this;
    scene.redRect.setOpacity(0);
    scene.greenRect.setOpacity(0);
    scene.statusMessage.setOpacity(0);
    scene.blackMessage.setOpacity(0);
    goog.events.listen(anim, lime.animation.Event.STOP, function() {

        //alert("white stopped");
        billiards.model.reset();
        billiards.model.pGreen = scene.pGreen;

        scene.drawZones();

        scene.simulateBlackPull();
    })
};

billiards.scene.BilliardTable.prototype.drawZones = function() {
    // draw rectangles

    var pGreen = billiards.model.pGreen;
    var totalWidth = 290 - 30;
    var gw = pGreen*totalWidth;
    var rw = (1-pGreen)*totalWidth;
    var h = 60;
    this.greenRect
        .setSize(gw, h)
        .setOpacity(1);
    this.redRect
        .setSize(rw, h)
        .setPosition(30+gw, 360)
        .setOpacity(1);
    this.statusMessage.setText(
        'The probability of the black landing in the green zone is ' + (pGreen.toFixed(2))
    ).setOpacity(1);
}

/**
 * Simulate black pull
 */
billiards.scene.BilliardTable.prototype.simulateBlackPull = function() {

    this.blackBell.animateRing();
    this.blackMessage.setOpacity(0);
    lime.scheduleManager.callAfter(
        billiards.scene2.animateBlackCue,
        billiards.scene2,
        250);
}

billiards.scene.BilliardTable.prototype.animateBlackBall = function() {
    var anim = this.animateBall(this.blackBall);
    var scene = this;

    if(this.pausing) {
        return;
    }

    goog.events.listen(anim, lime.animation.Event.STOP, function() {

        if(scene.pausing) {
            return;
        }

        if(billiards.scene2 !== billiards.stage.getCurrentScene()) {
            return;
        }

        var msg = 'In ';
        var blackX = scene.blackBall.getPosition().x;
        //alert("bx = "+blackX+" g = "+ (30 + (290 - 30)*scene.pGreen));
        if(blackX > 30 + (290 - 30)*scene.pGreen) {
            msg += 'Red';
            // pull red
            billiards.pullOn(scene.redButton);
            billiards.scene3.redBell.remoteBellSound.play();

            // increment red count
            billiards.model.setReds(billiards.model.getReds() + 1);

        }
        else {
            msg += 'Green'
            // pull green
            billiards.pullOn(scene.greenButton);
            billiards.scene3.greenBell.remoteBellSound.play();

            // increment green count
            billiards.model.setGreens(billiards.model.getGreens() + 1);

        };
        lime.scheduleManager.callAfter(function() {
            this.blackMessage.setText(msg).setOpacity(1);
        }, scene, 100);

        if(billiards.scene2 === billiards.stage.getCurrentScene())
            lime.scheduleManager.callAfter(scene.simulateBlackPull, scene,5000);

    });

};

/**
 *
 * @param {lime.Sprite} ball
 */
billiards.scene.BilliardTable.prototype.animateBall = function(ball) {

    // determine start and end positions
    var start = 30;
    var end = 290;

    var traverses = Math.floor(2 + 3*Math.random());
    var r = Math.random();
    if(ball === this.whiteBall) {
        this.pGreen = r;
    }
    var restX = 30 + 260*r;
    var ballStartPosition = ball.getPosition();

    // create complete traverses
    var moves = [];
    var t = traverses;
    var dest = end;
    for(var i = 0; i < t; i++) {
        //alert("duraton = " + (Math.pow(2, -i)/Math.pow(2, 1-t)));
        moves[i] =
            new lime.animation.MoveTo(dest,ballStartPosition.y)
                .setEasing(lime.animation.Easing.LINEAR)
                .setDuration(Math.pow(2, i)/Math.pow(2, t-1));
       
        dest = (dest == start) ? end : start;
    };

    // create final move to rest
    moves[t] =
        new lime.animation.MoveTo(restX, ballStartPosition.y)
            .setDuration(2)
            .setEasing(lime.animation.Easing.EASEOUT);

    var anim = new lime.animation.Sequence(moves);
    ball.runAction(anim);
    return anim;

};


/**
 * place white ball according to pGreen. Needed when entering billiards room
 */
billiards.scene.BilliardTable.prototype.placeWhiteBall = function() {
    var ball = this.whiteBall;
    var position = ball.getPosition();
    position.x = 30 + 260*billiards.model.pGreen;
    ball.setPosition(position);
}

billiards.scene.BilliardTable.prototype.manualBell = function(event) {
    //alert("ManualBell");
    this.pausing = !this.pausing;
    if(!this.pausing) {
        this.simulateBlackPull();
    }
}

/**
 * pull White and reset model
 * @param model
 */

billiards.scene.BilliardTable.prototype.pullWhite = function(event) {
    this.pausing = !this.pausing;

    if(!this.pausing) {
            this.whiteBell.animateRing();
        lime.scheduleManager.callAfter(
            this.animateWhiteCue,
            this,
            250);

        this.whitePulled = true;
    }

    lime.scheduleManager.unschedule(billiards.timeMachine, event.target.getScene());
    billiards.model.reset();
}