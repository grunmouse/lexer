
/**
 * Представляет полуинтервал на множестве целых неотрицательных чисел.
 */
class IntegerArea{
	constructor(left, right){
		if(right<=left){
			return IntegerArea.Empty;
		}		
		this.left = left;
		if(right && isFinite(right)){
			this.right = right;
		}
	}
	
	has(value){
		return value>=this.left && (!this.right || value<this.right);
	}
	
	doCompilHas(){
		if(this.right){
			return `value >= ${this.left} && value < ${this.right}`;
		}
		else{
			return `value >= ${this.left}`;
		}
	}
	
	compilHas(){
		return new Function(value, 'return ' + this.doCompilHas());
	}
	
	isEmpty(){
		return this.left>=this.right;
	}
	
	isFinite(){
		return !isNaN(this.right);
	}
	
	*values(){
		let [left, right] = this;
		right = right || Number.MAX_SAFE_INTEGER;
		for(let value = left; value<right; ++value){
			yield value;
		}
	}
	
	isCanJoin(b){
		if(b.left === a.left){
			return true;
		}
		else if(b.left < this.left){
			return b.has(this.left-1);
		}
		else{
			return this.has(b.left-1);
		}
	}
	
	join(b){
		let left = Math.min(this.left, b.left);
		let right = this.right && b.right && Math.max(this.right, b.right);

		return new IntegerArea(left, right);
	}
	intersection(b){
		let left = Math.max(this.left, b.left);
		let right = this.right && b.right && Math.min(this.right, b.right) || this.right || b.right;
		
		return new IntegerArea(left, right);
	}
}

IntegerArea.Empty = new IntegerArea(0, 0);

function i_o(a, b){
	return new IntegerArea(a, b);
}
function i_i(a, b){
	return new IntegerArea(a, b+1);
}
function o_i(a, b){
	return new IntegerArea(a+1, b+1);
}
function o_o(a, b){
	return new IntegerArea(a+1, b);
}

IntegerArea.i_o = i_o;
IntegerArea.i_i = i_i;
IntegerArea.o_o = o_o;
IntegerArea.o_i = o_i;

IntegerArea.lt = function(lim){
	return i_o(0, lim);
};
IntegerArea.le = function(lim){
	return i_i(0, lim);
};
IntegerArea.gt = function(lim){
	return o_o(lim);
};
IntegerArea.ge = function(lim){
	return i_o(lim);
};

IntegerArea.sorter = function(a, b){
	return a.left - b.left;
}

IntegerArea.isEmpty = function(a){
	return a.isEmpty();
}

IntegerArea.notEmpty = function(a){
	return !a.isEmpty();
}

module.exports = IntegerArea;