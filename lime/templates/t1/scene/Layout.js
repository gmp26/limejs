/**
 * Created by JetBrains WebStorm.
 * User: gmp26
 * Date: 26/10/2011
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */
goog.provide('{name}.scene.Layout');

goog.require('lime.Scene');
goog.require('lime.Layer');

goog.require('org.maths.signals');
goog.require('org.maths.ui.Panel');

//goog.require('{name}.model.Context');

goog.require('lime.RoundedRect');

//goog.require('{name}.view.Panel1');
//goog.require('{name}.view.Panel2');
//goog.require('{name}.view.Main');

/**
 * @constructor
 * @extends lime.Scene
 */
{name}.scene.Layout = function() {

    // super
    goog.base(this);

    //this.context = new {name}.model.Context();

    var layer = new lime.Layer();
    this.appendChild(layer);

    this.main = new org.maths.ui.Panel()
        .setFill('#EEF')
        .setStroke(3,'#FFB')
        .setSize(320,320);
    layer.appendChild(this.main);

    this.panel1 = new org.maths.ui.Panel()
        .setFill('#DFD')
        .setStroke(3,'#FFB')
        .setSize(160,160);
    layer.appendChild(this.panel1);

    this.panel2 = new org.maths.ui.Panel()
        .setFill('#FDD')
        .setStroke(3,'#FFB')
        .setSize(160,160);
    layer.appendChild(this.panel2);

    this.appendChild(layer);

};
goog.inherits({name}.scene.Layout, lime.Scene);


/**
 * Set the scene size and layout content
 * @param {(goog.math.Size|number)} value Elements new size.
 * @param {number=} opt_height Optionaly use widht,height as parameter.
 * @return {{name}.scene.Layout} this scene
 */
{name}.scene.Layout.prototype.setSize = function(value, opt_height) {

    var oldSize = this.getSize();
    var size;
    if (arguments.length == 2) {
        size = new goog.math.Size(arguments[0], arguments[1]);
    }
    else {
        size = value;
    }

    // super.setSize(size) 
    goog.base(this, "setSize", size);


    // setSize gets called before the constructor has finished, so need to check
    // that children exist before laying them out.
    if(goog.isDefAndNotNull(this.main)) {

        this.main.setPosition(160,160);

        var portrait = (size.height >= size.width);

        if(portrait) {
            // Portrait
            this.panel1.setPosition(80,400);
            this.panel2.setPosition(240,400);

        }
        else {
            // Landscape
            this.panel1.setPosition(400,80);
            this.panel2.setPosition(400,240);
        }

    }
    return this;
};
