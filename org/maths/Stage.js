/**
 * User: gmp26
 * Date: 28/10/2011
 * Time: 11:04
 * Copyright University of Cambridge
 */
goog.provide('org.maths.Stage');
goog.require('lime.Director');
goog.require('lime.animation.ScaleTo')
goog.require('lime.animation.MoveTo')

/**
 * org.maths.Stage is a lime.Director which reconfigures its layout depending on device
 * orientation. lime.Director only scales the display to fit the device.
 *
 * Stage also scales itself to fit the device, however if the user chooses a landscape
 * device orientation then Stage will ensure it is wider than high before scaling to fit.
 * Similarly, in portrait orientation, Stage ensures its height is greater than its width
 * before scaling.
 *
 * An assigned stage size (width and height) may therefore be interpreted as (height and width)
 * depending on the device orientation.
 *
 * When device orientation changes, Stage notifies its children so they may relayout their
 * content to fit.
 *
 * @param {Element} parentElement Parent element for stage.
 * @param {number=} opt_width Optionaly define what width/height the stage should have.
 * @param {number=} opt_height Optionaly define what height/width the stage should have.
 * @constructor
 * @extends lime.Director
 */
org.maths.Stage = function(parentElement, opt_width, opt_height) {

    //alert(goog.orientation);

    var width, parentSize = goog.style.getSize(parentElement);
    //alert("" + parentSize.width + " " + parentSize.height);

    this.originalSize = new goog.math.Size(
        width = arguments[1] || parentSize.width || lime.Director.DEFAULT_WIDTH,
        arguments[2] || parentSize.height * width / parentSize.width || lime.Director.DEFAULT_HEIGHT
    );

    // call super (originalSize must be defined as this calls invalidateSize_ 
    goog.base(this, parentElement, opt_width, opt_height);

}
goog.inherits(org.maths.Stage, lime.Director);

org.maths.Stage.prototype.invalidateSize_ = function() {
    // alert("resize");

    // completely override super
    // goog.base(this, "invalidateSize_");

    // calculate the screen area we can fill
    var screenSize = goog.style.getSize(this.domElement.parentNode);

    // copied from lime.Director - maybe this compensates for any horizontal scrollbar?
    if (this.domElement.parentNode == document.body) {
        window.scrollTo(0, 0);
        if (goog.isNumber(window.innerHeight)) {
            screenSize.height = window.innerHeight;
        }
    }

    var portrait = (screenSize.height >= screenSize.width);

    var size = (portrait ? this.getPortraitSize() : this.getLandscapeSize());
    this.setSize(size);

    var realSize = size.clone().scaleToFit(screenSize);

    var scale = realSize.width / this.getSize().width;
    //this.runAction(new lime.animation.ScaleTo(scale));
    this.setScale(scale);

    if (screenSize.aspectRatio() < realSize.aspectRatio()) {
        //this.runAction(new lime.animation.MoveTo(0, (screenSize.height - realSize.height) / 2));
        this.setPosition(0, (screenSize.height - realSize.height) / 2);
    }
    else {
        //this.runAction(new lime.animation.MoveTo((screenSize.width - realSize.width) / 2, 0));
        this.setPosition((screenSize.width - realSize.width) / 2, 0);
    }

    this.updateDomOffset_();

    // ### copied from lime.Director. No idea what's going on -- gmp26
    //
    // overflow hidden is for hiding away unused edges of document
    // height addition is because scroll(0,0) doesn't work any more if the
    // document has no edge @tonis todo:look for less hacky solution(iframe?).
    if(goog.userAgent.MOBILE && this.domElement.parentNode==document.body){
        if(this.overflowStyle_) goog.style.uninstallStyles(this.overflowStyle_);
        this.overflowStyle_ = goog.style.installStyles(
            'html{height:'+(screenSize.height+120)+'px;overflow:hidden;}');
    }

    // Tell the current scene to update its size (and possibly layout its content again)
    var scene = this.getCurrentScene();
    if(goog.isDefAndNotNull(scene)) {
        scene.setSize(size);
    }
}

/**
 * Returns the stage dimension for landscape display
 * @return {goog.math.Size}
 */
org.maths.Stage.prototype.getLandscapeSize = function() {
    var size = this.originalSize.clone();
    if(size.width < size.height) {
        this.swapSize(size);
    }
    return size;
}

/**
 * Returns the stage dimension for portrait display
 * @return {goog.math.Size}
 */
org.maths.Stage.prototype.getPortraitSize = function() {
    var size = this.originalSize.clone();
    if(size.width >= size.height) {
        this.swapSize(size);
    }
    return size;
}

org.maths.Stage.prototype.swapSize = function(size) {
    var w = size.width;
    size.width = size.height;
    size.height = w;
}