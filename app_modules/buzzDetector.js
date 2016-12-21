const additionalWords = require( '../config/data/moreBuzz.json');
import _ from 'lodash';
import buzzword from 'buzzwords';
import {CleanupUtils} from '../utils/cleanupUtils.js';
const cleanupUtils = new CleanupUtils();

class BuzzDetector{
    constructor(){
        _.forEach(additionalWords, function (additionalWord) {
            buzzword.add(additionalWord.toLowerCase());
        });
    }

    amIBuzzing(sentence) {
        //diacritics / punctuation removal before ?
        const sentenceToGrade = sentence.toLowerCase();
        const buzzPressionsMatches = [];
        _.forEach(additionalWords, function (additionalWord) {
            if (additionalWord.indexOf(' ') > -1) {
                if (sentenceToGrade.indexOf(additionalWord) > -1) {
                    buzzPressionsMatches.push(additionalWord);
                }
            }
        });
        const cleanedWords = cleanupUtils.removeStopWords(sentenceToGrade);
        const words = cleanedWords.split(' ');
        const buzzWords = _.filter(words, function (word) {
            console.log("hyperlocal", word, buzzword.is(word));
            return(buzzword.is(word));
        });
        return buzzWords.concat(buzzPressionsMatches);
    }

    buzzPerTotalwords(sentence) {
        const cleanedWords = cleanupUtils.removeStopWords(sentence);
        const totalBuzz = this.amIBuzzing(sentence);
        const computedRatio = (totalBuzz.length / cleanedWords.split(' ').length);
        return {ratio: computedRatio, suspects: totalBuzz};
    };
}

export {BuzzDetector};