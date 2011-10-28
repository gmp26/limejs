// set main namespace
goog.provide('billiards');

// get requirements
goog.require('lime.Director');

// app requirements
goog.require('billiards.Model');
goog.require('billiards.scene.Startup');
goog.require('billiards.scene.BilliardTable');
goog.require('billiards.scene.BackRoom');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
goog.require('lime.scheduleManager');

// animations
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

// transitions
goog.require('lime.transitions.SlideInUp');
//goog.require('lime.transitions.SlideInDown');
//goog.require('lime.transitions.SlideInLeft');
goog.require('lime.transitions.Dissolve');


// utils
goog.require('goog.debug');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.math.Size');


// signals
goog.require('org.maths.signals');

// entry point
billiards.start = function() {

    // set the dimensions to iPhone portrait allowing for 20px status bar
    billiards.stage = new lime.Director(document.body, 320, 460);

    billiards.stage.setDisplayFPS(false);

    // create the signal handling screen switching
    billiards.nextSceneSignal = new org.maths.signals.Signal();
    billiards.nextSceneSignal.add(billiards.gotoNextScene);

    // create the model and set its updated signal
    billiards.modelUpdated = new org.maths.signals.Signal();
    billiards.model = new billiards.Model(billiards.modelUpdated);

    // create the scenes
    billiards.scene1 = new billiards.scene.Startup(billiards.nextSceneSignal);
    billiards.scene2 = new billiards.scene.BilliardTable(billiards.nextSceneSignal, billiards.modelUpdated);
    billiards.scene3 = new billiards.scene.BackRoom(billiards.nextSceneSignal, billiards.modelUpdated);

	lime.scheduleManager.setDisplayRate(1000 / 60);

	billiards.stage.makeMobileWebAppCapable();


	// set current scene active
	billiards.stage.replaceScene(billiards.scene1);

}

/**
 * Go to next scene
 * @param {string} lastScene name
 */
billiards.gotoNextScene = function(lastScene) {
    switch(lastScene) {
        case "Startup":
            //alert('go to billiardsScene');
            billiards.stage.replaceScene(billiards.scene2, lime.transitions.SlideInUp);

            break;
        case "BilliardTable":
            //alert('go to back room');
            billiards.stage.replaceScene(billiards.scene3, lime.transitions.Dissolve);
            break;
        case "BackRoom":
            //alert('go to billiards room');
            billiards.stage.replaceScene(billiards.scene2, lime.transitions.Dissolve);
            break;
        default:
            alert('unknown last scene');
    }
}


