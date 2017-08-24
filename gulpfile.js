var gulp=require("gulp"),
	minifyCss=require("gulp-clean-css");
	
	gulp.task("minify_css",function(){
		gulp.src("css/*.css")
			.pipe(minifyCss())
			.pipe(gulp.dest("dist/css/"));
	});
