const { src, dest } = require('gulp');

//Конфигурация
const path = require("../config/path.js")
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const autoperfixer = require('gulp-autoprefixer');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shorthand = require('gulp-shorthand');
const groupMedia = require('gulp-group-css-media-queries');
const webpCss = require('gulp-webp-css');


//Обработка CSS
const css = () => {
	return src(path.css.src, { sourcemaps: app.isDev })
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "CSS",
				message: error.message
			}))
		}))
		.pipe(concat('main.css'))
		.pipe(cssimport())
		.pipe(webpCss())
		.pipe(autoperfixer())
		.pipe(shorthand())
		.pipe(groupMedia())
		.pipe(size({
			title: 'main.css'
		}))
		.pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
		.pipe(size({
			title: 'main.min.css'
		}))
		.pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
}

module.exports = css;