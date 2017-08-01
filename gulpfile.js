// gulpfile.js
var gulp = require('gulp'); 
var connect = require('gulp-connect'); 
var rename = require("gulp-rename");
var header = require('gulp-header');
var footer = require('gulp-footer');
var path = require('path'); 
var tpl = require('tplser'); 
var fs = require('then-fs'); 
var replace = require('gulp-replace'); 
var rm = require('gulp-rm'); 
var browserify = require('gulp-browserify');

var CONFIG = {
	src: path.join(__dirname, './src/**/*'), 
	toCopy: [path.join(__dirname, './src/**/*'), '!' + path.join(__dirname, './src/js')], 
	index: path.join(__dirname, './src/index.html'), 
	dest:  path.join(__dirname, './dest/'),
	toWatch:  ['./src/**/*'].map(d => path.join(__dirname, d)), 
	tplSrc:  path.join(__dirname, './src/tpl/*.html'),
	tplDest: path.join(__dirname, './dest/tpl/'), 
	jsMain: path.join(__dirname, './src/js/main.js'),
	jsMainDest: path.join(__dirname, './dest/js/'),
}

// localhost:8080 
gulp.task('start', function(){
	connect.server({
		root: CONFIG.dest,
		port: 8080,
		livereload: true
	});

	return gulp.watch(CONFIG.src, ['file-gulp', 'reload']); 
})




gulp.task('reload', ['file-gulp'], function(){
	return gulp.src(CONFIG.toWatch)
		.pipe(connect.reload());
});

gulp.task('copy', function(){
	return gulp.src([CONFIG.src, '!' + path.join()])
		.pipe(gulp.dest(CONFIG.dest)) 
}); 

gulp.task('jsbundle', ['clean', 'copy'], function(){
	return 	gulp.src(CONFIG.jsMain)
		.pipe(browserify({
			insertGlobals: true, 
			debug: false
		}))
		.pipe(gulp.dest(CONFIG.jsMainDest))
})

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

gulp.task('tpl', ['clean', 'copy'], function(){
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

var jstplRender = tpl.fromStr(`
	{{ get (fileName, i) >>>> list }}
	<script src="./tpl/{{ fileName }}"></script>
	{{ teg }}
`); 

gulp.task('index', ['copy', 'tpl'], function(){
	var tplList = fs.readdirSync(CONFIG.tplDest).filter(e => e.endsWith('.js')); 
	var listScripts = jstplRender({
		list: tplList
	}); 
	
	return gulp.src('./dest/index.html')
		.pipe(
			replace(
				'<!-- The Template Will Be Injected Here -->',
				listScripts
			)
		).pipe(gulp.dest(CONFIG.dest)); 
})

gulp.task('clean', function(){
	return gulp.src(CONFIG.tplDest + '**/*')
		.pipe(rm()); 
})

gulp.task('file-gulp', ['clean', 'copy', 'tpl', 'index', 'jsbundle']); 

// 别名
gulp.task('serve', ['start', 'file-gulp']); 



gulp.task('build', ['file-gulp'], function(){
	return gulp.src('./dest/**/*')
		.pipe(gulp.dest('F:\\www\\2017\\NW-Summer\\clocker')); 
})