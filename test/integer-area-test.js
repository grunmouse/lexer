const assert = require('assert');
const IntegerArea = require('../integer-area.js');

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
});