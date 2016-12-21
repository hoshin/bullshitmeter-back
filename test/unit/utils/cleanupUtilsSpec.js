import {assert} from 'chai';
import {CleanupUtils} from '../../../utils/cleanupUtils';

describe('CleanupUtils - Remove Stop Words', function () {
    it('should not remove anything if no stop words are present', function () {
        //setup
        const cleanup = new CleanupUtils();
        const sentence = 'correct horse battery staple';
        //action
        const actual = cleanup.removeStopWords(sentence);
        //assert
        assert.equal(actual, 'correct horse battery staple');
    });

    it('should remove french stop words if they\'re present', function(){
        //setup
        const cleanup = new CleanupUtils();
        const sentence = 'le correct horse de la battery dans une staple';
        //action
        const actual = cleanup.removeStopWords(sentence);
        //assert
        assert.equal(actual, 'correct horse battery staple');
    });

});