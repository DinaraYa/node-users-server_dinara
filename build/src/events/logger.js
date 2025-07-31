import { EventEmitter } from "node:events";
import fs from 'fs';
class Logger extends EventEmitter {
    constructor() {
        super(...arguments);
        this.logArray = [];
    }
    log(message) {
        this.emit("log", message);
    }
    save(message) {
        this.emit("save", message);
    }
    saveToFile(message) {
        this.emit("to_file", message);
    }
    addLogToArray(message) {
        this.logArray.push({ date: new Date().toISOString(), message });
    }
    getLogArray() {
        return [...this.logArray];
    }
}
// =========================================================
export const myLogger = new Logger();
myLogger.on('log', (message) => {
    console.log(new Date().toISOString(), message);
});
myLogger.on('save', (message) => {
    myLogger.addLogToArray(message);
});
myLogger.on('to_file', (message) => {
    myLogger.addLogToArray(message);
    const fileName = `src/log/log${new Date().toISOString().replace(/:/g, '_')} + .txt`;
    fs.writeFileSync(fileName, JSON.stringify(myLogger.getLogArray()));
});
