import {SentenceGradeLevel} from '../app_modules/sentenceGradeLevel';
import {BuzzDetector} from '../app_modules/buzzDetector';
const buzzDetector = new BuzzDetector();
import {GoogleSpeechApi} from '../app_modules/googleSpeechApi';
const speechApi = new GoogleSpeechApi();

class IndexController {
    constructor() {

    }

    scorePhrase(sentence) {
        return buzzDetector.buzzPerTotalwords(sentence);
    }

    receiveSound(sound, files, callback) {
        const soundPath = files['myUpload']['path'];
        speechApi.readSound(soundPath, function (err, recognizedText) {
            callback(err, JSON.stringify({"text": recognizedText}));
        });
    }

    sentenceGrading(req) {
        const actualText = JSON.parse(req.body.sentence).text;
        const fleschKincaid = new SentenceGradeLevel(actualText);

        const buzz = buzzDetector.buzzPerTotalwords(actualText);
        const fkGrade = fleschKincaid.grade();
        const gradingDetails = {
            buzzwords       : buzz.suspects,
            ratio           : buzz.ratio,
            grade           : Math.min(fkGrade / 2 + buzz.ratio * fkGrade, 20),
            'flesch-kincaid': fkGrade,
            recognized_text : actualText
        };

        console.log("gradingDetails = " + gradingDetails.ratio);
        console.log("gradingDetails = " + gradingDetails.grade);
        console.log("gradingDetails = " + gradingDetails['flesch-kincaid']);
        console.log("gradingDetails = " + gradingDetails.recognized_text);

        return gradingDetails;
    }
}

export {IndexController};
