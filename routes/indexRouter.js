import formidable from 'formidable';

import {IndexController} from '../controllers/indexController.js';
const indexController = new IndexController();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

const config = require('../config/all.js');

module.exports.routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            res.view('scoreMeForm.ejs', {title: config.APP_TITLE});
        }
    },
    {
        method: 'GET',
        path: '/stylesheets/style.css',
        handler:  (req, res) => {
            res.file('./public/stylesheets/style.css');
        }
    },
    {
        method: 'GET',
        path: '/bootstrap/dist/css/bootstrap.min.css',
        handler:  (req, res) => {
            res.file('./public/js/bootstrap/css/bootstrap.min.css');
        }
    },
    {
        method: 'GET',
        path: '/jquery/dist/jquery.min.js',
        handler:  (req, res) => {
            res.file('./public/js/jquery.min.js');
        }
    },
    {
        method: 'GET',
        path: '/images/01-no-bullshit.png',
        handler:  (req, res) => {
            res.file('./public/images/01-no-bullshit.png');
        }
    },
    {
        method: 'GET',
        path:'/score-me',
        handler:(req, res) => {
            res.json({score: indexController.receiveSound(req.body.sound)});
        }
    },
    {
        method: 'GET',
        path:'/sound',
        handler:(req, res) => {
            const form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                //FIXME: on répond avant la fin des callback. Tester de faire un res.write puis res.end dans les callback ?
                indexController.receiveSound(fields, files, function (err, result) {
                    if (err) {
                        console.log('error router =' + err);
                    }
                    console.log('final result = ' + result);
                    req.body.sentence = result;
                    let grades = null;
                    if (result) {
                        grades = indexController.sentenceGrading(req);
                    }

                    res.json(grades);
                });
            });
        }
    },
    {
        method: 'POST',
        path: '/score-me',
        handler: (req, res) => {
            req.payload.sentence = JSON.stringify({text: req.payload.sentence});
            const gradeData = indexController.sentenceGrading(req);
            if (req.payload.client == 'web') {
                res.view('results', {title: config.APP_TITLE, data: gradeData})
            } else {
                res.json(gradeData);
            }
        }
    }
];
