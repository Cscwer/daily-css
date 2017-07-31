// gulpfile.js
var gulp = require('gulp'); 
var connect = require('gulp-connect'); 

var CONFIG = {
	src: './src/**/*', 
	dest: './dest/',
	toWatch: './dest/**/*'
}

// localhost:8080 
connect.server({
	root: CONFIG.dest,
	port: 8080,
	livereload: true
});


gulp.watch(CONFIG.src, ['copy', 'reload']); 

gulp.task('reload', function(){
	return gulp.src(CONFIG.toWatch)
		.pipe(connect.reload());
});

gulp.task('copy', function(){
	return gulp.src(CONFIG.src)
		.pipe(gulp.dest(CONFIG.dest)); 
}); 


// 别名
gulp.task('serve', ['copy']); 

