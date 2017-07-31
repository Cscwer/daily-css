// gulpfile.js
var gulp = require('gulp'); 
var connect = require('gulp-connect'); 
var rename = require("gulp-rename");
var header = require('gulp-header');
var footer = require('gulp-footer');
var path = require('path'); 

var CONFIG = {
	src:  path.join(__dirname, './src/**/*'), 
	dest:  path.join(__dirname, './dest/'),
	toWatch:  ['./dest/**/*', '!./dest/tpl/*'].map(d => path.join(__dirname, d)), 
	tplSrc:  path.join(__dirname, './src/tpl/*.html'),
	tplDest: path.join(__dirname, './dest/tpl/')
}

// localhost:8080 
gulp.task('start', function(){
	connect.server({
		root: CONFIG.dest,
		port: 8080,
		livereload: true
	});

	gulp.watch(CONFIG.src, ['copy', 'reload']); 
})




gulp.task('reload', function(){
	return gulp.src(CONFIG.toWatch)
		.pipe(connect.reload());
});

gulp.task('copy', function(){
	return gulp.src(CONFIG.src)
		.pipe(gulp.dest(CONFIG.dest)); 
}); 

// Header 
var headerTpl = `
var <%= naming(filename) + 'Render' %> = (function(tpl){
	return tpl.fromStr(
	 \`
`;

// Footer 
var footerTpl = `
	\`); 
})(window.tpl); 
`; 

gulp.task('tpl', function(){
	return gulp.src(CONFIG.tplSrc)
		.pipe(rename(function (path) {
			path.basename += "Tpl";
			path.extname = ".js";
		}))
		.pipe(header(headerTpl, {
			naming: name => path.parse(name).name
		}))
		.pipe(footer(footerTpl, {
			naming: name => path.parse(name).name
		}))
		.pipe(gulp.dest(CONFIG.tplDest)); 
}); 




// 别名
gulp.task('serve', ['start', 'copy', 'tpl']); 

