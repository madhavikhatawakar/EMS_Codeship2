var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
//var gulp-jshint-html-reporter=require('gulp-jshint-html-reporter');
var mocha = require('gulp-mocha');
 var nightwatch=require('gulp-nightwatch');

gulp.task('run', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT:3003
        },
        ignore: ['./node_modules/**']
    })
    .on('restart',function(){
        console.log('Restarting');
    });
});


/*gulp.task('lint', function() {
  return gulp.src(('./routes/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: 'jshint-report' + '/jshint-output.html',
      
    }));
});*/

gulp.task('lint', function() {
  return  gulp.src([
    'routes/employees.js',
    'test/mochatest.js'
    ,'*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: 'jshint-report' + '/jshint-output.html',
      createMissingFolders : false  
    }
	));
});


 
gulp.task('mocha', function () {
    return gulp.src('test/mochatest.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha({reporter: 'good-mocha-html-reporter', //good-mocha-html-reporter, spec, nyan
    timeout: 1500000,
    bail: false,
    savePath: 'mocha-report', // the path to desired location
    filename: 'report.html', // filename gets attached at the end of savePath
    mode: 'Verbose'}));
});

/*gulp.task('test', function () {
  gulp.src(['routes/employess.js',
    'test/mochatest.js','*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files

        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
     .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
       // .on('end', cb);
});*/

gulp.task('test', function (cb) {
  gulp.src(['routes/**/*.js', '*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/*.js'])
        //.pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on('end', cb);
    });
});

gulp.task('nightwatch',function(){
return gulp.src('nightwatch.js')
    .pipe(nightwatch({
	configFile:'node_modules/nightwatch/bin/nightwatch.json'
	}))


});


gulp.task('default',['test','lint','mocha']); 
 
