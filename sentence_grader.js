import SentenceGradeLevel from './app_modules/sentenceGradeLevel.js';

const args = process.argv.slice(2);
const sentence = args.join(' ');

new SentenceGradeLevel(sentence);

