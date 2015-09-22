var gulp = require('gulp');

gulp.task('copy-module-gulpfile', function() {
  return gulp.src('node_modules/zland-core/gulp/modulegulpfile.js')
  .pipe(gulp.dest('.'));
});

gulp.task('default', ['copy-module-gulpfile'], function() {
  require('./modulegulpfile');
  gulp.start('serve');
});
