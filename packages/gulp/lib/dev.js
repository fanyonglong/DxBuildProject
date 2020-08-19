"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
function images() {
    return gulp_1.src('src/images/**/*.jpg', { since: gulp_1.lastRun(images) })
        .pipe(gulp_1.dest('build/img/'));
}
function default_1() {
    gulp_1.watch('src/images/**/*.jpg', images);
}
exports.default = default_1;
;
