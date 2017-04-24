// import fs from 'fs';
import gulp from 'gulp';
import moment from 'moment';
import faker from 'faker';
import data from '../assets/data';
import { config, $, bs, errorHandler, isDev, isProd } from './config';

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

const randomFuncs = {
  getRandomText() {
    return transliterate(faker.lorem.paragraph(), true);
  },
  getRandomWord() {
    return capitalizeFirstChar(faker.random.word());
  },
  getUserName() {
    return faker.name.firstName();
  },
  getRandomInt(max, min) {
    return faker.random.number({ min, max });
  },
  getRandomDate() {
    return moment(faker.date.past()).format('L');
  },
  getRandomBool() {
    return faker.random.boolean();
  },
};

gulp.task('jade', () => {
  return gulp.src([config.src.jade])
    .pipe($.jade({
      locals: {
        ...data,
        DEV: isDev,
        PROD: isProd,
        ...randomFuncs,
      },
    }))
      .on('error', errorHandler)

    .pipe($.posthtml(config.POSTHTML_PROCESSORS))
    .pipe($.if(isDev, $.jsbeautifier(config.jsbeautifierConfig)))

    .pipe(gulp.dest(config.dest.app))
    .on('end', bs.reload);
});
