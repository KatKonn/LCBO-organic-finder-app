const gulp = require("gulp"); //require gulp and all other gulp packages
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

gulp.task("browser-sync", () => {
	browserSync.init({
		server: "."
	})
});


gulp.task("styles", () => {
	return gulp.src("./dev/styles/**/**") //*globbing* pattern - look in all folders for files with .scss 
		.pipe(sass().on("error", sass.logError)) //listen for any errors 
		.pipe(concat("styles.css"))
		.pipe(gulp.dest("./public/styles"))
		.pipe(reload({stream:true}));
}); 

gulp.task("scripts", () => {
	return gulp.src("./dev/scripts/main.js")
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(gulp.dest("./public/scripts"))
		.pipe(reload({stream:true}));
});


gulp.task("watch", () => {
	gulp.watch("./dev/styles/**/*.scss", ["styles"]);
	gulp.watch("./dev/scripts/main.js", ["scripts"]);
	gulp.watch("*.html", reload);
	 //array of what you want to execute when watching
});

gulp.task("default", ["browser-sync", "styles", "scripts", "watch"]);