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
	
	describe('limits', ()=>{
		let [min, max] = env.incarray(2, env.uint32).generator();
		let over = max+1;
		console.log(min, max);
		jsc.property('inner', env.int(min, max), env, (value)=>{
			let area = new IntegerArea(min, over);
			return area.has(value);
		});
	});
});