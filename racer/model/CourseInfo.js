/**
 * User: gmp26
 * Date: 30/11/2011
 * Time: 14:43
 * Copyright University of Cambridge
 */
goog.provide('racer.model.CourseInfo');
goog.require('goog.math.Vec2');

/** @typedef {{colour:string, start: goog.math.Vec2}} */
racer.ColourInfo;

/** @typedef {{name:string, mapUrl:string, colours:Array.<racer.ColourInfo>, gridSize:number, origin:goog.math.Vec2}} */
racer.CourseInfo;

/** @type {Array.<racer.CourseInfo>} */
racer.model.Courses = [
    {
        name: 'Practice',
        mapUrl: 'assets/Intro2.png',
        colours: [
            {
                colour:'#EE2200',
                highlight:'#CC6644',
                start: new goog.math.Vec2(-8,-6.4)
            },
            {
                 colour:'#0044FF',
                 highlight:'#46C',
                 start: new goog.math.Vec2(-8,-6.4)
            }
        ],
        gridSize: 20.3,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Game 1',
        mapUrl: 'assets/Charlie.png',
        colours: [
            {
                 colour:'#4466CC',
                 highlight:'#0044FF',
                 start: new goog.math.Vec2(10.7,-1.7)
            },
            {
                colour:'#CC6644',
                highlight:'#FF0000',
                start: new goog.math.Vec2(11.7,-1.7)
            }
        ],
        gridSize: 20.3,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Game 2',
        mapUrl: 'assets/Showjumping.png',
        colours: [
            {
                 colour:'#77BB22',
                 highlight: '#00FF00',
                 start: new goog.math.Vec2(-10.1,3.1)
            },
            {
                 colour:'#4466CC',
                 highlight:'#0044FF',
                 start: new goog.math.Vec2(-11.1,4.1)
            },
            {
                colour:'#CC6644',
                highlight:'#FF0000',
                start: new goog.math.Vec2(-12.1,5.1)
            }
        ],
        gridSize: 20.5,
        origin: new goog.math.Vec2(0,0)
    }

];