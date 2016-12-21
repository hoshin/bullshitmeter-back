import express from 'express';
import passport from 'passport';
const router = express.Router();
import formidable from 'formidable';

import {IndexController} from '../controllers/indexController.js';
const indexController = new IndexController();

const session = require('express-session');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

const config = require('../config/all.js');

const app = express();

app.use(session({ secret: 'Some Secret !!!', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

router.get('/', function (req, res, next) {
    res.render('scoreMeForm', {title: config.APP_TITLE});
});

router.get('/score-me', function (req, res, next) {
    res.json({score: indexController.receiveSound(req.body.sound)});
});

router.post('/sound', function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //FIXME: on répond avant la fin des callback. Tester de faire un res.write puis res.end dans les callback ?
        indexController.receiveSound(fields, files, function (err, result) {
          if(err) {
            console.log("error router ="+err);
          }
          console.log("final result = "+result);
          req.body.sentence = result;
          let grades = null;
          if(result) {
            grades = indexController.sentenceGrading(req);
          }
          
          res.json(grades);
        });
    });
});

router.post('/score-me', function (req, res, next) {
    req.body.sentence = JSON.stringify({text:req.body.sentence});
    const gradeData = indexController.sentenceGrading(req);
    if (req.body.client == 'web') {
        res.render('results', {title: config.APP_TITLE, data: gradeData})
    } else {
        res.json(gradeData);
    }
});

module.exports = router;
