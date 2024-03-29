const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('error-log', async (msg) => {
    const timeStamp = format(new Date(), 'yyyy-MM-dd H:m:s');
    const logItem = `${timeStamp}\t${uuid()}\t${msg}`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        };
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLogs.txt'), logItem);
    } catch (err) {
        console.error('EMITTER ERROR', err);
    }
})

module.exports = eventEmitter;