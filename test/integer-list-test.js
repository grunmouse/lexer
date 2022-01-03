const assert = require('assert');
const IntegerList = require('../integer-list.js');
const IntegerArea = require('../integer-area.js');
const {
	prepForAll,
	env
} = require('@grunmouse/jsverify-env');

const jsc = require('jsverify');

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
	describe('by fromValues', ()=>{
		jsc.property('fromValues', env.incarray(10, env.nat(20)), env, (values)=>{
			let inst = IntegerList.fromValues(values);
			return inst instanceof IntegerList;
		});
		jsc.property('fromValues & values', env.incarray(10, env.nat(20)), env, (values)=>{
			let inst = IntegerList.fromValues(values);
			let ctrl = [...inst.values()];

			return values.join(',')===ctrl.join(',');
		});		
		
		jsc.property('fromValues & has', env.incarray(10, env.nat(20)), env.nat(20), env, (values, samp)=>{
			let inst = IntegerList.fromValues(values);

			return inst.has(samp) === values.includes(samp);
		});
		jsc.property('fromValues & compilHas', env.incarray(10, env.nat(20)), env.nat(20), env, (values, samp)=>{
			let inst = IntegerList.fromValues(values);
			const has = inst.compilHas();

			return has(samp) === values.includes(samp);
		});
	});
	describe('operations', ()=>{
		jsc.property('join', 
			env.incarray(10, env.nat(30)), 
			env.incarray(10, env.nat(30)),
			env.nat(30),
			(valA, valB, samp)=>{
				let A = IntegerList.fromValues(valA);
				let B = IntegerList.fromValues(valB);
				
				let C = A.join(B);
				
				return C.has(samp) === (A.has(samp) || B.has(samp));
			}
		);
		jsc.property('negate', 
			env.incarray(10, env.nat(30)), 
			env.nat(30),
			(valA, samp)=>{
				let A = IntegerList.fromValues(valA);
				
				let C = A.negate();
				
				return C.has(samp) === !A.has(samp);
			}
		);
		jsc.property('intersect', 
			env.incarray(10, env.nat(20)), 
			env.incarray(10, env.nat(20)),
			env.nat(20),
			(valA, valB, samp)=>{
				let A = IntegerList.fromValues(valA);
				let B = IntegerList.fromValues(valB);
				
				let C = A.intersection(B);
				
				return C.has(samp) === (A.has(samp) && B.has(samp));
			}
		);
	});
	
});