const IntegerArea = require('./integer-area.js');

class IntegerList{
	constructor(areas){
		areas = areas.filter(IntegerArea.notEmpty);
		areas.sort(IntegerArea.sorter);
		let list = [], last;
		for(let area of areas){
			if(!last){
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
		return areas.some((area)=>(area.has(value)));
	}
	doCompilHas(){
		return this.areas.map(area=>(area.doCompilHas()));
	}
	
	compilHas(){
		return new Function(value, 'return ' + this.doCompilHas());
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
	
	*_intersection(listB){
		for(let a of this.areas){
			for(let b of listB.areas){
				let intersection = a.intersection(b);
				if(!intersection.isEmpty()){
					yield {a, b, intersection};
				}
			}
		}
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
		let areas = [...this._intersection(listB)];
		areas = areas.map(a=>a.intersection);
		
		return new IntegerList(areas);
	}
	
}

module.exports = IntegerList;