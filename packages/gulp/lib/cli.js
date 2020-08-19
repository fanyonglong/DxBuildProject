"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var chalk_1 = __importDefault(require("chalk"));
var through2_1 = __importDefault(require("through2"));
var glob_1 = __importDefault(require("glob"));
var argv = yargs_parser_1.default(process.argv.slice(2), {
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
    return gulp_1.src(argv._, __assign({ cwd: process.cwd() }, argv.ops)).pipe(gulp_1.dest(argv.d, argv.dops));
}
function runGulpTest(srcPaths) {
    return function () {
        return gulp_1.src(srcPaths, __assign({ cwd: process.cwd() }, argv.ops)).pipe(through2_1.default.obj(function (file, enc, cb) {
            console.log(file.dirname);
            cb(null, file);
        }));
    };
}
function runGlobTest(pattern) {
    glob_1.default(pattern, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(files);
    });
}
console.log(chalk_1.default.blue('准备运行任务'));
switch (argv._[0]) {
    case "test":
        gulp_1.series(runGulpTest(argv._.slice(1)))(function (error) {
            if (error) {
                console.log(chalk_1.default.red(error));
                return;
            }
            console.log(chalk_1.default.green('任务运行结束'));
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
        gulp_1.series(runGulpTask)(function (error) {
            if (error) {
                console.log(chalk_1.default.red(error));
                return;
            }
            console.log(chalk_1.default.green('任务运行结束'));
        });
        break;
}
