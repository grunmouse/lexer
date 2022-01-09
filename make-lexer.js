const {
	dev: {
		parseNotation,
		SituationsSet,
		CLOSURE,
		GOTO,
		FIRST,
		FOLLOW,
		buildGraph,
		toDot
	}
} = require('@grunmouse/syntax-lr0');

function NEXT(rule, all){
	if(rule.right.length === 0){
		return FOLLOW(rule.left, all);
	}
	else{
		
	}
}