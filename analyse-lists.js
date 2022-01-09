/**
 * @param classMap : Map<String.IntegerList>
 */
function analyseLists(classMap){
	const handled = new Set(); //Набор непересекающимхся классов
	
	
	for(let [key, C] of classMap){
		
		for(let H of handled){
			let I = H.intersection(C);
			if(!I.isEmpty()){
				if(!I.isEqual(H)){
					let N = H.subtrace(I);
					handled.delete(H);
					handled.add(N);
					handled.add(I);
				}
				C = C.subtrace(I);
			}
		}
		handled.add(C);
	}
	
	const elements = new Map();
	let nextKey = 1;
	for(let H of handled){
		elements.set('$$'+(nextKey++), H);
	}
	
	const composite = new Map();
	for(let [key, C] of classMap){
		let set = new Set();
		for(let [p, H] of elements){
			if(C.isIncludes(H)){
				set.add(p);
			}
		}
		composite.set(key, set);
	}
	
	return {
		elements,
		composite
	}
}

module.exports = analyseLists;