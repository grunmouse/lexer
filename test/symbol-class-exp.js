const parseSymbolClass = require('../parse-symbol-class.js');
const analyseLists = require('../analyse-lists.js')
const fs = require('fs');

const code = fs.readFileSync('sample-symbol-class.txt', {encoding:'utf8'});

let rows = code.split(/;.*\r\n/g);
//console.log(rows)
let rules = rows.map((row)=>{
	let [key, code] = row.split(/\s*:=\s*/);
	let list = parseSymbolClass(code);
	return [key, list];
});

console.log(rules);

const classes = analyseLists(rules);

console.log(classes);