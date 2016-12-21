import SentenceGradeLevel from './app_modules/sentenceGradeLevel.js';

const args = process.argv.slice(2);
const sentence = args.join(' ');

const sentenceGradeLevel = new SentenceGradeLevel(sentence);
console.log('Sentence grade : ' + sentenceGradeLevel.grade());

