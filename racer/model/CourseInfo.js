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
        name: 'Intro',
        mapUrl: 'assets/Charlie.png',
        colours: [
            {
                colour:'#CC6644',
                highlight:'#FF0000',
                start: new goog.math.Vec2(-12,5)
            },
           {
                colour:'#4466CC',
                highlight:'#0044FF',
                start: new goog.math.Vec2(-11,4)
           },
           {
                colour:'#77BB22',
                highlight: '#00FF00',
                start: new goog.math.Vec2(-10,3.1)
           }
        ],
        gridSize: 10.4,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Nadia',
        mapUrl: 'assets/Showjumping.png',
        colours: [
            {
                colour:'#CC6644',
                highlight:'#FF0000',
                start: new goog.math.Vec2(-12,5)
            },
           {
                colour:'#4466CC',
                highlight:'#0044FF',
                start: new goog.math.Vec2(-11,4)
           },
           {
                colour:'#77BB22',
                highlight: '#00FF00',
                start: new goog.math.Vec2(-10,3.1)
           }
        ],
        gridSize: 10.4,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Charlie',
        mapUrl: 'assets/Charlie.png',
        colours: [
            {
                colour:'#CC6644',
                highlight:'#FF0000',
                start: new goog.math.Vec2(-12,5)
            },
           {
                colour:'#4466CC',
                highlight:'#0044FF',
                start: new goog.math.Vec2(-11,4)
           },
           {
                colour:'#77BB22',
                highlight: '#00FF00',
                start: new goog.math.Vec2(-10,3.1)
           }
        ],
        gridSize: 10.4,
        origin: new goog.math.Vec2(0,0)
    }

];