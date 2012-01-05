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
        mapUrl: 'assets/Intro3.png',
        colours: [
            {
                colour:'#EE2200',
                highlight:'#CC6644',
                start: new goog.math.Vec2(-7.9,-6.5)
            },
            {
                 colour:'#0044FF',
                 highlight:'#46C',
                 start: new goog.math.Vec2(-7.9,-6.5)
            }
        ],
        gridSize: 20.1,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Game 1',
        mapUrl: 'assets/game1.png',
        mapPdf: 'assets/game1.pdf',
        colours: [
            {
                 colour:'#0044FF',
                 highlight:'#88AADD',
                 start: new goog.math.Vec2(11.0,-1.9)
            },
            {
                colour:'#EE2200',
                highlight:'#CC6644',
                start: new goog.math.Vec2(12.0,-1.9)
            }
        ],
        gridSize: 20.2,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Game 2',
        mapUrl: 'assets/game2.png',
        mapPdf: 'assets/game2.pdf',
        colours: [
            {
                colour:'#EE2200',
                highlight:'#CC6644',
                start: new goog.math.Vec2(-13.9,6.0)
            },
            {
                colour:'#0044FF',
                highlight:'#4466CC',
                start: new goog.math.Vec2(-12.9,5.0)
            },
            {
                colour:'#00DD00',
                highlight: '#77BB22',
                start: new goog.math.Vec2(-11.9,4.0)
            },
            {
                colour:'#DE9927',
                highlight:'#BBAA44',
                start: new goog.math.Vec2(-10.9,3.0)
            },
            {
                colour:'#A5509F',
                highlight:'#BB44AA',
                start: new goog.math.Vec2(-9.9,2.0)
            }
        ],
        gridSize: 20.55,
        origin: new goog.math.Vec2(0,0)
    },
    {
        name: 'Game 3',
        mapUrl: 'assets/game3.png',
        mapPdf: 'assets/game3.pdf',
        colours: [
            {
                 colour:'#0044FF',
                 highlight:'#88AADD',
                 start: new goog.math.Vec2(-14.0,-12.9)
            },
            {
                colour:'#EE2200',
                highlight:'#CC6644',
                start: new goog.math.Vec2(-13.0,-13.9)
            }
        ],
        gridSize: 20.4,
        origin: new goog.math.Vec2(0,0)
    }

];