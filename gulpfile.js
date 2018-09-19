var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');


gulp.task("default", function(){
	console.log("horrayy you've created gulp task!")
});

gulp.task("html", function(){
      console.log("Imagine something useful being done to HTML here.");
});

gulp.task("styles", function(){
      return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer])) //zasto moraju biti ovako poredani ovi filteri?
        .pipe(gulp.dest("./app/temp/styles")); //return se koristi jer je gulp.src asinhrona funkcija i navodimo da gulp bude aware cim je funkcija aviable!
});

gulp.task("watch", function(){

	watch("./app/index.html", function(){ // "./" root folder
        gulp.start('html'); //pokreni html task
	});

	watch("./app/assets/styles/**/*.css", function(){

		gulp.start('styles');
	}); // "**" any future hypotetical folders, "*.css" any files sa .css ekstenzijom

});