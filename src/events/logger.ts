import {EventEmitter} from "node:events";
import fs from 'fs';

class Logger extends EventEmitter {
    private logArray: Array<{date:string, message:string}> =[];
    log(message: string) {
        this.emit("log", message);
    }
    save(message:string) {
        this.emit("save", message);
    }
    saveToFile(message:string) {
        this.emit("to_file", message);
    }
    addLogToArray(message:string) {
        this.logArray.push({date: new Date().toISOString(), message});
    }
    getLogArray() {
        return [...this.logArray];
    }
}

// =========================================================

export const myLogger = new Logger();

myLogger.on('log', (message: string) => {
    console.log(new Date().toISOString(), message);
})

myLogger.on('save', (message:string) => {
    myLogger.addLogToArray(message)
})

myLogger.on('to_file', (message:string) => {
    myLogger.addLogToArray(message);
    const fileName = `src/log/log${new Date().toISOString().replace(/:/g, '_')}.txt`;
    fs.writeFileSync(fileName, JSON.stringify(myLogger.getLogArray()))
})

