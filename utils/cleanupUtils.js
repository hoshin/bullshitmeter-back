import _ from 'lodash';
import stopwords from '../config/data/stopWords-FR.json';

class CleanupUtils {
    constructor() {
    }

    removeStopWords(sentence) {
        var splittedSentence = sentence.split(' ');
        var result =
                _.filter(splittedSentence, function (word) {
                    var endResult = true;
                    _.forEach(stopwords, function (stopWord) {
                        if (stopWord == word) {
                            endResult = false;
                        }
                    });
                    return endResult;
                });
        return result.join(' ');
    }
}
export {CleanupUtils};