import fleschKincaid from 'flesch-kincaid';
import syllable from 'syllable';
import {CleanupUtils} from '../utils/cleanupUtils';
const cleanupUtils = new CleanupUtils();

class SentenceGradeLevel {
    constructor(sentence) {
        this.sentence = cleanupUtils.removeStopWords(sentence);
    }

    grade() {
        let syllable_count = 0;
        this.sentence.split(' ').forEach(function (entry) {
            syllable_count += syllable(entry);
        });
        const word_count = this.sentence.split(' ').length;

        return fleschKincaid({
            'sentence': 1,
            'word'    : word_count,
            'syllable': syllable_count
        });
    }
}
export {SentenceGradeLevel}