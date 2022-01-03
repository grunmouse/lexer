const assert = require('assert');
const IntegerArea = require('../integer-area.js');

const {
	prepForAll,
	env
} = require('@grunmouse/jsverify-env');

const jsc = require('jsverify');

describe('IntegerArea', ()=>{
	describe('exist', ()=>{
		it('has constructor', ()=>{
			assert(IntegerArea);
		});
		it('create instance', ()=>{
			let inst = new IntegerArea(1,2);
			assert(inst instanceof IntegerArea);
		});
	});
	
	describe('limits & has', ()=>{
		let [min, max] = env.incarray(2, env.uint32).generator();
		let over = max+1;

		jsc.property('inner', env.int(min, max), env, (value)=>{
			let area = new IntegerArea(min, over);
			return area.has(value);
		});		
		
		jsc.property('before', env.int(0, min-1), env, (value)=>{
			let area = new IntegerArea(min, over);
			return !area.has(value);
		});	
		
		jsc.property('after', env.int(over, 0xFFFFFFFF), env, (value)=>{
			let area = new IntegerArea(min, over);
			return !area.has(value);
		});
	});
	
	describe('compile', ()=>{
		let [min, max] = env.incarray(2, env.uint32).generator();
		let over = max+1;
		let area = new IntegerArea(min, over);
		const has = area.compilHas(); 

		jsc.property('inner', env.int(min, max), env, (value)=>{
			return has(value);
		});		
		
		jsc.property('before', env.int(0, min-1), env, (value)=>{
			return !has(value);
		});	
		
		jsc.property('after', env.int(over, 0xFFFFFFFF), env, (value)=>{
			return !has(value);
		});
	});
	
	describe('operations', ()=>{
		jsc.property('intersection', env.incarray(4, env.uint32), env, (value)=>{
			let [a,b,c,d] = value.map((val, i)=>(val+i));
			let listA = new IntegerArea(a, c+1);
			let listB = new IntegerArea(b, d+1);
			let res = listA.intersection(listB);
			return res.left === b && res.right === c+1;
		});		
		jsc.property('intersection for not intersect', env.incarray(4, env.uint32), env, (value)=>{
			let [a,b,c,d] = value.map((val, i)=>(val+i));
			let listA = new IntegerArea(a, b+1);
			let listB = new IntegerArea(c, d+1);
			let res = listA.intersection(listB);
			return res.isEmpty();
		});		
		jsc.property('join for intersect', env.incarray(4, env.uint32), env, (value)=>{
			let [a,b,c,d] = value.map((val, i)=>(val+i));
			let listA = new IntegerArea(a, c+1);
			let listB = new IntegerArea(b, d+1);
			let res = listA.join(listB);
			return res.left === a && res.right === d+1;
		});				
		jsc.property('join for concat', env.incarray(3, env.uint32), env, (value)=>{
			let [a,b,c] = value.map((val, i)=>(val+i));
			let listA = new IntegerArea(a, b+1);
			let listB = new IntegerArea(b, c+1);
			let res = listA.join(listB);
			return res.left === a && res.right === c+1;
		});		

	});
});