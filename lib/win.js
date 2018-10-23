'use strict';
const util = require('util');
const path = require('path');
const childProcess = require('child_process');

const promisify = f => (...args) => new Promise((a,b)=>f(...args, (err, res) => err ? b(err) : a(res)));

const execFile = promisify(childProcess.execFile);

// Binary source → https://github.com/sindresorhus/win-wallpaper
const bin = path.join(__dirname, 'win-wallpaper.exe');

exports.get = async () => {
	const {stdout} = await execFile(bin);
	return stdout.trim();
};

exports.set = async imagePath => {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	await execFile(bin, [path.resolve(imagePath)]);
};
