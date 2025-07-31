const {appendFile, writeFile} = require('fs');
const { join } = require('path');
const { format } = require('date-fns');


function logEvents(req, res, next){
    const log = req.url + '\t' + req.method + '\t' + format(new Date(), 'yyyy-MM-dd\tHH:mm:ss') + '\n'
    appendFile(join('api', 'events', 'requests.txt'), log, err => {
        if (err) console.log(err);
    });
    next();
}

module.exports = {logEvents};