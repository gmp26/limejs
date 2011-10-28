/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 07/10/2011
 * Time: 14:16
 * To change this template use File | Settings | File Templates.
 */
goog.provide('billiards.Plan');

//goog.require('billiards');

goog.require('lime.Sprite');
goog.require('lime.Button');
goog.require('lime.transitions.Transition');

/**
 * @constructor
 * @extends {lime.Sprite}
 */
billiards.Plan = function() {

    // super init
    lime.Sprite.call(this);

    this //.setFill('assets/plan.png')
        .setAnchorPoint(0,0);

    var studioOver = new lime.Sprite()
        .setFill('assets/planStudyOver.png')
        .setAnchorPoint(0,0);
    var studioNormal = new lime.Sprite()
        .setFill('assets/planStudyNormal.png')
        .setAnchorPoint(0,0);

    var billiardsOver = new lime.Sprite()
        .setFill('assets/planBilliardsOver.png')
        .setAnchorPoint(0,0);
    var billiardsNormal = new lime.Sprite()
        .setFill('assets/planBilliardsNormal.png')
        .setAnchorPoint(0,0);

    this.studioButton = new lime.Button(studioNormal, studioOver)
        .setAnchorPoint(0,0)
        .setPosition(0,0);
    this.appendChild(this.studioButton);

    this.billiardsButton = new lime.Button(billiardsNormal, billiardsOver)
        .setAnchorPoint(0,0)
        .setPosition(0,144);
    this.appendChild(this.billiardsButton);

    goog.events.listen(this.studioButton, lime.Button.Event.UP, this.gotoStudy);
    goog.events.listen(this.billiardsButton, lime.Button.Event.UP, this.gotoBilliards);

};
goog.inherits(billiards.Plan, lime.Sprite);

billiards.Plan.prototype.gotoStudy = function(event) {
    var scene = event.target.getScene();
    if(scene !== billiards.scene3) {
        billiards.stage.replaceScene(billiards.scene3, lime.transitions.Dissolve);
    }
};

billiards.Plan.prototype.gotoBilliards = function(event) {
    var scene = event.target.getScene();
    if(scene !== billiards.scene2) {
        billiards.stage.replaceScene(billiards.scene2, lime.transitions.Dissolve);
    }
};