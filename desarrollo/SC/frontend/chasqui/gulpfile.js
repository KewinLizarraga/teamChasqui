const gulp = require("gulp")
const sass = require("gulp-sass")

const styleSrc= './src/components/assets/scss/*.scss',
        styleDest= './src/components/assets/css'

gulp.task('sass', ()=>
    gulp.src(styleSrc)
    .pipe(sass({ outputStyle: 'expanded'}))
    .pipe(gulp.dest(styleDest))
)

gulp.task('gsass', ()=>{
    gulp.watch(styleSrc,['sass'])
})