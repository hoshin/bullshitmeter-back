import {assert} from 'chai';
import {BuzzDetector} from '../../../app_modules/buzzDetector.js';

describe('AmIBuzzing', function () {
    it('should return 0 if no buzzwords are detected', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.amIBuzzing('some random sentence with unicorns in it');
        //assert
        assert.equal(actual.length, 0);
    });

    it('should return 3 if 3 buzzwords are found', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.amIBuzzing('some random sentence with unicorns that grow under headlights and paradigm');
        //assert
        assert.equal(actual.length, 3);
    });

    it('should detect custom words added by the app', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.amIBuzzing('some random sentence with synergie and agile');
        //assert
        assert.equal(actual.length, 2);
    });

    it('should detect custom composed buzzwords', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.amIBuzzing('société de l\'information');
        //assert
        assert.equal(actual.length, 1);
    });

    it('should detect custom composed buzzwords and a single buzzword', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.amIBuzzing('société de l\'information des entreprises du monde agile');
        //assert
        assert.equal(actual.length, 2);
    });
});

describe('BuzzPerTotalWords', function () {
    it('should give a 0 ratio if no buzzword is detected', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.buzzPerTotalwords('some random sentence with no particular words');
        //assert
        assert.equal(actual.ratio, 0);
    });

    it('should give a 1 rading if there are only buzzwords', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.buzzPerTotalwords('synergie');
        //assert
        assert.equal(actual.ratio, 1);
    });

    it('should return the buzz ratio and the suspected buzzwords in the same object', function () {
        //setup
        const buzzWord = new BuzzDetector();
        //action
        const actual = buzzWord.buzzPerTotalwords('synergie des rétroprojecteurs');
        //assert
        assert.equal(actual.ratio, 0.5);
        assert.equal(actual.suspects.length, 1);
        assert.equal(actual.suspects[0], 'synergie');
    });
});
