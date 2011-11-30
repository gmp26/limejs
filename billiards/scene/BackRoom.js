/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 04/10/2011
 * Time: 22:59
 * To change this template use File | Settings | File Templates.
 */

goog.provide('billiards.scene.BackRoom');
goog.require('billiards.Bell');
goog.require('billiards.scene.Room');
goog.require('billiards.Model');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.RoundedRect');
goog.require('lime.GlossyButton');
goog.require('lime.scheduleManager');

goog.require('lime.animation.Delay');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Event');

//uses signals
goog.require('org.maths.signals');

billiards.boxCount = 50;
billiards.boxWidth = 220/billiards.boxCount;

/**
 * Create the Welcome screen, and start loading resources
 * @constructor
 * @param {org.maths.signals.Signal} nextSceneSignal
 * @param {org.maths.signals.Signal} modelUpated
 * @extends lime.Scene
 */
billiards.scene.BackRoom = function(nextSceneSignal, modelUpdated) {

    billiards.scene.Room.call(this, "BackRoom", nextSceneSignal, modelUpdated);

    this.modelUpdated.add(this.updateScene, this);

    layer = new lime.Layer();
    this.appendChild(layer);

    this.backdrop = new lime.Sprite()
        .setFill('assets/BackRoomScene.jpg')
        .setAnchorPoint(0, 0);

    layer.appendChild(this.backdrop);

    this.table = new lime.Sprite()
        .setFill('assets/tableTop.jpg')
        .setAnchorPoint(0,0)
        .setPosition(0,257);
    layer.appendChild(this.table);

    this.clock = new lime.Sprite()
        .setFill('assets/clock.jpg');
        //.setPosition(160, 150);

    this.bigHand = new lime.Sprite()
        .setFill('assets/clockBigHand.png')
        //.setAnchorPoint(10,10)
        .setPosition(0,0)
        .setRotation(90);
    this.clock.appendChild(this.bigHand);

    this.smallHand = new lime.Sprite()
        .setFill('assets/clockSmallHand.png')
        //.setAnchorPoint(10,10)
        .setPosition(0,0)
        .setRotation(-30);
    this.clock.appendChild(this.smallHand);

    this.clockButton = new lime.Button(this.clock, this.clock)
        .setAnchorPoint(0,0)
        .setPosition(65,45)
        .setScale(0.7,0.7);
    layer.appendChild(this.clockButton);


    this.blackButton = new lime.Sprite()
        .setAnchorPoint(0, 0)
        .setPosition(233, -50)
        .setScale(0.5, 0.5)
        .setFill('assets/bellpull/blackPull.png');
    this.blackBell = new billiards.Bell(this.blackButton);

    layer.appendChild(this.blackButton);

    this.whiteButton = new lime.Sprite()
        .setAnchorPoint(0, 0)
        .setPosition(265, -50)
        .setScale(0.5, 0.5)
        .setFill('assets/bellpull/whitePull.png');
    this.whiteBell = new billiards.Bell(this.whiteButton);
    layer.appendChild(this.whiteButton);


    this.redRect = new lime.RoundedRect()
        .setAnchorPoint(0,0)
        .setSize(40,60)
        .setRadius(3)
        .setFill('#CC0000')
        .setStroke(2, '#000')
        .setPosition(180,60);
    layer.appendChild(this.redRect);

    this.redScorePad = new lime.RoundedRect()
        .setSize(30,30)
        .setRadius(2)
        .setFill('#EEEEEE')
        .setStroke(1,'#888888')
        .setPosition(20,40);
    this.redRect.appendChild(this.redScorePad);

    this.redCount = new lime.Label("0")
        .setFontSize(12);
    this.redScorePad.appendChild(this.redCount);

    this.redBell = new billiards.Bell()
        .setAnchorPoint(0,0)
        .setPosition(200,56);
    layer.appendChild(this.redBell);

    this.greenRect = new lime.RoundedRect()
        .setAnchorPoint(0,0)
        .setSize(40,60)
        .setRadius(3)
        .setFill('#00CC00')
        .setStroke(2, '#000')
        .setPosition(138,60);

    this.greenScorePad = new lime.RoundedRect()
        .setSize(30,30)
        .setRadius(2)
        .setFill('#EEEEEE')
        .setStroke(1,'#888888')
        .setPosition(20,40);
    this.greenRect.appendChild(this.greenScorePad);

    this.greenCount = new lime.Label("0")
        .setFontSize(12);
    this.greenScorePad.appendChild(this.greenCount);

    layer.appendChild(this.greenRect);

    this.greenBell = new billiards.Bell()
        .setAnchorPoint(0,0)
        .setPosition(158,56);
    layer.appendChild(this.greenBell);

    this.openDoor = new lime.Sprite()
        .setAnchorPoint(0,0)
        .setPosition(28, 68)
        .setFill('assets/doorOpeningIn.png')
        .setOpacity(0)
        .setScale(1,0.99);
    layer.appendChild(this.openDoor);

    this.closedDoor = new lime.Sprite()
        .setAnchorPoint(0,0)
        .setPosition(28, 80)
        .setFill('assets/backRoomClosedDoor.jpg')
        .setOpacity(1)
        .setScale(1,0.99);
    layer.appendChild(this.closedDoor);

    this.model = billiards.model;

    this.graph = new lime.Node()
        .setPosition(160, 420)
        .setScale(1, -1);
    layer.appendChild(this.graph);

    for(i = 0; i < billiards.boxCount; i++) {
        var point = new lime.RoundedRect()
            .setSize(0,0)
            .setPosition((i - billiards.boxCount/2)*billiards.boxWidth, 0)
            .setRadius(0);
        this.graph.appendChild(point);
    }
/*
    this.estLabel = new lime.Label('Probability of black landing in green zone is ')
        .setFontSize(12)
        .setSize(140,2)
        .setAlign('right')
        .setPosition(110,300);
    layer.appendChild(this.estLabel);
*/
    this.estNumerator = new lime.Label('1')
        .setFontSize(12)
        .setSize(70,1)
        .setPosition(205,305);
    layer.appendChild(this.estNumerator);

    this.fracBar = new lime.RoundedRect()
        .setPosition(205,320)
        .setFill('#000')
        .setSize(30,1)
        .setRadius(0)
    layer.appendChild(this.fracBar);

    this.decimal = new lime.Label('= 0.5')
        .setFontSize(12)
        .setSize(100,1)
        .setPosition(245,315);
    layer.appendChild(this.decimal);

    this.estDenominator = new lime.Label('2')
        .setFontSize(12)
        .setSize(70,1)
        .setPosition(205,325);
    layer.appendChild(this.estDenominator);

    // create colour rectangles
    this.shader = new lime.Node()
        .setPosition(160,422);
    this.shader.name = "shader";
    layer.appendChild(this.shader);

    for(i = 0; i < billiards.boxCount; i++) {
        var rect = new lime.RoundedRect()
            .setAnchorPoint(0,0)
            .setSize(billiards.boxWidth+0.5,10)
            .setRadius(0)
            .setPosition((i - billiards.boxCount/2)*billiards.boxWidth, 0)
//            .setStroke(0.5,'#888')
            .setFill('rgb('+i*200/billiards.boxCount + ',' + (billiards.boxCount-i)*200/billiards.boxCount + ', 0)');
        this.shader.appendChild(rect);
    }

    var scene = this;

    billiards.timeMachine = function() {

        if(Math.random() < billiards.model.pGreen) {
            billiards.model.setGreens(billiards.model.getGreens() + 1);
        }
        else {
            billiards.model.setReds(billiards.model.getReds() + 1);
        }

//          alert(this.name);
//        var scene = that;
        var bigHand = scene.bigHand;
        var r = bigHand.getRotation();
        bigHand.setRotation(r-6);

        var smallHand = scene.smallHand;
        var r = smallHand.getRotation();
        smallHand.setRotation(r-6/12);
    };

    this.bellDelay = new lime.animation.Delay().setDuration(2+3*Math.random());
    goog.events.listen(this.bellDelay, lime.animation.Event.STOP, function(event) {
        if(Math.random() < billiards.model.pGreen) {
            billiards.model.setGreens(billiards.model.getGreens() + 1);
            scene.greenBell.animateRing();
        }
        else {
            billiards.model.setReds(billiards.model.getReds() + 1);
            scene.redBell.animateRing();
        }
        var bigHand = scene.bigHand;
        var r = bigHand.getRotation();
        bigHand.setRotation(r-6);

        var smallHand = scene.smallHand;
        var r = smallHand.getRotation();
        smallHand.setRotation(r-6/12);
    });


    goog.events.listen(this.clockButton, ['mousedown','touchstart'], function(event) {
        var scene = event.target.getScene();

        event.swallow(['touchend'], function(e) {
            e.release();
        });

        if(scene.going) {
            scene.going = false;
            lime.scheduleManager.unschedule(billiards.timeMachine, scene);
        }
        else {
            scene.going = true;
            lime.scheduleManager.schedule(billiards.timeMachine, scene);
        }
    });

    goog.events.listen(this.closedDoor, ['mouseover','touchstart'], this.doorHandler);
    goog.events.listen(this.whiteButton, ['mousedown', 'touchstart'], billiards.scene.BackRoom.pullWhite);
    goog.events.listen(this.blackButton, ['mousedown', 'touchstart'], billiards.scene.BackRoom.pullBlack);

};
goog.inherits(billiards.scene.BackRoom, billiards.scene.Room);

