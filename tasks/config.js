import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

export const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'del'],
});

export const bs = browserSync;

export const isDev = (process.env.NODE_ENV || 'development') === 'development';
export const isProd = (process.env.NODE_ENV || 'development') === 'production';

export const AUTOPREFIXER_CONFIG = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

export const errorHandler = $.notify.onError({
  message: 'Error: <%= error.message %>',
  title: 'Error running something',
});

export const config = {
  src: {
    style: './assets/style/**/style.scss',
    jade: './assets/pages/!(_)*.jade',
    layouts: './assets/pages/*.jade',
    components: './assets/components/**/*.jade',
    dataJson: './assets/json/data.json',
    scripts: './assets/scripts/main.js',
    images: [
      './assets/images/**',
      './assets/components/**/*.png',
      './assets/components/**/*.jpg',
      './assets/components/**/*.svg',
    ],
    misc: './assets/misc/**',
  },

  watch: {
    scripts: [
      './assets/scripts/**/*.js',
      './assets/components/**/*.js',
    ],
    style: [
      './assets/style/**/*.scss',
      './assets/components/**/*.scss',
    ],
  },

  jsbeautifierConfig: {
    braceStyle: 'expand',
    indentWithTabs: true,
    indentInnerHtml: true,
    preserveNewlines: true,
    endWithNewline: true,
    wrapLineLength: 120,
    maxPreserveNewlines: 50,
    wrapAttributesIndentSize: 1,
    unformatted: ['use'],
  },

  dest: {
    scripts: './app/js/',
    style: './app/css/',
    app: './app/',
    images: './app/img/',
    misc: './app/',
  },

  POSTHTML_PROCESSORS: [
    require('posthtml-bem')({
      elemPrefix: '__',
      modPrefix: '_',
      modDlmtr: '--',
    }),
  ],

  PROCESSORS: [
    require('autoprefixer')({ browsers: AUTOPREFIXER_CONFIG }),
    require('css-mqpacker'),
    require('postcss-discard-comments')({ removeAll: true }),
    require('postcss-custom-selectors'),
    require('postcss-focus-hover'),
    require('postcss-pxtorem')({
      root_value: 14,
      selector_black_list: ['html']
    }),
  ],

  PROCESSORS_PERFECTIONIST: [
    require('perfectionist'),
  ],

  babel: {
    comments: false,
    presets: ['es2015'],
  },
};
