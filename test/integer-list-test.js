const assert = require('assert');
const IntegerList = require('../integer-list.js');
const IntegerArea = require('../integer-area.js');

describe('IntegerList', ()=>{
	describe('exist', ()=>{
		it('has constructor', ()=>{
			assert(IntegerList);
		});
		it('create instance', ()=>{
			let inst = new IntegerList([new IntegerArea(1,2)]);
			assert(inst instanceof IntegerList);
		});
	});
});