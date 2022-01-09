/**
 * @param elements : Map<String.IntegerList>
 */
function makeClassificator(elements){
	return function(symbolCode){
		for(let [key, list] of elements){
			if(list.has(symbolCode)){
				return key;
			}
		}
	}
}

module.exports = makeClassificator;