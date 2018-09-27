/*moras objasniti u prvim linijama sta radi pojedini djelovi u ovom fajlu tipa autoprefixer, nested itd. Sve sto copy/pasteas iz gulpfile.js 
i prebacis ovdje BRISES iz gulpfile.js poput postcss = require('gulp-postcss'),*/
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task("styles", function(){
      return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer])) //zasto moraju biti ovako poredani ovi filteri?
        /* OVO TI JE DA TI GULP POMOGNE GDJE JE ERROR ALI I DA NE PRESTANE RADITI WATCH KADA NAPRAVIS GRESKU*/
        /* 'error' je name of the event. on(error) <=> if the error occurs, "on error (koji se inace desava)" we want THIS task,
        THIS stream (this.emit) to tell gulp (to emit to gulp) .emit  that it tried it's best but it's now to bring this to the
        'end'. S obzirom da gulp nece da snimi NIKAD sve dok postoji greska jer kad god ti sejvujes gresku on ce se iskljuciti, pa
        cak i ako ukcuas opet gulp watch opet kad snimis OPET ce se iskljuciti tako da se nikad nece snimiti u destination onda je
        logicno da ovaj on() stavis prije pipe(gulp.dest()). Sa druge strane on() metoda je ta koja nadgleda sav ovaj pipe (listener/osluskivac funkcija) iznad i 
        NA (on) gresku (error) pokazi mi u cemu je greska i reci gulpu this.emit bukvalno govori racunaru sto je malo sjesno lol i salje mu
        string (dakle, radi se nesto bezveze samo da to sto radis ne prouzrokuje da ti GULp vrati neki cudan behaviour, stoga mu vrati
        string*/
        .on('error', function(errorInfo){
        	console.log(errorInfo.toString()); /*koristis toString() jer dobijes gomilu gluposti, a ovo ti kaze bas error kako dolikuje */
        	this.emit('end'); /* */
        })
        .pipe(gulp.dest("./app/temp/styles")); //return se koristi jer je gulp.src asinhrona funkcija i navodimo da gulp bude aware cim je funkcija aviable!
});