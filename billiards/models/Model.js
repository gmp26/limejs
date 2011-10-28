/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 09/10/2011
 * Time: 13:39
 * To change this template use File | Settings | File Templates.
 */
goog.provide('billiards.Model');
goog.require('org.maths.signals');
goog.require('billiards.utils');

/**
 * @param {org.maths.signals.signal} updated
 * @constructor
 */
billiards.Model = function(updated)  {
    this.pGreen = 0.5;
    this.greens_ = 0;
    this.reds_ = 0;
    this.updated = updated;
};
//goog.inherits(billiards.Model, Object);

billiards.Model.prototype.reset = function() {
    this.pGreen = Math.random();
    this.greens_ = 0;
    this.reds_ = 0;
    this.updated.dispatch(this);
}

billiards.Model.prototype.getGreens = function() {
    return this.greens_;
}
billiards.Model.prototype.setGreens = function(greens) {
    this.greens_ = greens;
    this.updated.dispatch(this);
}

billiards.Model.prototype.getReds = function() {
    return this.reds_;
}
billiards.Model.prototype.setReds = function(reds) {
    this.reds_ = reds;
    this.updated.dispatch(this);
}


/**
 * get estimated value of pGreen
 */
billiards.Model.prototype.getpGreenEst = function() {
    return (this.greens_ + 1)/(this.greens_ + this.reds_ + 2);
}

/**
 * get distribution of pGreen as a beta dist cdf
 * @param {number} x in [0..1]
 */
billiards.Model.prototype.cdf = function(x) {
    return billiards.utils.betaCDF(x, this.greens_+1, this.reds_+1);
}

/**
 * pRange gets probability of a < x < b
 * @param {number} a
 * @param {number} b
 */
billiards.Model.prototype.pRange = function(a,b) {
    a = Math.min(a,b);
    b = Math.max(a,b);
    return this.cdf(b) - this.cdf(a);
}