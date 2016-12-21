import {assert} from 'chai';
import {SentenceGradeLevel} from '../../../app_modules/sentenceGradeLevel.js';

describe('Sentence Grade Level', function(){
    it('should give a grade to a sentence', function(){
        //setup
        const sentenceGrader = new SentenceGradeLevel('ma nouvelle phrase qui est super');
        //action
        const actual = sentenceGrader.grade();
        //assert
        assert.equal(Math.floor(actual*1000)/1000, 5.246);
    });

});

