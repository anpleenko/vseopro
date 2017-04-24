// import fs from 'fs';
import gulp from 'gulp';
import Chance from 'chance';
import moment from 'moment';
import data from '../assets/data';
import faker from 'faker';
import { config, $, bs, errorHandler, isDev, isProd } from './config';

const chance = new Chance();
moment.locale('ru');

// Если с английского на русский, то передаём вторым параметром true.
const transliterate = (text, engToRus) => {
  const rus = 'щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь'.split(/ +/g);
  const eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);

  rus.map((e, x) => {
    text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
    text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
  });

  return text;
};

const capitalizeFirstChar = string => string.charAt(0).toUpperCase() + string.substring(1);

function getRandomText() {
  return transliterate(faker.lorem.paragraph(), true);
}

function getWord() {
  return capitalizeFirstChar(chance.word({ syllables: 3 }));
}

function getUserName() {
  return chance.first();
}

function getRandomInt(max, min) {
  return chance.integer({ min, max });
}

function getRandomDate() {
  return moment(chance.date()).format('L');
}

function getRandomBool() {
  return chance.bool();
}

gulp.task('jade', () => {
  return gulp.src([config.src.jade])
    .pipe($.jade({
      locals: Object.assign(
        {},
        data,
        { DEV: isDev },
        { PROD: isProd },
        { getWord },
        { getRandomInt },
        { getUserName },
        { getRandomDate },
        { getRandomBool },
        { getRandomText },
      ),
    }))
      .on('error', errorHandler)

    .pipe($.posthtml(config.POSTHTML_PROCESSORS))
    .pipe($.if(isDev, $.jsbeautifier(config.jsbeautifierConfig)))

    .pipe(gulp.dest(config.dest.app))
    .on('end', bs.reload);
});
