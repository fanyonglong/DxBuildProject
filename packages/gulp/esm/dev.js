import { dest, watch, src, lastRun } from "gulp";
function images() {
    return src('src/images/**/*.jpg', { since: lastRun(images) })
        .pipe(dest('build/img/'));
}
export default function () {
    watch('src/images/**/*.jpg', images);
}
;
