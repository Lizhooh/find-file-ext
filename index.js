const fs = require('fs');
const util = require('util');
const path = require('path');
const signale = require('signale');

const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);

async function findFileExt(paths = [], types = [], ignoreDir = []) {
    signale.pending('File type search start...');
    const arr = [];

    if (!Array.isArray(paths)) {
        paths = [paths];
    }

    if (!Array.isArray(types)) {
        types = [types];
    }

    if (!Array.isArray(ignoreDir)) {
        types = [types];
    }

    async function find(p) {
        try {
            if ((await lstat(p)).isDirectory()) {
                const files = await readdir(p);
                async function deep(file) {
                    try {
                        let _p = path.join(p, file);
                        if (types.some(i => path.extname(_p) === '.' + i)) {
                            arr.push(_p);
                        }
                        else if (!ignoreDir.some(i => _p === path.join(_p, '../' + i))) {
                            await find(_p);
                        }
                    }
                    catch (err) {
                        signale.debug('Error: ' + err.message);
                    }
                }
                await Promise.all(files.map(i => deep(i)));
            }
        }
        catch (err) {
            signale.debug('Error -> ' + err.message);
        }
    }

    await Promise.all(paths.map(p => find(p)));
    signale.success('File type search end...');
    return arr;
}

module.exports = exports = findFileExt;
