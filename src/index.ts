#!/usr/bin/env node

// import fs from "fs";
import { FSWatcher, watch as chokidar } from "chokidar";
import { EventEmitter } from "events";
import { spawn } from "child_process";
import { program } from "commander";

interface IOptions {
  defer?: boolean
  interval?: number;
  delay?: number;
  signal?: string;
}

class Rewatch extends EventEmitter {
  private files: string[];
  private command: string;
  private watcher?: FSWatcher;
  private defer: boolean = false;
  private root: string = process.cwd();
  
  constructor(command: string, files: string[], options: IOptions = {}) {
    super();

    this.files = files;
    this.command = command;
    Object.assign(this, options);
  }

  watch() {
    this.watcher = chokidar(this.files);
    
    if (!this.defer) this.execute.call(this);

    this.watcher.on("change", (path) => {
      console.log(path, "changed.");
      this.execute.call(this);
    });
  }

  execute() {
    console.log("executing:", this.command);
    spawn(this.command, { stdio: 'inherit', cwd: this.root, shell: true });
  }
}

program
  .argument("<command>", "Command to run when one of the watched paths changes.")
  .argument("<paths...>", "Paths or globs representing files to watch.", )
  .option("-d, --defer", "Prevent the specified command from running when the watch script is first run.", false)
  .action(async (command: string, paths: string[], options: IOptions) => {
    const rewatch = new Rewatch(command, paths, options);
    rewatch.watch();
  });


program.parse();