/**
 * This is called whenever we enter study
 */
billiards.scene.BackRoom.prototype.wasAddedToTree = function() {
    lime.Node.prototype.wasAddedToTree.call(this);
    //alert("Welcome to the study");
}




/**
 * pull White and reset model
 * @param model
 */
billiards.scene.BackRoom.pullWhite = function(event) {
    lime.scheduleManager.unschedule(billiards.timeMachine, event.target.getScene());
    billiards.model.reset();
    billiards.pullHandler(event);
}

/**
 * pull Black
 * @param model
 */
billiards.scene.BackRoom.pullBlack = function(event) {
    /*
    if(Math.random() < billiards.model.pGreen) {
        billiards.model.setGreens(billiards.model.getGreens() + 1);
    }
    else {
        billiards.model.setReds(billiards.model.getReds() + 1);        
    }
    */
    var scene = event.target.getScene();
    lime.scheduleManager.unschedule(billiards.timeMachine, scene);
    scene.runAction(scene.bellDelay);
    billiards.pullHandler(event);
}


/**
 * Update the scene
 * @param {billiards.Model} model
 */
billiards.scene.BackRoom.prototype.updateScene = function(model) {
    this.greenCount.setText(model.getGreens());
    this.redCount.setText(model.getReds());
    this.estNumerator.setText(model.getGreens() + " + " + 1);
    this.estDenominator.setText(model.getGreens() + model.getReds() + " + " + 2);

    var maxpdf = 0;

    var pdfs = [];
    for(i=0; i < this.shader.getNumberOfChildren(); i++) {
        rect = this.shader.getChildAt(i);
        var pos = rect.getPosition();
        var x = i/billiards.boxCount;
        var pdf = model.pRange(x, x+1/billiards.boxCount);
        pdfs[i] = -pdf;
        maxpdf = Math.max(pdf, maxpdf);
        var cdf = model.cdf(x);
        rect.setFill('rgb(' + Math.round(cdf*200) + ',' + Math.round((1-cdf)*200) + ', 0)');
    }

    maxpdf = Math.max(maxpdf,0.3);
    for(i = 0; i < billiards.boxCount; i++) {
         var point = this.graph.getChildAt(i);
         var x = (i - billiards.boxCount/2)*billiards.boxWidth;
         var y = pdfs[i]*80/maxpdf;
         var z = i/billiards.boxCount;
         var cdf = model.cdf(z);
         point
            .setAnchorPoint(0,0)
            .setPosition(x, 0)
            .setSize(billiards.boxWidth+0.5, -y)
            .setFill('rgb(' + Math.round(cdf*200) + ',' + Math.round((1-cdf)*200) + ', 0)');
         this.decimal.setText("= " + ((model.getGreens() + 1)/(model.getGreens() + model.getReds() + 2)).toFixed(2) );
     }
}