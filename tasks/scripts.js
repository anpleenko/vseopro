import gulp from 'gulp';
import { config, $, bs, errorHandler, isProd } from './config';

gulp.task('scripts', () =>
  gulp.src(config.src.scripts)
    .pipe($.include())
      .on('error', errorHandler)

    .pipe($.babel(config.babel))
      .on('error', errorHandler)

    .pipe($.concat('main.js'))
    .pipe($.if(isProd, $.uglify()))

    .pipe($.addSrc('./node_modules/jquery/dist/jquery.min.js'))
    .pipe($.addSrc('./node_modules/bootstrap/dist/js/bootstrap.min.js'))

    .pipe(gulp.dest(config.dest.scripts))
    .on('end', bs.reload)
);

gulp.task('libs', gulp.series('scripts'));