// old entry point
billiards.oldStart = function(){

    /*
    // Create the debug window.
    var debugWindow = new goog.debug.FancyWindow('main');
    debugWindow.setEnabled(true);
    debugWindow.init();

    // Create a logger.
    var theLogger = goog.debug.Logger.getLogger('demo');
    theLogger.info('Logging examples');
    */

    /*
    var test;
    test = billiards.utils.betaCDF(0.5,2,1);
    test = billiards.utils.betaCDF(0.5,2,3);
    test = billiards.utils.betaCDF(0.5,2,4);
    */

    // ball config
    var ballRadius= 10;

	var director = new lime.Director(document.body,320,480);

    var scene = new lime.Scene();

    var stageSize = director.getSize();
    var stageWidth = stageSize.width;
    var stageHeight = stageSize.height;

    var target = new lime.Layer().setPosition(stageWidth, stageHeight/2);
    var backdrop = new lime.Sprite().setFill('assets/backdrop.png').setSize(2*stageWidth, stageHeight).setPosition(0,0);

    // table config
/*
    var tablePadding = 10; // x and y offset to table top left corner
    var table = new billiards.Table('assets/iTable.png');
    table.initWithPosition(-stageWidth+tablePadding+table.tableWidth/2, 0);
    var tableWidth = table.getSize().width;
    var tableHeight = table.getSize().height;
    var tableInnerHeight = table.getInnerSize().height;
*/

    var tablePadding = 10; // x and y offset to table top left corner
    var cushionWidth = 27;

    // set up table
    var tableFill = new lime.fill.Image('assets/iTable.png');
    var table;
    var tableWidth;
    var tableHeight;
    var tableInnerHeight;

    var positionTable = function(e) {
        tableFill.removeEventListener(goog.events.EventType.LOAD, positionTable);
        table = new lime.Sprite().setFill(tableFill);
        tableWidth = table.getSize().width;
        tableHeight = table.getSize().height;
        tableInnerHeight = tableHeight - 2*cushionWidth;
        table.setPosition(-stageWidth+tablePadding+tableWidth/2, 0);
    };
    tableFill.addEventListener(goog.events.EventType.LOAD, positionTable);
    if(tableFill.isLoaded()) {
        positionTable();
    }

    // set up cue
    var cue = new lime.Sprite().setFill('assets/iCue.png');
    cue.setPosition(0,60+cue.getSize().height/2);

    var whiteBall = new lime.Circle().setSize(ballRadius, ballRadius).setFill(255, 255, 255).setPosition(0, 30);

    var blackBall = new lime.Circle().setSize(ballRadius, ballRadius).setFill(0, 0, 0).setPosition(0, 30);

    var ball = whiteBall; // start with the white ball

    /** {lime.Label} */
    var title = new lime.Label().setFontSize(20).setText('Bayes Billiard Table').setOpacity(1).setPosition(0, -150).setFontColor('#FFF').setSize(100,1);

    scene.setRenderer(lime.Renderer.DOM);

    //add circle and label to target object
    target.appendChild(backdrop);
    backdrop.appendChild(table);
    table.appendChild(ball);
    table.appendChild(cue);
    table.appendChild(title);

    //add target to the scene
    scene.appendChild(target);

	director.makeMobileWebAppCapable();

    // set up the Queue animation
    var cueAnimation = new lime.animation.Sequence(
            new lime.animation.MoveBy(0,tableHeight*0.07).setDuration(1).setEasing(lime.animation.Easing.EASEOUT),
            new lime.animation.MoveBy(0,-tableHeight*0.2).setDuration(0.2).setEasing(lime.animation.Easing.EASEIN),
            new lime.animation.Spawn(
                new lime.animation.MoveBy(tableWidth*0.5, tableHeight*2).setDuration(3).setEasing(lime.animation.Easing.EASEIN),
                new lime.animation.RotateBy(10).setDuration(3).setEasing(lime.animation.Easing.EASEOUT)
                )
        );

    // First time through we restrict the white ball to the 0.25 to 0.75 zone.
    // Later we allow the full 0 to 1 range

    var pGreen;
    var pRed;

    /** {function()} */
    var init = function() {
        pGreen = pGreen ? Math.random() : 0.25 + 0.5*Math.random();
        pRed = 1 - pGreen;
    }

    init();

    /** {lime.animation.Animation} */
    var finalBallAnimation = new lime.animation.MoveTo(0, (tableInnerHeight/2 + ballRadius)*(2*pRed-1)).
           setDuration(4).setEasing(lime.animation.Easing.EASEOUT);
    if(pRed < 0.5) {
        finalBallAnimation = new lime.animation.Sequence(
            new lime.animation.MoveTo(0, -tableInnerHeight/2 - ballRadius).setDuration(3).setEasing(lime.animation.Easing.LINEAR),
            finalBallAnimation
        )
    }

    /** {number} */
    var margin = 35;

    /** {goog.math.Size} */
    var redSize = new goog.math.Size(tableWidth - margin, (tableHeight - margin + 0.5) * pRed);

    /** {goog.math.Size} */
    var greenSize = new goog.math.Size(tableWidth - margin, (tableHeight - margin + 0.5) * (1 - pRed));

    /** {lime.RoundedRect} */
    var redZone = new lime.RoundedRect()
        .setSize(redSize)
        .setFill(255,0,0,0.75)
        .setPosition(0,(redSize.height - tableHeight + margin)/2);

    /** {lime.RoundedRect} */
    var greenZone = new lime.RoundedRect()
        .setSize(greenSize)
        .setFill(80,255,0,0.75)
        .setPosition(0,(tableHeight - greenSize.height - margin)/2);

    /** {lime.Label} */
    var greenLabel = new lime.Label()
        .setFontSize(20)
        .setText('Probability that the next black ball will land in the green area is ' + (1 - pRed).toFixed(2))
        .setOpacity(0)
        .setFontColor('#080')
        .setSize(160,1).
        setPosition(0,-40);

    /** {lime.animation.Animation} */
    var whiteFadeOut = new lime.animation.FadeTo(0).setDuration(5);

    // Set up final Run of the black ball
    /** {number} */
    var p = Math.random();

    /** {lime.animation.Animation} */
    var finalRun = new lime.animation.MoveTo(0, (tableInnerHeight/2 + ballRadius)*(2*p-1)).
           setDuration(4).setEasing(lime.animation.Easing.EASEOUT);
    if(p < 0.5) {
        finalRun = new lime.animation.Sequence(
            new lime.animation.MoveTo(0, -tableInnerHeight/2 - ballRadius).setDuration(3).setEasing(lime.animation.Easing.LINEAR),
            finalRun
        )
    }


    // Do table partition when white ball comes to rest
    goog.events.listen(finalBallAnimation, lime.animation.Event.STOP, function(event) {
         table.appendChild(redZone);
         table.appendChild(greenZone);

         greenZone.appendChild(greenLabel);
         ball.runAction(whiteFadeOut);
         greenLabel.runAction(new lime.animation.FadeTo(1).setDuration(1));

     });

    // Cue up the black ball when white ball fades out
    goog.events.listen(whiteFadeOut, lime.animation.Event.STOP, function(event) {
        table.appendChild(blackBall);
        table.removeChild(cue);
        cue.setPosition(0,60+cue.getSize().height/2).setRotation(0);
        table.appendChild(cue);
        ball = blackBall;
        cueEventHandler();
    });

    // When the black ball stops, set up the white again
    goog.events.listen(finalRun, lime.animation.Event.STOP, function(event) {

        var msg;
        if((1-p) < (1-pRed)) {
            msg = "It did. "; // + (1-p) +" " + (1-pRed) + " "
        }
        else {
            msg = "It didn't. "; // + (1-p) +" " + (1-pRed) + " ";
        }
        //blackBall.setPosition(-ballRadius, -ballRadius);

        var endMessage = new lime.Label().setFontSize(20).setText(msg + "Let's leave the room to our assistant. He'll start again with the white ball and communicate with us using the bell pulls.").setOpacity(1).setPosition(0, -150).setFontColor('#FFF').setSize(150,1);
        table.appendChild(endMessage);

    });

    // Cue touched event handler
    var cueEventHandler = function() {
        //animate
        cue.runAction(cueAnimation);

        if(ball === whiteBall) {
            ball.runAction(new lime.animation.Sequence(
               new lime.animation.Delay().setDuration(1.15),
               new lime.animation.MoveTo(0,-tableInnerHeight/2 - ballRadius).setDuration(0.5).setEasing(lime.animation.Easing.LINEAR),
               new lime.animation.MoveTo(0, tableInnerHeight/2 + ballRadius).setDuration(2).setEasing(lime.animation.Easing.LINEAR),
               finalBallAnimation
            ));
        }
        else {
            // ball is blackBall
            /** {number} */
            var p = Math.random();

            ball.runAction(new lime.animation.Sequence(
               new lime.animation.Delay().setDuration(1.15),
               new lime.animation.MoveTo(0,-tableInnerHeight/2 - ballRadius).setDuration(0.5).setEasing(lime.animation.Easing.LINEAR),
               new lime.animation.MoveTo(0, tableInnerHeight/2 + ballRadius).setDuration(2).setEasing(lime.animation.Easing.LINEAR),
               finalRun
            ));
        }

        title.runAction(new lime.animation.FadeTo(0));
    };

    // kick off animation on cue touch
    goog.events.listen(cue,['mousedown','touchstart'], cueEventHandler);

	// set current scene active
	director.replaceScene(scene);

};



//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('billiards.start', billiards.start);
