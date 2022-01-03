const IntegerArea = require('./integer-area.js');

class IntegerList{
	constructor(areas){
		areas = areas.filter(IntegerArea.notEmpty);
		areas.sort(IntegerArea.sorter);
		let list = [], last=-1;
		for(let area of areas){
			if(last<0){
				last = 0;
				list[last] = area;
			}
			else{
				let b = list[last];
				if(area.isCanJoin(b)){
					list[last] = area.join(b);
				}
				else{
					++last;
					list[last] = area;
				}
			}
		}
		this.areas = list;
	}
	has(value){
		return this.areas.some((area)=>(area.has(value)));
	}
	doCompilHas(){
		return this.areas.map(area=>(area.doCompilHas())).join(' || ');
	}
	
	compilHas(){
		return new Function('value', 'return ' + this.doCompilHas());
	}	
	
	isEmpty(){
		return this.areas.lenght === 0;
	}
	
	isFinite(){
		return this.areas.every(area=>area.isFinite());
	}
	
	*values(){
		for(let area of this.areas){
			yield* area.values();
		}
	}	
	
	isIncludes(listB){
		let i=0, j=0, A = this.areas, B = listB.areas, lenA = A.length, lenB = B.length;
		for(;j<lenB && i<lenA;){
			let includes = A[i].isIncludes(B[j]);
			if(includes){
				j++;
			}
			else{
				i++;
			}
		}
		return j === lenB;
	}
	
	isEqual(listB){
		return this.areas.every((area, i)=>(area.isEqual(listB.areas[i])));
	}
	
	negate(){
		let i = 0, areas = this.areas, len = areas.length;
		let result = [], left = 0;
		for(; i<len; ++i){
			let area = areas[i];
			result.push(new IntegerArea(left, area.left));
			left = area.right;
		}
		if(!isNaN(left)){
			result.push(new IntegerArea(left));
		}
		return new IntegerList(result);
	}
	
	join(listB){
		return new IntegerList(this.areas.concat(listB.areas));
	}
	
	intersection(listB){
		//A && B = !(!A || !B)
		return this.negate().join(listB.negate()).negate();
	}
	
	subtrace(listB){
		//A \ B = A && !B = !(!A || B) 
		return this.negate().join(listB).negate();
	}
}

IntegerList.fromValues = function(values){
	return new IntegerList(values.map((value)=>(new IntegerArea(value, value+1))));
}

IntegerList.fromParts = function(parts){
	return new IntegerList(parts.map(part=>{
		if(typeof part === 'number'){
			part = [part, part];
		}
		else if(part.length === 1){
			part.push(part[0]);
		}
		if(!isNaN(part[1])){
			part[1]+=1;
		}
		return new IntegerArea(part[0], part[1]);
	}))
}

IntegerList.

module.exports = IntegerList;