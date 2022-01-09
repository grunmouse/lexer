const IntegerList = require('./integer-list.js');

function parseSymbolClass(listString, codePoint){
	const replacer = codePoint ?
		(str, sym)=>(sym.codePointAt(0))
		:
		(str, sym)=>(sym.charCodeAt(0));
	
	listString = listString.replace(/'([^']{1,2})'/g, replacer);
	listString = listString.replace(/"([^"]{1,2})"/g, replacer);
	
	let data = listString.split(',').map((part)=>(part.split('-').map(Number)));
	
	return IntegerList.fromParts(data);
}

module.exports = parseSymbolClass;