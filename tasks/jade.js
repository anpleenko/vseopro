// import fs from 'fs';
import gulp from 'gulp';
import moment from 'moment';
import faker from 'faker';
import data from '../assets/data';

import {
  config,
  $,
  bs,
  errorHandler,
  isDev,
  isProd,
  capitalizeFirstChar,
  transliterate,
} from './config';

moment.locale('ru');

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
  getRandomSlug() {
    return faker.lorem.slug();
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
