var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();/*hoces samo metodu create() od ovog package-a da requireujes*/





gulp.task("watch", function(){ /*Ti si ovo watch mogao zamjeniti sa bilo cime, jer gulp imeTaska je u command line-u!!*/

	browserSync.init({ 
         notify: false, /*gasi ono u desnom gornjem cosku sto pokauje sta se pokrece*/

		/* Ovo je prvi korak u kreiranju auto refreshera. init = initialize (server)*/
      server: { /*create server gdje je base directory app folder*/
      	baseDir: "app" /* base directory, vidi komentar ispod*/
      } /*where our website lives. jer kreira ovaj sync neki mini-server na racunaru i treba mu adresa

      GULP PRATI SAVEOVE!*/
	});

	watch("./app/index.html", function(){ // "./" root folder
        browserSync.reload(); /* Ovo je drugi korak u kreiranju auto refreshera. Bukvalno reload je "refresh", a cjela ova funkciaj znaci "refreshuj stranicu kada se sacuva neka promjena
        u index.html" */
	});

	watch("./app/assets/styles/**/*.css", function(){

		gulp.start('cssInject'); /*cssInject je ime task-a. When we want to run this task? We see that whenever we save a change
	                              to any css file we are currently triggering the 'styles' task which is responsible for all our PostCSS*/
	}); // "**" any future hypotetical folders, "*.css" any files sa .css ekstenzijom

});

/*ubacujes i cssInject u ovaj watch.js jer je i on vezan sa watchom*/
gulp.task('cssInject', ['styles'], function() { /* Ovo ti je BrowserSync za CSS. Injektuj latest CSS without even forcing a refresh. ZATO je naziv cssInject.  */
	                              /*cssInject je ime task-a. When we want to run this task?  ['styles']. We see that whenever we save a change
	                              to any css file we are currently triggering the styles task which is responsible for all our PostCSS

	                              ['styles'] // dependencies, hey gulp before you run cssInject task irst you must begin and complete any dependencies
	                              tj. zavisnosti that we list here! Mi smo prije ovoga imali na watch ("/*.css") da prati 'styles' task
	                              koji je zaduen za postCSS pa smo umjesto toga rekli da prati cssInject te smo privremeno izgubili pracenje
	                              styles taska dok nismo stavili ovaj dependencies parametar ['styles'].
	                              Kad malo bolje skontas ima smisla da redoslijed bude, prvo postCSS pa onda refreshuj stranicu.*/
        return gulp.src('./app/temp/styles/styles.css') /*take the content of our compiled CSS file and and hand that over to BrowserSync
        to inject those styles into the page on the fly and*/
        .pipe(browserSync.stream()); /*pipe it into browserSync. stream() metoda is used to inject changes without refreshing the page.
        that will make whatever we are piping into it aviable in the browser. Kao ono broadcast to ti je i stream EMITOVANJE U BROWSERU.*/
});