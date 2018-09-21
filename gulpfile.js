var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create() /*hoces samo metodu create() od ovog package-a da requireujes*/;


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

	browserSync.init({ 
         notify: false, /*gasi ono u desnom gornjem cosku sto pokauje sta se pokrece*/

		/* Ovo je prvi korak u kreiranju auto refreshera. init = initialize (server)*/
      server: { /*create server gdje je base directory app folder*/
      	baseDir: "app" /* base directory, vidi komentar ispod*/
      } /*where website lives. jer kreira ovaj sync neki mini-server na racunaru i treba mu adresa*/
	});

	watch("./app/index.html", function(){ // "./" root folder
        browserSync.reload(); /* Ovo je drugi korak u kreiranju auto refreshera. Bukvalno reload je "refresh", a cjela ova funkciaj znaci "refreshuj stranicu kada se sacuva neka promjena
        u index.html" */
	});

	watch("./app/assets/styles/**/*.css", function(){

		gulp.start('cssInject');
	}); // "**" any future hypotetical folders, "*.css" any files sa .css ekstenzijom

});

gulp.task('cssInject', ['styles'], function() {
        return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});