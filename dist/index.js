#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from "fs";
const chokidar_1 = require("chokidar");
const events_1 = require("events");
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
class Rewatch extends events_1.EventEmitter {
    constructor(command, files, options = {}) {
        super();
        this.defer = false;
        this.root = process.cwd();
        this.files = files;
        this.command = command;
        Object.assign(this, options);
    }
    watch() {
        this.watcher = (0, chokidar_1.watch)(this.files);
        if (!this.defer)
            this.execute.call(this);
        this.watcher.on("change", (path) => {
            console.log(path, "changed.");
            this.execute.call(this);
        });
    }
    execute() {
        console.log("executing:", this.command);
        (0, child_process_1.spawn)(this.command, { stdio: 'inherit', cwd: this.root, shell: true });
    }
}
commander_1.program
    .argument("<command>", "Command to run when one of the watched paths changes.")
    .argument("<paths...>", "Paths or globs representing files to watch.")
    .option("-d, --defer", "Prevent the specified command from running when the watch script is first run.", false)
    .action((command, paths, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("watching:", paths, "performing:", chalk_1.default.blue(command), "on change.");
    const rewatch = new Rewatch(command, paths, options);
    rewatch.watch();
}));
commander_1.program.parse();
