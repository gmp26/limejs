/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 06/10/2011
 * Time: 10:49
 * To change this template use File | Settings | File Templates.
 */
goog.provide('billiards.scene.Room');

goog.require('lime.Scene');
goog.require('lime.scheduleManager');
goog.require('org.maths.signals');

/**
 * @constructor
 * @param {string} name
 * @param {org.maths.signals.Signal} nextSceneSignal
 * @param {org.maths.signals.Signal} modelUpated
 * @extends lime.Scene
 */
billiards.scene.Room = function(name, nextScreenSignal, modelUpdated) {

    // call super constructor
    lime.Scene.call(this);

    this.name = name;
    this.nextSceneSignal = nextScreenSignal;
    this.modelUpdated = modelUpdated;
};
goog.inherits(billiards.scene.Room, lime.Scene);

/**
 * animate opening the room door
 */
billiards.scene.Room.prototype.openTheDoor = function() {
    if(goog.isDef(this.closedDoor)) {
        this.closedDoor.setOpacity(0.1);
    }
    if(goog.isDef(this.openDoor)) {
        this.openDoor.setOpacity(1);
    }
};

/**
 * animate opening the room door
 */
billiards.scene.Room.prototype.closeTheDoor = function() {
    if(goog.isDef(this.closedDoor)) {
        this.closedDoor.setOpacity(1);
    }
    if(goog.isDef(this.openDoor)) {
        this.openDoor.setOpacity(0);
    }
};


billiards.scene.Room.prototype.doorHandler = function(event) {
    var scene = event.target.getScene();

    if(event.type === 'mouseover') {
        scene.openTheDoor();
        event.swallow('mouseout', function(e) {
            scene.closeTheDoor();
            e.release();
        });
        event.swallow('mousedown', function(e) {
            scene.closeTheDoor();
            lime.scheduleManager.unschedule(billiards.timeMachine, scene);
            scene.nextSceneSignal.dispatch(scene.name);
            e.release();
        });
    }
    else if(event.type === 'touchstart') {
        scene.openTheDoor();
        lime.scheduleManager.callAfter(scene.closeTheDoor, scene, 5000);
        lime.scheduleManager.unschedule(billiards.timeMachine, scene);
        scene.nextSceneSignal.dispatch(scene.name);
    }
}
