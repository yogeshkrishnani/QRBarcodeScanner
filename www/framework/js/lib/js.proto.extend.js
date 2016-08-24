String.prototype.fill = function(char, count) {
	var charToPad = "";
	for(var index = 0; index < count; index++ ) {
		charToPad +=  char;
	}
	return this + charToPad;
};

String.prototype.isEmpty = function() {
	return this.toString().trim() == "";
};