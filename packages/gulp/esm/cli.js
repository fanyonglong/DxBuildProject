var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { dest, series, src } from "gulp";
import yargsParser from 'yargs-parser';
import chalk from 'chalk';
import through2 from 'through2';
import glob from 'glob';
var argv = yargsParser(process.argv.slice(2), {
    alias: {
        dist: ['d'],
        ops: ['o']
    },
    default: {
        dist: './dist',
        ops: {},
        dops: {}
    },
    array: []
});
function runGulpTask() {
    return src(argv._, __assign({ cwd: process.cwd() }, argv.ops)).pipe(dest(argv.d, argv.dops));
}
function runGulpTest(srcPaths) {
    return function () {
        return src(srcPaths, __assign({ cwd: process.cwd() }, argv.ops)).pipe(through2.obj(function (file, enc, cb) {
            console.log(file.dirname);
            cb(null, file);
        }));
    };
}
function runGlobTest(pattern) {
    glob(pattern, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(files);
    });
}
console.log(chalk.blue('准备运行任务'));
switch (argv._[0]) {
    case "test":
        series(runGulpTest(argv._.slice(1)))(function (error) {
            if (error) {
                console.log(chalk.red(error));
                return;
            }
            console.log(chalk.green('任务运行结束'));
        });
        break;
    case "glob":
        runGlobTest(argv._[1]);
        break;
    case "build":
        break;
    case "dev":
        break;
    default:
        series(runGulpTask)(function (error) {
            if (error) {
                console.log(chalk.red(error));
                return;
            }
            console.log(chalk.green('任务运行结束'));
        });
        break;
}
