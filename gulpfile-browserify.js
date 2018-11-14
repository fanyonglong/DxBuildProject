var gulp = require('gulp')
var clean = require('gulp-clean')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var browserify = require('browserify')
var fs = require('fs')


function standalone(name, entry, exportName) {
  return browserify(entry, { debug: true, standalone: exportName || name })
    .bundle()
    .pipe(fs.createWriteStream('./dist/'+ name.replace(/_/g, '-') +'.js'))
}

gulp.task('bundle:snabbdom', function() {
  return standalone('snabbdom_patch', './snabbdom.bundle.js', 'snabbdom')
})

gulp.task('bundle:snabbdom:init', function() {
  return standalone('snabbdom', './snabbdom.js')
})

gulp.task('bundle:snabbdom:h', function() {
  return standalone('h', './h.js')
})

gulp.task('bundle:snabbdom:tovnode', function() {
  return standalone('tovnode', './tovnode.js')
})

gulp.task('bundle:module:class', function() {
  return standalone('snabbdom_class', './modules/class.js')
})

gulp.task('bundle:module:dataset', function() {
  return standalone('snabbdom_dataset', './modules/dataset.js')
})

gulp.task('bundle:module:props', function() {
  return standalone('snabbdom_props', './modules/props.js')
})

gulp.task('bundle:module:attributes', function() {
  return standalone('snabbdom_attributes', './modules/attributes.js')
})

gulp.task('bundle:module:style', function() {
  return standalone('snabbdom_style', './modules/style.js')
})

gulp.task('bundle:module:eventlisteners', function() {
  return standalone('snabbdom_eventlisteners', './modules/eventlisteners.js')
})

gulp.task('bundle', [
  'bundle:snabbdom',
  'bundle:snabbdom:init',
  'bundle:snabbdom:h',
  'bundle:snabbdom:tovnode',
  'bundle:module:attributes',
  'bundle:module:class',
  'bundle:module:dataset',
  'bundle:module:props',
  'bundle:module:style',
  'bundle:module:eventlisteners'
])

gulp.task('compress', ['bundle'], function() {
  return gulp.src(['dist/*.js', '!dist/*.min.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() {
  return gulp.src('dist/*.*', {read: false})
    .pipe(clean())
})

gulp.task('default', ['bundle'])






var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');

gulp.task('javascript', function () {
  // gulp 希望任务能返回一个 stream，因此我们在这里创建一个
  var bundledStream = through();

  bundledStream
    // 将输出的 stream 转化成为一个包含 gulp 插件所期许的一些属性的 stream
    .pipe(source('app.js'))
    // 剩下的部分，和你往常缩写的一样。
    // 这里我们直接拷贝 Browserify + Uglify2 范例的代码。
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // 在这里将相应 gulp 插件加入管道
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));

  // "globby" 替换了往常的 "gulp.src" 为 Browserify
  // 创建的可读 stream。
  globby(['./entries/*.js'], function(err, entries) {
    // 确保任何从 globby 发生的错误都被捕获到
    if (err) {
      bundledStream.emit('error', err);
      return;
    }

    // 创建 Browserify 实例
    var b = browserify({
      entries: entries,
      debug: true,
      transform: [reactify]
    });

    // 将 Browserify stream 接入到我们之前创建的 stream 中去
    // 这里是 gulp 式管道正式开始的地方
    b.bundle().pipe(bundledStream);
  });

  // 最后，我们返回这个 stream，这样 gulp 会知道什么时候这个任务会完成
  return bundledStream;
});