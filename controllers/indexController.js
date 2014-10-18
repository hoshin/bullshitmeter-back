var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var buzzDetector = new(require('../app_modules/buzzDetector'))();

var IndexController = function () {

};

IndexController.prototype.scorePhrase = function (sentence) {
    return buzzDetector.buzzPerTotalwords(sentence);
};

IndexController.prototype.receiveSound = function (sound, files) {
    var sound = files['soundFile'];

    //console.log('sound='+sound)
    //TODO : this is broken
    fs.writeFile("/tmp/voice.m4a", sound, {encoding : "binary"}, function(err) {
        if(err) {
            console.log(err);
        }
    });
    return JSON.stringify({"status": "ok"});
};

IndexController.prototype.sentenceGrading = function (req) {
    var fleschKincaid = new SentenceGradeLevel(req.body.sentence);
    var gradingDetails = {
        buzz: buzzDetector.buzzPerTotalwords(req.body.sentence), fleschKincaid:fleschKincaid.grade()
    };
    return gradingDetails;
};

module.exports = IndexController;
