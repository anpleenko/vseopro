import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

export const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'del'],
});

export const bs = browserSync;

export const isDev = (process.env.NODE_ENV || 'development') === 'development';
export const isProd = (process.env.NODE_ENV || 'development') === 'production';

export const capitalizeFirstChar = string => string.charAt(0).toUpperCase() + string.substring(1);

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
    layouts: './assets/layouts/*.jade',
    components: './assets/components/**/*.jade',
    data: './assets/data/**/*.js',
    scripts: './assets/scripts/!(_)*.js',
    images: [
      './assets/images/**',
      './assets/components/**/*.{png,jpg,svg}',
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
      selector_black_list: ['html'],
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

export const transliterate = (text = '', engToRus = false) => {
  const rus = 'щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь'.split(/ +/g);
  const eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);

  rus.map((e, x) => {
    text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
    text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
  });

  return text;
};

export const arrGen = (n, data) => {
  const a = Array(n);
  while (n -= 1) a[n] = data ? data : n;
  return a;
};
