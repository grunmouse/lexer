
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
	
	const primitives = new Map();
	for(let H of handled){
		primitives.set(Symbol(), H);
	}
	
	const composite = new Map();
	for(let [key, C] of classMap){
		let set = new Set();
		for(let [p, H] of primitives){
			if(C.isIncludes(H)){
				set.add(p);
			}
		}
		composite.set(key, set);
	}
	
	return {
		primitives,
		composite
	}
}