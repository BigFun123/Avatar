const fs = require('fs');

const logfile = __dirname + '/../log/log.txt';

if (!fs.existsSync(logfile)) {
    fs.writeFileSync(logfile, '');
};

function log(data, object) {
    if (!data || data == "\n" || data == " ") {
        return;
    }

    let lo = {};

    var d = new Date();
    var datestring = d.getFullYear() + "/" + d.getMonth() + 1 + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    lo.date = datestring;
    lo.context = data;

    let output = datestring + "," + data;
    



    if (object) {
        output += "," + JSON.stringify(object);
    }
    let final = { ...lo, ...object };
    final = JSON.stringify(final);

    console.log(final);

    fs.appendFile(logfile, final + '\n', function (err) {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = log;